# Blowfish

Blowfish is a small, offline-ready blackjack decision and card counting trainer. It runs entirely in your browser; there is no account, server, or real-money play.

## Practice

- **Basic:** Choose hit, stand, double, or split for each hand. Review a strategy chart in the app.
- **Count:** Practice Hi-Lo or Zen running counts and, optionally, a simple true-count bet ramp.
- Use **Space** to deal and **H**, **S**, **D**, or **P** for available play actions.
- Change decks, counting system, feedback timing, and appearance in Settings. Preferences are saved in your browser; session scores reset when the page reloads.

This is a **decision drill**, not a full blackjack game. Splits and doubles score your choice and end that decision; the app does not play out multiple split hands or settle bets. The chart is a simplified teaching chart, and real table rules can change the best play. Do not treat the bet ramp as gambling advice.

## Run locally

Requirements: Bun 1.3.1.

```sh
bun install --frozen-lockfile
bun run dev
```

Open the local address printed by Vite. To check a change:

```sh
bun run lint
bun run test
bun run build
bun run preview
```

`bun run build` creates the static site in `dist/`. The PWA service worker is generated for production builds; offline use works after the deployed site has been loaded once.

## Deploy to GitHub Pages

The repository includes [a Pages workflow](.github/workflows/deploy-pages.yml) that checks lint and build, then publishes `dist/` whenever `main` changes. In the GitHub repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source. The first push to `main` then starts a deployment. You can also run **Deploy to GitHub Pages** manually from the Actions tab.

The site is configured for this repository's `/Blowfish/` path and should be available at [thedandan.github.io/Blowfish/](https://thedandan.github.io/Blowfish/) after Pages is enabled and deployment succeeds. If the repository name changes, update `base` in `vite.config.ts` before deploying.

## Contributing

Issues and pull requests are welcome. Keep the trainer's strategy decisions consistent with the in-app reference chart. Run `bun run lint`, `bun run test`, and `bun run build` before opening a pull request.

## License

MIT. See [LICENSE](LICENSE).
