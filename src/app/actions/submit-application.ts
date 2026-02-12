'use server'

import { supabaseAdmin } from "@/lib/supabase/server";
import { Resend } from 'resend';
import { jobApplicationSchemaType, LegalSchemaType } from "@/components/new/CareerForm/jobApplicationSchema";
import { getJobApplicationTemplate } from "@/lib/email-templates";

type JobApplicationData = Omit<jobApplicationSchemaType, 'resumeFile' | 'coverLetterFile'> & {
  resumeLink: string;
} & LegalSchemaType;

export async function submitApplication(data: JobApplicationData) {
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
      // Don't fail the application if email fails, just log it
    }

    // 3. Send Notification Email to Admin/HR
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: #2B7A0B;">New Job Application Received</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Applicant:</strong> ${data.fName} ${data.lName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${data.emailAddress}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${data.contactNo}</p>
          <p style="margin: 5px 0;"><strong>Country:</strong> ${data.country}</p>
          <p style="margin: 5px 0;"><strong>Availability:</strong> ${data.availability}</p>
          <p style="margin: 5px 0;"><strong>Job Opening ID:</strong> ${data.jobOpeningId}</p>
        </div>
        <div style="margin: 20px 0;">
          ${data.resumeLink ? `<p><strong>Resume:</strong> <a href="${data.resumeLink}" style="color: #2B7A0B;">View Resume</a></p>` : ''}
          ${data.portfolioLink ? `<p><strong>Portfolio:</strong> <a href="${data.portfolioLink}" style="color: #2B7A0B;">${data.portfolioLink}</a></p>` : ''}
        </div>
        <p style="margin-top: 20px;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://nivaranfoundation.org'}/dashboard"
             style="display: inline-block; padding: 12px 24px; background-color: #2B7A0B; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Review Application in Dashboard
          </a>
        </p>
      </div>
    `;

    await resend.emails.send({
      from: 'Nivaran Applications <noreply@updates.nivaranfoundation.org>',
      to: ['support@nivaranfoundation.org'],
      subject: `New Job Application: ${data.fName} ${data.lName}`,
      html: adminEmailContent
    });

    return { success: true };
  } catch (error: any) {
    console.error('Submission Error:', error);
    return { success: false, error: error.message || 'Failed to submit application' };
  }
}
