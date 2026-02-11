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
      from: 'Nivaran Foundation <onboarding@resend.dev>',
      to: [data.email],
      subject: 'We received your message - Nivaran Foundation',
      html: getContactTemplate(userEmailContent)
    });

    if (emailError) {
      console.error('Resend Error (User):', emailError);
      return { success: false, error: `Email failed: ${emailError.message}` };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Contact Submission Error:', error);
    return { success: false, error: error.message || 'Failed to send message' };
  }
}
