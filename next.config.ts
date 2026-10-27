import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le jeu tourne entièrement dans le navigateur : `npm run build` produit de simples
  // fichiers HTML/CSS/JS dans le dossier `out/`, que n'importe quel hébergeur
  // (Netlify, Vercel, GitHub Pages…) sait servir sans configuration particulière.
  output: "export",
  // (Les options cacheComponents et partialPrefetching, activées par défaut à la création
  // du projet, sont retirées : elles ont besoin d'un serveur et le jeu n'en utilise pas.)
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Les en-têtes de sécurité HTTP ne peuvent pas être définis ici avec un export statique :
  // ils sont dans netlify.toml (Netlify) et vercel.json (Vercel).
};

export default nextConfig;
