# CSI Shanthi Church — Multi-page GitHub Pages Website

## Main pages
- `index.html` — Home
- `about.html` — Our Story
- `ministries.html` — Ministries
- `leadership.html` — searchable Bishops & Pastors historical archive
- `connect.html` — YouTube, Offerings, Contact / Visit

## Assets
- `assets/css/style-v26.css`
- `assets/js/main-v26.js`
- `assets/js/leadership.js`
- `assets/images/church-exterior-v26.png`
- `assets/images/altar-enhanced.png`
- `assets/images/offerings-qr.png`

## GitHub Pages
Upload the full contents of this folder to your repository root. Keep the folder structure intact.

## Historical data note
The bishops/pastors archive is based on the church history document supplied for the 2019 souvenir. Where the source has incomplete dates, the site explicitly says that dates are not specified rather than guessing.

## YouTube
The Connect page currently highlights the service thumbnail previously selected for the site and links to the official channel.

## Branding and daily passage update
- Added `assets/images/church-logo.svg`: cross + dove + olive branches, representing Christ and peace ("Shanthi").
- Added a large church-name masthead across every page.
- Added an automatically changing Daily Bible Passage to the Home page.
- Daily passages use a curated set of KJV/public-domain Scripture and require no API or backend.

## Daily Bible Passage update
- The home-page feature is now explicitly a **Bible Passage for the Day**, not a single verse.
- The daily rotation now uses longer multi-verse readings, usually 3–8 verses.
- The passages remain KJV/public-domain and work without an external API.

## Bilingual daily Bible passage
- Added English / ಕನ್ನಡ language toggle.
- English uses the existing KJV-based passage text.
- Kannada is a direct rendered translation of the same English passage text for website display.
- The site remembers the visitor's language choice in the browser.

## Official Kannada Scripture + 90-passage rotation

- The daily rotation now contains exactly 90 curated Bible passage references.
- English text is requested from the KJV module.
- Kannada text is requested from the published Kannada IRV module (`kn_irv`) through Bible SuperSearch.
- The Bible SuperSearch API documents cross-domain usage and a free 1,000-hit/day limit.
- The website requests English and Kannada together in one call and caches that day's result in each visitor's browser.
- Kannada Scripture copyright/source attribution is displayed below the passage as required by CC BY-SA 4.0.
- If the external Bible service is unavailable, the website shows a friendly message instead of inventing Scripture text.

## Premium design refresh

- Added `assets/images/favicon.svg` and linked it in all pages so the tab shows the church emblem.
- Replaced the earlier logo with a more refined primary emblem in `assets/images/church-logo-premium.svg`.
- Simplified the header structure so the church name is prominently shown once in the top branding area and no longer repeated in a cluttered way in the navigation bar.
- Refined spacing, typography, card styling and section rhythm to create a cleaner and more premium look.
- Tightened the mobile layout so the branding, menu and content remain easy to read without feeling crowded.

## V7 custom logo update

- Replaced the generated logo with the user-supplied CSI Shanthi Church logo (`assets/images/church-logo-custom.png`).
- Added a favicon derived from the emblem area of the same logo (`assets/images/favicon-custom.png`) so the browser tab shows the church mark.
- Simplified the top branding area to feature the church logo cleanly, without repeating the full title in a cluttered way.
- Kept the navigation cleaner and lighter for better desktop and mobile readability.

## V8 luxury polish
- Refined typography, spacing and hierarchy across all pages.
- Added a more elegant navy / green / gold visual balance.
- Improved hero overlays, buttons, cards, offerings, leadership archive and footer styling.
- Reduced visual density on mobile for easier reading.
- Preserved the custom logo, favicon, 90-passage bilingual Bible feature, leadership search and all existing content.

## V12 corrected full build
- Rebuilt from the last intact website package.
- Preserves the complete navigation and homepage hero.
- Removes only the oversized logo banner.
- Keeps the logo subtle in the menu and hero watermark.
- Includes the requested CSI Shanthi Church hero heading, humanized copy, and Holy Communion hero detail.

## V13 circular logo update
- Replaced the square-looking navbar/footer emblem display with a circular church emblem.
- Created `assets/images/logo-emblem-circle.png` from the supplied church logo.
- Made the logo more visible and elegant where it appears in the navbar and as the subtle hero watermark.
- Kept the oversized top logo banner removed.

## V14 logo update
- Replaced the previous generated circular emblem with the user-provided PNG seal.
- Updated the navigation, footer and hero watermark to use `assets/images/logo-official.png`.

## V15 transparent logo
- Replaced the previous logo asset with a transparent-background circular emblem.
- Updated navbar, footer, favicon/logo references, and homepage watermark accordingly.

## V16 Connect button fix
- Increased horizontal padding and minimum width for the Connect button.
- Improved vertical centering and line-height.
- Added cleaner mobile behavior so the button fills the mobile menu width without looking cramped.

## V17 inner page background refresh
- Reworked the hero sections on Ministries, Leadership & Legacy, and Connect.
- Replaced the flat green look with a more elegant logo-based composition.
- Added a subtle church seal treatment and decorative watermark styling.
- Added a refined logo watermark to the Ministries band section as well.

## V19 animation fix
- Moved animations into a separate `assets/js/animations-v26.js` file.
- Animations no longer depend on the Bible passage JavaScript succeeding.
- The site stays fully visible even if JavaScript is blocked or an API fails.
- Added IntersectionObserver fallback and immediate in-view detection.
- Works when opened locally from `file://` as well as on GitHub Pages.

