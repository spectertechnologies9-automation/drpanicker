# Dr Panicker's Dental Care — website

A static, multi-page website for Dr Panicker's Dental Care, AGS Layout, Uttarahalli, Bengaluru.
Plain HTML, CSS and JavaScript. It needs no build step, no server and no backend, and it runs on GitHub Pages.

---

## 1. What's in this folder

```
/
├── index.html          Home
├── treatments.html     Treatments: filterable directory of 16 treatments
├── doctors.html        Our Doctors: profiles of all six dentists
├── clinic.html         The Clinic: gallery, equipment and patient care
├── reviews.html        Patient Reviews: verified Google reviews
├── faq.html            FAQs: grouped, searchable accordion
├── contact.html        Contact & Visit: call, WhatsApp, directions, hours
├── 404.html            Custom "page not found"
├── robots.txt
├── sitemap.xml
├── CNAME.example       Template only. See section 4
├── .nojekyll           Tells GitHub Pages to serve files as they are
└── assets/
    ├── css/styles.css  One shared stylesheet
    ├── js/main.js      One shared script (≈9 KB, no libraries)
    └── images/
        ├── doctors/    Six doctor portraits
        ├── clinic/     Four clinic photographs
        ├── og-image.jpg          1200×630 social-sharing image
        ├── apple-touch-icon.png
        └── favicon.svg
```

All internal links and asset paths are relative, so the site works at a custom domain and at a `username.github.io/repository/` address.

---

## 2. Before launch: replace the domain placeholder

The real domain hasn't been confirmed yet, so every page uses this placeholder:

```
https://YOUR-DOMAIN.com
```

It appears in each page's `<link rel="canonical">`, `og:url` and `og:image`, and in the structured data on `index.html` and `doctors.html`. It also appears in `sitemap.xml` and `robots.txt`.

**To replace it:**
1. Open the folder in a code editor such as VS Code.
2. Use **Find in files** (Ctrl/Cmd + Shift + F) for `https://YOUR-DOMAIN.com`.
3. Use **Replace all** with your real address, for example `https://www.drpanickersdentalcare.com`. Use exactly the version you'll publish, `www` or not, with no trailing slash.
4. Search again for `YOUR-DOMAIN` and confirm nothing is left.

---

## 3. Publish on GitHub Pages

1. Sign in to GitHub and create a **new repository**, for example `drpanickers-website`. It can be public. A private repository needs a paid GitHub plan to use Pages.
2. Click **Add file → Upload files**. Drag in **the contents** of this folder (not the folder itself), so that `index.html` sits at the top level of the repository.
   - `.nojekyll` is a hidden file. If your computer hides it, upload it separately, or create it on GitHub with **Add file → Create new file**, name it `.nojekyll` and leave it empty.
3. Commit the upload to the `main` branch.
4. Go to **Settings → Pages**.
   - **Source:** Deploy from a branch
   - **Branch:** `main`, folder `/ (root)` → **Save**
5. After a minute or two, GitHub shows the live address, for example `https://username.github.io/drpanickers-website/`.

**About the 404 page:** `404.html` contains `<base href="/">` so that its links work from any missing address.
- On a custom domain, or a `username.github.io` user site, leave it as it is.
- If you only use a project address like `username.github.io/drpanickers-website/`, change it to `<base href="/drpanickers-website/">`.

---

## 4. Connect your custom domain

### 4a. In GitHub
1. **Settings → Pages → Custom domain**: enter your domain, for example `www.drpanickersdentalcare.com`, then **Save**.
   GitHub adds a `CNAME` file to the repository for you. If you'd rather add it yourself, rename `CNAME.example` to `CNAME` and replace its contents with your domain only (no `https://`, no slash).
2. Recommended: verify the domain under your GitHub account's **Settings → Pages → Verified domains**. This stops anyone else from claiming it.

### 4b. At your domain registrar (GoDaddy, Namecheap, Hostinger, etc.)

Below are the records GitHub currently documents. Check them against GitHub's page **"Managing a custom domain for your GitHub Pages site"** (docs.github.com) before saving, because GitHub can change them.

| Type  | Host / Name | Value (example — verify) |
|-------|-------------|--------------------------|
| CNAME | `www` | `USERNAME.github.io` (your GitHub username, not the repository name) |
| A     | `@` | `185.199.108.153` |
| A     | `@` | `185.199.109.153` |
| A     | `@` | `185.199.110.153` |
| A     | `@` | `185.199.111.153` |
| AAAA (optional) | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |

