const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Load FAQs
const faqs = JSON.parse(fs.readFileSync('./faqs.json', 'utf8'));

// Basic keyword match
function findAnswer(userInput) {
  const input = userInput.toLowerCase();
  for (const faq of faqs) {
    if (faq.keywords.some(keyword => input.includes(keyword))) {
      return faq.answer;
    }
  }
  return "🤖 Hmm, I’m not sure. Could you try rephrasing?";
}

// POST /chat
app.post('/chat', (req, res) => {
  const message = req.body.message || '';
  const reply = findAnswer(message);
  res.json({ reply });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Chatbot API running at http://localhost:${PORT}`);
});
