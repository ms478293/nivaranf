# Nivaran Foundation - Job Application System Setup Guide

## Overview
This document provides complete setup instructions for the high-class job application system with file uploads, email notifications, and database integration.

## Features Implemented

### ✅ Multi-Step Application Form
- **Step 1**: Position & Personal Information
  - Position selection dropdown (auto-populated from active jobs)
  - Location preference selection
  - Full name, email, phone, address fields
  - Country and city selection

- **Step 2**: Qualifications & Documents
  - Years of experience dropdown
  - Education level selection
  - Resume upload (PDF, DOC, DOCX - max 10MB) **REQUIRED**
  - Cover letter upload (optional)
  - LinkedIn profile URL
  - Portfolio/website URL

- **Step 3**: Legal & Submission
  - Availability/notice period
  - Relocation willingness
  - Previous employment status
  - Current student status
  - Permission for future opportunities
  - Legal acknowledgments and certifications
  - Terms acceptance checkbox

### ✅ File Management
- Secure file upload to Supabase Storage
- File validation (type and size)
- Public access for viewing by admins
- Automatic file cleanup on errors
- PDF/DOC/DOCX support

### ✅ Email Notifications
- **Applicant Confirmation Email**:
  - Professional branded template
  - Application details and ID
  - Timeline expectations
  - Link to view more openings

- **Admin Notification Email**:
  - Complete applicant information
  - Direct links to resume and cover letter
  - Quick access to portfolio/LinkedIn
  - Link to review in dashboard

### ✅ Database Integration
- Applications stored in `applications` table
- Job openings in `jobs` table
- Proper indexes for performance
- Status tracking (pending/accepted/rejected)

## Setup Instructions

### 1. Supabase Storage Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('job-applications', 'job-applications', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access
CREATE POLICY "Public Access to view job application files"
ON storage.objects FOR SELECT
USING (bucket_id = 'job-applications');

-- Authenticated upload
CREATE POLICY "Authenticated users can upload job application files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'job-applications' AND auth.role() = 'authenticated');

-- Service role delete
CREATE POLICY "Service role can delete job application files"
ON storage.objects FOR DELETE
USING (bucket_id = 'job-applications' AND auth.role() = 'service_role');
```

### 2. Database Schema Updates

Run the provided `setup-supabase-storage.sql` file:

```bash
# In Supabase SQL Editor, run:
```
```sql
-- Update applications table
ALTER TABLE applications
ALTER COLUMN resume_url TYPE TEXT;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_applications_job_type
ON applications(type, related_id)
WHERE type = 'job';

CREATE INDEX IF NOT EXISTS idx_applications_status
ON applications(status, created_at DESC);
```

### 3. Seed Job Openings

Run the provided `seed-job-openings.sql` file to populate the jobs table with 5 high-quality job openings:

```bash
# In Supabase SQL Editor, execute seed-job-openings.sql
```

This creates:
1. Program Manager - Healthcare Initiatives (Kathmandu, Nepal)
2. Fundraising and Development Officer (Arlington, MA, USA)
3. Medical Volunteer Coordinator (Kathmandu, Nepal)
4. Communications and Social Media Specialist (Remote)
5. Finance and Operations Associate (Kathmandu, Nepal)

### 4. Environment Variables

Ensure these are set in your `.env.local` and Vercel:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend Email
RESEND_API_KEY=your_resend_api_key

# Site URL (for links in emails)
NEXT_PUBLIC_SITE_URL=https://nivaranfoundation.org
```

### 5. Test the Complete Flow

1. **Navigate to Career Page**:
   ```
   http://localhost:3001/career
   ```

2. **View Job Opening**:
   - Click on any active job
   - Review job details
   - Click "Apply Now"

3. **Complete Application**:
   - **Step 1**: Select position and enter personal info
   - **Step 2**: Upload resume (required), optionally upload cover letter
   - **Step 3**: Complete legal questions and accept terms
   - Submit application

4. **Verify Success**:
   - Check for success toast notification
   - Check applicant's email for confirmation
   - Check `support@nivaranfoundation.org` for admin notification
   - Verify in Supabase `applications` table
   - Verify files in Supabase Storage `job-applications` bucket

## How to View Applications in Database

### Query Applications
```sql
SELECT
  id,
  first_name,
  last_name,
  email,
  phone,
  resume_url,
  status,
  created_at
FROM applications
WHERE type = 'job'
ORDER BY created_at DESC;
```

### View Specific Application
```sql
SELECT * FROM applications WHERE id = YOUR_ID;
```

