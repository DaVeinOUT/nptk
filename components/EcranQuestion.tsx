import type { EtatPartie } from "@/lib/partie";
import type { Question, TypeInfo } from "@/lib/types";
import { BarreScore } from "./BarreScore";
import { CartePost } from "./CartePost";
import { Minuteur } from "./Minuteur";
import { Revelation } from "./Revelation";

type Props = {
  etat: EtatPartie;
  question: Question;
  tempsRestant: number;
  enPause: boolean;
  onChoisir: (choix: TypeInfo) => void;
  onChoisirEquipe: (equipe: number) => void;
  onReveler: () => void;
  onSuivant: () => void;
  onBasculerPause: () => void;
};

export function EcranQuestion(props: Props) {
  const { etat, question, tempsRestant, enPause } = props;
  const revele = etat.phase === "revelation";
  const { parametres } = etat;

  return (
    <div className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col gap-[2.5vh] court:gap-[2vh]">
      {/* Bandeau du haut : numéro du dossier, score, minuteur */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xl font-semibold tracking-widest uppercase md:text-2xl">
          Dossier n°{String(etat.index + 1).padStart(2, "0")}
          <span className="text-surligneur"> / {String(etat.questions.length).padStart(2, "0")}</span>
        </p>
        <BarreScore etat={etat} onChoisirEquipe={props.onChoisirEquipe} />
        {parametres.minuteurActif && (
          <Minuteur
            restant={tempsRestant}
            enPause={enPause}
            actif={!revele}
            onBasculerPause={props.onBasculerPause}
          />
        )}
      </header>

      {revele ? (
        // Révélation : la carte à gauche, l'explication à droite (l'une sous l'autre sur petit écran).
        <div className="grid flex-1 items-start gap-[3vw] lg:grid-cols-[3fr_2fr]">
          <CartePost question={question} revele />
          <Revelation etat={etat} question={question} onSuivant={props.onSuivant} />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-[3vh] court:gap-[2vh]">
          {/* key = id : la carte est recréée (et réanimée) à chaque nouvelle question */}
          <CartePost key={question.id} question={question} revele={false} />
          <BoutonsReponse choix={etat.choix} onChoisir={props.onChoisir} />
          <button
            type="button"
            onClick={props.onReveler}
            className="rounded-xl border-4 border-surligneur px-6 py-3 court:py-1.5 text-xl font-bold text-surligneur hover:bg-surligneur hover:text-nuit md:text-2xl"
          >
            {etat.choix ? "Révéler la réponse" : "Révéler sans réponse"}{" "}
            <kbd className="ml-2 font-mono text-lg">[Espace]</kbd>
          </button>
        </div>
      )}
    </div>
  );
}

function BoutonsReponse({ choix, onChoisir }: { choix: TypeInfo | null; onChoisir: (c: TypeInfo) => void }) {
  const base =
    "relative flex flex-col items-center justify-center gap-1 rounded-2xl px-4 py-[2.5vh] court:py-[1.5vh] font-titre text-[clamp(1.6rem,3.6vw,3.25rem)] leading-none shadow-[0_8px_0_rgba(0,0,0,0.35)] transition active:translate-y-1 active:shadow-none";
  const selection = "outline-8 outline-offset-4 outline-surligneur";

  return (
    <div className="grid w-full max-w-[1100px] grid-cols-2 gap-[2vw]" role="group" aria-label="Réponse de la salle">
      <button
        type="button"
        aria-pressed={choix === "vrai"}
        onClick={() => onChoisir("vrai")}
        className={`${base} bg-verite text-nuit ${choix === "vrai" ? selection : ""}`}
      >
        <span>
          <span aria-hidden>✅ </span>VRAIE INFO
        </span>
        <span className="font-mono text-base font-semibold md:text-lg">
          {choix === "vrai" ? "▲ CHOIX DE LA SALLE ▲" : "touche V"}
        </span>
      </button>
      <button
        type="button"
        aria-pressed={choix === "fake"}
        onClick={() => onChoisir("fake")}
        className={`${base} bg-alerte text-white ${choix === "fake" ? selection : ""}`}
      >
        <span>
          <span aria-hidden>🚨 </span>FAKE NEWS
        </span>
        {/* Fond rouge foncé : le petit texte blanc reste lisible (contraste AA). */}
        <span className="rounded-md bg-alerte-fonce px-2 font-mono text-base font-semibold md:text-lg">
          {choix === "fake" ? "▲ CHOIX DE LA SALLE ▲" : "touche F"}
        </span>
      </button>
    </div>
  );
}
