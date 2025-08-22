import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Optional SMTP transporter (enabled only if env vars are present)
let transporter = null;
const {
  SMTP_SERVICE,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SECURE,
  EMAIL_FROM,
} = process.env;

if ((SMTP_SERVICE || (SMTP_HOST && SMTP_PORT)) && SMTP_USER && SMTP_PASS) {
  if (SMTP_SERVICE) {
    transporter = nodemailer.createTransport({
      service: SMTP_SERVICE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: typeof SMTP_SECURE !== 'undefined' ? SMTP_SECURE === 'true' : Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  // Verify transporter on startup for easier troubleshooting
  transporter.verify().then(() => {
    console.log('[SMTP] Transporter verified. Ready to send emails.');
  }).catch((err) => {
    console.error('[SMTP] Transporter verification failed:', err?.message || err);
  });
}

// Shared handler to send an email or log to console in dev
async function sendMessage({ subject, text, html }) {
  const to = process.env.EMAIL_TO || 'info@auto-diesel.co.uk';
  const from = EMAIL_FROM || SMTP_USER || 'no-reply@auto-diesel.local';
  if (!transporter) {
    console.log('\n[DEV] Email payload (no SMTP configured):');
    console.log({ to, subject, text, html });
    return { delivered: false, dev: true, error: 'SMTP not configured' };
  }
  try {
    const info = await transporter.sendMail({ from, to, subject, text, html, replyTo: to });
    return { delivered: true, id: info.messageId };
  } catch (err) {
    console.error('[SMTP] sendMail error:', err?.response || err?.message || err);
    return { delivered: false, error: err?.message || 'Unknown SMTP error' };
  }
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development' });
});

// Non-booking contact endpoint — general enquiry
app.post('/api/contact', async (req, res) => {
  try {
    const { name = 'Anonymous', email = 'n/a', phone = 'n/a', message = '' } = req.body || {};
    const subject = `New website enquiry from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
    const html = `
<h3>New Enquiry</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Message:</strong></p>
<pre style="white-space:pre-wrap">${message}</pre>
`;
    const result = await sendMessage({ subject, text, html });
    res.json({ ok: !!result.delivered, ...result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Failed to submit message' });
  }
});

// Callback request endpoint — alternative to bookings
app.post('/api/callback', async (req, res) => {
  try {
    const { name = 'Anonymous', phone = 'n/a', preferredTime = 'Anytime' } = req.body || {};
    const subject = `Callback requested by ${name}`;
    const text = `Please call back ${name} at ${phone}. Preferred time: ${preferredTime}.`;
    const html = `
<h3>Callback Request</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Preferred time:</strong> ${preferredTime}</p>
`;
    const result = await sendMessage({ subject, text, html });
    res.json({ ok: !!result.delivered, ...result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Failed to request callback' });
  }
});

// Simple computed WhatsApp deep-link (non-booking)
app.get('/api/whatsapp-link', (req, res) => {
  // UK number from the Contact page. Change to actual WhatsApp-enabled line if different.
  const rawPhone = '01912760826';
  const intl = '+441912760826';
  const msg = encodeURIComponent('Hello Auto Diesel — I have an enquiry.');
  res.json({ link: `https://wa.me/${intl.replace('+', '')}?text=${msg}`, tel: `tel:${rawPhone}` });
});

// Diagnostic endpoint to test email delivery
app.post('/api/test-email', async (req, res) => {
  try {
    const subject = 'Test email from Auto Diesel server';
    const text = 'This is a test email. If you see this, SMTP is working.';
    const html = '<p>This is a <strong>test email</strong>. If you see this, SMTP is working.</p>';
    const result = await sendMessage({ subject, text, html });
    res.json({ ok: !!result.delivered, ...result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err?.message || 'Unknown error' });
  }
});

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));