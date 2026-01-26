# My-girder

Simple offline-capable set of HTML pages to manage PSC girder field reports, invoices and technical drawings.

Features
- Daily work entry and local storage
- Monthly summary and Excel export
- Invoice creation (with and without TDS)
- Technical drawing sheet with measurements
- PWA-ready (manifest + service worker)

How to preview locally
1. Serve files with a simple static server (recommended):
   - Python 3: `python -m http.server 8000`
   - Node: `npx http-server -p 8000`
2. Open http://localhost:8000 in your browser.

Recommended next steps
- Add icons under `/icons/` (girder-192.png, girder-512.png) referenced in `manifest.json`.
- Add the proposed `SW.js` and include `sw-register.js` in `index.html`.
- (Optional) Move inline JS into separate .js files for better maintainability.
- Consider a small CI job to validate HTML/CSS and run a link-checker before publishing.

Deployment
- The repo already contains `.github/workflows/static.yml` which deploys the site to GitHub Pages on push to `main`.

Contributing
- Open an issue or PR. For major changes, please create a feature branch and link the PR to the issue describing the change.