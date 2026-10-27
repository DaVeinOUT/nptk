import type { EtatPartie } from "@/lib/partie";
import { insecables } from "@/lib/typographie";
import { CompteurAnime } from "./CompteurAnime";

const REFLEXES = [
  { titre: "Qui publie ?", detail: "Quelle source ? Un média connu ? Un compte vérifié ou non ?" },
  { titre: "Quand ?", detail: "Regarde la date : une vieille info peut être recyclée." },
  { titre: "D'autres médias fiables en parlent-ils ?", detail: "Si personne d'autre n'en parle, méfiance." },
  { titre: "L'image vient-elle d'ailleurs ?", detail: "Fais une recherche d'image inversée." },
  {
    titre: "Est-ce que ça me fait réagir très fort ?",
    detail: "Si oui, je ralentis avant de partager.",
  },
];

type Props = {
  etat: EtatPartie;
  onRejouer: () => void;
  onParametres: () => void;
  onAccueil: () => void;
};

function messageSalle(score: number, total: number): string {
  const ratio = total > 0 ? score / total : 0;
  if (ratio === 1) return "Sans faute ! Rien n'échappe à vos yeux d'enquêteurs.";
  if (ratio >= 0.7) return "Très belle enquête : les intox n'ont qu'à bien se tenir !";
  if (ratio >= 0.4) return "Pas mal ! Avec les 5 réflexes, vous ferez encore mieux.";
  return "Les intox étaient coriaces… Les 5 réflexes vont vous aider !";
}

export function EcranFin({ etat, onRejouer, onParametres, onAccueil }: Props) {
  const { parametres, scores, questions } = etat;
  const total = questions.length;

  let resultatEquipes = "";
  if (parametres.mode === "equipes") {
    if (scores[0] === scores[1]) resultatEquipes = "Égalité parfaite !";
    else resultatEquipes = `🏆 ${parametres.equipes[scores[0] > scores[1] ? 0 : 1]} remporte l'enquête !`;
  }

  return (
    <div className="mx-auto flex w-full max-w-[1500px] animate-apparition flex-col gap-[3vh]">
      <header className="text-center">
        <p className="font-mono text-lg font-semibold tracking-[0.3em] text-surligneur uppercase">Dossier clos</p>
        <h1 className="font-titre text-5xl md:text-7xl">Enquête terminée !</h1>
      </header>

      {parametres.mode === "salle" ? (
        <div className="text-center">
          <p className="font-titre text-6xl md:text-8xl">
            <span className="text-surligneur">
              <CompteurAnime valeur={scores[0]} duree={1200} />
            </span>{" "}
            / {total}
          </p>
          <p className="mt-2 text-2xl md:text-3xl">{insecables(messageSalle(scores[0], total))}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-6">
            {parametres.equipes.map((nom, i) => (
              <div key={i} className="min-w-56 rounded-2xl bg-nuit-clair px-8 py-4 text-center">
                <p className="text-2xl font-bold md:text-3xl">{nom}</p>
                <p className="font-titre text-6xl text-surligneur md:text-7xl">
                  <CompteurAnime valeur={scores[i]} duree={1200} />
                </p>
              </div>
            ))}
          </div>
          <p className="font-titre text-3xl md:text-4xl">{resultatEquipes}</p>
        </div>
      )}

      <section aria-labelledby="titre-reflexes">
        <h2 id="titre-reflexes" className="mb-4 text-center font-titre text-3xl md:text-4xl">
          Les <span className="text-surligneur">5 réflexes</span> avant de partager
        </h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {REFLEXES.map((reflexe, i) => (
            <li key={reflexe.titre} className="flex gap-3 rounded-2xl bg-papier p-4 text-nuit lg:flex-col">
              <span className="font-titre text-4xl text-alerte-fonce">{i + 1}</span>
              <span>
                <span className="block text-xl font-bold md:text-2xl">{insecables(reflexe.titre)}</span>
                <span className="mt-1 block text-lg">{insecables(reflexe.detail)}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={onRejouer}
          className="rounded-2xl bg-surligneur px-8 py-4 font-titre text-2xl text-nuit shadow-[0_6px_0_#b8902f] active:translate-y-1 active:shadow-none"
        >
          Rejouer
        </button>
        <button type="button" onClick={onParametres} className="rounded-2xl border-4 border-papier px-8 py-4 text-2xl font-bold">
          Changer les paramètres
        </button>
        <button type="button" onClick={onAccueil} className="rounded-2xl border-4 border-papier px-8 py-4 text-2xl font-bold">
          Accueil
        </button>
      </div>
    </div>
  );
}
