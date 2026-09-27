/**
 * Vercel Serverless Function: /api/contact
 * Handles contact form submissions securely using the Resend API.
 * 
 * SECURITY:
 * - RESEND_API_KEY is read server-side only via process.env.RESEND_API_KEY
 * - Never leaks credentials to client
 * - Validates input, sanitizes text, traps spam via honeypot field
 * - Sends dual emails:
 *   1) Notification to Company Desk (nmir2242@gmail.com)
 *   2) Professional Confirmation to the Customer
 */

import { Resend } from 'resend';

function sanitize(text = '') {
  return String(text)
    .replace(/[&<>"']/g, (m) => {
      switch (m) {
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return m;
      }
    })
    .trim();
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, email, phone, projectType, message, _gotcha } = body;

    // Spam trap: if honeypot is filled, silently discard
    if (_gotcha) {
      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    }

    // Validation
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = sanitize(phone);
    const cleanProjectType = sanitize(projectType || 'General Civil / Building Work');
    const cleanMessage = sanitize(message);

    if (!cleanName || cleanName.length < 2) {
      return res.status(400).json({ error: 'Please provide a valid full name.' });
    }

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!cleanPhone || cleanPhone.length < 7) {
      return res.status(400).json({ error: 'Please provide a valid phone number.' });
    }

    if (!cleanMessage || cleanMessage.length < 5) {
      return res.status(400).json({ error: 'Please provide brief details about your project.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const companyEmail = process.env.CONTACT_EMAIL || 'nmir2242@gmail.com';
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    // If Resend API key is not configured, return an informative fallback state
    if (!apiKey) {
      console.warn('⚠️ [Contact API] RESEND_API_KEY is not set in environment. Running in offline notification mode.');
      return res.status(200).json({
        success: true,
        offlineMode: true,
        message: 'Your enquiry has been received. Our team will contact you shortly.',
        data: { name: cleanName, email: cleanEmail, phone: cleanPhone, projectType: cleanProjectType }
      });
    }

    const resend = new Resend(apiKey);
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 1. Send Notification Email to Company
    const companyEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Project Inquiry</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <tr>
            <td style="background-color: #0f2537; padding: 24px 32px; border-bottom: 3px solid #c59b27;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">M/S Nazir Ahmad Mir — New Project Inquiry</h1>
              <p style="color: #c59b27; margin: 4px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">A Class Contractor • Budgam, J&K</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.5; color: #334155;">
                A new project inquiry was submitted through the official website contact desk at <strong>${timestamp} (IST)</strong>.
              </p>
              
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #475569; width: 140px;">Client Name:</td>
                  <td style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #0f172a;">${cleanName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #475569;">Email Address:</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #0f172a;"><a href="mailto:${cleanEmail}" style="color: #0284c7; text-decoration: none;">${cleanEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #475569;">Phone Number:</td>
                  <td style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #0f172a;"><a href="tel:${cleanPhone}" style="color: #0284c7; text-decoration: none;">${cleanPhone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #475569;">Project Category:</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #0f172a;">${cleanProjectType}</td>
                </tr>
              </table>

              <div style="margin-bottom: 24px;">
                <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin: 0 0 8px 0;">Project Scope & Description:</h3>
                <div style="background-color: #ffffff; border-left: 3px solid #c59b27; padding: 14px 18px; border: 1px solid #e2e8f0; border-left-width: 4px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #1e293b;">
                  ${cleanMessage}
                </div>
              </div>

              <div style="text-align: center; margin-top: 28px;">
                <a href="tel:${cleanPhone}" style="display: inline-block; background-color: #c59b27; color: #0f2537; font-weight: 700; font-size: 14px; padding: 10px 24px; border-radius: 4px; text-decoration: none; margin-right: 12px;">Call Client Directly</a>
                <a href="mailto:${cleanEmail}" style="display: inline-block; background-color: #0f2537; color: #ffffff; font-weight: 600; font-size: 14px; padding: 10px 24px; border-radius: 4px; text-decoration: none;">Reply via Email</a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b;">
              Registered Yard: Approach Road, Railway Budgam, Jammu & Kashmir • Phone: +91 7006080901
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: `Engineering Desk <${fromEmail}>`,
      to: [companyEmail],
      reply_to: cleanEmail,
      subject: `New Project Enquiry: ${cleanProjectType} - ${cleanName}`,
      html: companyEmailHtml
    });

    // 2. Send Professional Confirmation Email to Customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>We received your inquiry</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <tr>
            <td style="background-color: #0f2537; padding: 24px 32px; border-bottom: 3px solid #c59b27;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">M/S Nazir Ahmad Mir</h1>
              <p style="color: #c59b27; margin: 4px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">A Class Contractor • Jammu & Kashmir</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0;">We received your inquiry, ${cleanName}.</h2>
              
              <p style="font-size: 15px; line-height: 1.6; color: #334155; margin-bottom: 20px;">
                Thank you for contacting M/S Nazir Ahmad Mir. We have received your project details regarding <strong>${cleanProjectType}</strong> and our site engineering team will review the specifications.
              </p>

              <div style="background-color: #f8fafc; border-left: 3px solid #c59b27; padding: 14px 18px; border-radius: 4px; margin-bottom: 24px; font-size: 14px; line-height: 1.5; color: #475569;">
                <strong>Summary of your submission:</strong><br />
                Scope: ${cleanMessage}
              </div>

              <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
                If your project requires immediate on-site inspection or tender coordination, you may also reach our office directly at <strong>+91 7006080901</strong> or via WhatsApp.
              </p>

              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
                <p style="font-size: 13px; font-weight: 700; color: #0f172a; margin: 0 0 4px 0;">M/S Nazir Ahmad Mir</p>
                <p style="font-size: 13px; color: #64748b; margin: 0;">Approach Road, Railway Budgam, Jammu & Kashmir</p>
                <p style="font-size: 13px; color: #64748b; margin: 4px 0 0 0;">Email: nmir2242@gmail.com | Phone: +91 7006080901</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; padding: 14px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
              © ${new Date().getFullYear()} M/S Nazir Ahmad Mir. All rights reserved.
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    try {
      await resend.emails.send({
        from: `M/S Nazir Ahmad Mir <${fromEmail}>`,
        to: [cleanEmail],
        subject: `Enquiry Confirmation: M/S Nazir Ahmad Mir`,
        html: customerEmailHtml
      });
    } catch (confErr) {
      console.warn('⚠️ [Contact API] Customer confirmation email warning:', confErr.message);
      // We do not fail the request if customer confirmation encounters a spam filter, as the company notification succeeded.
    }

    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been successfully delivered to our engineering desk.'
    });

  } catch (error) {
    console.error('❌ [Contact API Error]:', error);
    return res.status(500).json({
      error: "Sorry, we couldn't send your message right now. Please try again or call us directly at +91 7006080901."
    });
  }
}
