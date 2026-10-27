// Tirage aléatoire des questions d'une partie.
// Règles : autant de vraies que de fakes (à une près si le nombre est impair)
// et jamais plus de 3 questions du même type d'affilée.
import type { Question, TypeInfo } from "./types";

export const MAX_MEME_TYPE_AFFILEE = 3;

// « alea » est une fonction qui renvoie un nombre entre 0 et 1 (comme Math.random).
// On peut en passer une autre dans les tests pour obtenir un résultat prévisible.
export type Alea = () => number;

// Mélange de Fisher-Yates : chaque ordre possible a la même chance de sortir.
export function melanger<T>(liste: readonly T[], alea: Alea = Math.random): T[] {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(alea() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

// Peut-on encore placer « restantSerie » questions du type de la série en cours
// et « restantAutre » de l'autre type, sachant que la série en cours fait déjà
// « longueurSerie » questions, sans jamais dépasser 3 d'affilée ?
function realisable(restantSerie: number, restantAutre: number, longueurSerie: number): boolean {
  const max = MAX_MEME_TYPE_AFFILEE;
  return restantSerie <= max - longueurSerie + max * restantAutre && restantAutre <= max * (restantSerie + 1);
}

// Fabrique l'ordre des types (ex. vrai, fake, fake, vrai…) en piochant au hasard,
// mais seulement parmi les choix qui permettent de finir la séquence sans casser la règle.
export function sequenceDeTypes(nbVrai: number, nbFake: number, alea: Alea = Math.random): TypeInfo[] {
  const restant: Record<TypeInfo, number> = { vrai: nbVrai, fake: nbFake };
  const sequence: TypeInfo[] = [];
  let dernier: TypeInfo | null = null;
  let longueurSerie = 0;

  while (restant.vrai + restant.fake > 0) {
    const possibles = (["vrai", "fake"] as const).filter((type) => {
      if (restant[type] === 0) return false;
      const serie = type === dernier ? longueurSerie + 1 : 1;
      if (serie > MAX_MEME_TYPE_AFFILEE) return false;
      const autre: TypeInfo = type === "vrai" ? "fake" : "vrai";
      return realisable(restant[type] - 1, restant[autre], serie);
    });
    // Cas impossible avec une banque équilibrée : on prend le type le plus nombreux.
    const choix: TypeInfo =
      possibles.length > 0
        ? possibles[Math.floor(alea() * possibles.length)]
        : restant.vrai >= restant.fake
          ? "vrai"
          : "fake";

    longueurSerie = choix === dernier ? longueurSerie + 1 : 1;
    dernier = choix;
    restant[choix] -= 1;
    sequence.push(choix);
  }
  return sequence;
}

// Choisit « nombre » questions dans la banque et les met dans un ordre équilibré.
export function tirerQuestions(banque: readonly Question[], nombre: number, alea: Alea = Math.random): Question[] {
  const vrais = melanger(
    banque.filter((q) => q.type === "vrai"),
    alea,
  );
  const fakes = melanger(
    banque.filter((q) => q.type === "fake"),
    alea,
  );
  const total = Math.max(0, Math.min(Math.floor(nombre), banque.length));

  // Moitié-moitié ; si le nombre est impair, la question en plus est tirée au sort.
  let nbVrai = Math.floor(total / 2) + (total % 2 === 1 && alea() < 0.5 ? 1 : 0);
  nbVrai = Math.min(nbVrai, vrais.length);
  let nbFake = total - nbVrai;
  if (nbFake > fakes.length) {
    nbFake = fakes.length;
    nbVrai = total - nbFake;
  }

  return sequenceDeTypes(nbVrai, nbFake, alea).map((type) => (type === "vrai" ? vrais.pop()! : fakes.pop()!));
}
