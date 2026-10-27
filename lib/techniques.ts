import type { Technique } from "./types";

// Nom lisible et explication courte de chaque technique, affichés à la révélation.
// Le type Record<Technique, …> oblige à décrire les 9 techniques : en oublier une = erreur.
export const TECHNIQUES_INFOS: Record<Technique, { nom: string; description: string }> = {
  "titre-choc": {
    nom: "Titre choc",
    description: "Majuscules, émojis d'alerte, « INCROYABLE » : tout est fait pour te faire réagir avant de réfléchir.",
  },
  "fausse-source": {
    nom: "Fausse source",
    description: "« Une étude prouve… », mais sans lien, sans auteur, sans nom de revue : impossible de vérifier.",
  },
  "chiffre-invente": {
    nom: "Chiffre inventé",
    description: "Une statistique trop ronde ou carrément impossible, pour avoir l'air sérieux.",
  },
  "faux-expert": {
    nom: "Faux expert",
    description: "Un titre ronflant et un organisme au nom impressionnant… qui n'existent pas.",
  },
  "image-hors-contexte": {
    nom: "Image hors contexte",
    description: "Une vraie photo, mais prise ailleurs ou à une autre date, avec une fausse légende.",
  },
  "image-ia": {
    nom: "Image générée par IA",
    description: "Une image fabriquée par une intelligence artificielle, présentée comme une vraie photo.",
  },
  "faux-compte-officiel": {
    nom: "Faux compte officiel",
    description: "Un nom de compte qui imite un compte officiel pour inspirer confiance.",
  },
  "urgence-partage": {
    nom: "Urgence à partager",
    description: "« Partage avant que ce soit supprimé ! » : on te presse pour que tu ne vérifies pas.",
  },
  "satire-prise-au-serieux": {
    nom: "Satire prise au sérieux",
    description: "Un article humoristique, partagé comme si c'était une vraie info.",
  },
};
