import { insecables } from "@/lib/typographie";
import type { Question } from "@/lib/types";
import { Tampon } from "./Tampon";

// Première lettre ou chiffre du nom de compte, pour l'avatar générique.
function initiale(compte: string): string {
  const lettre = compte.match(/[\p{L}\p{N}]/u);
  return lettre ? lettre[0].toUpperCase() : "?";
}

// La publication, façon réseau social.
export function CartePost({ question, revele }: { question: Question; revele: boolean }) {
  return (
    <article
      aria-label={`Publication de ${question.compte}`}
      className="relative w-full max-w-[1100px] animate-apparition overflow-hidden rounded-2xl bg-papier text-nuit shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
    >
      <div className="p-[clamp(1rem,2.4vw,2.25rem)] court:py-4">
        <header className="flex items-center gap-4">
          <div
            aria-hidden
            className="grid size-12 shrink-0 place-items-center rounded-full bg-nuit font-titre text-2xl text-surligneur md:size-16 md:text-3xl"
          >
            {initiale(question.compte)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xl font-bold [overflow-wrap:anywhere] md:text-2xl">{question.compte}</p>
            <p className="font-mono text-sm md:text-base">Publication partagée</p>
          </div>
          {/* L'émoji d'illustration, comme un autocollant en haut à droite. */}
          {question.illustration && !question.photo && (
            <div aria-hidden className="shrink-0 text-5xl md:text-6xl">
              {question.illustration}
            </div>
          )}
        </header>

        {/* Texte de la carte : 36 px minimum sur grand écran (vidéoprojecteur). */}
        <p className="mt-4 text-2xl leading-snug font-medium text-pretty md:text-[2.25rem] court:mt-3 court:leading-tight">{insecables(question.texte)}</p>

        {question.photo && (
          <div className="mt-4 rounded-xl border-4 border-dashed border-nuit bg-white/60 p-4 font-mono text-lg font-semibold md:text-2xl court:p-3 court:text-xl">
            [Photo : {insecables(question.photo)}]
          </div>
        )}

        <footer className="mt-4 court:mt-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-t-2 border-nuit/25 pt-3">
          <p className="text-xl font-semibold md:text-2xl">
            <span aria-hidden>❤️ </span>
            {question.likes}
            <span className="sr-only"> j&apos;aime</span>
          </p>
          {/* Garde-fou anti-capture d'écran, toujours visible. */}
          <p className="font-mono text-sm font-semibold md:text-base">Jeu pédagogique — Info ou Intox ?</p>
        </footer>
      </div>

      {revele && question.type === "fake" && (
        <p className="bg-alerte-fonce px-6 py-3 text-center font-mono text-lg font-semibold tracking-wide text-white uppercase md:text-2xl">
          FAKE — inventée pour un atelier
        </p>
      )}
      {revele && <Tampon type={question.type} />}
    </article>
  );
}
