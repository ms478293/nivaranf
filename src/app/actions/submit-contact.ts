'use server'

import { supabaseAdmin } from "@/lib/supabase/server";
import { Resend } from 'resend';
import { getContactTemplate } from "@/lib/email-templates";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function submitContact(data: ContactFormData) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    // 1. Insert into Supabase
    const { error: dbError } = await supabaseAdmin
      .from('messages')
      .insert({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });

    if (dbError) {
      console.error('Supabase Error:', dbError);
      throw new Error('Failed to save message');
    }

    // 2. Send Acknowledgment Email to User
    const userEmailContent = `
      <p>Dear ${data.name},</p>
      <p>Thank you for reaching out to Nivaran Foundation. We have received your message regarding "<strong>${data.subject || 'Inquiry'}</strong>".</p>
      <div class="info-box">
        <p><strong>Your Message:</strong></p>
        <p><em>"${data.message}"</em></p>
      </div>
      <p>Our team will review your inquiry and get back to you within 2-3 business days.</p>
      <a href="https://nivaranfoundation.org" class="button">Visit our Website</a>
      <p>Best regards,<br>Nivaran Foundation Team</p>
    `;

    const { error: emailError } = await resend.emails.send({
      from: 'Nivaran Foundation <noreply@updates.nivaranfoundation.org>',
      to: [data.email],
      subject: 'We received your message - Nivaran Foundation',
      html: getContactTemplate(userEmailContent)
    });

    if (emailError) {
      console.error('Resend Error (User):', emailError);
      return { success: false, error: `Email failed: ${emailError.message}` };
    }

    // 3. Send Notification Email to Admin
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: #2B7A0B;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Name:</strong> ${data.name}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
          <p style="margin: 5px 0;"><strong>Subject:</strong> ${data.subject || 'No subject'}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div style="margin: 20px 0;">
          <p><strong>Message:</strong></p>
          <div style="background-color: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">
            <p style="white-space: pre-wrap; color: #555;">${data.message}</p>
          </div>
        </div>
        <p style="margin-top: 20px;">
          <a href="mailto:${data.email}" style="display: inline-block; padding: 12px 24px; background-color: #2B7A0B; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Reply to ${data.name}
          </a>
        </p>
      </div>
    `;

    await resend.emails.send({
      from: 'Nivaran Foundation <noreply@updates.nivaranfoundation.org>',
      to: ['support@nivaranfoundation.org'],
      subject: `New Contact: ${data.subject || 'Inquiry'} - ${data.name}`,
      html: adminEmailContent
    });

    return { success: true };
  } catch (error: any) {
    console.error('Contact Submission Error:', error);
    return { success: false, error: error.message || 'Failed to send message' };
  }
}
