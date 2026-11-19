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

The current uploaded résumé is provided at `client/public/TRUONG_KELLY.pdf`. The visible portfolio content reflects the provided document: IBM, bp, Columbia B.S. Computer Science (expected May 2027), AI-Generated Image Detector and Markowitz Portfolio Optimizer.

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
