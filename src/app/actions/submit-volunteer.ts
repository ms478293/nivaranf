'use server'

import { supabaseAdmin } from "@/lib/supabase/server";
import { Resend } from 'resend';
import { VolunteerSchemaType } from "@/components/dashboard/forms/volunteer/schema/volunteerSchema";
import { getVolunteerApplicationTemplate } from "@/lib/email-templates";

export async function submitVolunteer(data: VolunteerSchemaType) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    // 1. Insert into Supabase
    const { error: dbError } = await supabaseAdmin
      .from('applications')
      .insert({
        type: 'volunteer',
        related_id: data.programId.toString(),
        first_name: data.fname,
        last_name: data.lname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        cover_letter: `Why: ${data.why}\nExperience: ${data.experience}\nNationality: ${data.nationality}\nGender: ${data.gender}`,
        status: 'pending'
      });

    if (dbError) {
      console.error('Supabase Error:', dbError);
      throw new Error('Failed to save application');
    }

    // 2. Send Email via Resend
    const userEmailContent = `
      <p>Dear ${data.fname},</p>
      <p>Thank you for your interest in volunteering with Nivaran Foundation. We are thrilled to see your enthusiasm for making a difference.</p>
      <div class="info-box">
        <p><strong>Your Motivation:</strong></p>
        <p><em>"${data.why}"</em></p>
      </div>
      <p>We have received your application and will review it shortly. Our volunteer coordinator will reach out to you with more information.</p>
      <a href="https://nivaranfoundation.org/volunteer" class="button">Explore Other Opportunities</a>
      <p>Best regards,<br>Nivaran Foundation Team</p>
    `;

    const { error: emailError } = await resend.emails.send({
      from: 'Nivaran Foundation <onboarding@resend.dev>', // Update with verified domain if available
      to: [data.email],
      subject: 'Volunteer Application Received - Nivaran Foundation',
      html: getVolunteerApplicationTemplate(userEmailContent)
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
