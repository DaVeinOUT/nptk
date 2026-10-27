import type { ReactNode } from "react";
import type { Mode } from "@/lib/types";

type Props = { visible: boolean; mode: Mode; onMasquer: () => void };

function Touche({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded-md border-2 border-papier bg-nuit px-1.5 py-0.5 font-mono text-sm font-semibold md:text-base">
      {children}
    </kbd>
  );
}

// Le rappel des touches, en bas de l'écran. La touche H l'affiche ou le masque.
export function AideClavier({ visible, mode, onMasquer }: Props) {
  if (!visible) return null;
  return (
    <aside
      aria-label="Raccourcis clavier"
      className="mx-[4vw] mb-[2vh] court:mb-[1vh] court:py-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-xl bg-nuit-clair px-4 py-2 text-sm md:text-base"
    >
      <span>
        <Touche>V</Touche> Vraie info
      </span>
      <span>
        <Touche>F</Touche> Fake news
      </span>
      <span>
        <Touche>Espace</Touche> Révéler / suivante
      </span>
      {mode === "equipes" && (
        <span>
          <Touche>1</Touche> <Touche>2</Touche> Équipe qui répond
        </span>
      )}
      <span>
        <Touche>P</Touche> Pause
      </span>
      <span>
        <Touche>Échap</Touche> Accueil
      </span>
      <button type="button" onClick={onMasquer} className="underline underline-offset-4">
        <Touche>H</Touche> Masquer l&apos;aide
      </button>
    </aside>
  );
}
