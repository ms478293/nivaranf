-- Seed high-quality job openings for Nivaran Foundation
-- Run this SQL in your Supabase SQL Editor

-- Clear existing jobs (optional - remove if you want to keep existing jobs)
-- TRUNCATE jobs CASCADE;

-- Insert Job 1: Program Manager - Healthcare Initiatives
INSERT INTO jobs (
  title, type, location, department, apply_before, positions_open, status,
  introduction, responsibilities, requirements, benefits, additional_info
) VALUES (
  'Program Manager - Healthcare Initiatives',
  'Full-time',
  'Kathmandu, Nepal',
  'Programs',
  '2025-03-15',
  2,
  'active',
  'Nivaran Foundation is seeking an experienced Program Manager to lead our healthcare initiatives across Nepal. This role will oversee Project Sanjeevani and coordinate health camp operations, working directly with local communities to deliver life-changing healthcare services.',
  ARRAY[
    'Lead the planning, implementation, and evaluation of healthcare programs including health camps and community clinics',
    'Manage relationships with local partners, healthcare providers, and government agencies',
    'Oversee program budgets, ensuring efficient use of resources and donor funds',
    'Monitor and report on program outcomes, impact metrics, and key performance indicators',
    'Coordinate logistics for health camps including medical supplies, volunteer coordination, and site preparation',
    'Develop and maintain partnerships with hospitals, medical professionals, and pharmaceutical suppliers',
    'Prepare donor reports, grant applications, and program documentation',
    'Train and supervise program staff and volunteers',
    'Ensure compliance with local regulations and organizational policies'
  ],
  ARRAY[
    'Master''s degree in Public Health, Healthcare Management, Development Studies, or related field',
    'Minimum 5 years of experience managing healthcare or development programs in Nepal',
    'Proven track record of delivering large-scale community health programs',
    'Strong knowledge of Nepal''s healthcare system and community health challenges',
    'Excellent project management skills with experience in budgeting and financial reporting',
    'Fluency in English and Nepali (written and spoken)',
    'Strong stakeholder management and relationship-building skills',
    'Experience with donor reporting and grant management',
    'Proficiency in MS Office and project management software',
    'Willingness to travel extensively within Nepal (up to 50% travel)'
  ],
  jsonb_build_object(
    'Competitive Salary', 'NPR 80,000 - 120,000 per month based on experience',
    'Health Insurance', 'Comprehensive medical insurance for employee and immediate family',
    'Professional Development', 'Annual training budget and opportunities for international conferences',
    'Paid Time Off', '20 days annual leave plus public holidays',
    'Transportation', 'Field travel allowance and transportation support',
    'Impact', 'Work directly with communities and see the tangible impact of your efforts'
  ),
  jsonb_build_object(
    'Work Environment', 'Office-based in Kathmandu with regular field visits to project sites across Nepal',
    'Reporting To', 'Director of Programs',
    'Team Size', 'Manage a team of 5-8 program staff and coordinate 30+ volunteers',
    'Start Date', 'April 2025 or as soon as possible'
  )
);

-- Insert Job 2: Fundraising and Development Officer
INSERT INTO jobs (
  title, type, location, department, apply_before, positions_open, status,
  introduction, responsibilities, requirements, benefits, additional_info
) VALUES (
  'Fundraising and Development Officer',
  'Full-time',
  'Arlington, MA, USA',
  'Development',
  '2025-03-01',
  1,
  'active',
  'Join our dynamic team as a Fundraising and Development Officer. You will play a crucial role in securing funding to expand our healthcare and education programs in Nepal. This position requires a passionate individual with proven fundraising experience and strong communication skills.',
  ARRAY[
    'Develop and implement comprehensive fundraising strategies to meet annual revenue goals ($500K+)',
    'Research, identify, and cultivate relationships with individual donors, foundations, and corporate sponsors',
    'Write compelling grant proposals and donor communications',
    'Manage donor database and implement stewardship programs to increase retention',
    'Plan and execute fundraising events and campaigns',
    'Create marketing materials including case statements, impact reports, and donor newsletters',
    'Collaborate with program teams to develop fundable project proposals',
    'Track and report on fundraising metrics and KPIs',
    'Build partnerships with community organizations and professional networks'
  ],
  ARRAY[
    'Bachelor''s degree in Nonprofit Management, Communications, Business, or related field',
    'Minimum 3 years of successful fundraising experience in nonprofit sector',
    'Proven track record of securing grants from foundations and government agencies',
    'Excellent writing skills with experience in grant writing and donor communications',
    'Strong relationship-building and interpersonal skills',
    'Experience with donor management systems (Salesforce, DonorPerfect, or similar)',
    'Knowledge of fundraising best practices and ethical standards',
    'Self-motivated with ability to work independently and meet deadlines',
    'Passion for international development and healthcare equity',
    'Flexibility to work across time zones for coordination with Nepal team'
  ],
  jsonb_build_object(
    'Competitive Salary', '$55,000 - $70,000 annually based on experience',
    'Health Benefits', 'Medical, dental, and vision insurance',
    'Retirement Plan', '401(k) with 3% employer match',
    'Flexible Work', 'Hybrid/remote work options with flexible hours',
    'Professional Development', 'Training opportunities and conference attendance',
    'Paid Time Off', '15 days vacation plus holidays and sick leave',
    'Meaningful Work', 'Direct impact on life-saving healthcare programs in Nepal'
  ),
  jsonb_build_object(
    'Work Location', 'Arlington, MA office with remote work flexibility',
    'Reporting To', 'Executive Director',
    'Team Collaboration', 'Work closely with programs, communications, and finance teams',
    'Travel', 'Potential annual visit to Nepal project sites (all expenses paid)'
  )
);