## V20 placement and watermark motion
- Fixed the seal placement inside the hero card on Ministries, Leadership & Legacy, and Connect.
- Centered the logo cleanly inside its circular holder so it no longer looks offset.
- Added a very slow floating animation to the transparent church watermark on the home page.

## V21 refinements
- Fixed mobile seal placement by centering the logo with absolute centering inside the circular holder.
- Disabled the inner-page seal animation to prevent transform conflicts.
- Made the home-page transparent logo motion more visible and elegant with a slower float, tiny horizontal drift, gentle scale, and subtle opacity breathing.

## V22 logo motion fix
- Rebuilt the logo animation as pure CSS so it no longer depends on JavaScript.
- Applied the same restrained motion language to the home watermark and the logo treatments on Ministries, Leadership & Legacy, and Connect.
- Motion now combines vertical float, tiny leftward drift, slight scale, gentle rotation and subtle opacity breathing.
- Inner-page logo images remain absolutely centered while the wrapper moves, preventing mobile alignment issues.

## V23 rotation refinement
- Increased logo rotation modestly so the motion is easier to notice.
- Kept the motion slow and restrained so it remains elegant rather than distracting.

## V24 historical imagery
- Added the two supplied historical church photographs.
- The home hero now rotates through the present church, the early shed, and the first rebuilt church.
- Added soft crossfades, restrained Ken Burns movement, story captions and manual slide indicators.
- Added a visual three-chapter history gallery to the About page.
- The slideshow pauses on hover/focus and when the browser tab is inactive.
- Reduced-motion users receive a static presentation.


## V25 — GitHub-only announcement system

Announcements are managed only through the GitHub repository.

### Files
- `announcements.json` — announcement data.
- `assets/images/announcements/` — optional announcement images.
- `assets/js/announcements-v26.js` — scheduling/filtering/display logic.
- `announcements.html` — dedicated public announcements page.

### How to publish an announcement
1. Open `announcements.json` in GitHub.
2. Add a new object inside the JSON array.
3. Set `"enabled": true`.
4. Enter start/end times with the India offset `+05:30`.
5. Commit the change.
6. If an image is needed, upload it to `assets/images/announcements/` and put that path in `"image"`.

Example:

```json
{
  "id": "christmas-program-2026",
  "enabled": true,
  "featured": true,
  "title": "Christmas Program 2026",
  "description": "Join us for an evening of worship, music and fellowship.",
  "image": "assets/images/announcements/christmas-2026.jpg",
  "eventDate": "2026-12-20T18:00:00+05:30",
  "start": "2026-12-01T06:00:00+05:30",
  "end": "2026-12-20T22:00:00+05:30",
  "link": "",
  "buttonText": "View details"
}
```

### Important behavior
- Multiple announcements are supported.
- `featured: true` announcements appear first.
- Before `start`, the announcement is hidden.
- After `end`, the announcement is hidden automatically.
- `image` may be blank.
- `link` may be blank or point to another page / section / external URL.
- The two sample records in `announcements.json` are disabled and do not appear publicly.
- Only collaborators who can commit to the GitHub repository can change announcements.

## V26 — cache-busted deployment build

This build renames the main CSS, JavaScript, and church hero image assets so browsers and GitHub Pages/CDN cannot reuse older cached files.

Important live verification:
- Open page source for `index.html` and confirm `site-build` is `v26-cache-busted`.
- Confirm the live page loads `style-v26.css`.
- Confirm the live page loads `history-slideshow-v26.js`.
- Confirm the live HTML references `church-history-shed-v26.jpg` and `church-history-first-rebuilt-v26.jpg`.

If those names are visible on the live domain, the new build is definitely deployed.

## V27 — slideshow autoplay fix

- Fixed the home hero slideshow so it starts automatically on page load.
- Removed mouse-hover pausing because a cursor resting over the hero could stop the timer immediately.
- The slideshow still pauses when a slideshow control has keyboard focus and while the browser tab is inactive.
- Manual slide buttons continue to work and restart the timer.
- The slideshow startup is now scheduled after the first rendered frame for better reliability.


## Site-wide English / Kannada switch

This build adds a persistent English / Kannada language switch using the current repository files as its base.

- The selected language is saved in localStorage and follows the visitor across all pages.
- Static church content with an approved Kannada translation switches to Kannada.
- The Daily Bible Passage language follows the site language where possible.
- Announcements may optionally define `titleKn`, `descriptionKn`, and `buttonTextKn`.
- If an announcement does not have `titleKn`, the complete announcement remains in English so it never looks partially translated.


## V31 — Church History naming update

- Navigation label changed from `About` to `Church History`.
- About-page hero heading changed to `The Story of Shanthi Church`.
- Kannada equivalents:
  - `Church History` → `ಚರ್ಚ್ ಇತಿಹಾಸ`
  - `The Story of Shanthi Church` → `ಶಾಂತಿ ಚರ್ಚ್‌ನ ಕಥೆ`


## V33 — automatic latest YouTube video

The Connect page no longer depends on a permanently hard-coded featured video.

- `.github/workflows/update-latest-youtube.yml` runs on pushes to `main`, manually, and every 6 hours.
- It resolves the official `@csishanthichurch586` channel, reads YouTube's channel feed, and writes the newest upload to `latest-video.json`.
- `assets/js/latest-video-v33.js` reads that JSON and automatically updates the video thumbnail, title and YouTube link on the Connect page.
- If the update ever fails, the existing video remains as a safe fallback instead of leaving a broken card.
