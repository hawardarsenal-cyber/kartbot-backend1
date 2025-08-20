const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Hardcoded keywords & intent matcher
const intentKeywords = [
  {
    intent: "check_tickets",
    keywords: ["tickets", "how many", "balance", "check my tickets"]
  },
  {
    intent: "purchase_tickets",
    keywords: ["buy tickets", "get tickets", "purchase", "book"]
  },
  {
    intent: "opening_hours",
    keywords: ["open", "close", "when", "time", "hours"]
  }
];

// Intent-to-response mapping
const intentResponses = {
  check_tickets: "🎟️ You can check your tickets here: [Customer Dashboard](https://pos.kartingcentral.co.uk/home/download/pos2/pos2/custdash.php)",
  purchase_tickets: "💸 You can purchase new tickets here: [Book Tickets](https://www.kartingcentral.co.uk/gokarting--ticket-bookings)",
  opening_hours: "🕒 We're open from the afternoon until 10PM daily (except Mon & Tues)."
};

// Match user query to intent
function getIntent(query) {
  query = query.toLowerCase();
  for (let entry of intentKeywords) {
    for (let keyword of entry.keywords) {
      if (query.includes(keyword.toLowerCase())) {
        return entry.intent;
      }
    }
  }
  return null;
}

// API Endpoint
app.post("/api/faq-response", (req, res) => {
  const { query } = req.body;
  const intent = getIntent(query);

  if (intent && intentResponses[intent]) {
    return res.json({ response: intentResponses[intent] });
  }

  res.json({
    response: "🤔 Sorry, I’m not sure about that one. Try asking something else!"
  });
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
