"use client";
import { useEffect, useRef } from "react";

type Props = { onConfirmer: () => void; onAnnuler: () => void };

// Fenêtre « Retourner à l'accueil ? » ouverte par la touche Échap pendant une partie.
export function ConfirmationQuitter({ onConfirmer, onAnnuler }: Props) {
  const boutonNon = useRef<HTMLButtonElement>(null);

  // À l'ouverture, le focus va sur « Non » : un appui sur Entrée ne fait rien perdre.
  useEffect(() => {
    boutonNon.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-nuit/90 p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titre-quitter"
        aria-describedby="texte-quitter"
        className="w-full max-w-xl animate-apparition rounded-2xl bg-papier p-8 text-nuit shadow-2xl"
      >
        <h2 id="titre-quitter" className="font-titre text-3xl md:text-4xl">
          Retourner à l&apos;accueil ?
        </h2>
        <p id="texte-quitter" className="mt-3 text-xl">
          La partie en cours et les scores seront perdus.
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-4">
          <button
            ref={boutonNon}
            type="button"
            onClick={onAnnuler}
            className="rounded-xl border-4 border-nuit px-6 py-3 text-xl font-bold focus-visible:outline-alerte-fonce"
          >
            Non, continuer
          </button>
          <button
            type="button"
            onClick={onConfirmer}
            className="rounded-xl bg-alerte-fonce px-6 py-3 text-xl font-bold text-white focus-visible:outline-nuit"
          >
            Oui, quitter
          </button>
        </div>
      </div>
    </div>
  );
}
