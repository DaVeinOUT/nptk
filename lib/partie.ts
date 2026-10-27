// Les règles du jeu, sous forme de « reducer ».
// Un reducer est une fonction pure : (état actuel, action) → nouvel état.
// Elle ne touche ni à l'écran ni au clavier : on peut donc la tester facilement.
import type { Parametres, Question, TypeInfo } from "./types";

export type Phase = "accueil" | "parametres" | "question" | "revelation" | "fin";

export type Reponse = {
  questionId: string;
  choix: TypeInfo | null; // null = pas de réponse (temps écoulé, salle indécise…)
  correct: boolean;
  equipe: number; // 0 en mode « 1 salle », 0 ou 1 en mode « 2 équipes »
};

export type EtatPartie = {
  phase: Phase;
  parametres: Parametres;
  questions: Question[];
  index: number; // numéro de la question en cours (0 = première)
  choix: TypeInfo | null; // réponse sélectionnée, pas encore révélée
  equipeActive: number;
  scores: number[]; // [score de la salle] ou [équipe 1, équipe 2]
  historique: Reponse[];
};

export type Action =
  | { type: "OUVRIR_PARAMETRES" }
  | { type: "DEMARRER"; parametres: Parametres; questions: Question[] }
  | { type: "CHOISIR"; choix: TypeInfo }
  | { type: "CHOISIR_EQUIPE"; equipe: number }
  | { type: "REVELER" }
  | { type: "SUIVANT" }
  | { type: "RETOUR_ACCUEIL" };

export const PARAMETRES_PAR_DEFAUT: Parametres = {
  nbQuestions: 10,
  mode: "salle",
  equipes: ["Équipe 1", "Équipe 2"],
  minuteurActif: true,
  dureeMinuteur: 20,
};

export const ETAT_INITIAL: EtatPartie = {
  phase: "accueil",
  parametres: PARAMETRES_PAR_DEFAUT,
  questions: [],
  index: 0,
  choix: null,
  equipeActive: 0,
  scores: [0],
  historique: [],
};

export function questionCourante(etat: EtatPartie): Question | undefined {
  return etat.questions[etat.index];
}

export function derniereReponse(etat: EtatPartie): Reponse | undefined {
  return etat.historique[etat.historique.length - 1];
}

export function reducerPartie(etat: EtatPartie, action: Action): EtatPartie {
  switch (action.type) {
    case "OUVRIR_PARAMETRES":
      return { ...etat, phase: "parametres" };

    case "DEMARRER": {
      if (action.questions.length === 0) return etat;
      return {
        ...ETAT_INITIAL,
        phase: "question",
        parametres: action.parametres,
        questions: action.questions,
        scores: action.parametres.mode === "equipes" ? [0, 0] : [0],
      };
    }

    case "CHOISIR":
      if (etat.phase !== "question") return etat;
      return { ...etat, choix: action.choix };

    case "CHOISIR_EQUIPE":
      if (etat.phase !== "question" || etat.parametres.mode !== "equipes") return etat;
      if (action.equipe !== 0 && action.equipe !== 1) return etat;
      return { ...etat, equipeActive: action.equipe };

    case "REVELER": {
      const question = questionCourante(etat);
      if (etat.phase !== "question" || !question) return etat;
      const correct = etat.choix === question.type;
      const equipe = etat.parametres.mode === "equipes" ? etat.equipeActive : 0;
      const scores = [...etat.scores];
      if (correct) scores[equipe] += 1;
      return {
        ...etat,
        phase: "revelation",
        scores,
        historique: [...etat.historique, { questionId: question.id, choix: etat.choix, correct, equipe }],
      };
    }

    case "SUIVANT": {
      if (etat.phase !== "revelation") return etat;
      const suivant = etat.index + 1;
      if (suivant >= etat.questions.length) {
        return { ...etat, phase: "fin", choix: null };
      }
      // En mode 2 équipes, la main passe automatiquement à l'autre équipe.
      const reponse = derniereReponse(etat);
      const equipeActive = etat.parametres.mode === "equipes" && reponse ? (reponse.equipe + 1) % 2 : 0;
      return { ...etat, phase: "question", index: suivant, choix: null, equipeActive };
    }

    case "RETOUR_ACCUEIL":
      // On garde les paramètres pour la partie suivante.
      return { ...ETAT_INITIAL, parametres: etat.parametres };
  }
}
