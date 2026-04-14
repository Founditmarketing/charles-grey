import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // CORS configuration if needed
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { history, message } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyDWyY1e0bzPbmfkL9vvqaZOkJ1MO5uC_Lc");
    
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: "You are the automated AI Estimator for Charles Grey Construction, a premium Louisiana general contractor. Your goal is to gather project details and provide a high-level summary. Always maintain a professional, high-end, architectural tone. Keep responses extremely concise (1-2 short paragraphs). At the very end of the conversation, once they have provided their project details, ALWAYS prompt them to provide their name and phone number so a real human estimator can contact them with the final quote. Do not ask for all details at once, be conversational."
    });

    // Remove the initial AI greeting because Gemini SDK strictly requires history to begin with 'user'
    const actualHistory = history.slice(1);

    const formattedHistory = actualHistory.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);
    const text = result.response.text();

    return res.status(200).json({ response: text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to communicate with AI Estimator.',
      details: error.message || String(error)
    });
  }
}
