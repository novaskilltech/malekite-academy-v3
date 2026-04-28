<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Academie malekite - run and deploy

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1eHmnkEInq5OePebNdLHCH3bFQfZrBBd2

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Create a local env file from the example:
   `copy .env.example .env.local`
3. Run the app:
   `npm run dev`

To test Vercel serverless functions locally, use:

```bash
npm run dev:vercel
```

## Secrets

Do not commit `.env.local` or any real API key. This project is configured to ignore `*.local`.

The frontend must never call Gemini directly with a browser-exposed key. Dynamic lesson generation must go through a server endpoint such as `POST /api/generate-lesson`, where `GEMINI_API_KEY` is read server-side only.

For production on Vercel, set these in Project Settings -> Environment Variables:

```env
GEMINI_API_KEY=your_rotated_server_side_key
GEMINI_MODEL=gemini-2.5-flash
DATABASE_URL=your_vercel_marketplace_neon_connection_string
```

## Database

Use the Vercel Marketplace Neon Postgres integration to stay inside the Vercel project workflow. Start with the Neon free tier, then add the SQL in `db/lesson-cache.sql`.

The `lesson_cache` table stores generated lessons by topic, level, and language so repeated requests do not call Gemini again.

After Neon is connected and `DATABASE_URL` is available locally, run:

```bash
npm run db:migrate
```

Before pushing:

```bash
npm run check
```
