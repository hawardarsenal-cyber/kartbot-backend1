// server.js
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


app.use(cors());
app.use(express.json());

app.post('/ask', async (req, res) => {
  const question = req.body.question || '';

  // Ticket check logic (mocked)
  const isTicketCheck = /ticket|booking|how many/i.test(question);
  if (isTicketCheck && /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(question)) {
    return res.json({
      answer: `✅ Found 3 tickets remaining for your upcoming event. Get ready to race! 🏎️`
    });
  }

  // Send to GPT for general questions
  const chat = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are KartBot, the helpful assistant for kartingcentral.co.uk. Answer ONLY questions about karting, tickets, events, and bookings.'
      },
      { role: 'user', content: question }
    ]
  });

  res.json({ answer: chat.choices[0].message.content });
});

app.listen(3000, () => console.log('KartBot is live on http://localhost:3000'));
