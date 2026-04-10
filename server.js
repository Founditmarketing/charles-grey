import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

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

const PORT = 3001;
app.listen(PORT, () => console.log(`Secure Gemini Proxy running on port ${PORT}`));
