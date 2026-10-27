import { describe, expect, it } from "vitest";
import { questions } from "@/data/questions";
import { MAX_MEME_TYPE_AFFILEE, melanger, sequenceDeTypes, tirerQuestions, type Alea } from "@/lib/tirage";
import type { Question, TypeInfo } from "@/lib/types";

// Générateur pseudo-aléatoire « à graine » : mêmes nombres à chaque lancement,
// donc des tests reproductibles.
function aleaGraine(graine: number): Alea {
  let etat = graine >>> 0;
  return () => {
    etat = (etat + 0x6d2b79f5) >>> 0;
    let t = etat;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function plusLongueSerie(types: TypeInfo[]): number {
  let max = 0;
  let serie = 0;
  types.forEach((type, i) => {
    serie = i > 0 && types[i - 1] === type ? serie + 1 : 1;
    max = Math.max(max, serie);
  });
  return max;
}

const compter = (liste: Question[], type: TypeInfo) => liste.filter((q) => q.type === type).length;

describe("melanger", () => {
  it("garde exactement les mêmes éléments", () => {
    const liste = [1, 2, 3, 4, 5, 6, 7, 8];
    const resultat = melanger(liste, aleaGraine(1));
    expect([...resultat].sort()).toEqual(liste);
    expect(liste).toEqual([1, 2, 3, 4, 5, 6, 7, 8]); // la liste d'origine n'est pas modifiée
  });
});

describe("sequenceDeTypes", () => {
  it("ne met jamais plus de 3 questions du même type d'affilée (10 000 tirages)", () => {
    const alea = aleaGraine(42);
    for (let essai = 0; essai < 10_000; essai++) {
      const total = 5 + Math.floor(alea() * 16);
      const nbVrai = Math.floor(total / 2) + (total % 2);
      const sequence = sequenceDeTypes(nbVrai, total - nbVrai, alea);
      expect(sequence).toHaveLength(total);
      expect(plusLongueSerie(sequence)).toBeLessThanOrEqual(MAX_MEME_TYPE_AFFILEE);
    }
  });

  it("respecte la règle même quand les deux types sont déséquilibrés (mais faisables)", () => {
    const alea = aleaGraine(7);
    for (let essai = 0; essai < 2_000; essai++) {
      const sequence = sequenceDeTypes(9, 3, alea); // 9 ≤ 3 × (3 + 1) : faisable de justesse
      expect(sequence.filter((t) => t === "vrai")).toHaveLength(9);
      expect(plusLongueSerie(sequence)).toBeLessThanOrEqual(MAX_MEME_TYPE_AFFILEE);
    }
  });
});

describe("tirerQuestions", () => {
  it.each([5, 6, 10, 15, 20])("tire %i questions équilibrées et sans doublon", (nombre) => {
    const alea = aleaGraine(nombre);
    for (let essai = 0; essai < 500; essai++) {
      const tirage = tirerQuestions(questions, nombre, alea);
      expect(tirage).toHaveLength(nombre);
      expect(new Set(tirage.map((q) => q.id)).size).toBe(nombre);
      expect(Math.abs(compter(tirage, "vrai") - compter(tirage, "fake"))).toBeLessThanOrEqual(1);
      expect(plusLongueSerie(tirage.map((q) => q.type))).toBeLessThanOrEqual(MAX_MEME_TYPE_AFFILEE);
    }
  });

  it("avec un nombre impair, la question en plus est parfois vraie, parfois fake", () => {
    const alea = aleaGraine(3);
    const nbVrais = new Set<number>();
    for (let essai = 0; essai < 200; essai++) nbVrais.add(compter(tirerQuestions(questions, 7, alea), "vrai"));
    expect([...nbVrais].sort()).toEqual([3, 4]);
  });

  it("ne demande jamais plus de questions qu'il n'y en a dans la banque", () => {
    const petiteBanque = questions.filter((q) => q.type === "vrai").slice(0, 2).concat(questions.filter((q) => q.type === "fake").slice(0, 2));
    expect(tirerQuestions(petiteBanque, 20, aleaGraine(1))).toHaveLength(4);
  });

  it("complète avec l'autre type si un type manque", () => {
    const banque = questions.filter((q) => q.type === "vrai").slice(0, 2).concat(questions.filter((q) => q.type === "fake"));
    const tirage = tirerQuestions(banque, 6, aleaGraine(5));
    expect(compter(tirage, "vrai")).toBe(2);
    expect(compter(tirage, "fake")).toBe(4);
  });
});
