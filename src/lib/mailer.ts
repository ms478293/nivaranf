import nodemailer, { type Transporter } from "nodemailer";
import { Resend } from "resend";

/**
 * Single outbound-mail entry point. Same call shape as Resend's `emails.send`
 * so call sites only swap `new Resend(key)` for `getMailer()`.
 *
 * Transport selection:
 *  1. SMTP (Zoho) when SMTP_HOST is set — SMTP_USER/SMTP_PASS (app password),
 *     SMTP_PORT (465), MAIL_FROM forces the From header to a mailbox/alias the
 *     SMTP account owns (Zoho rejects anything else).
 *  2. Resend when only RESEND_API_KEY is set (MAIL_FROM also overrides the sender here;
 *     Resend rejects any From outside a verified domain).
 *  3. Otherwise every send returns an error and nothing is thrown.
 */
export type MailPayload = {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};
export type MailResult = { error: { message: string } | null };
export type Mailer = { emails: { send: (p: MailPayload) => Promise<MailResult> } };

let transporter: Transporter | null = null;

function smtp(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: (process.env.SMTP_SECURE ?? "true") !== "false",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

export function getMailer(): Mailer {
  if (process.env.SMTP_HOST) {
    return {
      emails: {
        send: async (p) => {
          try {
            await smtp().sendMail({
              from: process.env.MAIL_FROM || p.from,
              to: p.to,
              subject: p.subject,
              html: p.html,
              replyTo: p.replyTo,
            });
            return { error: null };
          } catch (err) {
            return { error: { message: err instanceof Error ? err.message : String(err) } };
          }
        },
      },
    };
  }
  const key = process.env.RESEND_API_KEY;
  if (key) {
    const resend = new Resend(key);
    return {
      emails: {
        send: async (p) => {
          const { error } = await resend.emails.send({
            ...p,
            // Resend only accepts senders on a verified domain; MAIL_FROM is the single override.
            from: process.env.MAIL_FROM || p.from,
            to: Array.isArray(p.to) ? p.to : [p.to],
          });
          return { error: error ? { message: error.message } : null };
        },
      },
    };
  }
  return {
    emails: {
      send: async () => ({ error: { message: "No mail transport configured (set SMTP_HOST or RESEND_API_KEY)" } }),
    },
  };
}
