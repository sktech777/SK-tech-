# SK TECH7

A premium futuristic React + Node.js technology website starter for SK TECH7.

## Features

- Responsive luxury dark UI
- AI Tools directory
- Blog/article structure
- Video Editing, Websites, Tech Tips and Tutorials sections
- Search
- About, Contact and legal-page templates
- SEO-friendly metadata foundation
- Sitemap and robots.txt
- Ad placeholder components
- Google Cloud App Engine configuration
- Cloud Build configuration
- Reduced-motion accessibility support

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm start
```

## Deploy to App Engine

1. Install and initialize Google Cloud CLI.
2. Select your Google Cloud project.
3. Make sure billing/App Engine are configured.
4. Replace `YOUR_DOMAIN.com` in `public/robots.txt` and `public/sitemap.xml`.
5. Replace social placeholders in `src/App.jsx`.
6. Review and customize all legal pages.
7. Connect the contact/newsletter forms to a real backend/provider.
8. Run:

```bash
npm install
npm run build
gcloud app deploy
```

## Before AdSense

This project provides structure and ad placeholders, but does not guarantee AdSense approval.

Before applying, publish substantial original, useful content, complete your About/Contact/legal information, verify ownership, ensure navigation works, remove placeholder content, and configure privacy/consent and advertising according to your audience and applicable laws.

## Important placeholders

Search for:

- `YOUR_DOMAIN.com`
- `YOUR_FACEBOOK_URL`
- `YOUR_TIKTOK_URL`
- `YOUR_YOUTUBE_URL`
- `YOUR_INSTAGRAM_URL`

Also replace starter legal text with policies appropriate to your actual website and services.
