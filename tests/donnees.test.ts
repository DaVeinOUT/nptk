import { describe, expect, it } from "vitest";
import { questions } from "@/data/questions";
import { validerQuestions } from "@/lib/schema";
import { nettoyerNomEquipe } from "@/lib/nettoyage";
import { TECHNIQUES } from "@/lib/types";

describe("le fichier data/questions.ts", () => {
  it("est valide", () => {
    const resultat = validerQuestions(questions);
    expect(resultat.ok ? [] : resultat.erreurs).toEqual([]);
  });

  it("contient 15 vraies infos et 15 fakes", () => {
    expect(questions.filter((q) => q.type === "vrai")).toHaveLength(15);
    expect(questions.filter((q) => q.type === "fake")).toHaveLength(15);
  });

  it("utilise les 9 techniques, chacune 1 ou 2 fois", () => {
    const comptes = new Map<string, number>();
    questions.forEach((q) => q.technique && comptes.set(q.technique, (comptes.get(q.technique) ?? 0) + 1));
    expect([...comptes.keys()].sort()).toEqual([...TECHNIQUES].sort());
    comptes.forEach((n) => expect(n === 1 || n === 2).toBe(true));
  });
});

describe("validerQuestions", () => {
  const vraie = {
    id: "v1",
    type: "vrai",
    compte: "@a",
    texte: "Un texte",
    likes: "1 k",
    explication: "Vrai !",
    source: { media: "Média", date: "1er janvier 2020", url: "https://exemple.org/article" },
  };
  const fake = {
    id: "f1",
    type: "fake",
    compte: "@b",
    texte: "Un texte",
    likes: "2 k",
    explication: "Inventé !",
    technique: "titre-choc",
    indices: ["indice 1", "indice 2"],
  };

  it("accepte une banque correcte", () => {
    expect(validerQuestions([vraie, fake]).ok).toBe(true);
  });

  it("refuse un fichier vide ou qui n'est pas une liste", () => {
    expect(validerQuestions([]).ok).toBe(false);
    expect(validerQuestions(undefined).ok).toBe(false);
    expect(validerQuestions({}).ok).toBe(false);
  });

  it("refuse un texte de plus de 280 caractères, avec un message clair", () => {
    const resultat = validerQuestions([{ ...vraie, texte: "a".repeat(281) }, fake]);
    expect(resultat.ok).toBe(false);
    if (!resultat.ok) expect(resultat.erreurs[0]).toBe("Question n°1 (v1) → texte : le texte dépasse 280 caractères");
  });

  it("refuse une vraie info sans source", () => {
    expect(validerQuestions([{ ...vraie, source: undefined }, fake]).ok).toBe(false);
  });

  it("refuse une URL de source qui n'est pas en https", () => {
    expect(validerQuestions([{ ...vraie, source: { ...vraie.source, url: "http://exemple.org" } }, fake]).ok).toBe(false);
    expect(validerQuestions([{ ...vraie, source: { ...vraie.source, url: "javascript:alert(1)" } }, fake]).ok).toBe(false);
  });

  it("refuse une fake avec 1 ou 4 indices, ou une technique inconnue", () => {
    expect(validerQuestions([vraie, { ...fake, indices: ["seul"] }]).ok).toBe(false);
    expect(validerQuestions([vraie, { ...fake, indices: ["1", "2", "3", "4"] }]).ok).toBe(false);
    expect(validerQuestions([vraie, { ...fake, technique: "magie" }]).ok).toBe(false);
  });

  it("refuse deux questions avec le même identifiant", () => {
    const resultat = validerQuestions([vraie, fake, { ...fake }]);
    expect(resultat.ok).toBe(false);
    if (!resultat.ok) expect(resultat.erreurs.join(" ")).toContain("utilisé deux fois");
  });

  it("refuse une banque sans aucune fake", () => {
    expect(validerQuestions([vraie, { ...vraie, id: "v2" }]).ok).toBe(false);
  });
});

describe("nettoyerNomEquipe", () => {
  it("retire les espaces en trop", () => {
    expect(nettoyerNomEquipe("   Les    Lynx  ", "Équipe 1")).toBe("Les Lynx");
  });

  it("coupe à 20 caractères", () => {
    expect(nettoyerNomEquipe("abcdefghijklmnopqrstuvwxyz", "Équipe 1")).toBe("abcdefghijklmnopqrst");
  });

  it("ne coupe jamais un émoji en deux", () => {
    expect(Array.from(nettoyerNomEquipe("🦊".repeat(30), "Équipe 1"))).toHaveLength(20);
  });

  it("retire les caractères invisibles et de contrôle", () => {
    expect(nettoyerNomEquipe("Les\u200B Hi\u202Eboux\u0007", "Équipe 2")).toBe("Les Hiboux");
  });

  it("garde le texte tel quel (React l'affichera comme du texte, pas du HTML)", () => {
    expect(nettoyerNomEquipe("<b>Team</b>", "Équipe 1")).toBe("<b>Team</b>");
  });

  it("utilise le nom par défaut si le nom est vide", () => {
    expect(nettoyerNomEquipe("   ", "Équipe 2")).toBe("Équipe 2");
    expect(nettoyerNomEquipe("\u200B\u200B", "Équipe 1")).toBe("Équipe 1");
  });
});
