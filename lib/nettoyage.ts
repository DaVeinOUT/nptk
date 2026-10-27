// Nettoyage des noms d'équipe, la seule chose que l'utilisateur peut taper.
// React échappe déjà le texte affiché (pas d'injection de HTML possible) ;
// ici on retire en plus les caractères invisibles et on limite la longueur.

export const LONGUEUR_MAX_NOM_EQUIPE = 20;

// Caractères de contrôle, caractères « invisibles » (largeur nulle)
// et caractères qui inversent le sens d'écriture.
const CARACTERES_INTERDITS = /[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2060-\u2069\uFEFF]/g;

export function nettoyerNomEquipe(brut: string, parDefaut: string): string {
  const propre = brut.normalize("NFC").replace(CARACTERES_INTERDITS, "").replace(/\s+/g, " ").trim();
  // Array.from découpe par caractère réel : un émoji compte pour 1, et n'est jamais coupé en deux.
  const coupe = Array.from(propre).slice(0, LONGUEUR_MAX_NOM_EQUIPE).join("").trim();
  return coupe.length > 0 ? coupe : parDefaut;
}
