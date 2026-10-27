// Validation des questions avec Zod.
// TypeScript vérifie les types pendant qu'on écrit le code, mais pas les règles
// comme « 280 caractères max » ou « 2 ou 3 indices ». Zod vérifie ces règles
// au démarrage : si une question est mal remplie, le jeu affiche un message clair
// au lieu de planter au milieu d'un atelier.
import { z } from "zod";
import { TECHNIQUES, type Question } from "./types";

export const LONGUEUR_MAX_TEXTE = 280;

const sourceSchema = z.object({
  media: z.string().trim().min(1, "le nom du média est vide"),
  date: z.string().trim().min(1, "la date de la source est vide"),
  url: z.url({ protocol: /^https$/, error: "l'URL de la source doit commencer par https://" }),
});

export const questionSchema = z
  .object({
    id: z.string().trim().min(1, "l'identifiant est vide"),
    type: z.enum(["vrai", "fake"], { error: "le type doit être \"vrai\" ou \"fake\"" }),
    compte: z.string().trim().min(1, "le nom du compte est vide"),
    texte: z
      .string()
      .trim()
      .min(1, "le texte est vide")
      .max(LONGUEUR_MAX_TEXTE, `le texte dépasse ${LONGUEUR_MAX_TEXTE} caractères`),
    illustration: z.string().trim().min(1).optional(),
    photo: z.string().trim().min(1).optional(),
    likes: z.string().trim().min(1, "le nombre de likes est vide"),
    explication: z.string().trim().min(1, "l'explication est vide"),
    source: sourceSchema.optional(),
    technique: z.enum(TECHNIQUES, { error: "technique inconnue" }).optional(),
    indices: z.array(z.string().trim().min(1, "un indice est vide")).optional(),
  })
  // Règles qui dépendent du type de la question.
  .superRefine((q, ctx) => {
    if (q.type === "vrai") {
      if (!q.source) {
        ctx.addIssue({ code: "custom", path: ["source"], message: "une vraie info doit avoir une source" });
      }
      if (q.technique || q.indices) {
        ctx.addIssue({
          code: "custom",
          path: ["technique"],
          message: "une vraie info ne doit pas avoir de technique ni d'indices",
        });
      }
    } else {
      if (!q.technique) {
        ctx.addIssue({ code: "custom", path: ["technique"], message: "une fake doit avoir une technique" });
      }
      if (!q.indices || q.indices.length < 2 || q.indices.length > 3) {
        ctx.addIssue({ code: "custom", path: ["indices"], message: "une fake doit avoir 2 ou 3 indices" });
      }
      if (q.source) {
        ctx.addIssue({ code: "custom", path: ["source"], message: "une fake ne doit pas avoir de source" });
      }
    }
  });

export const banqueSchema = z
  .array(questionSchema)
  .min(1, "le fichier ne contient aucune question")
  .superRefine((liste, ctx) => {
    const dejaVus = new Set<string>();
    liste.forEach((q, i) => {
      if (dejaVus.has(q.id)) {
        ctx.addIssue({ code: "custom", path: [i, "id"], message: `l'identifiant « ${q.id} » est utilisé deux fois` });
      }
      dejaVus.add(q.id);
    });
    const types = new Set(liste.map((q) => q.type));
    if (!types.has("vrai") || !types.has("fake")) {
      ctx.addIssue({ code: "custom", path: [], message: "il faut au moins une vraie info et une fake" });
    }
  });

export type ResultatValidation = { ok: true; questions: Question[] } | { ok: false; erreurs: string[] };

// Transforme les données brutes en liste de questions sûre,
// ou en liste d'erreurs lisibles (« Question n°3 (v-wombat) → texte : … »).
export function validerQuestions(donnees: unknown): ResultatValidation {
  const resultat = banqueSchema.safeParse(donnees);
  if (resultat.success) {
    return { ok: true, questions: resultat.data };
  }
  const erreurs = resultat.error.issues.map((issue) => {
    const [index, ...reste] = issue.path;
    if (typeof index !== "number") {
      return issue.message;
    }
    const brute = Array.isArray(donnees) ? (donnees[index] as { id?: unknown } | undefined) : undefined;
    const id = typeof brute?.id === "string" && brute.id ? ` (${brute.id})` : "";
    const champ = reste.length > 0 ? `${reste.join(".")} : ` : "";
    return `Question n°${index + 1}${id} → ${champ}${issue.message}`;
  });
  return { ok: false, erreurs };
}