- Remove any older A, AAAA or CNAME records for `@` and `www` that point somewhere else, such as a parking page.
- DNS changes can take from a few minutes up to 24–48 hours to take effect.

### 4c. Turn on HTTPS
Once GitHub shows "DNS check successful" under **Settings → Pages**, tick **Enforce HTTPS**. The certificate can take up to an hour to be issued. If the box is greyed out, wait and refresh.

---

## 5. Clinic photographs

The Clinic page shows four photographs from `assets/images/clinic/`: `clinic-exterior.jpg`, `treatment-room.jpg`, `clinic-entrance.jpg` and `clinic-street.jpg`.
To swap one, save the new photo over the old file with the same name. To add more, copy one of the `<figure>` blocks in the gallery on `clinic.html`.

---

## 6. Information still needed from the clinic

| Item | Where it goes |
|------|---------------|
| Final domain name | Section 2 and the CNAME |
| Registration numbers for Dr. Roopa R Tubaki, Dr. Shreya B, Dr. Jaya Kiran and Dr. Parvathy P | `doctors.html`, marked by `<!-- TODO (client) -->` comments that visitors can't see |
| Whether Dr. Shreya B holds an MDS | `doctors.html` |
| A higher-resolution portrait of Dr. Parvathy P (current one is 392 px) | `assets/images/doctors/` |
| A photo of Dr. Jaya Kiran that hasn't been AI-edited | `assets/images/doctors/` |
| More interior photographs, if wanted (consultation area, imaging equipment) | Section 5 |
| Confirm the equipment list, in particular "RUG", shown as **RVG digital X-ray** | `clinic.html`, home page |
| Which doctor leads each treatment (the site currently links each category to the matching specialist) | `treatments.html` |
| Payment methods, EMI or insurance | `faq.html`. It currently says "please ask the clinic" |
| Parking, landmark and step-free access | `contact.html`. Left out until verified |
| Exact map pin (Google Maps share link) | A map embed can then be added to `contact.html` |
| Updated Google rating and review count | `index.html`, `reviews.html`. Currently 4.9 from 224 reviews, as of September 2026 |
| Any additional genuine patient reviews (with permission) | `reviews.html` |

---

## 7. How things work

- **Contact:** all contact is by phone or WhatsApp; nothing is submitted to a server. WhatsApp buttons open `wa.me/919986719039` with a message already written. The site stores no visitor data.
- **Animations:** headline, page-entrance and image reveals use CSS. Scroll reveals use `IntersectionObserver`.
  - Visitors who set "reduce motion" on their device see a static site.
  - If JavaScript is off or fails to load, all content is shown anyway (a 2.5-second safety switch removes the reveal effects).
- **FAQ search, treatment filters and accordions** are progressive enhancements. Without JavaScript every question and treatment is still listed and can be opened.
- **Fonts:** Newsreader and Plus Jakarta Sans load from Google Fonts with `display=swap`. If they don't load, the text uses Georgia and the system font.

---

## 8. Post-deployment checklist

- [ ] All seven pages open from the menu on desktop and mobile, and the current page is underlined in gold.
- [ ] Mobile menu: opens, closes with the button and the Esc key, and closes after choosing a page.
- [ ] Tapping a phone number on a phone opens the dialler with +91 99867 19039 (and +91 77952 49359 where shown).
- [ ] Every WhatsApp button opens WhatsApp with the correct pre-written message.
- [ ] "Get directions" opens the correct clinic in Google Maps.
- [ ] Treatments page: filter chips work; links like `treatments.html#t-implant` open that treatment.
- [ ] FAQ page: search finds "Sunday" and "implants"; questions open and close.
- [ ] Contact page: today's row is highlighted in the hours table, and the open/closed status is correct.
- [ ] All six doctor photos and the logo appear, with no broken images.
- [ ] A missing address such as `/abc` shows the custom 404 page, and its links work.
- [ ] `https://your-domain/sitemap.xml` and `/robots.txt` load and show the real domain.
- [ ] HTTPS padlock shows and **Enforce HTTPS** is ticked.
- [ ] Sharing the home page link on WhatsApp shows the preview image and title. This only works once the domain placeholder has been replaced.
- [ ] Submit `sitemap.xml` in Google Search Console, and link the website from the clinic's Google Business Profile.
- [ ] Run Lighthouse (Chrome DevTools → Lighthouse) on the live site and fix anything it flags.
