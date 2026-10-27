"use client";
// Le « chef d'orchestre » du jeu : il garde l'état de la partie,
// écoute le clavier de l'animateur et affiche le bon écran.
// "use client" = ce composant tourne dans le navigateur (il a besoin du clavier).
import { useEffect, useReducer, useState } from "react";
import {
  ETAT_INITIAL,
  derniereReponse,
  questionCourante,
  reducerPartie,
  type EtatPartie,
} from "@/lib/partie";
import { tirerQuestions } from "@/lib/tirage";
import type { Parametres, Question, TypeInfo } from "@/lib/types";
import { AideClavier } from "./AideClavier";
import { ConfirmationQuitter } from "./ConfirmationQuitter";
import { EcranAccueil } from "./EcranAccueil";
import { EcranFin } from "./EcranFin";
import { EcranParametres } from "./EcranParametres";
import { EcranQuestion } from "./EcranQuestion";

export const MIN_QUESTIONS = 5;
export const MAX_QUESTIONS = 20;

// Phrase lue par les lecteurs d'écran (zone aria-live) à chaque étape.
function annonce(etat: EtatPartie): string {
  const question = questionCourante(etat);
  if (etat.phase === "question" && question) {
    return `Question ${etat.index + 1} sur ${etat.questions.length}.`;
  }
  const reponse = derniereReponse(etat);
  if (etat.phase === "revelation" && question && reponse) {
    const verdict = reponse.choix === null ? "Pas de réponse." : reponse.correct ? "Bonne réponse !" : "Raté !";
    const nature = question.type === "vrai" ? "C'était une vraie info." : "C'était une fake news.";
    return `${verdict} ${nature}`;
  }
  if (etat.phase === "fin") return "Partie terminée.";
  return "";
}

