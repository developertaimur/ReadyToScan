# ImReadyToScan

Static marketing website for [ImReadyToScan.com](https://imreadytoscan.com) — scan-specific patient preparation videos sent by text. Hospitals only pay when patients confirm and show up.

## Stack

- Static HTML, CSS, and JavaScript
- No build step or framework
- Forms via FormSubmit

## Pages

| Path | Page |
|------|------|
| `/` | Home |
| `/hospital-benefits/` | Hospital Benefits |
| `/about-compliance/` | About & Compliance |
| `/contact/` | Contact |
| `/pilot/` | Request a 30-Day Pilot |
| `/privacy-policy/` | Privacy Policy |
| `/terms-conditions/` | Terms & Conditions |
| `/sms-terms/` | SMS Terms |

## Run locally

```bash
npx serve .
```

Then open the local URL shown in the terminal (usually `http://localhost:3000`).

## Project layout

```
├── index.html
├── css/styles.css
├── js/main.js
├── assets/          # logos, images, exam videos
├── hospital-benefits/
├── about-compliance/
├── contact/
├── pilot/
├── privacy-policy/
├── terms-conditions/
└── sms-terms/
```

## Brand assets

Official logo pack (do not stretch, recolor, or add shadows):

- `assets/logo-full.svg` — color (navy + teal), for light backgrounds
- `assets/logo-full-white.svg` — for dark / navy areas
- `assets/logo-full-allwhite.svg` — for mid-tone / low-contrast spots

## Maintainer

**developertaimur** — https://github.com/developertaimur
