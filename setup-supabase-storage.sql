-- Create storage bucket for job applications
INSERT INTO storage.buckets (id, name, public)
VALUES ('job-applications', 'job-applications', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for job-applications bucket

-- Allow public to read files (so admins can view resumes/cover letters)
CREATE POLICY "Public Access to view job application files"
ON storage.objects FOR SELECT
USING (bucket_id = 'job-applications');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload job application files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'job-applications' AND auth.role() = 'authenticated');

-- Allow service role to delete files (for cleanup)
CREATE POLICY "Service role can delete job application files"
ON storage.objects FOR DELETE
USING (bucket_id = 'job-applications' AND auth.role() = 'service_role');

-- Optional: Update applications table to better support file URLs
-- This ensures the resume_url and cover_letter columns can store longer URLs
ALTER TABLE applications
ALTER COLUMN resume_url TYPE TEXT;

-- Add index for faster queries on job applications
CREATE INDEX IF NOT EXISTS idx_applications_job_type
ON applications(type, related_id)
WHERE type = 'job';

-- Add index for status queries
CREATE INDEX IF NOT EXISTS idx_applications_status
ON applications(status, created_at DESC);
