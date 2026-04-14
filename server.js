import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Resend } from 'resend';

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyDWyY1e0bzPbmfkL9vvqaZOkJ1MO5uC_Lc");

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: "You are the automated AI Estimator for Charles Grey Construction, a premium Louisiana general contractor. Your goal is to gather project details and provide a high-level summary. Always maintain a professional, high-end, architectural tone. Keep responses extremely concise (1-2 short paragraphs). At the very end of the conversation, once they have provided their project details, ALWAYS prompt them to provide their name and phone number so a real human estimator can contact them with the final quote. Do not ask for all details at once, be conversational."
});

app.post('/api/chat', async (req, res) => {
  try {
    const { history, message } = req.body;
    
    // Remove the initial AI greeting because Gemini SDK strictly requires history to begin with 'user'
    const actualHistory = history.slice(1);
    
    // Format history for Gemini SDK
    const formattedHistory = actualHistory.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);
    const text = result.response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ error: 'Failed to communicate with AI Estimator.' });
  }
});

// ─── Send Contact Email ────────────────────────────────────────────────────
app.post('/api/send-contact', async (req, res) => {
  const { name, email, phone, projectType, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Charles Grey Construction <hello@charlesgreyconstruction.com>',
      to: ['admin@charlesgreyconstruction.com'],
      reply_to: email,
      subject: `New Contact Form Submission – ${projectType || 'General Inquiry'} from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
             <p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({ error: 'Failed to send email.' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Send Contact Error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Secure Gemini Proxy running on port ${PORT}`));
