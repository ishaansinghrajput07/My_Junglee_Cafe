# My Junglee Cafe — React app

Rebuilt from the compiled production bundle (all 5 routes: `/`, `/about`, `/menu`, `/events`, `/order-now`, plus the 404 page).

    npm install
    npm run dev

- `src/index.css` is the original compiled Tailwind stylesheet, so no Tailwind setup is required.
- `src/pages/*` are the route pages; `src/shared.jsx` holds the shared sections/data/components.
- Variable names inside functions are still minified (e, t, n…) because the source came from a bundle; component and library names were restored.
- Reservation form posts to Web3Forms with the original access key; replace it with your own for production.
