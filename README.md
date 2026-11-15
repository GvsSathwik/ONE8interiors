# ONE 8 INTERIORS

A premium, responsive interior design studio website built with React, Vite, Framer Motion and Lucide icons.

## Run locally

1. Install Node.js 18 or newer.
2. In this folder, run `npm install`.
3. Run `npm run dev` and open the local address Vite prints.
4. Run `npm run build` to create the production site in `dist/`.
5. Run `npm run preview` to preview the production build.

## Brand assets and photography

The original supplied ONE 8 INTERIORS logo is stored at `public/images/one8-interiors-logo.png` and is used without recolouring or distortion. The project gallery uses locally stored portfolio visualisations in `public/images/portfolio/`. Other editorial imagery loads from Unsplash. The Instagram gallery links to the supplied profile and uses manually manageable placeholders because live Instagram embeds are not configured.

Google Fonts and Unsplash images require an internet connection; the project gallery images are included locally. To self-host other imagery, add files under `public/images` and update the `photos` mapping in `src/main.jsx`.

## Contact form

The form validates required name, email, project type and message fields in the browser and presents a confirmation screen. It does not transmit or store submitted data. Connect it to a form provider or backend before using it to receive enquiries. The supplied studio email and phone number are available as direct `mailto:` and `tel:` contact links.

## Editing content

- Services, portfolio cards, project categories and process steps are defined near the top of `src/main.jsx`. Portfolio image files are stored in `public/images/portfolio/`.
- Brand colours, responsive layouts and interaction styling are in `src/style.css`.
- Page title and description are in `index.html`.
