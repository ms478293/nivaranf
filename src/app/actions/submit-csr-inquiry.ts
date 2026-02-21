'use server'

import { Resend } from "resend";
import { getContactTemplate } from "@/lib/email-templates";
import { supabaseAdmin } from "@/lib/supabase/server";

export type CSRInquiryData = {
  fullName: string;
  workEmail: string;
  jobTitle: string;
  phone: string;
  companyName: string;
  companyWebsite: string;
  companyType: string;
  headquartersCountry: string;
  operatingRegions: string;
  employeeCount: string;
  annualCSRBudget: string;
  partnershipModels: string[];
  focusAreas: string[];
  implementationTimeline: string;
  objective: string;
  additionalNotes: string;
  consent: boolean;
};

function sanitizeArray(values: string[]) {
  return values.filter(Boolean).join(", ");
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function submitCSRInquiry(data: CSRInquiryData) {
  try {
    if (
      !data.fullName ||
      !data.workEmail ||
      !data.companyName ||
      !data.companyType ||
      !data.objective ||
      !data.implementationTimeline ||
      data.partnershipModels.length === 0 ||
      data.focusAreas.length === 0
    ) {
      return { success: false, error: "Please complete all required fields." };
    }

    if (!data.workEmail.includes("@")) {
      return { success: false, error: "Please enter a valid work email." };
    }

    if (!data.consent) {
      return {
        success: false,
        error: "Please agree to the privacy and communication consent.",
      };
    }

    const subject = `CSR Partnership Inquiry - ${data.companyName}`;
    const structuredMessage = [
      "CSR / Corporate Partnership Inquiry",
      "",
      `Full Name: ${data.fullName}`,
      `Job Title: ${data.jobTitle || "Not provided"}`,
      `Work Email: ${data.workEmail}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Company Name: ${data.companyName}`,
      `Company Website: ${data.companyWebsite || "Not provided"}`,
      `Company Type: ${data.companyType}`,
      `Headquarters Country: ${data.headquartersCountry || "Not provided"}`,
      `Operating Regions: ${data.operatingRegions || "Not provided"}`,
      `Employee Count: ${data.employeeCount || "Not provided"}`,
      `Annual CSR Budget: ${data.annualCSRBudget || "Not provided"}`,
      `Partnership Models: ${sanitizeArray(data.partnershipModels)}`,
      `Focus Areas: ${sanitizeArray(data.focusAreas)}`,
      `Implementation Timeline: ${data.implementationTimeline}`,
      "",
      "Strategic Objective:",
      data.objective,
      "",
      "Additional Notes:",
      data.additionalNotes || "None",
    ].join("\n");

    const { error: dbError } = await supabaseAdmin.from("messages").insert({
      name: data.fullName,
      email: data.workEmail,
      subject,
      message: structuredMessage,
    });

    if (dbError) {
      console.error("CSR Inquiry Supabase Error:", dbError);
      return { success: false, error: "Failed to save inquiry." };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const company = escapeHtml(data.companyName);
    const name = escapeHtml(data.fullName);
    const timeline = escapeHtml(data.implementationTimeline);
    const objective = escapeHtml(data.objective);
    const focusAreas = escapeHtml(sanitizeArray(data.focusAreas));

    const userEmailHtml = getContactTemplate(`
      <p>Dear ${name},</p>
      <p>Thank you for submitting your CSR partnership interest with Nivaran Foundation.</p>
      <div class="info-box">
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Primary Focus Areas:</strong> ${focusAreas}</p>
        <p><strong>Preferred Timeline:</strong> ${timeline}</p>
      </div>
      <p>We received your objective:</p>
      <p><em>"${objective}"</em></p>
      <p>Our partnerships team will review your submission and contact you within 2-3 business days with next-step options.</p>
      <a href="https://www.nivaranfoundation.org/corporate" class="button">View Corporate Partnerships</a>
      <p>Regards,<br/>Nivaran Foundation Partnerships Team</p>
    `);

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; color: #1f2937;">
        <h2 style="margin: 0 0 12px 0; color: #0f172a;">New CSR Partnership Inquiry</h2>
        <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 10px; background: #f9fafb;">
          <p style="margin: 6px 0;"><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
          <p style="margin: 6px 0;"><strong>Email:</strong> ${escapeHtml(data.workEmail)}</p>
          <p style="margin: 6px 0;"><strong>Job Title:</strong> ${escapeHtml(data.jobTitle || "Not provided")}</p>
          <p style="margin: 6px 0;"><strong>Company:</strong> ${escapeHtml(data.companyName)}</p>
          <p style="margin: 6px 0;"><strong>Company Type:</strong> ${escapeHtml(data.companyType)}</p>
          <p style="margin: 6px 0;"><strong>Website:</strong> ${escapeHtml(data.companyWebsite || "Not provided")}</p>
          <p style="margin: 6px 0;"><strong>Phone:</strong> ${escapeHtml(data.phone || "Not provided")}</p>
          <p style="margin: 6px 0;"><strong>Headquarters:</strong> ${escapeHtml(data.headquartersCountry || "Not provided")}</p>
          <p style="margin: 6px 0;"><strong>Operating Regions:</strong> ${escapeHtml(data.operatingRegions || "Not provided")}</p>
          <p style="margin: 6px 0;"><strong>Employee Count:</strong> ${escapeHtml(data.employeeCount || "Not provided")}</p>
          <p style="margin: 6px 0;"><strong>Annual CSR Budget:</strong> ${escapeHtml(data.annualCSRBudget || "Not provided")}</p>
          <p style="margin: 6px 0;"><strong>Models:</strong> ${escapeHtml(sanitizeArray(data.partnershipModels))}</p>
          <p style="margin: 6px 0;"><strong>Focus Areas:</strong> ${escapeHtml(sanitizeArray(data.focusAreas))}</p>
          <p style="margin: 6px 0;"><strong>Timeline:</strong> ${escapeHtml(data.implementationTimeline)}</p>
        </div>
        <h3 style="margin: 18px 0 6px 0; color: #0f172a;">Objective</h3>
        <p style="margin: 0; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(data.objective)}</p>
        <h3 style="margin: 18px 0 6px 0; color: #0f172a;">Additional Notes</h3>
        <p style="margin: 0; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(data.additionalNotes || "None")}</p>
      </div>
    `;

    await resend.emails.send({
      from: "Nivaran Foundation <noreply@updates.nivaranfoundation.org>",
      to: [data.workEmail],
      subject: "CSR inquiry received - Nivaran Foundation",
      html: userEmailHtml,
    });

    await resend.emails.send({
      from: "Nivaran Foundation <noreply@updates.nivaranfoundation.org>",
      to: ["partnerships@nivaranfoundation.org", "support@nivaranfoundation.org"],
      subject: `New CSR Inquiry: ${data.companyName}`,
      html: adminHtml,
    });

    return { success: true };
  } catch (error: any) {
    console.error("CSR Inquiry Error:", error);
    return { success: false, error: error?.message || "Failed to submit inquiry." };
  }
}

