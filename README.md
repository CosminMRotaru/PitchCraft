PitchCraft  
A modern, minimalistic React web app for generating investor-ready startup pitches from your ideas.

Describe your startup concept, set the industry and target audience, and let AI turn it into a clear, professional pitch with one click.

This project is not just about frontend! It integrates with the Anthropic Claude API for real pitch generation, using secure serverless functions via Netlify.

---

Demo  
Live Demo

Screenshots  
(images/Screenshot1.png)  
(images/Screenshot2.png)

---

Features

- Fast, modern UI: Built with React + Vite + Tailwind CSS
- Clean pitch generation: AI creates name, one-liner, elevator pitch, features, and MVP roadmap
- Real Anthropic Claude API integration: Not random logic, but actual high-quality AI
- Secure serverless backend: Netlify Functions keep your API key safe and handle CORS
- Responsive & mobile-ready: Looks great everywhere
- Accessible: High contrast, large fonts, keyboard navigation
- Quick PDF export: Save any pitch or your history with one click
- Pitch history: Browse and export previous pitches
- Reset & clear: Clear history instantly

---

How it works (API & Serverless integration)

- When you click “Generate Pitch”, the app sends your startup info to a custom Netlify serverless function.
- The function (in /netlify/functions/) acts as a secure proxy: it takes your data, calls the Anthropic Claude API (using your secret API key, never exposed to the browser), and returns the generated pitch.
- The frontend receives the response and displays the pitch instantly.
- No API keys or secrets are ever leaked to the client.

---

Tech Stack

- React (with hooks)
- Vite (fast dev/build)
- Tailwind CSS (utility + custom classes)
- Anthropic Claude API (real AI, not hardcoded text)
- Netlify Functions (serverless backend, secure proxy)
- jsPDF (PDF export)
- ESLint (clean code)
- Netlify-ready (just connect and deploy)
- No traditional backend needed

---

Getting Started (Local & Deploy)

1. Local development
 - You can run the UI locally (`npm run dev`), but for full AI-powered functionality you need to deploy on Netlify with your own API key.

2. Deploy on Netlify (get full functionality!)
 - Fork/clone this repo
 - Create a free Netlify account at netlify.com
 - Connect your repo and deploy (Netlify auto-detects `/netlify/functions/`)
 - In Netlify dashboard, go to Site settings → Environment variables and add:  
  `ANTHROPIC_API_KEY=<your-anthropic-api-key>`

 That’s it! The serverless function will securely call the API and the UI will “just work”.

---

Requirements

- Node.js (v18.x or v20.x)
- VS Code (recommended)
- VS Code extensions:
 - ES7+ React/Redux snippets
 - Tailwind CSS IntelliSense
 - Prettier

---

Author  
Cosmin Marius Rotaru  
[GitHub](https://github.com/CosminMRotaru)
[LinkedIn](https://www.linkedin.com/in/marius-cosmin-rotaru-a8a242262/)

License  
MIT