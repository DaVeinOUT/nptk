import { derniereReponse, type EtatPartie } from "@/lib/partie";
import { TECHNIQUES_INFOS } from "@/lib/techniques";
import { insecables } from "@/lib/typographie";
import type { Question } from "@/lib/types";

type Props = { etat: EtatPartie; question: Question; onSuivant: () => void };

export function Revelation({ etat, question, onSuivant }: Props) {
  const reponse = derniereReponse(etat);
  const derniere = etat.index + 1 >= etat.questions.length;
  const vrai = question.type === "vrai";

  let verdict = "⏱️ Pas de réponse";
  if (reponse?.choix) verdict = reponse.correct ? "✅ Bonne réponse !" : "❌ Raté !";

  const nomEquipe = reponse && etat.parametres.mode === "equipes" ? etat.parametres.equipes[reponse.equipe] : null;
  const technique = question.technique ? TECHNIQUES_INFOS[question.technique] : null;

  return (
    <section
      aria-labelledby="titre-revelation"
      className="flex animate-apparition flex-col gap-4 rounded-2xl bg-nuit-clair p-5 md:p-7 court:gap-2.5 court:p-4"
    >
      <div>
        <h2 id="titre-revelation" className="font-titre text-3xl md:text-4xl court:text-3xl">
          {verdict}
        </h2>
        {nomEquipe && (
          <p className="mt-1 text-xl font-semibold text-surligneur md:text-2xl">
            {reponse?.correct ? `+1 point pour ${nomEquipe}` : `Pas de point pour ${nomEquipe}`}
          </p>
        )}
      </div>

      <p className="font-mono text-lg font-semibold uppercase md:text-xl">
        C&apos;était une{" "}
        <span className={`rounded-md px-2 py-0.5 ${vrai ? "bg-verite text-nuit" : "bg-alerte-fonce text-white"}`}>
          {vrai ? "vraie info" : "fake news"}
        </span>
      </p>

      <p className="text-xl leading-snug md:text-2xl court:text-xl court:leading-tight">{insecables(question.explication)}</p>

      {vrai && question.source && (
        <div className="rounded-xl bg-papier p-4 text-nuit md:p-5 court:p-3">
          <p className="font-mono text-base font-semibold tracking-widest uppercase">Source</p>
          <p className="text-xl font-bold md:text-2xl">{question.source.media}</p>
          <p className="text-lg md:text-xl">Publié le {question.source.date}</p>
          <a
            href={question.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-lg font-bold break-all text-verite-fonce underline underline-offset-4 md:text-xl"
          >
            Voir la source ↗<span className="sr-only"> (s&apos;ouvre dans un nouvel onglet)</span>
          </a>
        </div>
      )}

      {!vrai && technique && (
        <div className="rounded-xl bg-papier p-4 text-nuit md:p-5 court:p-3">
          <p className="font-mono text-base font-semibold tracking-widest uppercase">Technique de manipulation</p>
          <p className="font-titre text-2xl text-alerte-fonce md:text-3xl">{technique.nom}</p>
          <p className="text-lg leading-snug md:text-xl court:text-lg">{insecables(technique.description)}</p>
          {question.indices && (
            <>
              <p className="mt-3 font-mono text-base font-semibold tracking-widest uppercase court:mt-2">Les indices</p>
              <ul className="mt-1 space-y-1 text-lg leading-snug md:text-xl court:space-y-0.5 court:text-lg">
                {question.indices.map((indice) => (
                  <li key={indice} className="flex gap-2">
                    <span aria-hidden>🔎</span>
                    <span>{insecables(indice)}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={onSuivant}
        className="mt-auto rounded-2xl bg-surligneur px-6 py-4 court:py-2.5 font-titre text-2xl text-nuit shadow-[0_6px_0_#b8902f] active:translate-y-1 active:shadow-none md:text-3xl"
      >
        {derniere ? "Voir le résultat final" : "Question suivante"}{" "}
        <kbd className="ml-1 font-mono text-lg">[Espace]</kbd>
      </button>
    </section>
  );
}
