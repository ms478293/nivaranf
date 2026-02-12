'use server'

import { supabaseAdmin } from "@/lib/supabase/server";
import { Resend } from 'resend';
import { getJobApplicationTemplate } from "@/lib/email-templates";

export async function submitApplicationWithFiles(formData: FormData) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // Extract form data
    const jobOpeningId = formData.get('jobOpeningId') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const jobLocation = formData.get('jobLocation') as string;
    const fName = formData.get('fName') as string;
    const lName = formData.get('lName') as string;
    const mName = formData.get('mName') as string || '';
    const emailAddress = formData.get('emailAddress') as string;
    const contactNo = formData.get('contactNo') as string;
    const country = formData.get('country') as string;
    const city = formData.get('city') as string;
    const address = formData.get('address') as string || '';
    const portfolioLink = formData.get('portfolioLink') as string || '';
    const linkedinUrl = formData.get('linkedinUrl') as string || '';
    const availability = formData.get('availability') as string;
    const yearsOfExperience = formData.get('yearsOfExperience') as string;
    const highestEducation = formData.get('highestEducation') as string;
    const previousEmployee = formData.get('previousEmployee') === 'true';
    const universityStudent = formData.get('universityStudent') === 'true';
    const canRelocate = formData.get('canRelocate') === 'true';
    const acceptsOtherOppurtunity = formData.get('acceptsOtherOppurtunity') === 'true';

    // Get files
    const resumeFile = formData.get('resumeFile') as File;
    const coverLetterFile = formData.get('coverLetterFile') as File | null;

    if (!resumeFile) {
      return { success: false, error: 'Resume file is required' };
    }

    // Generate unique filename for resume
    const timestamp = Date.now();
    const sanitizedName = `${fName}_${lName}`.replace(/[^a-zA-Z0-9]/g, '_');
    const resumeExtension = resumeFile.name.split('.').pop();
    const resumeFileName = `resumes/${sanitizedName}_${timestamp}.${resumeExtension}`;

    // Upload resume to Supabase Storage
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

    // Get public URL for resume
    const { data: { publicUrl: resumeUrl } } = supabaseAdmin
      .storage
      .from('job-applications')
      .getPublicUrl(resumeFileName);

    // Upload cover letter if provided
    let coverLetterUrl = '';
    if (coverLetterFile && coverLetterFile.size > 0) {
      const coverLetterExtension = coverLetterFile.name.split('.').pop();
      const coverLetterFileName = `cover-letters/${sanitizedName}_${timestamp}.${coverLetterExtension}`;

      const coverLetterBuffer = await coverLetterFile.arrayBuffer();
      const { error: coverLetterUploadError } = await supabaseAdmin
        .storage
        .from('job-applications')
        .upload(coverLetterFileName, coverLetterBuffer, {
          contentType: coverLetterFile.type,
          upsert: false
        });

      if (!coverLetterUploadError) {
        const { data: { publicUrl } } = supabaseAdmin
          .storage
          .from('job-applications')
          .getPublicUrl(coverLetterFileName);
        coverLetterUrl = publicUrl;
      }
    }

    // Prepare additional info JSON
    const additionalInfo = {
      jobTitle,
      jobLocation,
      middleName: mName,
      optionalContactNo: '',
      portfolioLink,
      linkedinUrl,
      availability,
      yearsOfExperience,
      highestEducation,
      previousEmployee,
      universityStudent,
      canRelocate,
      acceptsOtherOpportunity: acceptsOtherOppurtunity,
      coverLetterUrl
    };

    // Insert into database
    const { data: applicationData, error: dbError } = await supabaseAdmin
      .from('applications')
      .insert({
        type: 'job',
        related_id: jobOpeningId.toString(),
        first_name: fName,
        last_name: lName,
        email: emailAddress,
        phone: contactNo,
        address: `${city}, ${country}${address ? ', ' + address : ''}`,
        resume_url: resumeUrl,
        cover_letter: JSON.stringify(additionalInfo),
        status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database Error:', dbError);
      // Try to clean up uploaded files
      await supabaseAdmin.storage.from('job-applications').remove([resumeFileName]);
      if (coverLetterUrl) {
        await supabaseAdmin.storage.from('job-applications').remove([`cover-letters/${sanitizedName}_${timestamp}.${coverLetterFile?.name.split('.').pop()}`]);
      }
      return { success: false, error: 'Failed to save application. Please try again.' };
    }

    // Send confirmation email to applicant
    const applicantEmailContent = `
      <div style="font-family: Arial, sans-serif;">
        <p style="font-size: 16px; color: #333;">Dear ${fName} ${lName},</p>

        <p style="font-size: 14px; color: #555; line-height: 1.6;">
          Thank you for your interest in joining the Nivaran Foundation team. We have successfully received your application for the position of <strong>${jobTitle}</strong>.
        </p>

        <div style="background-color: #f5f5f5; border-left: 4px solid #2B7A0B; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #333;"><strong>Application Details:</strong></p>
          <p style="margin: 5px 0; font-size: 14px; color: #555;">Position: ${jobTitle}</p>
          <p style="margin: 5px 0; font-size: 14px; color: #555;">Location Preference: ${jobLocation}</p>
          <p style="margin: 5px 0; font-size: 14px; color: #555;">Application ID: #${applicationData.id}</p>
          <p style="margin: 5px 0; font-size: 14px; color: #555;">Status: <span style="color: #2B7A0B; font-weight: bold;">Under Review</span></p>
          <p style="margin: 5px 0; font-size: 14px; color: #555;">Submitted: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <p style="font-size: 14px; color: #555; line-height: 1.6;">
          Our recruitment team will carefully review your qualifications and experience. If your profile matches our requirements, we will contact you within <strong>2-3 weeks</strong> for the next steps in the interview process.
        </p>

        <p style="font-size: 14px; color: #555; line-height: 1.6;">
          We appreciate your patience during this process and your interest in contributing to our mission of delivering healthcare and education to underserved communities in Nepal.
        </p>

        <div style="margin: 30px 0;">
          <a href="https://nivaranfoundation.org/career"
             style="display: inline-block; padding: 12px 24px; background-color: #2B7A0B; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
            View More Openings
          </a>
        </div>

        <p style="font-size: 14px; color: #555;">
          Best regards,<br>
          <strong>Nivaran Foundation Recruitment Team</strong><br>
          <a href="mailto:careers@nivaranfoundation.org" style="color: #2B7A0B;">careers@nivaranfoundation.org</a>
        </p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

        <p style="font-size: 12px; color: #999; line-height: 1.5;">
          This is an automated confirmation email. Please do not reply to this email. If you have questions about your application, please contact us at careers@nivaranfoundation.org.
        </p>
      </div>
    `;

    const { error: emailError } = await resend.emails.send({
      from: 'Nivaran Foundation <noreply@updates.nivaranfoundation.org>',
      to: [emailAddress],
      subject: `Application Received - ${jobTitle} | Nivaran Foundation`,
      html: getJobApplicationTemplate(`Application for ${jobTitle}`, applicantEmailContent)
    });

    if (emailError) {
      console.error('Email Error:', emailError);
      // Don't fail the application if email fails, just log it
    }

    // Send notification email to admin/HR
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: #2B7A0B;">New Job Application Received</h2>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Position:</strong> ${jobTitle}</p>
          <p style="margin: 5px 0;"><strong>Applicant:</strong> ${fName} ${lName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${emailAddress}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${contactNo}</p>
          <p style="margin: 5px 0;"><strong>Location:</strong> ${city}, ${country}</p>
          <p style="margin: 5px 0;"><strong>Experience:</strong> ${yearsOfExperience}</p>
          <p style="margin: 5px 0;"><strong>Education:</strong> ${highestEducation}</p>
          <p style="margin: 5px 0;"><strong>Availability:</strong> ${availability}</p>
          <p style="margin: 5px 0;"><strong>Application ID:</strong> #${applicationData.id}</p>
        </div>

        <div style="margin: 20px 0;">
          <p><strong>Resume:</strong> <a href="${resumeUrl}" style="color: #2B7A0B;">View Resume</a></p>
          ${coverLetterUrl ? `<p><strong>Cover Letter:</strong> <a href="${coverLetterUrl}" style="color: #2B7A0B;">View Cover Letter</a></p>` : ''}
          ${portfolioLink ? `<p><strong>Portfolio:</strong> <a href="${portfolioLink}" style="color: #2B7A0B;">${portfolioLink}</a></p>` : ''}
          ${linkedinUrl ? `<p><strong>LinkedIn:</strong> <a href="${linkedinUrl}" style="color: #2B7A0B;">${linkedinUrl}</a></p>` : ''}
        </div>

        <p style="margin-top: 30px;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard"
             style="display: inline-block; padding: 12px 24px; background-color: #2B7A0B; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Review Application in Dashboard
          </a>
        </p>
      </div>
    `;

    // Send to admin email
    await resend.emails.send({
      from: 'Nivaran Applications <noreply@updates.nivaranfoundation.org>',
      to: ['support@nivaranfoundation.org'], // Change to your HR email
      subject: `New Application: ${jobTitle} - ${fName} ${lName}`,
      html: adminEmailContent
    });

    return {
      success: true,
      message: 'Application submitted successfully!',
      applicationId: applicationData.id
    };

  } catch (error: any) {
    console.error('Submission Error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred. Please try again.'
    };
  }
}
