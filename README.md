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
| `stress-test.html` | Standalone tool page linked from the **Other Tools** section — a correlated Monte Carlo flash-crash stress test |
| `shot-*.png` | Product screenshots, captured from the app running in demo mode |
| `cyrus-logo.png` | Logo used in the header, social previews, and the back-link on `stress-test.html` |
| `netlify/functions/download-count.js` | Serverless function returning download totals (Netlify Forms + GitHub release counts) |

## Colour theme

Both pages carry a light/dark switch fixed to the bottom-left corner. The choice is stored under
the single `localStorage` key `cyrus.theme`, so it follows the visitor between the landing page and
the tools, and a `storage` listener picks up changes made in another tab. With nothing stored the
pages follow the operating system's `prefers-color-scheme`, and stop following it once the visitor
picks a side.

An inline script in `<head>` sets `data-theme` on `<html>` before first paint, so a remembered
theme never flashes the other one. Every colour on both pages resolves through CSS custom
properties — `:root` holds one theme and `:root[data-theme="..."]` overrides the other — so adding a
themed colour means adding a token, not a hardcoded hex.

## Other Tools section

`#tools` on the landing page is the shelf for small browser-based tools. Adding another one is a
copy of the `.tool-card` anchor: icon, title, description, a few `.tool-tag` chips and the
`Open tool` affordance. The dashed `.tool-card--soon` placeholder is there to show the section is
going to grow; delete it once there are enough real cards.

`stress-test.html` deliberately has no site header — it is a full-screen tool, with the Cyrus logo
in its footer as the way back. It runs a Cholesky-correlated Monte Carlo simulation entirely in the
browser (no network calls at all) and ships a 17-step guided walkthrough behind the compass icon at
the top left.

### The anchor

The crash is defined for one asset — the **anchor** — and propagated to the other twelve through
their crash betas. Any of the 13 assets can hold that role, chosen from the first control. Because
the anchor is a role rather than a property:

- it floats to its own **Anchor** group at the top of both tables,
- its beta is pinned to `1.00` and disabled, since the anchor's move is the reference every other
  beta is measured against,
- the correlation matrix is built from asset **classes** only (majors / memes / alts), so it does
  not change when the anchor does.

The target band is quoted in the anchor's own currency, so it is stored together with the anchor
under `cyrus.stressTest.anchor` as `{"t":"BTC","lo":47500,"hi":65300}`. Switching the anchor re-bases
the band to roughly a 31–50% crash from that asset's spot price; a hand-tuned band is remembered as
typed. A stored band that is wildly out of scale for its anchor (left over from a different one) is
discarded rather than restored, and a plain-ticker value from an older build still loads.

`ASSETS` is the single list to edit when adding a coin: ticker, name, class (`major` / `meme` /
`alt`), spot price, beta and the one-line interpretation shown in the table.

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