### View Resume/Cover Letter
The `resume_url` field contains the public URL. Click it to view/download the file.

## File Upload Process

1. **Client Side**:
   - User selects file via file input
   - File is validated (type, size)
   - File name is displayed
   - File object is stored in form state

2. **Form Submission**:
   - Form data is converted to FormData
   - Files are appended to FormData
   - FormData is sent to server action

3. **Server Side**:
   - File is extracted from FormData
   - Unique filename is generated
   - File is uploaded to Supabase Storage
   - Public URL is retrieved
   - URL is stored in database
   - On error, uploaded files are cleaned up

## Email Templates

The system uses two email templates:

### Applicant Confirmation
- Personalized greeting
- Application details in styled box
- Expected timeline (2-3 weeks)
- Call-to-action to view more openings
- Professional signature

### Admin Notification
- Complete applicant information
- Direct file access links
- Application metadata
- Link to review in dashboard

## Customization

### Change Admin Email
Edit `src/app/actions/submit-application-with-files.ts`:

```typescript
// Line ~270
await resend.emails.send({
  from: 'Nivaran Applications <noreply@updates.nivaranfoundation.org>',
  to: ['YOUR_HR_EMAIL@nivaranfoundation.org'], // Change this
  subject: `New Application: ${jobTitle} - ${fName} ${lName}`,
  html: adminEmailContent
});
```

### Add More Job Openings
Use the format in `seed-job-openings.sql` to add more positions to the `jobs` table.

### Modify Form Fields
Edit `src/components/new/CareerForm/EnhancedCareerForm.tsx` and update the schema in `jobApplicationSchema.ts`.

## Troubleshooting

### Files Not Uploading
1. Check Supabase storage bucket exists: `job-applications`
2. Verify storage policies are created
3. Check SUPABASE_SERVICE_ROLE_KEY is set correctly
4. Ensure file size is under 10MB

### Emails Not Sending
1. Verify RESEND_API_KEY is set
2. Check domain `updates.nivaranfoundation.org` is verified in Resend
3. Review Resend dashboard for failed sends
4. Check spam folder

### Application Not Saving
1. Check `applications` table exists
2. Verify all required fields are provided
3. Check Supabase logs for errors
4. Ensure SUPABASE_SERVICE_ROLE_KEY has proper permissions

### Resume URL Not Accessible
1. Verify bucket `job-applications` is set to `public: true`
2. Check storage policies allow SELECT
3. Try accessing URL directly in browser
4. Check file was actually uploaded (Supabase Storage dashboard)

## File Structure

```
src/
├── app/
│   ├── actions/
│   │   └── submit-application-with-files.ts  # Server action for file upload
│   └── (main)/
│       └── career/
│           └── [id]/
│               └── c/
│                   └── apply/
│                       └── page.tsx           # Application form page
├── components/
│   └── new/
│       └── CareerForm/
│           ├── EnhancedCareerForm.tsx         # Main application form
│           └── jobApplicationSchema.ts        # Validation schema
└── content/
    └── job-openings.ts                         # Job openings data

Root Files:
├── setup-supabase-storage.sql                  # Storage setup SQL
├── seed-job-openings.sql                       # Job openings seed data
└── JOB-APPLICATION-SETUP.md                    # This file
```

## Testing Checklist

- [ ] Supabase storage bucket created
- [ ] Storage policies applied
- [ ] Database indexes created
- [ ] Job openings seeded
- [ ] Environment variables set
- [ ] Application form loads correctly
- [ ] Position dropdown shows active jobs
- [ ] Location dropdown populated
- [ ] Resume file upload works
- [ ] Cover letter upload works (optional)
- [ ] Form validation works on all steps
- [ ] Can navigate back/forward between steps
- [ ] Progress bar updates correctly
- [ ] Application saves to database
- [ ] Files upload to Supabase Storage
- [ ] Resume URL is accessible
- [ ] Applicant receives confirmation email
- [ ] Admin receives notification email
- [ ] Email contains correct information
- [ ] Links in email work correctly

## Support

For issues or questions:
- Check Supabase logs
- Check Resend dashboard
- Review browser console for errors
- Check Next.js server logs

## Next Steps

1. Run the setup SQL scripts in Supabase
2. Seed the job openings
3. Test the application flow locally
4. Deploy to Vercel
5. Update admin email address
6. Monitor applications in Supabase dashboard

---

**System Status**: ✅ Fully Functional
**Last Updated**: February 2025
**Version**: 1.0
