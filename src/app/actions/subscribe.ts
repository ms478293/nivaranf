'use server'

import { supabaseAdmin } from "@/lib/supabase/server";
import { Resend } from 'resend';
import { getSubscriptionTemplate } from "@/lib/email-templates";

export async function subscribe(email: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    // 1. Insert into Supabase
    const { error: dbError } = await supabaseAdmin
      .from('subscribers')
      .insert({ email });

    if (dbError) {
      if (dbError.code === '23505') { // Unique violation
        return { success: false, error: 'Email already subscribed' };
      }
      throw dbError;
    }

    // 2. Send Confirmation Email
    const userEmailContent = `
      <p>Thank you for subscribing to the Nivaran Foundation newsletter!</p>
      <p>You are now part of a community dedicated to making a positive impact. We'll keep you updated on our latest projects, success stories, and ways you can get involved.</p>
      <div class="info-box">
        <p><strong>What to expect:</strong></p>
        <ul>
          <li>Updates on our healthcare initiatives</li>
          <li>Stories of impact from Nepal</li>
          <li>Opportunities to volunteer or donate</li>
        </ul>
      </div>
      <p>If you did not sign up for this newsletter, you can safely ignore this email.</p>
      <a href="https://nivaranfoundation.org/programs" class="button">Explore Our Programs</a>
      <p>Best regards,<br>Nivaran Foundation Team</p>
    `;

    const { error: emailError } = await resend.emails.send({
      from: 'Nivaran Foundation <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to Nivaran Foundation Newsletter',
      html: getSubscriptionTemplate(userEmailContent)
    });

    if (emailError) {
      console.error('Resend Error:', emailError);
      return { success: false, error: `Email failed: ${emailError.message}` };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Subscription Error:', error);
    return { success: false, error: error.message || 'Failed to subscribe' };
  }
}
