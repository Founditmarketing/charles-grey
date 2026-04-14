import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, projectType, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Simple email format guard
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Charles Grey Construction <hello@charlesgreyconstruction.com>',
      to: ['admin@charlesgreyconstruction.com'],
      reply_to: email,
      subject: `New Contact Form Submission – ${projectType || 'General Inquiry'} from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #0a0a0a; color: #e0d6c8; margin: 0; padding: 0; }
              .wrapper { max-width: 600px; margin: 40px auto; background: #111; border: 1px solid #2a2a2a; border-radius: 8px; overflow: hidden; }
              .header { background: linear-gradient(135deg, #1a1a1a 0%, #111 100%); padding: 32px 40px; border-bottom: 1px solid #2a2a2a; }
              .header h1 { margin: 0; font-size: 22px; font-weight: 600; color: #e0d6c8; letter-spacing: 0.02em; }
              .header span { font-size: 13px; color: #a6845c; letter-spacing: 0.08em; text-transform: uppercase; }
              .body { padding: 32px 40px; }
              .field { margin-bottom: 20px; }
              .field label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #a6845c; margin-bottom: 6px; }
              .field p { margin: 0; font-size: 15px; color: #e0d6c8; line-height: 1.5; }
              .divider { border: none; border-top: 1px solid #2a2a2a; margin: 24px 0; }
              .footer { padding: 20px 40px; background: #0a0a0a; font-size: 12px; color: #555; text-align: center; border-top: 1px solid #1a1a1a; }
              .badge { display: inline-block; background: #a6845c22; color: #a6845c; border: 1px solid #a6845c44; border-radius: 4px; padding: 3px 10px; font-size: 12px; margin-bottom: 24px; }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="header">
                <span>New Inquiry</span>
                <h1>Charles Grey Construction</h1>
              </div>
              <div class="body">
                <div class="badge">${projectType || 'General Inquiry'}</div>
                <div class="field">
                  <label>Full Name</label>
                  <p>${name}</p>
                </div>
                <div class="field">
                  <label>Email Address</label>
                  <p><a href="mailto:${email}" style="color:#a6845c;text-decoration:none;">${email}</a></p>
                </div>
                ${phone ? `
                <div class="field">
                  <label>Phone Number</label>
                  <p><a href="tel:${phone}" style="color:#a6845c;text-decoration:none;">${phone}</a></p>
                </div>` : ''}
                <hr class="divider" />
                <div class="field">
                  <label>Message</label>
                  <p>${message.replace(/\n/g, '<br />')}</p>
                </div>
              </div>
              <div class="footer">
                This message was submitted via the contact form at charlesgreyconstruction.com.<br />
                Reply directly to this email to respond to ${name}.
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Send Contact Error:', err);
    return res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
}
