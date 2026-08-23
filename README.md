# Vice City News

Unofficial, non-commercial fan site covering GTA VI / Leonida news and lore.
Not affiliated with, endorsed by, or associated with Rockstar Games or
Take-Two Interactive.

## Deploying to GitHub Pages

1. Create a new GitHub repo (e.g. `vicecitynews`) and push these files to
   the `main` branch (or `docs/` folder — either works).
2. In the repo: **Settings → Pages** → set source to the branch/folder
   these files live in.
3. Under **Settings → Pages → Custom domain**, enter `vicecitynews.org`.
   GitHub will detect the `CNAME` file already in this repo and use it —
   don't delete it.
4. GitHub will show a DNS check warning until DNS is configured (next step).

## Pointing GoDaddy DNS at GitHub Pages

In your GoDaddy DNS management for vicecitynews.org, add:

**A records** (root domain → GitHub Pages IPs), all four:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME record** (if you also want www.vicecitynews.org to work):
```
www → yourusername.github.io
```

DNS propagation can take anywhere from a few minutes to ~24 hours.
Once it's live, go back to GitHub Pages settings and check
"Enforce HTTPS" once the option becomes available (it needs DNS to
resolve first).

## Content guidelines (keep this site low-risk)

- No ads, affiliate links, sponsorships, or merch on this domain.
- No Rockstar/Take-Two logos or lifted game art — screenshots only in
  small, clearly-commentary amounts.
- Keep the disclaimer bar in the header and the fuller disclaimer in
  the footer on every page.
- Write in an editorial/journalistic voice — report on news, don't
  impersonate official announcements.
- Byline links to other projects (e.g. Kloud) should stay soft —
  "more from this writer," not a hard call-to-action banner.
- Back up all article content outside this repo/domain in case the
  site ever needs to come down quickly.
