/**
 * Vercel Serverless Function: /api/newsletter
 * Handles newsletter subscription requests via Resend.
 * 
 * SECURITY:
 * - RESEND_API_KEY is read server-side only via process.env.RESEND_API_KEY
 * - Traps spam via honeypot
 * - Validates email format
 * - Sends a clean welcome email to the subscriber and notifies the company
 */

import { Resend } from 'resend';

function sanitize(text = '') {
  return String(text).replace(/[&<>"']/g, '').trim();
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { email, _gotcha } = body;

    // Spam trap
    if (_gotcha) {
      return res.status(200).json({ success: true, message: "You're subscribed." });
    }

    const cleanEmail = sanitize(email);
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const companyEmail = process.env.CONTACT_EMAIL || 'nmir2242@gmail.com';
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    if (!apiKey) {
      console.warn('⚠️ [Newsletter API] RESEND_API_KEY is not set in environment. Running in offline mode.');
      return res.status(200).json({
        success: true,
        offlineMode: true,
        message: "You're subscribed to project updates."
      });
    }

    const resend = new Resend(apiKey);

    // 1. Send Welcome Email to Subscriber
    const welcomeHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden;">
          <tr>
            <td style="background-color: #0f2537; padding: 24px 32px; border-bottom: 3px solid #c59b27;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">M/S Nazir Ahmad Mir</h1>
              <p style="color: #c59b27; margin: 4px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase;">A Class Contractor • Jammu & Kashmir</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-top: 0;">Subscription Confirmed</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #334155;">
                You are now subscribed to receive occasional updates about our regional civil construction, water pipeline schemes, and institutional building works across Jammu & Kashmir.
              </p>
              <div style="background-color: #f1f5f9; padding: 14px 18px; border-radius: 4px; margin: 20px 0; font-size: 13px; color: #475569;">
                Subscribed email: <strong>${cleanEmail}</strong>
              </div>
              <p style="font-size: 13px; color: #64748b;">
                You can reach out directly at any time at <a href="mailto:nmir2242@gmail.com" style="color: #0284c7;">nmir2242@gmail.com</a> or +91 7006080901.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; padding: 14px 32px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
              Approach Road, Railway Budgam, Jammu & Kashmir
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: `M/S Nazir Ahmad Mir <${fromEmail}>`,
      to: [cleanEmail],
      subject: `Subscribed: M/S Nazir Ahmad Mir Construction Updates`,
      html: welcomeHtml
    });

    // 2. Notify company of new subscriber
    try {
      await resend.emails.send({
        from: `Website Newsletter <${fromEmail}>`,
        to: [companyEmail],
        subject: `New Newsletter Subscriber: ${cleanEmail}`,
        html: `<p>A new visitor has subscribed to project updates: <strong>${cleanEmail}</strong></p>`
      });
    } catch (e) {
      // Non-blocking
    }

    return res.status(200).json({
      success: true,
      message: "You're subscribed."
    });

  } catch (error) {
    console.error('❌ [Newsletter API Error]:', error);
    return res.status(500).json({
      error: "Sorry, we couldn't complete your subscription right now. Please try again later."
    });
  }
}
