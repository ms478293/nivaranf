'use server'

import { Resend } from "resend";
import { getContactTemplate } from "@/lib/email-templates";
import { supabaseAdmin } from "@/lib/supabase/server";

export type TeamMember = {
  name: string;
  role: string;
  photoUrl: string; // base64 data-url or uploaded URL
};

export type LocalPartnerData = {
  // Group Info
  groupName: string;
  groupType: string;
  city: string;
  state: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  socialMediaLink: string;

  // Group Details
  memberCount: string;
  hasAdultAdvisor: boolean;
  advisorName: string;
  advisorEmail: string;
  advisorPhone: string;

  // Event & Fundraising
  eventTypes: string[];
  eventDescription: string;
  estimatedFundsToRaise: string;
  expensePercentage: string;
  proposedDate: string;
  eventLocation: string;

  // Team Members
  teamMembers: TeamMember[];

  // Agreement
  agreedToTerms: boolean;
  agreedExpensePolicy: boolean;
  additionalNotes: string;
};

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function submitLocalPartner(data: LocalPartnerData) {
  try {
    // Validate required fields
    if (
      !data.groupName ||
      !data.contactName ||
      !data.contactEmail ||
      !data.contactPhone ||
      !data.city ||
      !data.state ||
      !data.groupType ||
      !data.eventDescription ||
      !data.estimatedFundsToRaise ||
      !data.expensePercentage ||
      data.eventTypes.length === 0
    ) {
      return { success: false, error: "Please complete all required fields." };
    }

    if (!data.contactEmail.includes("@")) {
      return { success: false, error: "Please enter a valid email address." };
    }

    if (!data.agreedToTerms || !data.agreedExpensePolicy) {
      return { success: false, error: "Please agree to all terms before submitting." };
    }

    if (data.teamMembers.length === 0) {
      return { success: false, error: "Please add at least one team member." };
    }

    const subject = `Local Partner Application - ${data.groupName}`;

    const teamMembersList = data.teamMembers
      .map((m, i) => `  ${i + 1}. ${m.name} (${m.role})`)
      .join("\n");

    const structuredMessage = [
      "LOCAL FUNDRAISING PARTNER APPLICATION",
      "",
      "--- GROUP INFORMATION ---",
      `Group Name: ${data.groupName}`,
      `Group Type: ${data.groupType}`,
      `City: ${data.city}`,
      `State: ${data.state}`,
      `Member Count: ${data.memberCount || "Not specified"}`,
      `Has Adult Advisor: ${data.hasAdultAdvisor ? "Yes" : "No"}`,
      data.hasAdultAdvisor ? `Advisor Name: ${data.advisorName}` : "",
      data.hasAdultAdvisor ? `Advisor Email: ${data.advisorEmail}` : "",
      data.hasAdultAdvisor ? `Advisor Phone: ${data.advisorPhone}` : "",
      `Social Media: ${data.socialMediaLink || "Not provided"}`,
      "",
      "--- CONTACT ---",
      `Contact Name: ${data.contactName}`,
      `Contact Email: ${data.contactEmail}`,
      `Contact Phone: ${data.contactPhone}`,
      "",
      "--- EVENT & FUNDRAISING PLAN ---",
      `Event Types: ${data.eventTypes.join(", ")}`,
      `Estimated Funds to Raise: ${data.estimatedFundsToRaise}`,
      `Expense Allocation: ${data.expensePercentage}`,
      `Proposed Date: ${data.proposedDate || "TBD"}`,
      `Event Location: ${data.eventLocation || "TBD"}`,
      "",
      "Event Description:",
      data.eventDescription,
      "",
      "--- TEAM MEMBERS ---",
      teamMembersList,
      "",
      "--- ADDITIONAL NOTES ---",
      data.additionalNotes || "None",
    ].filter(Boolean).join("\n");

    // Save to Supabase
    const { error: dbError } = await supabaseAdmin.from("messages").insert({
      name: data.contactName,
      email: data.contactEmail,
      subject,
      message: structuredMessage,
    });

    if (dbError) {
      console.error("Local Partner Supabase Error:", dbError);
      return { success: false, error: "Failed to save your application." };
    }

    // Send emails
    const resend = new Resend(process.env.RESEND_API_KEY);

    const name = escapeHtml(data.contactName);
    const groupName = escapeHtml(data.groupName);
    const groupType = escapeHtml(data.groupType);
    const city = escapeHtml(data.city);
    const stateName = escapeHtml(data.state);
    const eventDesc = escapeHtml(data.eventDescription);
    const funds = escapeHtml(data.estimatedFundsToRaise);
    const expPct = escapeHtml(data.expensePercentage);

    // User confirmation email
    const userEmailHtml = getContactTemplate(`
      <p>Dear ${name},</p>
      <p>Thank you for applying to become a <strong>Local Fundraising Partner</strong> with Nivaran Foundation! We are excited about your group's initiative.</p>
      <div class="info-box">
        <p><strong>Group:</strong> ${groupName}</p>
        <p><strong>Type:</strong> ${groupType}</p>
        <p><strong>Location:</strong> ${city}, ${stateName}</p>
        <p><strong>Estimated Fundraising Goal:</strong> ${funds}</p>
        <p><strong>Expense Allocation:</strong> ${expPct}</p>
      </div>
      <p><strong>What happens next?</strong></p>
      <ol>
        <li>Our community partnerships team will review your application within <strong>3-5 business days</strong>.</li>
        <li>We'll schedule a brief call to discuss your event plans and finalize details.</li>
        <li>Once approved, you'll receive an official partnership agreement and fundraising toolkit.</li>
      </ol>
      <p>All net proceeds from your events will go directly to supporting healthcare and education programs in Nepal.</p>
      <a href="https://www.nivaranfoundation.org/local-partner" class="button">View Partner Program</a>
      <p>Thank you for making a difference in your community!<br/>Nivaran Foundation Partnerships Team</p>
    `);

    // Admin notification email
    const teamMembersHtml = data.teamMembers
      .map(
        (m, i) =>
          `<p style="margin: 4px 0;"><strong>${i + 1}.</strong> ${escapeHtml(m.name)} — ${escapeHtml(m.role)}${m.photoUrl ? ' (photo attached)' : ''}</p>`
      )
      .join("");

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; color: #1f2937;">
        <h2 style="margin: 0 0 12px 0; color: #0f172a;">🤝 New Local Fundraising Partner Application</h2>
        <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 10px; background: #f9fafb;">
          <h3 style="margin: 0 0 8px 0; color: #374151;">Group Information</h3>
          <p style="margin: 4px 0;"><strong>Group Name:</strong> ${groupName}</p>
          <p style="margin: 4px 0;"><strong>Group Type:</strong> ${groupType}</p>
          <p style="margin: 4px 0;"><strong>Location:</strong> ${city}, ${stateName}</p>
          <p style="margin: 4px 0;"><strong>Members:</strong> ${escapeHtml(data.memberCount || "Not specified")}</p>
          <p style="margin: 4px 0;"><strong>Social Media:</strong> ${escapeHtml(data.socialMediaLink || "Not provided")}</p>
          ${data.hasAdultAdvisor ? `
          <h3 style="margin: 12px 0 8px 0; color: #374151;">Adult Advisor</h3>
          <p style="margin: 4px 0;"><strong>Name:</strong> ${escapeHtml(data.advisorName)}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> ${escapeHtml(data.advisorEmail)}</p>
          <p style="margin: 4px 0;"><strong>Phone:</strong> ${escapeHtml(data.advisorPhone)}</p>
          ` : '<p style="margin: 4px 0; color: #dc2626;"><strong>⚠️ No adult advisor listed</strong></p>'}
        </div>
        <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 10px; background: #f9fafb; margin-top: 12px;">
          <h3 style="margin: 0 0 8px 0; color: #374151;">Contact</h3>
          <p style="margin: 4px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> ${escapeHtml(data.contactEmail)}</p>
          <p style="margin: 4px 0;"><strong>Phone:</strong> ${escapeHtml(data.contactPhone)}</p>
        </div>
        <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 10px; background: #f9fafb; margin-top: 12px;">
          <h3 style="margin: 0 0 8px 0; color: #374151;">Event & Fundraising Plan</h3>
          <p style="margin: 4px 0;"><strong>Event Types:</strong> ${escapeHtml(data.eventTypes.join(", "))}</p>
          <p style="margin: 4px 0;"><strong>Est. Funds to Raise:</strong> ${funds}</p>
          <p style="margin: 4px 0;"><strong>Expense Allocation:</strong> ${expPct}</p>
          <p style="margin: 4px 0;"><strong>Proposed Date:</strong> ${escapeHtml(data.proposedDate || "TBD")}</p>
          <p style="margin: 4px 0;"><strong>Location:</strong> ${escapeHtml(data.eventLocation || "TBD")}</p>
          <p style="margin: 8px 0 0 0;"><strong>Description:</strong></p>
          <p style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; white-space: pre-wrap;">${eventDesc}</p>
        </div>
        <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 10px; background: #f9fafb; margin-top: 12px;">
          <h3 style="margin: 0 0 8px 0; color: #374151;">Team Members (${data.teamMembers.length})</h3>
          ${teamMembersHtml}
        </div>
        ${data.additionalNotes ? `
        <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 10px; background: #f9fafb; margin-top: 12px;">
          <h3 style="margin: 0 0 8px 0; color: #374151;">Additional Notes</h3>
          <p style="white-space: pre-wrap;">${escapeHtml(data.additionalNotes)}</p>
        </div>` : ""}
      </div>
    `;

    await resend.emails.send({
      from: "Nivaran Foundation <noreply@updates.nivaranfoundation.org>",
      to: [data.contactEmail],
      subject: "Application Received - Nivaran Local Partner Program",
      html: userEmailHtml,
    });

    await resend.emails.send({
      from: "Nivaran Foundation <noreply@updates.nivaranfoundation.org>",
      to: ["partnerships@nivaranfoundation.org", "support@nivaranfoundation.org"],
      subject: `New Local Partner Application: ${data.groupName} (${data.city}, ${data.state})`,
      html: adminHtml,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Local Partner Submission Error:", error);
    return { success: false, error: error?.message || "Failed to submit application." };
  }
}
