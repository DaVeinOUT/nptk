import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Réglages par défaut de Next.js 16 (créés par create-next-app).
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Ne pas annoncer « Next.js » dans les en-têtes HTTP.
  poweredByHeader: false,
  // En-têtes de sécurité envoyés avec chaque page.
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Le navigateur ne doit pas « deviner » le type d'un fichier.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Quand on clique sur une source, le média ne voit pas l'adresse complète du jeu.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Le jeu ne peut pas être affiché dans un cadre (iframe) sur un autre site.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Le jeu n'a besoin ni de la caméra, ni du micro, ni de la position.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
