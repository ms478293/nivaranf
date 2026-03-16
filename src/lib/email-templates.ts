const SITE_URL = "https://www.nivaranfoundation.org";
const LOGO_URL = `${SITE_URL}/logo.png`;
const PRIMARY = "#EB5934";
const PRIMARY_DARK = "#D14A2B";
const TEXT_DARK = "#1f2937";
const TEXT_MUTED = "#6b7280";
const BG_LIGHT = "#f9fafb";
const BORDER = "#e5e7eb";
const YEAR = new Date().getFullYear();

function baseTemplate({
  preheader,
  heroTitle,
  heroSubtitle,
  body,
  ctaText,
  ctaUrl,
  showDonate = false,
}: {
  preheader: string;
  heroTitle: string;
  heroSubtitle?: string;
  body: string;
  ctaText?: string;
  ctaUrl?: string;
  showDonate?: boolean;
}) {
  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${heroTitle}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    @media (prefers-color-scheme: dark) {
      .dark-bg { background-color: #1a1a2e !important; }
      .dark-text { color: #e5e7eb !important; }
    }
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content-padding { padding: 24px 20px !important; }
      .hero-padding { padding: 32px 20px !important; }
      .stack { display: block !important; width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <!-- Preheader -->
  <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #f3f4f6;">${preheader}</div>

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 32px 16px;">

        <!-- Container -->
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">

          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding: 24px 32px; border-bottom: 1px solid ${BORDER};">
              <img src="${LOGO_URL}" alt="Nivaran Foundation" width="140" height="56" style="display: block; max-width: 140px; height: auto;">
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td class="hero-padding" align="center" style="background: linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%); padding: 40px 32px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; line-height: 1.3;">${heroTitle}</h1>
              ${heroSubtitle ? `<p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 15px; line-height: 1.5;">${heroSubtitle}</p>` : ""}
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td class="content-padding" style="padding: 32px;">
              ${body}
            </td>
          </tr>

          <!-- CTA Button -->
          ${ctaText && ctaUrl ? `
          <tr>
            <td align="center" style="padding: 0 32px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color: ${PRIMARY}; border-radius: 8px;">
                    <a href="${ctaUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; letter-spacing: 0.3px;">${ctaText}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>` : ""}

          <!-- Donate Banner -->
          ${showDonate ? `
          <tr>
            <td style="padding: 0 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef4ee; border: 1px solid #fde5d7; border-radius: 10px;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0 0 8px; color: ${TEXT_DARK}; font-size: 15px; font-weight: 600;">Support Our Mission</p>
                    <p style="margin: 0 0 16px; color: ${TEXT_MUTED}; font-size: 13px;">96% of every dollar goes directly to healthcare and education programs in Nepal.</p>
                    <a href="${SITE_URL}/donate" target="_blank" style="display: inline-block; padding: 10px 24px; background-color: ${PRIMARY}; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px;">Donate Now</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>` : ""}

          <!-- Divider -->
          <tr>
            <td style="padding: 0 32px;">
              <div style="border-top: 1px solid ${BORDER};"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; text-align: center;">
              <p style="margin: 0 0 8px; color: ${TEXT_MUTED}; font-size: 12px; line-height: 1.6;">
                &copy; ${YEAR} Nivaran Foundation. All rights reserved.
              </p>
              <p style="margin: 0 0 8px; color: ${TEXT_MUTED}; font-size: 12px; line-height: 1.6;">
                501(c)(3) Nonprofit &bull; EIN: 41-2656587
              </p>
              <p style="margin: 0 0 16px; color: ${TEXT_MUTED}; font-size: 12px; line-height: 1.6;">
                1025 Massachusetts Ave, Suite 303, Arlington, MA 02476
              </p>
              <table role="presentation" align="center" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 0 8px;"><a href="${SITE_URL}" style="color: ${PRIMARY}; font-size: 12px; text-decoration: none;">Website</a></td>
                  <td style="color: ${BORDER};">|</td>
                  <td style="padding: 0 8px;"><a href="${SITE_URL}/about" style="color: ${PRIMARY}; font-size: 12px; text-decoration: none;">About</a></td>
                  <td style="color: ${BORDER};">|</td>
                  <td style="padding: 0 8px;"><a href="${SITE_URL}/contact-us" style="color: ${PRIMARY}; font-size: 12px; text-decoration: none;">Contact</a></td>
                  <td style="color: ${BORDER};">|</td>
                  <td style="padding: 0 8px;"><a href="${SITE_URL}/donate" style="color: ${PRIMARY}; font-size: 12px; text-decoration: none;">Donate</a></td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /Container -->

      </td>
    </tr>
  </table>
</body>
</html>`;
}

function infoBox(content: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
    <tr>
      <td style="background-color: #f0f7ff; border-left: 4px solid #3b82f6; padding: 16px 20px; border-radius: 0 8px 8px 0;">
        ${content}
      </td>
    </tr>
  </table>`;
}

function paragraph(text: string) {
  return `<p style="margin: 0 0 16px; color: ${TEXT_DARK}; font-size: 15px; line-height: 1.7;">${text}</p>`;
}

function greeting(name: string) {
  return paragraph(`Dear ${name},`);
}

function signoff() {
  return `<p style="margin: 24px 0 0; color: ${TEXT_DARK}; font-size: 15px; line-height: 1.7;">
    Warm regards,<br>
    <strong style="color: ${PRIMARY};">Nivaran Foundation Team</strong>
  </p>`;
}

// ── Public API ──────────────────────────────────────────────

export function getContactTemplate(userContent: string) {
  return baseTemplate({
    preheader: "We received your message and will respond within 2-3 business days.",
    heroTitle: "We Received Your Message",
    heroSubtitle: "Our team will get back to you soon.",
    body: userContent,
    ctaText: "Visit Our Website",
    ctaUrl: SITE_URL,
    showDonate: true,
  });
}

export function getSubscriptionTemplate(userContent: string) {
  return baseTemplate({
    preheader: "Welcome to the Nivaran Foundation community! Here's what to expect.",
    heroTitle: "Welcome to the Community!",
    heroSubtitle: "Thank you for joining thousands who care about healthcare access.",
    body: userContent,
    ctaText: "Explore Our Programs",
    ctaUrl: `${SITE_URL}/programs`,
    showDonate: true,
  });
}

export function getJobApplicationTemplate(role: string, userContent: string) {
  return baseTemplate({
    preheader: `Your application for ${role} has been received. We'll review it shortly.`,
    heroTitle: `Application Received`,
    heroSubtitle: role,
    body: userContent,
    ctaText: "View Open Positions",
    ctaUrl: `${SITE_URL}/career`,
  });
}

export function getVolunteerApplicationTemplate(userContent: string) {
  return baseTemplate({
    preheader: "Your volunteer application is being reviewed. We'll be in touch soon.",
    heroTitle: "Volunteer Application Received",
    heroSubtitle: "Thank you for offering your time and skills.",
    body: userContent,
    ctaText: "Explore Volunteer Opportunities",
    ctaUrl: `${SITE_URL}/volunteer`,
    showDonate: false,
  });
}

export function getDonationThankYouTemplate(name: string, amount: string) {
  return baseTemplate({
    preheader: `Thank you for your generous ${amount} donation to Nivaran Foundation.`,
    heroTitle: "Thank You for Your Generosity!",
    heroSubtitle: `Your ${amount} donation is making a real difference.`,
    body: `
      ${greeting(name)}
      ${paragraph("Your donation has been received and will go directly to funding healthcare and education programs in Nepal's most underserved communities.")}
      ${infoBox(`
        <p style="margin: 0 0 4px; color: ${TEXT_DARK}; font-size: 14px;"><strong>Donation Amount:</strong> ${amount}</p>
        <p style="margin: 0 0 4px; color: ${TEXT_DARK}; font-size: 14px;"><strong>Tax Receipt:</strong> Available upon request</p>
        <p style="margin: 0; color: ${TEXT_DARK}; font-size: 14px;"><strong>EIN:</strong> 41-2656587</p>
      `)}
      ${paragraph("Here's what your gift supports:")}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 20px;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid ${BORDER};">
            <span style="color: ${PRIMARY}; font-weight: 700; font-size: 18px;">70%</span>
            <span style="color: ${TEXT_MUTED}; font-size: 14px; margin-left: 8px;">Healthcare Programs</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid ${BORDER};">
            <span style="color: #FCAC2B; font-weight: 700; font-size: 18px;">15%</span>
            <span style="color: ${TEXT_MUTED}; font-size: 14px; margin-left: 8px;">Education Programs</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0;">
            <span style="color: ${TEXT_MUTED}; font-weight: 700; font-size: 18px;">15%</span>
            <span style="color: ${TEXT_MUTED}; font-size: 14px; margin-left: 8px;">Operations & Fundraising</span>
          </td>
        </tr>
      </table>
      ${paragraph("Your contribution is 100% tax-deductible to the extent allowed by law.")}
      ${signoff()}
    `,
    ctaText: "See Your Impact",
    ctaUrl: `${SITE_URL}/impact-fact-sheet`,
  });
}

export function getContactAcknowledgment(name: string, subject: string, message: string) {
  return getContactTemplate(`
    ${greeting(name)}
    ${paragraph(`Thank you for reaching out to Nivaran Foundation. We have received your message regarding "<strong>${subject || "Inquiry"}</strong>".`)}
    ${infoBox(`
      <p style="margin: 0 0 4px; color: ${TEXT_DARK}; font-size: 14px;"><strong>Your Message:</strong></p>
      <p style="margin: 0; color: ${TEXT_MUTED}; font-size: 14px; font-style: italic;">"${message}"</p>
    `)}
    ${paragraph("Our team will review your inquiry and get back to you within <strong>2-3 business days</strong>.")}
    ${signoff()}
  `);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getSubscriptionWelcome(_email: string) {
  return getSubscriptionTemplate(`
    ${paragraph("Thank you for subscribing to the Nivaran Foundation newsletter!")}
    ${paragraph("You are now part of a community dedicated to making a positive impact in Nepal's most underserved communities.")}
    ${infoBox(`
      <p style="margin: 0 0 8px; color: ${TEXT_DARK}; font-size: 14px; font-weight: 600;">What to expect:</p>
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr><td style="padding: 4px 0; color: ${TEXT_DARK}; font-size: 14px;">✓ Updates on our healthcare initiatives</td></tr>
        <tr><td style="padding: 4px 0; color: ${TEXT_DARK}; font-size: 14px;">✓ Stories of impact from Nepal</td></tr>
        <tr><td style="padding: 4px 0; color: ${TEXT_DARK}; font-size: 14px;">✓ Opportunities to volunteer or donate</td></tr>
      </table>
    `)}
    ${paragraph("If you did not sign up for this newsletter, you can safely ignore this email.")}
    ${signoff()}
  `);
}

export function getVolunteerAcknowledgment(name: string, programName: string, motivation: string) {
  return getVolunteerApplicationTemplate(`
    ${greeting(name)}
    ${paragraph("Thank you for your interest in volunteering with Nivaran Foundation. We are thrilled to see your enthusiasm for making a difference.")}
    ${infoBox(`
      <p style="margin: 0 0 4px; color: ${TEXT_DARK}; font-size: 14px;"><strong>Program:</strong> ${programName}</p>
      <p style="margin: 8px 0 0; color: ${TEXT_DARK}; font-size: 14px;"><strong>Your Motivation:</strong></p>
      <p style="margin: 4px 0 0; color: ${TEXT_MUTED}; font-size: 14px; font-style: italic;">"${motivation}"</p>
    `)}
    ${paragraph("We have received your application and will review it shortly. Our volunteer coordinator will reach out to you with more information.")}
    ${signoff()}
  `);
}

export function getCSRAcknowledgment(name: string, company: string, focusAreas: string, timeline: string, objective: string) {
  return getContactTemplate(`
    ${greeting(name)}
    ${paragraph("Thank you for submitting your CSR partnership interest with Nivaran Foundation.")}
    ${infoBox(`
      <p style="margin: 0 0 4px; color: ${TEXT_DARK}; font-size: 14px;"><strong>Company:</strong> ${company}</p>
      <p style="margin: 0 0 4px; color: ${TEXT_DARK}; font-size: 14px;"><strong>Focus Areas:</strong> ${focusAreas}</p>
      <p style="margin: 0; color: ${TEXT_DARK}; font-size: 14px;"><strong>Timeline:</strong> ${timeline}</p>
    `)}
    ${paragraph(`We received your objective:`)}
    <p style="margin: 0 0 16px; color: ${TEXT_MUTED}; font-size: 15px; line-height: 1.7; font-style: italic; padding-left: 16px; border-left: 3px solid ${BORDER};">"${objective}"</p>
    ${paragraph("Our partnerships team will review your submission and contact you within <strong>2-3 business days</strong> with next-step options.")}
    ${signoff()}
  `);
}

export function getAdminNotification(title: string, fields: { label: string; value: string }[], messageBody?: string) {
  const fieldRows = fields
    .map(
      (f) =>
        `<tr>
          <td style="padding: 6px 12px; color: ${TEXT_MUTED}; font-size: 13px; white-space: nowrap; vertical-align: top;">${f.label}</td>
          <td style="padding: 6px 12px; color: ${TEXT_DARK}; font-size: 14px; font-weight: 500;">${f.value}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 16px; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" style="max-width: 600px; margin: 0 auto;">
    <tr>
      <td style="background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
        <table role="presentation" width="100%">
          <tr>
            <td style="background-color: #0f172a; padding: 16px 24px;">
              <h2 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600;">${title}</h2>
              <p style="margin: 4px 0 0; color: rgba(255,255,255,0.6); font-size: 12px;">${new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid ${BORDER}; border-radius: 8px; overflow: hidden;">
                ${fieldRows}
              </table>
              ${messageBody ? `
              <div style="margin-top: 16px; padding: 16px; background: ${BG_LIGHT}; border-radius: 8px; border: 1px solid ${BORDER};">
                <p style="margin: 0 0 4px; color: ${TEXT_MUTED}; font-size: 12px; font-weight: 600; text-transform: uppercase;">Message</p>
                <p style="margin: 0; color: ${TEXT_DARK}; font-size: 14px; white-space: pre-wrap; line-height: 1.6;">${messageBody}</p>
              </div>` : ""}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Legacy exports (backward-compatible)
export const getEmailTemplate = (title: string, content: string) =>
  baseTemplate({ preheader: title, heroTitle: title, body: content });

export const emailStyles = "";
