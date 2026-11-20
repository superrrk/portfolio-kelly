# Kelly Truong · Daydream Portfolio

An editorial portfolio with an original, interactive ASCII bunny, tiny creative experiments, and case studies grounded in real engineering work.

**Live site (after deployment):** https://kellytruong.netlify.app/

## Built with
- React and JavaScript in the existing Create React App project
- SCSS for responsive layout and design tokens
- Canvas 2D for the ASCII character and spring interactions
- SVG for illustrations, diagrams, and a tiny interactive garden

## Run locally

```bash
cd client
npm install
npm start
```

Open `http://localhost:3000`.

## Deploy

The existing `netlify.toml` builds the React app inside `client` and publishes `client/build`.

## Résumé

The current uploaded résumé is provided at `client/public/TRUONG_KELLY.pdf`. The visible portfolio content reflects the provided document: IBM, bp, Columbia B.S. Computer Science (expected May 2027), AI-Generated Image Detector and Markowitz Portfolio Optimizer. The project gallery also features the verified Swift/UIKit Scrap iOS capstone and this portfolio as a creative coding project.

## Accessibility

- Mobile-first responsive layout
- Keyboard-accessible navigation, original interactive bunny, and flower garden
- Reduced-motion support for ambient animation
- Clear accessible names and descriptive screenshot alt text

## Editing

- Content and sections: `client/src/components/Home/index.js`
- Bunny animation: `client/src/components/Home/AsciiBunny.js`
- Design tokens: `client/src/App.scss`
- Styling: `client/src/components/Home/index.scss`
- Résumé: `client/public/TRUONG_KELLY.pdf`

The older components in the repository remain available for reference but are no longer rendered by `App.js`.


## November 2026 refresh

This update adds the original interactive ASCII bunny theme, the supplied 2026 headshot, detailed IBM and bp experience from the uploaded résumé, current project descriptions, and the current résumé PDF. Review `README_APPLY.md`; the `DEPLOY_ON_MAC.command` helper can build and publish once local GitHub credentials are available.

## Art direction and recent updates

The palette stays warm porcelain, sage, and quiet rose. Framework brand icons are used sparingly in one-color technology tags. IBM and bp experience entries use bold impact-first summaries and selectively emphasized, résumé-backed metrics. The bunny now autonomously crouches, hops, and lands with articulated ears and moving text glyphs.

For an iOS development plan that separates finished Scrap functionality from future features, see `SCRAP_NEXT_STEPS.md`.


## Portfolio direction, November 2026

The layout is recruiter-first, with a separate creative studio:

- **Selected Work:** built engineering projects, source links, implementation and measurable outcomes.
- **Experience:** clearly labeled IBM and bp internship work; résumé-backed technical impact.
- **In the Oven:** an intentionally separate sketchbook for future artwork, visual design, Scrap 2.0 / iOS product ideas, and playful interfaces. **Concepts are not presented as shipped work.**
- **About / Play:** human context, original animated ASCII character, interactive garden.

To add creative work later, edit the `studioIdeas` array in `client/src/components/Home/index.js`. Change each `state` when an exploration advances and include a verified link or screenshot before marking it as shipped. To add a polished software project, edit the `projects` array. Keep claims and numerical results grounded in verified work.

The bunny artwork was refined with denser glyph placement, improved contrast, facial highlights, and tucked paws while preserving autonomous hopping and reduced-motion support.


## Bunny paw refinement (v4)
The front-of-belly paw curves were removed. Two small arms and their finger details now appear **outside** the torso silhouette. The bunny still hops autonomously, and the yarn thread connects to the outer right paw. The standalone preview and React component are both updated.

## V5 — Flowing ASCII rabbit redesign

- Removed the yarn-ball prop, collar, drawn eyebrows, cheeks, body fills, outlines, and other cartoon details.
- Rebuilt the character as a pure moving-glyph silhouette: a side-profile rabbit with an original shape, one visible eye, and one subtle mouth mark.
- Added continuous per-glyph flow, spring physics, articulated ears and paws, automatic side hops, cursor dispersion, and click/tap response.
- `client/src/components/Home/bunnyEngine.js` is shared between the React site and the standalone `preview.html` to avoid different animations in the two versions.
- Reduced-motion preference displays a still ASCII pose.
- The preview can be opened directly from the filesystem. This update is **not** pushed to GitHub or deployed.

## V6 — Little ASCII flower

