'use server'

import { supabaseAdmin } from "@/lib/supabase/server";
import { Resend } from 'resend';
import { jobApplicationSchemaType, LegalSchemaType } from "@/components/new/CareerForm/jobApplicationSchema";
import { getJobApplicationTemplate } from "@/lib/email-templates";

export async function submitApplication(data: jobApplicationSchemaType & LegalSchemaType) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    // 1. Insert into Supabase
    const { error: dbError } = await supabaseAdmin
      .from('applications')
      .insert({
        type: 'job',
        related_id: data.jobOpeningId.toString(),
        first_name: data.fName,
        last_name: data.lName,
        email: data.emailAddress,
        phone: data.contactNo,
        address: data.country, // Using country as address for now
        resume_url: data.resumeLink,
        cover_letter: `Availability: ${data.availability}\nPortfolio: ${data.portfolioLink}`,
        status: 'pending'
      });

    if (dbError) {
      console.error('Supabase Error:', dbError);
      throw new Error('Failed to save application');
    }

    // 2. Send Email via Resend
    const userEmailContent = `
      <p>Dear ${data.fName},</p>
      <p>Thank you for your interest in joining the Nivaran Foundation team. We have successfully received your application.</p>
      <div class="info-box">
        <p><strong>Application Details:</strong></p>
        <p>Name: ${data.fName} ${data.lName}</p>
        <p>Email: ${data.emailAddress}</p>
        <p>Status: Under Review</p>
      </div>
      <p>Our recruitment team will review your qualifications and experience. If your profile matches our requirements, we will contact you for the next steps.</p>
      <p>We appreciate your patience during this process.</p>
      <a href="https://nivaranfoundation.org/career" class="button">View More Openings</a>
      <p>Best regards,<br>Nivaran Foundation Team</p>
    `;

    const { error: emailError } = await resend.emails.send({
      from: 'Nivaran Foundation <noreply@updates.nivaranfoundation.org>',
      to: [data.emailAddress],
      subject: 'Application Received - Nivaran Foundation',
      html: getJobApplicationTemplate('Role Application', userEmailContent)
    });

    if (emailError) {
      console.error('Resend Error:', emailError);
      return { success: false, error: `Email failed: ${emailError.message}` };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Submission Error:', error);
    return { success: false, error: error.message || 'Failed to submit application' };
  }
}
