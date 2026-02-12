'use server'

import { supabaseAdmin } from "@/lib/supabase/server";
import { Resend } from 'resend';
import { getVolunteerApplicationTemplate } from "@/lib/email-templates";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "@/components/new/CareerForm/jobApplicationSchema";

export async function submitVolunteer(formData: FormData) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const programId = formData.get('programId') as string;
    const programName = formData.get('programName') as string;
    const fname = formData.get('fname') as string;
    const lname = formData.get('lname') as string;
    const nationality = formData.get('nationality') as string;
    const gender = formData.get('gender') as string;
    const why = formData.get('why') as string;
    const experience = formData.get('experience') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;
    const resumeFile = formData.get('resumeFile') as File;

    if (!resumeFile) {
      return { success: false, error: 'Resume is required' };
    }

    if (resumeFile.size > MAX_FILE_SIZE) {
      return { success: false, error: 'Resume must be less than 10MB' };
    }

    if (!ALLOWED_FILE_TYPES.includes(resumeFile.type)) {
      return { success: false, error: 'Invalid file type. Only PDF, DOCX, and DOC are allowed' };
    }

    const timestamp = Date.now();
    const sanitizedName = `${fname}_${lname}`.replace(/[^a-zA-Z0-9]/g, '_');
    const resumeExtension = resumeFile.name.split('.').pop();
    const resumeFileName = `volunteer-resumes/${sanitizedName}_${timestamp}.${resumeExtension}`;

    const resumeBuffer = await resumeFile.arrayBuffer();
    const { error: resumeUploadError } = await supabaseAdmin
      .storage
      .from('job-applications')
      .upload(resumeFileName, resumeBuffer, {
        contentType: resumeFile.type,
        upsert: false
      });

    if (resumeUploadError) {
      console.error('Resume upload error:', resumeUploadError);
      return { success: false, error: 'Failed to upload resume. Please try again.' };
    }

    const { data: { publicUrl: resumeUrl } } = supabaseAdmin
      .storage
      .from('job-applications')
      .getPublicUrl(resumeFileName);

    const additionalInfo = {
      programName,
      nationality,
      gender,
      why,
      experience,
      resumeUrl
    };

    // 1. Insert into Supabase
    const { error: dbError } = await supabaseAdmin
      .from('applications')
      .insert({
        type: 'volunteer',
        related_id: programId.toString(),
        first_name: fname,
        last_name: lname,
        email,
        phone,
        address,
        resume_url: resumeUrl,
        cover_letter: JSON.stringify(additionalInfo),
        status: 'pending'
      });

    if (dbError) {
      console.error('Supabase Error:', dbError);
      throw new Error('Failed to save application');
    }

    // 2. Send Email via Resend
    const userEmailContent = `
      <p>Dear ${fname},</p>
      <p>Thank you for your interest in volunteering with Nivaran Foundation. We are thrilled to see your enthusiasm for making a difference.</p>
      <div class="info-box">
        <p><strong>Program:</strong> ${programName}</p>
        <p><strong>Your Motivation:</strong></p>
        <p><em>"${why}"</em></p>
      </div>
      <p>We have received your application and will review it shortly. Our volunteer coordinator will reach out to you with more information.</p>
      <a href="https://nivaranfoundation.org/volunteer" class="button">Explore Other Opportunities</a>
      <p>Best regards,<br>Nivaran Foundation Team</p>
    `;

    const { error: emailError } = await resend.emails.send({
      from: 'Nivaran Foundation <noreply@updates.nivaranfoundation.org>',
      to: [email],
      subject: 'Volunteer Application Received - Nivaran Foundation',
      html: getVolunteerApplicationTemplate(userEmailContent)
    });

    if (emailError) {
      console.error('Resend Error:', emailError);
    }

    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: #2B7A0B;">New Volunteer Application Received</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Program:</strong> ${programName}</p>
          <p style="margin: 5px 0;"><strong>Applicant:</strong> ${fname} ${lname}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
          <p style="margin: 5px 0;"><strong>Nationality:</strong> ${nationality}</p>
          <p style="margin: 5px 0;"><strong>Gender:</strong> ${gender}</p>
        </div>
        <div style="margin: 20px 0;">
          <p><strong>Motivation:</strong> ${why}</p>
          <p><strong>Experience Summary:</strong> ${experience}</p>
        </div>
        <div style="margin: 20px 0;">
          <p><strong>Resume:</strong> <a href="${resumeUrl}" style="color: #2B7A0B;">View Resume</a></p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'Nivaran Applications <noreply@updates.nivaranfoundation.org>',
      to: ['support@nivaranfoundation.org'],
      subject: `New Volunteer Application: ${programName} - ${fname} ${lname}`,
      html: adminEmailContent
    });

    return { success: true };
  } catch (error: any) {
    console.error('Submission Error:', error);
    return { success: false, error: error.message || 'Failed to submit application' };
  }
}
