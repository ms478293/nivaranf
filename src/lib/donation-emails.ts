import { getMailer } from "@/lib/mailer";
import { getAdminNotification, getDonationReceiptTemplate } from "@/lib/email-templates";
import type { Dedication, Designation } from "@/content/donation-designations";

// Sender domain must be verified with the active transport; MAIL_FROM in the runtime env wins.
const FROM = "Nivaran Foundation <donations@updates.nivaranfoundation.org>";
const REPLY_TO = "donations@nivaranfoundation.org";

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

function usd(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export type DonationEmailInput = {
  email: string;
  firstName: string;
  lastName: string;
  baseAmountCents: number;
  feeCents: number;
  totalCents: number;
  designation: Designation;
  dedication?: Dedication;
  transactionId: string;
  cardType?: string;
  last4?: string;
  reference: string;
};

/**
 * Sends the donor receipt, then the internal notification (which reports whether the receipt went out).
 * Never throws: the card is already charged, so email failures are logged, not surfaced.
 */
export async function sendDonationEmails(input: DonationEmailInput): Promise<void> {
  const mailer = getMailer();

  const name = `${input.firstName} ${input.lastName}`.trim();
  const total = usd(input.totalCents);
  const base = usd(input.baseAmountCents);
  const fee = input.feeCents > 0 ? usd(input.feeCents) : undefined;
  const date = new Date().toLocaleDateString("en-US", { dateStyle: "long", timeZone: "America/New_York" });
  const paymentMethod =
    [input.cardType, input.last4 ? `ending in ${input.last4}` : ""].filter(Boolean).join(" ") || "Card";
  const dedication = input.dedication && {
    label: input.dedication.type === "honor" ? "In honor of" : "In memory of",
    name: escapeHtml(input.dedication.name),
  };

  try {
    const receipt = await mailer.emails.send({
      from: FROM,
      to: [input.email],
      replyTo: REPLY_TO,
      subject: `Thank you, ${input.firstName} — your ${total} gift to Nivaran Foundation`,
      html: getDonationReceiptTemplate({
        firstName: escapeHtml(input.firstName),
        name: escapeHtml(name),
        email: escapeHtml(input.email),
        date,
        total,
        base,
        fee,
        designationName: escapeHtml(input.designation.label),
        designationLabel: escapeHtml(input.designation.receiptLabel),
        thankYouNote: escapeHtml(input.designation.thankYouNote),
        impactLine: input.designation.impactLine ? escapeHtml(input.designation.impactLine) : undefined,
        exploreLabel: escapeHtml(input.designation.exploreLabel),
        exploreUrl: input.designation.pageUrl,
        dedication: dedication || undefined,
        paymentMethod: escapeHtml(paymentMethod),
        transactionId: escapeHtml(input.transactionId),
      }),
    });
    if (receipt.error) console.error("donor receipt failed", { reference: input.reference, error: receipt.error });

    const admin = await mailer.emails.send({
      from: FROM,
      to: [process.env.DONATION_NOTIFY_EMAIL || REPLY_TO],
      subject: `New donation: ${total} · ${input.designation.label} · ${name}`,
      html: getAdminNotification("New donation received", [
        { label: "Total charged", value: total },
        { label: "Gift amount", value: base },
        { label: "Processing costs covered", value: fee ?? "No" },
        {
          label: "Designation",
          value: `${escapeHtml(input.designation.label)} <span style="color:#6b7280">(${input.designation.id})</span>`,
        },
        { label: "Dedication", value: dedication ? `${dedication.label} ${dedication.name}` : "None" },
        { label: "Donor", value: escapeHtml(name) },
        { label: "Email", value: escapeHtml(input.email) },
        { label: "Payment", value: escapeHtml(paymentMethod) },
        { label: "Transaction ID", value: escapeHtml(input.transactionId) },
        { label: "Reference", value: escapeHtml(input.reference) },
        { label: "Processor", value: "GoDaddy Payments" },
        {
          label: "Receipt emailed",
          value: receipt.error
            ? `<strong style="color:#dc2626">FAILED — resend manually</strong> (${escapeHtml(receipt.error.message)})`
            : "Yes",
        },
      ]),
    });
    if (admin.error) console.error("donation admin notification failed", { reference: input.reference, error: admin.error });
  } catch (err) {
    console.error("donation emails failed", { reference: input.reference, err });
  }
}
