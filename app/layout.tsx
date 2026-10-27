import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo_Black, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

// next/font télécharge les polices au moment du build et les sert depuis notre site :
// pas d'appel à Google pendant l'atelier, et pas de « saut » de texte au chargement.
const archivoBlack = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo-black" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plexMono = IBM_Plex_Mono({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  title: "Info ou Intox ?",
  description: "Jeu pédagogique : la salle devine si une info est une vraie info insolite ou une fake news inventée.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr" className={`${archivoBlack.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-nuit font-sans text-papier">{children}</body>
    </html>
  );
}
