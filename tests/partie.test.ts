import { describe, expect, it } from "vitest";
import { ETAT_INITIAL, PARAMETRES_PAR_DEFAUT, reducerPartie, type Action, type EtatPartie } from "@/lib/partie";
import type { Parametres, Question } from "@/lib/types";

function question(id: string, type: "vrai" | "fake"): Question {
  return type === "vrai"
    ? {
        id,
        type,
        compte: "@test",
        texte: "texte",
        likes: "1",
        explication: "explication",
        source: { media: "Média", date: "1er janvier 2020", url: "https://exemple.org" },
      }
    : { id, type, compte: "@test", texte: "texte", likes: "1", explication: "explication", technique: "titre-choc", indices: ["a", "b"] };
}

const QUESTIONS = [question("q1", "vrai"), question("q2", "fake"), question("q3", "fake")];

// Applique une suite d'actions à partir d'un état.
function jouer(etat: EtatPartie, ...actions: Action[]): EtatPartie {
  return actions.reduce(reducerPartie, etat);
}

function demarrer(parametres: Partial<Parametres> = {}): EtatPartie {
  return reducerPartie(ETAT_INITIAL, {
    type: "DEMARRER",
    parametres: { ...PARAMETRES_PAR_DEFAUT, ...parametres },
    questions: QUESTIONS,
  });
}

describe("mode 1 salle", () => {
  it("démarre sur la première question avec un score à 0", () => {
    const etat = demarrer();
    expect(etat.phase).toBe("question");
    expect(etat.index).toBe(0);
    expect(etat.scores).toEqual([0]);
  });

  it("donne 1 point pour une bonne réponse, 0 pour une mauvaise", () => {
    let etat = jouer(demarrer(), { type: "CHOISIR", choix: "vrai" }, { type: "REVELER" });
    expect(etat.phase).toBe("revelation");
    expect(etat.scores).toEqual([1]);
    expect(etat.historique.at(-1)?.correct).toBe(true);

    etat = jouer(etat, { type: "SUIVANT" }, { type: "CHOISIR", choix: "vrai" }, { type: "REVELER" });
    expect(etat.scores).toEqual([1]); // q2 était une fake
    expect(etat.historique.at(-1)?.correct).toBe(false);
  });

  it("l'animateur peut changer d'avis avant de révéler", () => {
    const etat = jouer(demarrer(), { type: "CHOISIR", choix: "fake" }, { type: "CHOISIR", choix: "vrai" }, { type: "REVELER" });
    expect(etat.scores).toEqual([1]);
  });

  it("révéler sans réponse ne rapporte aucun point", () => {
    const etat = jouer(demarrer(), { type: "REVELER" });
    expect(etat.scores).toEqual([0]);
    expect(etat.historique[0]).toMatchObject({ choix: null, correct: false });
  });

  it("ignore les choix pendant la révélation (pas de triche après coup)", () => {
    const etat = jouer(demarrer(), { type: "CHOISIR", choix: "fake" }, { type: "REVELER" }, { type: "CHOISIR", choix: "vrai" }, { type: "REVELER" });
    expect(etat.scores).toEqual([0]);
    expect(etat.historique).toHaveLength(1);
  });

  it("une partie complète finit sur l'écran de fin avec le bon score", () => {
    const etat = jouer(
      demarrer(),
      { type: "CHOISIR", choix: "vrai" },
      { type: "REVELER" },
      { type: "SUIVANT" },
      { type: "CHOISIR", choix: "fake" },
      { type: "REVELER" },
      { type: "SUIVANT" },
      { type: "CHOISIR", choix: "vrai" },
      { type: "REVELER" },
      { type: "SUIVANT" },
    );
    expect(etat.phase).toBe("fin");
    expect(etat.scores).toEqual([2]);
    expect(etat.historique).toHaveLength(3);
  });

  it("le retour à l'accueil efface la partie mais garde les paramètres", () => {
    const etat = jouer(demarrer({ nbQuestions: 7 }), { type: "CHOISIR", choix: "vrai" }, { type: "REVELER" }, { type: "RETOUR_ACCUEIL" });
    expect(etat.phase).toBe("accueil");
    expect(etat.scores).toEqual([0]);
    expect(etat.historique).toEqual([]);
    expect(etat.parametres.nbQuestions).toBe(7);
  });

  it("ne démarre pas sans questions", () => {
    const etat = reducerPartie(ETAT_INITIAL, { type: "DEMARRER", parametres: PARAMETRES_PAR_DEFAUT, questions: [] });
    expect(etat).toBe(ETAT_INITIAL);
  });
});

describe("mode 2 équipes", () => {
  const equipes = (): EtatPartie => demarrer({ mode: "equipes", equipes: ["Les Lynx", "Les Hiboux"] });

  it("démarre avec deux scores à 0 et l'équipe 1 qui répond", () => {
    const etat = equipes();
    expect(etat.scores).toEqual([0, 0]);
    expect(etat.equipeActive).toBe(0);
  });

  it("le point va à l'équipe qui répond", () => {
    const etat = jouer(equipes(), { type: "CHOISIR", choix: "vrai" }, { type: "REVELER" });
    expect(etat.scores).toEqual([1, 0]);
  });

  it("la main passe automatiquement à l'autre équipe", () => {
    let etat = jouer(equipes(), { type: "REVELER" }, { type: "SUIVANT" });
    expect(etat.equipeActive).toBe(1);
    etat = jouer(etat, { type: "CHOISIR", choix: "fake" }, { type: "REVELER" });
    expect(etat.scores).toEqual([0, 1]);
    etat = jouer(etat, { type: "SUIVANT" });
    expect(etat.equipeActive).toBe(0);
  });

  it("les touches 1 / 2 forcent l'équipe qui répond", () => {
    let etat = jouer(equipes(), { type: "CHOISIR_EQUIPE", equipe: 1 }, { type: "CHOISIR", choix: "vrai" }, { type: "REVELER" });
    expect(etat.scores).toEqual([0, 1]);
    // Après une réponse de l'équipe 2, c'est au tour de l'équipe 1.
    etat = jouer(etat, { type: "SUIVANT" });
    expect(etat.equipeActive).toBe(0);
  });

  it("refuse une équipe qui n'existe pas", () => {
    const etat = jouer(equipes(), { type: "CHOISIR_EQUIPE", equipe: 5 });
    expect(etat.equipeActive).toBe(0);
  });

  it("le choix d'équipe est ignoré en mode 1 salle", () => {
    const etat = jouer(demarrer(), { type: "CHOISIR_EQUIPE", equipe: 1 }, { type: "CHOISIR", choix: "vrai" }, { type: "REVELER" });
    expect(etat.scores).toEqual([1]);
    expect(etat.historique[0].equipe).toBe(0);
  });
});
