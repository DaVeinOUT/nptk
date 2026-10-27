import type { TypeInfo } from "@/lib/types";

// Le tampon « VRAI » ou « FAKE » qui s'abat sur la carte (animation dans globals.css).
// Ses lettres sont seulement contourées (intérieur presque transparent) :
// le texte de la carte reste lisible en dessous.
// aria-hidden : le résultat est déjà annoncé aux lecteurs d'écran par la zone aria-live.
export function Tampon({ type }: { type: TypeInfo }) {
  const vrai = type === "vrai";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-1/2 left-1/2 animate-tampon rounded-2xl border-[clamp(6px,0.8vw,12px)] px-[0.3em] py-[0.05em] font-mono text-[clamp(4rem,11vw,9rem)] leading-none font-semibold tracking-[0.12em] mix-blend-multiply ${
        vrai
          ? "border-verite text-verite/20 [-webkit-text-stroke:clamp(2px,0.35vw,5px)_var(--color-verite-fonce)]"
          : "border-alerte text-alerte/20 [-webkit-text-stroke:clamp(2px,0.35vw,5px)_var(--color-alerte-fonce)]"
      }`}
    >
      {vrai ? "VRAI" : "FAKE"}
    </div>
  );
}
