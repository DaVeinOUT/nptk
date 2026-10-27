import type { EtatPartie } from "@/lib/partie";
import { CompteurAnime } from "./CompteurAnime";

type Props = { etat: EtatPartie; onChoisirEquipe: (equipe: number) => void };

export function BarreScore({ etat, onChoisirEquipe }: Props) {
  const { parametres, scores, historique, phase } = etat;

  if (parametres.mode === "salle") {
    return (
      <p className="rounded-xl bg-nuit-clair px-5 py-2 text-xl font-bold md:text-2xl">
        Score de la salle :{" "}
        <span className="font-mono text-surligneur">
          <CompteurAnime valeur={scores[0]} /> / {historique.length}
        </span>
      </p>
    );
  }

  // Mode 2 équipes : chaque équipe est un bouton (clic = « c'est elle qui répond »).
  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="Équipes">
      {parametres.equipes.map((nom, i) => {
        const active = etat.equipeActive === i;
        return (
          <button
            key={i}
            type="button"
            aria-pressed={active}
            disabled={phase !== "question"}
            onClick={() => onChoisirEquipe(i)}
            className={`flex items-center gap-3 rounded-xl border-4 px-4 py-1.5 text-xl font-bold disabled:cursor-default md:text-2xl ${
              active ? "border-surligneur bg-surligneur text-nuit" : "border-papier bg-nuit-clair text-papier"
            }`}
          >
            <span className="font-mono text-base">{i + 1}</span>
            <span>{nom}</span>
            <span className="font-mono">
              <CompteurAnime valeur={scores[i]} />
            </span>
            {active && phase === "question" && <span className="font-mono text-base">◀ répond</span>}
          </button>
        );
      })}
    </div>
  );
}