-- Insert Job 3: Medical Volunteer Coordinator
INSERT INTO jobs (
  title, type, location, department, apply_before, positions_open, status,
  introduction, responsibilities, requirements, benefits, additional_info
) VALUES (
  'Medical Volunteer Coordinator',
  'Full-time',
  'Kathmandu, Nepal',
  'Programs',
  '2025-02-28',
  1,
  'active',
  'We are looking for an organized and compassionate Medical Volunteer Coordinator to manage our growing volunteer program. This role involves recruiting, training, and coordinating medical professionals and volunteers for health camps and community programs across Nepal.',
  ARRAY[
    'Recruit and screen medical professionals and volunteers for health camp participation',
    'Develop and deliver orientation and training programs for new volunteers',
    'Coordinate volunteer schedules and assignments for health camps and programs',
    'Maintain volunteer database and track volunteer hours and contributions',
    'Provide ongoing support and communication to volunteers before, during, and after assignments',
    'Organize volunteer recognition events and appreciation programs',
    'Ensure volunteers comply with organizational policies and safety protocols',
    'Coordinate with program teams to match volunteer skills with program needs',
    'Collect volunteer feedback and implement improvements to volunteer experience'
  ],
  ARRAY[
    'Bachelor''s degree in Healthcare, Social Work, Management, or related field',
    'Minimum 2 years of experience in volunteer management or program coordination',
    'Excellent organizational and time management skills',
    'Strong interpersonal and communication skills in English and Nepali',
    'Experience working with medical professionals preferred',
    'Proficiency in Microsoft Office and database management',
    'Ability to work flexible hours including some weekends',
    'Cultural sensitivity and ability to work with diverse groups',
    'Problem-solving skills and ability to handle challenging situations',
    'Commitment to Nivaran Foundation''s mission and values'
  ],
  jsonb_build_object(
    'Competitive Salary', 'NPR 50,000 - 70,000 per month',
    'Health Insurance', 'Medical coverage for employee',
    'Training Opportunities', 'Access to professional development workshops',
    'Paid Leave', '15 days annual leave plus public holidays',
    'Field Allowance', 'Travel and accommodation covered for field visits',
    'Community Impact', 'Work with inspiring volunteers making a difference'
  ),
  jsonb_build_object(
    'Work Schedule', 'Monday-Friday with occasional weekend events',
    'Office Location', 'Kathmandu with travel to health camp sites',
    'Reporting To', 'Program Manager',
    'Growth Opportunity', 'Potential to advance to senior program roles'
  )
);

