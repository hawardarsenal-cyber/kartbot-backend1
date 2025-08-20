# Karting FAQ Chatbot API

A lightweight Express backend that answers common KartingCentral user questions using a JSON FAQ.

## Endpoints

- `POST /chat`  
  Body: `{ "message": "your question" }`  
  Returns: `{ "reply": "answer from FAQ" }`

## Deploy on Render
1. Push this repo to GitHub.
2. Go to [render.com](https://render.com) > New Web Service.
3. Use Build: `npm install`, Start: `npm start`.
4. Done.
