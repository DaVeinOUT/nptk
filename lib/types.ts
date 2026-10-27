// Tous les « types » du jeu sont rassemblés ici.
// Un type décrit la forme d'une donnée : TypeScript vérifie ensuite
// que tout le code respecte cette forme (sinon, erreur avant même de lancer le site).

// Liste des techniques de manipulation. Le « as const » fige la liste :
// TypeScript connaît alors exactement les 9 valeurs possibles.
export const TECHNIQUES = [
  "titre-choc",
  "fausse-source",
  "chiffre-invente",
  "faux-expert",
  "image-hors-contexte",
  "image-ia",
  "faux-compte-officiel",
  "urgence-partage",
  "satire-prise-au-serieux",
] as const;

// « Technique » = l'une des chaînes de la liste ci-dessus (une « union »).
export type Technique = (typeof TECHNIQUES)[number];

export type TypeInfo = "vrai" | "fake";

export type Source = {
  media: string; // nom du média ou de l'institution
  date: string; // date de publication, écrite en toutes lettres
  url: string; // lien vers l'article
};

export type Question = {
  id: string;
  type: TypeInfo;
  compte: string; // nom du compte affiché sur la carte
  texte: string; // 280 caractères max
  illustration?: string; // émoji (ou chemin vers une image libre de droits)
  photo?: string; // description d'une photo absente, affichée « [Photo : …] »
  likes: string; // ex. "12,4 k"
  explication: string; // phrase affichée à la révélation
  // si vrai
  source?: Source;
  // si fake
  technique?: Technique;
  indices?: string[]; // 2 ou 3
};

export type Mode = "salle" | "equipes";

export type Parametres = {
  nbQuestions: number;
  mode: Mode;
  equipes: [string, string];
  minuteurActif: boolean;
  dureeMinuteur: number; // en secondes
};
