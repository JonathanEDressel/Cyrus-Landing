# Cyrus — Landing Page

Marketing site for [Cyrus](https://github.com/JonathanEDressel/Cyrus), a Windows desktop app
for automating and monitoring cryptocurrency trading across multiple exchanges.

A single static `index.html` (styles and scripts inline), deployed on Netlify.

[![Sponsor JonathanEDressel](https://img.shields.io/badge/Sponsor-JonathanEDressel-ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/JonathanEDressel)

If Cyrus is useful to you, [sponsoring it on GitHub](https://github.com/sponsors/JonathanEDressel)
keeps development going.

## Layout

| Path | Purpose |
|---|---|
| `index.html` | The whole site — markup, styles and scripts |
| `shot-*.png` | Product screenshots, captured from the app running in demo mode |
| `cyrus-logo.png` | Logo used in the header and social previews |
| `netlify/functions/download-count.js` | Serverless function returning download totals (Netlify Forms + GitHub release counts) |

## Forms

Three Netlify Forms are declared in `index.html`:

- **`contact`** — the contact section
- **`email-notification`** — optional email capture shown before a download, so people can be
  told when a new version ships. Skippable; skipping goes straight to the installer.
- **`download-click`** — anonymous click analytics for the download buttons

`download-count.js` needs a `NETLIFY_API_TOKEN` environment variable set in
**Site settings → Environment variables** to read the form submission count.

## Editing

There is no build step. Edit `index.html` and deploy — Netlify publishes on push to `main`.

Screenshots are taken with the app in demo mode (Ctrl+Shift+double-click the sidebar logo),
so no real balances or account details appear on a public page.

## License

The Cyrus application is source-available under PolyForm Noncommercial 1.0.0 — see the
[main repository](https://github.com/JonathanEDressel/Cyrus) for terms.
