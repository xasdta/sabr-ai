# Sabr AI — We Get Your Company's Data Ready for AI & Build the Agents That Put It to Work

**AI Data Readiness, High-Speed Analytical Architecture & AI Agents**, by Sabr Systems LLC.

Live site: https://sabrsystems.com (also https://sabr-ai.vercel.app)

## What we sell

1. **Map & Define:** clean up and map cryptic database fields, status codes, and table relationships into a plain-English dictionary, and lock in official KPI formulas so LLMs understand the data.
2. **Connect:** a unified, read-only query layer that joins MySQL, PostgreSQL, SQL Server, Oracle, and cloud databases in one live catalog.
3. **Transfer:** stream mapped data into a high-speed columnar analytical store, structured in the right format for LLM queries, so AI queries don't run against production databases.
4. **Automate:** connect LLMs and deploy AI agents that act on new data within seconds, covering reporting, self-serve data access, and business workflow automation.

Option A (disjointed or undefined tables) starts at Stage 1. Option B (data that's already clean) starts at Stage 3.

## Pricing

| Step | Package | Price |
|---|---|---|
| 1 | 14-Day Data Readiness & AI Architecture Audit | $18,500 (100% credited toward setup) |
| 2 | Turnkey Data-to-AI Architecture, Analytical Store & Agents | $75k–$140k, 6–10 weeks |
| 3 | Managed AI Data Engine & Agent Operations | $9,500/mo or $99,000/yr |

## Site structure

Single-page static site; no build step.

| File | Purpose |
|---|---|
| `index.html` | The whole site: hero, before/after, 4-stage architecture, Option A/B, AI agents, demo, pricing, team, audit form |
| `assets/css/site.css` | Styles (plain CSS, design tokens on `:root`) |
| `assets/js/site.js` | Demo scenario tabs and the audit form (opens a pre-filled email to intake@sabrsystems.com) |
| `vercel.json` | Redirects the old multi-page URLs to sections of the homepage |

Preview locally:

```bash
python3 -m http.server 8080   # open http://localhost:8080
```