export function Jeu({ banque }: { banque: Question[] }) {
  const [etat, dispatch] = useReducer(reducerPartie, ETAT_INITIAL);
  const [aideVisible, setAideVisible] = useState(true);
  const [confirmationOuverte, setConfirmationOuverte] = useState(false);
  const [tempsRestant, setTempsRestant] = useState(ETAT_INITIAL.parametres.dureeMinuteur);
  const [enPause, setEnPause] = useState(false);

  const { phase, parametres } = etat;
  const maxQuestions = Math.min(MAX_QUESTIONS, banque.length);
  const minQuestions = Math.min(MIN_QUESTIONS, maxQuestions);

  // ── Minuteur ──────────────────────────────────────────────────────────────
  // Il tourne seulement pendant une question, hors pause, hors fenêtre de confirmation.
  const minuteurTourne =
    phase === "question" && parametres.minuteurActif && !enPause && !confirmationOuverte && tempsRestant > 0;

  useEffect(() => {
    if (!minuteurTourne) return;
    const id = window.setInterval(() => setTempsRestant((t) => Math.max(0, t - 1)), 1000);
    return () => window.clearInterval(id);
  }, [minuteurTourne]);

  function relancerMinuteur(duree: number) {
    setTempsRestant(duree);
    setEnPause(false);
  }

  // ── Actions (appelées par les clics ET par le clavier) ───────────────────
  function ouvrirParametres() {
    dispatch({ type: "OUVRIR_PARAMETRES" });
  }

  function lancer(nouveauxParametres: Parametres) {
    const questions = tirerQuestions(banque, nouveauxParametres.nbQuestions);
    dispatch({ type: "DEMARRER", parametres: nouveauxParametres, questions });
    relancerMinuteur(nouveauxParametres.dureeMinuteur);
  }

  function choisir(choix: TypeInfo) {
    dispatch({ type: "CHOISIR", choix });
  }

  function choisirEquipe(equipe: number) {
    dispatch({ type: "CHOISIR_EQUIPE", equipe });
  }

  function reveler() {
    dispatch({ type: "REVELER" });
  }

  function suivant() {
    dispatch({ type: "SUIVANT" });
    relancerMinuteur(parametres.dureeMinuteur);
  }

  function basculerPause() {
    if (phase === "question" && parametres.minuteurActif) setEnPause((p) => !p);
  }

  function retourAccueil() {
    setConfirmationOuverte(false);
    dispatch({ type: "RETOUR_ACCUEIL" });
  }

  // Échap : on demande confirmation seulement si une partie est en cours.
  function demanderRetourAccueil() {
    if (phase === "question" || phase === "revelation") {
      setConfirmationOuverte(true);
    } else if (phase !== "accueil") {
      retourAccueil();
    }
  }

  // ── Clavier de l'animateur ───────────────────────────────────────────────
  // Pas de tableau de dépendances : l'écouteur est réinstallé à chaque affichage,
  // il voit donc toujours l'état le plus récent.
  useEffect(() => {
    const espaceInterceptee = phase === "accueil" || phase === "question" || phase === "revelation";

    function dansUnChamp(cible: EventTarget | null) {
      return cible instanceof HTMLElement && cible.closest("input, textarea, select, [contenteditable='true']") !== null;
    }

    function surToucheEnfoncee(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey || dansUnChamp(e.target)) return;

      // Fenêtre « Retourner à l'accueil ? » ouverte : seule Échap (annuler) est gérée ici.
      if (confirmationOuverte) {
        if (e.key === "Escape") {
          e.preventDefault();
          setConfirmationOuverte(false);
        }
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        demanderRetourAccueil();
        return;
      }
      if (e.key === " " && espaceInterceptee) {
        e.preventDefault(); // évite aussi que la page défile
        if (e.repeat) return; // touche maintenue enfoncée : une seule action
        if (phase === "accueil") ouvrirParametres();
        else if (phase === "question") reveler();
        else suivant();
        return;
      }

      const touche = e.key.toLowerCase();
      if (touche === "h") {
        setAideVisible((v) => !v);
      } else if (phase === "question") {
        if (touche === "v") choisir("vrai");
        else if (touche === "f") choisir("fake");
        else if (touche === "p") basculerPause();
        else if (touche === "1" || touche === "2") choisirEquipe(Number(touche) - 1);
      }
    }

    // Sans ceci, Espace « cliquerait » aussi le bouton qui a le focus,
    // en plus de l'action du jeu.
    function surToucheRelachee(e: KeyboardEvent) {
      if (e.key === " " && espaceInterceptee && !confirmationOuverte && !dansUnChamp(e.target)) {
        e.preventDefault();
      }
    }

    window.addEventListener("keydown", surToucheEnfoncee);
    window.addEventListener("keyup", surToucheRelachee);
    return () => {
      window.removeEventListener("keydown", surToucheEnfoncee);
      window.removeEventListener("keyup", surToucheRelachee);
    };
  });

  const question = questionCourante(etat);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col px-[4vw] py-[3vh] court:py-[2vh]">
        {phase === "accueil" && <EcranAccueil onLancer={ouvrirParametres} />}

        {phase === "parametres" && (
          <EcranParametres
            parametresInitiaux={parametres}
            minQuestions={minQuestions}
            maxQuestions={maxQuestions}
            onValider={lancer}
            onRetour={retourAccueil}
          />
        )}

        {(phase === "question" || phase === "revelation") && question && (
          <EcranQuestion
            etat={etat}
            question={question}
            tempsRestant={tempsRestant}
            enPause={enPause}
            onChoisir={choisir}
            onChoisirEquipe={choisirEquipe}
            onReveler={reveler}
            onSuivant={suivant}
            onBasculerPause={basculerPause}
          />
        )}

        {phase === "fin" && (
          <EcranFin
            etat={etat}
            onRejouer={() => lancer(parametres)}
            onParametres={ouvrirParametres}
            onAccueil={retourAccueil}
          />
        )}
      </main>

      <AideClavier visible={aideVisible} mode={parametres.mode} onMasquer={() => setAideVisible(false)} />

      {/* Zone invisible lue par les lecteurs d'écran à chaque changement. */}
      <div aria-live="polite" className="sr-only">
        {annonce(etat)}
      </div>

      {confirmationOuverte && (
        <ConfirmationQuitter onConfirmer={retourAccueil} onAnnuler={() => setConfirmationOuverte(false)} />
      )}
    </div>
  );
}
