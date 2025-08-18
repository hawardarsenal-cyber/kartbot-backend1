const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple /chat endpoint
app.post('/chat', (req, res) => {
  const userMessage = req.body.message;
  console.log('Received:', userMessage);

  // Example response
  res.json({ reply: `You said: "${userMessage}" 🏁` });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Chatbot backend running on http://localhost:${PORT}`);
});
