# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static corporate website for Futuristech Limited (Company No. 15963689), a UK-based technology company providing VPN and network acceleration services. Hosted on GitHub Pages at futuristechltd.co.uk.

## Technology Stack

- **Frontend**: Pure HTML5, Tailwind CSS (via CDN), vanilla JavaScript
- **Styling**: Custom CSS in `css/style.css` with gradient themes and animations
- **External Dependencies**:
  - Tailwind CSS: `https://cdn.tailwindcss.com`
  - Font Awesome 6.4.0: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`
  - Google Fonts: Inter font family
  - Google AdSense: `ca-pub-9394028872449809`

## Site Structure

```
index.html           # Main homepage (single-page design with sections)
privacy-policy.html  # Standalone UK GDPR-compliant privacy policy
css/style.css       # Custom styles, animations, gradient definitions
js/main.js          # Navigation, smooth scrolling, form handling
ads.txt             # AdSense verification
CNAME               # Custom domain configuration
```

## Key Architecture

### Single-Page Application Pattern
Main page (`index.html`) uses anchor-based navigation with sections: `#home`, `#about`, `#services`, `#contact`. JavaScript handles smooth scrolling with 64px offset for fixed navbar.

### Design System
- **Primary gradient**: Purple/indigo (`#667eea` to `#764ba2`)
- **Card hover effects**: `translateY(-5px)` with enhanced shadows
- **Responsive breakpoint**: `md:` (768px) for mobile menu toggle
- **Section padding**: 80px desktop, 40px mobile

### JavaScript Features
- Mobile menu toggle functionality (hamburger menu)
- Smooth scroll with navbar offset compensation
- Active navigation state based on scroll position
- Contact form submission handler (prevents default, shows alert, resets form)
- Dynamic year in footer
- Intersection Observer for stats animation (if `.stats-section` exists)

## Development Workflow

### Testing Locally
```bash
# Serve locally (no build step required)
python3 -m http.server 8000
# or
npx serve .
```

### Deployment
Auto-deploys from `main` branch via GitHub Pages. No build process needed.

### Making Changes
1. Edit HTML/CSS/JS files directly
2. Test changes locally
3. Commit and push to `main` branch
4. Changes appear live automatically

## Important Business Information

**Do not modify without approval:**
- Company registration details (No. 15963689)
- Registered office address: 71-75 Shelton Street, Covent Garden, London WC2H 9JQ
- Email addresses: info@futuristechltd.co.uk, privacy@futuristechltd.co.uk
- Google AdSense publisher ID: ca-pub-9394028872449809

## Legal Compliance

### Privacy Policy
UK GDPR-compliant privacy policy in `privacy-policy.html`. Key points:
- No-log policy for VPN services (no browsing history, traffic data, DNS queries, or connection IPs stored)
- Data retention periods specified (account: 12 months, payments: 7 years, logs: 30 days)
- ICO complaint procedure included

### Terms of Service
Referenced in footer but file not yet created (`terms-of-service.html`).

## File Conventions

- Keep `index.html.backup` when making major changes to homepage
- Privacy policy "Last Updated" date format: "24 October 2025"
- Footer year auto-updates via JavaScript (`#current-year`)