Added a tiny five-petal dusty-rose flower tucked into the moving front ear. The petals and center are entirely **animated punctuation glyphs** attached to ear coordinates, not a separate SVG or a painted prop. The flower sways with the ear, while preserving the hopping, flowing text silhouette and reduced-motion support. React and the standalone preview use identical engine code. No other portfolio content was changed, and this update is **not deployed**.

## V7 — Three little worlds (Meadow / Pond / Night)

Replaced the single flower garden with an understated interactive scene switcher:

- **Meadow:** tap to plant pastel flowers. The count has **no upper limit**; a maximum of 14 are displayed at once to preserve visual clarity and performance, replacing the oldest as new flowers grow. It begins with three flowers.
- **Pond:** tap to make water ripples alongside lily pads and reeds.
- **Night:** tap to place softly twinkling stars beneath a crescent moon.

Each scene keeps its own tally, and *start fresh* resets only the currently selected scene. Scene buttons, actions and the drawing surface are keyboard accessible. Mobile and reduced-motion layouts are included. The section copy and studio descriptions were shortened without removing experience or engineering details.

The new source lives in `client/src/components/Home/CreativeScenes.js` and `CreativeScenes.scss`. **These files and `bunnyEngine.js` must be committed as part of the update.** The deployment helper now stages all three. The standalone `preview.html` has matching interactions. This is an offline package, not a live-site deployment.


### v8 refinement (November 2026)
- Removed the detached 95% / 80% bp metrics box. Both figures remain emphasized **inside the relevant experience bullets**.
- Tightened spacing around About, Little Worlds and Contact on desktop and mobile.
- Added subtle illustrated ambience to Meadow, Pond and Night scenes.
- The preview and the React scene component received matching changes.
- This ZIP is a local patch for the existing repo, **not** a live deployment.


### v9: Little ducks + rounder bunny (November 2026)
- Removed **Visual Field Notes** from In the Oven and converted the remaining cards to a balanced two-column gallery.
- Replaced clickable pond ripples with **interactive, automatically swimming ducks**. The pond starts with two ducks. Clicking/tapping or using *invite a duck* adds another; the newest six stay visible for clarity.
- Added a visible LinkedIn link (https://www.linkedin.com/in/kellybtruong/) to the hero, while retaining the footer link.
- Widened the ASCII glyph bunny's body and softly rounded its head and tail; autonomous hopping, glyph motion and ear flower remain.
- React components and standalone preview implement the same updates. The existing live Netlify website is not modified by this package.

## v11 visual refinement

LinkedIn and GitHub are now small monochrome, accessible icon-only links in the hero and contact area. Technical project links retain descriptive labels.

## Study Buddy UI project
A Columbia team semester UI design project is linked via `krgodesign.com` and the supplied Figma design. Because the linked Figma frames could not be inspected, the visual tile is intentionally an original placeholder rather than a claimed product screenshot. Confirm personal contributions and replace the tile with approved Figma exports before publishing an in-depth case study.

### V12 — Study Buddy / personal sketchbook
Added Columbia team UI design project Study Buddy with the team website and Figma links. Included a private-to-About crochet photo gallery using six user-provided photos, while keeping the main engineering portfolio uncluttered. Improved the meadow flowers and night sky with restrained animation.


## v13 – Illustrated Meadow
The Meadow scene has been re-illustrated with proportional, multi-petal SVG blooms, curved stems, layered hills, distant grasses, subtle sunlight, and soft depth shading. No new dependencies, with reduced-motion support preserved. Open `preview.html` to test it.


## v14 visual refinement
- Experience now has a consistent, wider inset on desktop and safe mobile spacing.
- Meadow uses flat, rounded, hand-drawn cartoon petals and a simplified layered landscape without gradients or shadows on the blooms.


## V15 recruiter polish
Read `RECRUITER_REVIEW.md` for changes and the priority checklist.

## V16 — Earlier game and lab experience

Added **Lunchbox Entertainment** (beta testing, development feedback and bug fixes for *Sirocco*) and Columbia's **DitecT Lab** (Apple Watch pedestrian-safety research prototype using Swift/Xcode, camera-sourced data, and MQTT) as compact earlier-experience cards beneath IBM and bp. Both are labeled **2024** rather than claimed to be ongoing because the source résumé is from 2024. Each has a relevant external website link, but no claim that Sirocco servers are currently online. The current 2026 résumé PDF remains unchanged.


Deployment lint fix: see `README_DEPLOY_FIX.md`.