-- Insert Job 4: Communications and Social Media Specialist
INSERT INTO jobs (
  title, type, location, department, apply_before, positions_open, status,
  introduction, responsibilities, requirements, benefits, additional_info
) VALUES (
  'Communications and Social Media Specialist',
  'Full-time',
  'Remote',
  'Communications',
  '2025-03-10',
  1,
  'active',
  'Nivaran Foundation seeks a creative Communications and Social Media Specialist to tell our story and engage supporters worldwide. You will create compelling content that showcases our impact, builds our brand, and inspires action.',
  ARRAY[
    'Develop and execute social media strategy across Facebook, Instagram, LinkedIn, and Twitter',
    'Create engaging content including posts, stories, videos, and graphics',
    'Manage organizational website and ensure content is current and impactful',
    'Write blog posts, impact stories, and donor communications',
    'Capture and edit photos and videos from programs and events',
    'Monitor social media analytics and provide monthly performance reports',
    'Engage with followers and respond to comments and messages',
    'Coordinate with program teams to gather stories and impact data',
    'Support fundraising campaigns with compelling marketing materials',
    'Manage email marketing campaigns and newsletters'
  ],
  ARRAY[
    'Bachelor''s degree in Communications, Marketing, Journalism, or related field',
    'Minimum 2 years of experience in social media management and content creation',
    'Excellent writing and storytelling skills',
    'Proficiency in graphic design tools (Canva, Adobe Creative Suite)',
    'Experience with video editing software',
    'Strong photography skills',
    'Knowledge of social media analytics and SEO',
    'Experience with email marketing platforms (Mailchimp, Constant Contact)',
    'Self-motivated and able to work independently in remote environment',
    'Passion for nonprofit work and social impact'
  ],
  jsonb_build_object(
    'Salary Range', '$45,000 - $60,000 USD or NPR equivalent',
    'Remote Work', 'Work from anywhere with flexible hours',
    'Equipment', 'Laptop and necessary equipment provided',
    'Professional Development', 'Budget for online courses and certifications',
    'Creative Freedom', 'Opportunity to shape organizational voice and brand',
    'Time Off', 'Generous PTO policy with paid holidays',
    'Global Team', 'Collaborate with passionate team across continents'
  ),
  jsonb_build_object(
    'Work Hours', 'Flexible hours with some overlap with US Eastern Time',
    'Reporting To', 'Director of Communications',
    'Tools Used', 'Hootsuite, Canva, WordPress, Google Analytics, Mailchimp',
    'Travel', 'Optional annual trip to Nepal for content creation (expenses paid)'
  )
);

-- Insert Job 5: Finance and Operations Associate
INSERT INTO jobs (
  title, type, location, department, apply_before, positions_open, status,
  introduction, responsibilities, requirements, benefits, additional_info
) VALUES (
  'Finance and Operations Associate',
  'Full-time',
  'Kathmandu, Nepal',
  'Finance & Operations',
  '2025-02-25',
  1,
  'active',
  'We are hiring a detail-oriented Finance and Operations Associate to support our financial management and operational efficiency. This role is critical to ensuring transparency, accountability, and compliance with donor requirements.',
  ARRAY[
    'Maintain accurate financial records and process accounts payable/receivable',
    'Prepare monthly financial reports and budget variance analysis',
    'Support annual audit process and ensure compliance with accounting standards',
    'Process employee reimbursements and vendor payments',
    'Maintain grant tracking systems and prepare financial reports for donors',
    'Assist with budget preparation and monitoring',
    'Manage office operations including supplies, equipment, and facilities',
    'Coordinate with banks and process international wire transfers',
    'Support HR functions including payroll processing and benefits administration',
    'Maintain filing systems and organizational records'
  ],
  ARRAY[
    'Bachelor''s or Master''s degree in Finance, Accounting, or Business Administration',
    'Minimum 2-3 years of experience in finance or accounting, preferably in nonprofit sector',
    'Strong knowledge of accounting principles and financial reporting',
    'Proficiency in accounting software (QuickBooks, Tally) and MS Excel',
    'Experience with grant financial management preferred',
    'Excellent attention to detail and accuracy',
    'Strong organizational and time management skills',
    'Fluency in English and Nepali',
    'High integrity and ability to handle confidential information',
    'Knowledge of Nepal tax laws and compliance requirements'
  ],
  jsonb_build_object(
    'Competitive Salary', 'NPR 60,000 - 85,000 per month',
    'Health Insurance', 'Comprehensive medical coverage',
    'Professional Certification', 'Support for CA/CPA/ACCA certification',
    'Annual Bonus', 'Performance-based annual bonus',
    'Festival Allowance', 'Dashain/Tihar bonus',
    'Leave Benefits', '18 days annual leave plus public holidays',
    'Career Growth', 'Clear path to senior finance roles'
  ),
  jsonb_build_object(
    'Office Location', 'Kathmandu office (Monday-Friday)',
    'Reporting To', 'Finance Director',
    'Software Training', 'Training provided on organizational systems',
    'Team Size', 'Finance team of 3 people'
  )
);

-- Verify jobs were inserted
SELECT id, title, location, status, positions_open FROM jobs WHERE status = 'active';
