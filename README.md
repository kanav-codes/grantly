# Grantly

Scholarship discovery and tracking, built with React + Vite.

## Run locally
    npm install
    npm run dev

## Deploy (Vercel, free)
1. Push this folder to GitHub.
2. Import the repo on vercel.com (framework: Vite, defaults are fine).
3. Settings → Environment Variables → add `GROQ_API_KEY`, then redeploy.

The Groq key is used only in `api/ai.js` (server-side) and never reaches the browser.
Profile, tracker and notes are stored in localStorage on the user's device.
