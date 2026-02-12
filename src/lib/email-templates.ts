export const emailStyles = `
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 0 auto; padding: 0; border: 1px solid #eee; border-radius: 8px; overflow: hidden; }
  .header { background-color: #f8f9fa; padding: 25px; text-align: center; border-bottom: 3px solid #EB5934; }
  .logo { max-height: 50px; }
  .hero { background-color: #EB5934; color: white; padding: 30px 20px; text-align: center; }
  .hero h1 { margin: 0; font-size: 24px; font-weight: 600; }
  .content { padding: 30px 25px; background-color: #ffffff; }
  .footer { background-color: #f8f9fa; font-size: 12px; color: #666; text-align: center; padding: 20px; border-top: 1px solid #eee; }
  .button { display: inline-block; padding: 12px 24px; background-color: #EB5934; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: 500; margin-top: 20px; }
  .info-box { background-color: #f0f7ff; border-left: 4px solid #0066cc; padding: 15px; margin: 20px 0; border-radius: 4px; }
  h2 { color: #1a1a1a; font-size: 20px; margin-top: 0; }
  p { margin-bottom: 15px; }
  .social-links { margin-top: 15px; }
  .social-link { margin: 0 5px; color: #666; text-decoration: none; }
`;

const baseTemplate = (title: string, content: string, showHero: boolean = false) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${emailStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://nivaranfoundation.org/logo.png" alt="Nivaran Foundation" class="logo">
    </div>
    ${showHero ? `<div class="hero"><h1>${title}</h1></div>` : ''}
    <div class="content">
      ${!showHero ? `<h2>${title}</h2>` : ''}
      ${content}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Nivaran Foundation. All rights reserved.</p>
      <p>501(c)(3) Nonprofit Organization | EIN: 41-2656587</p>
      <p>1025 Massachusetts Ave, Suite 303, Arlington, MA 02476, USA</p>
      <div class="social-links">
        <a href="https://nivaranfoundation.org" class="social-link">Website</a> |
        <a href="https://nivaranfoundation.org/contact" class="social-link">Contact Us</a>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const getEmailTemplate = (title: string, content: string) => baseTemplate(title, content, false);

export const getSubscriptionTemplate = (content: string) => baseTemplate('Welcome to the Community!', content, true);

export const getContactTemplate = (content: string) => baseTemplate('We Received Your Message', content, true);

export const getJobApplicationTemplate = (role: string, content: string) => baseTemplate(`Application: ${role}`, content, true);

export const getVolunteerApplicationTemplate = (content: string) => baseTemplate('Volunteer Application Received', content, true);
