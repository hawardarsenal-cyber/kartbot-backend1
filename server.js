const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

app.post('/ask', async (req, res) => {
  const question = req.body.question || '';

  // Mock ticket check
  const isTicketCheck = /ticket|booking|how many/i.test(question);
  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(question);

  if (isTicketCheck && hasEmail) {
    return res.json({
      answer: `✅ Found 3 tickets remaining for your upcoming event. Get ready to race! 🏎️`
    });
  }

try {
  const completion = await openai.completions.create({
    model: "text-davinci-003",
    prompt: `You are KartBot, the helpful assistant for kartingcentral.co.uk. Answer ONLY questions about karting, tickets, events, and bookings.\nUser: ${question}\nKartBot:`,
    max_tokens: 150,
    temperature: 0.7,
  });

  res.json({ answer: completion.choices[0].text.trim() });
} catch (err) {
  console.error('❌ OpenAI error:', err);
  res.status(500).json({ answer: "Sorry, I'm having trouble responding right now." });
}

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`KartBot is live on port ${PORT}`));
