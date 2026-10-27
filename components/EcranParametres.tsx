"use client";
import { useState, type FormEvent } from "react";
import { LONGUEUR_MAX_NOM_EQUIPE, nettoyerNomEquipe } from "@/lib/nettoyage";
import type { Mode, Parametres } from "@/lib/types";

const DUREES = [10, 15, 20, 30, 45, 60];

type Props = {
  parametresInitiaux: Parametres;
  minQuestions: number;
  maxQuestions: number;
  onValider: (parametres: Parametres) => void;
  onRetour: () => void;
};

const styleBoutonChoix =
  "block cursor-pointer rounded-xl border-4 border-papier px-5 py-3 text-xl font-semibold peer-checked:border-surligneur peer-checked:bg-surligneur peer-checked:text-nuit peer-focus-visible:outline-4 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-surligneur md:text-2xl";

export function EcranParametres({ parametresInitiaux, minQuestions, maxQuestions, onValider, onRetour }: Props) {
  // Copie locale des réglages : rien n'est appliqué tant qu'on n'a pas validé.
  const [nbQuestions, setNbQuestions] = useState(
    Math.min(Math.max(parametresInitiaux.nbQuestions, minQuestions), maxQuestions),
  );
  const [mode, setMode] = useState<Mode>(parametresInitiaux.mode);
  const [equipes, setEquipes] = useState<[string, string]>(parametresInitiaux.equipes);
  const [minuteurActif, setMinuteurActif] = useState(parametresInitiaux.minuteurActif);
  const [dureeMinuteur, setDureeMinuteur] = useState(parametresInitiaux.dureeMinuteur);

  function changerNombre(valeur: number) {
    setNbQuestions(Math.min(Math.max(valeur, minQuestions), maxQuestions));
  }

  function changerNomEquipe(index: 0 | 1, valeur: string) {
    // La saisie brute est gardée telle quelle ; elle sera nettoyée à la validation.
    const copie: [string, string] = [...equipes];
    copie[index] = valeur;
    setEquipes(copie);
  }

  function valider(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // empêche le rechargement de la page
    onValider({
      nbQuestions,
      mode,
      equipes: [nettoyerNomEquipe(equipes[0], "Équipe 1"), nettoyerNomEquipe(equipes[1], "Équipe 2")],
      minuteurActif,
      dureeMinuteur,
    });
  }

  return (
    <form onSubmit={valider} className="mx-auto flex w-full max-w-4xl animate-apparition flex-col gap-[3vh]">
      <div>
        <p className="font-mono text-lg font-semibold tracking-[0.25em] text-surligneur uppercase">Préparation</p>
        <h1 className="font-titre text-4xl md:text-6xl">Paramètres de l&apos;enquête</h1>
      </div>

      {/* Nombre de questions */}
      <fieldset className="rounded-2xl bg-nuit-clair p-5 md:p-6">
        <legend className="sr-only">Nombre de questions</legend>
        <label htmlFor="nb-questions" className="text-2xl font-bold md:text-3xl">
          Nombre de questions : <span className="font-mono text-surligneur">{nbQuestions}</span>
        </label>
        <div className="mt-4 flex items-center gap-4">
          <button
            type="button"
            onClick={() => changerNombre(nbQuestions - 1)}
            aria-label="Une question de moins"
            className="grid size-14 shrink-0 place-items-center rounded-xl bg-papier font-titre text-3xl text-nuit"
          >
            −
          </button>
          <input
            id="nb-questions"
            type="range"
            min={minQuestions}
            max={maxQuestions}
            step={1}
            value={nbQuestions}
            onChange={(e) => changerNombre(Number(e.target.value))}
            className="h-3 w-full cursor-pointer accent-surligneur"
          />
          <button
            type="button"
            onClick={() => changerNombre(nbQuestions + 1)}
            aria-label="Une question de plus"
            className="grid size-14 shrink-0 place-items-center rounded-xl bg-papier font-titre text-3xl text-nuit"
          >
            +
          </button>
        </div>
        <p className="mt-2 font-mono text-base">
          De {minQuestions} à {maxQuestions} questions, moitié vraies infos, moitié fakes.
        </p>
      </fieldset>

      {/* Mode de jeu */}
      <fieldset className="rounded-2xl bg-nuit-clair p-5 md:p-6">
        <legend className="float-left mb-4 w-full text-2xl font-bold md:text-3xl">Mode de jeu</legend>
        <div className="clear-both flex flex-wrap gap-4">
          <label>
            <input
              type="radio"
              name="mode"
              value="salle"
              checked={mode === "salle"}
              onChange={() => setMode("salle")}
              className="peer sr-only"
            />
            <span className={styleBoutonChoix}>👥 1 salle</span>
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="equipes"
              checked={mode === "equipes"}
              onChange={() => setMode("equipes")}
              className="peer sr-only"
            />
            <span className={styleBoutonChoix}>⚔️ 2 équipes</span>
          </label>
        </div>

        {mode === "equipes" && (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {([0, 1] as const).map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <label htmlFor={`equipe-${i}`} className="text-xl font-semibold">
                  Nom de l&apos;équipe {i + 1}
                </label>
                <input
                  id={`equipe-${i}`}
                  type="text"
                  value={equipes[i]}
                  maxLength={LONGUEUR_MAX_NOM_EQUIPE}
                  onChange={(e) => changerNomEquipe(i, e.target.value)}
                  autoComplete="off"
                  className="rounded-xl border-4 border-transparent bg-papier px-4 py-3 text-xl text-nuit focus:border-surligneur"
                />
                <span className="font-mono text-base">{LONGUEUR_MAX_NOM_EQUIPE} caractères maximum</span>
              </div>
            ))}
          </div>
        )}
      </fieldset>

      {/* Minuteur */}
      <fieldset className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-2xl bg-nuit-clair p-5 md:p-6">
        <legend className="sr-only">Minuteur</legend>
        <label className="flex cursor-pointer items-center gap-3 text-2xl font-bold md:text-3xl">
          <input
            type="checkbox"
            checked={minuteurActif}
            onChange={(e) => setMinuteurActif(e.target.checked)}
            className="size-7 cursor-pointer accent-surligneur"
          />
          Minuteur
        </label>
        <label className="flex items-center gap-3 text-xl font-semibold">
          Durée par question
          <select
            value={dureeMinuteur}
            disabled={!minuteurActif}
            onChange={(e) => setDureeMinuteur(Number(e.target.value))}
            className="rounded-xl bg-papier px-3 py-2 text-xl text-nuit disabled:cursor-not-allowed disabled:opacity-60"
          >
            {DUREES.map((d) => (
              <option key={d} value={d}>
                {d} s
              </option>
            ))}
          </select>
        </label>
      </fieldset>

      <div className="flex flex-wrap justify-between gap-4">
        <button
          type="button"
          onClick={onRetour}
          className="rounded-2xl border-4 border-papier px-8 py-4 text-2xl font-bold"
        >
          ← Retour
        </button>
        <button
          type="submit"
          className="rounded-2xl bg-surligneur px-10 py-4 font-titre text-2xl text-nuit shadow-[0_6px_0_#b8902f] active:translate-y-1 active:shadow-none md:text-3xl"
        >
          Commencer l&apos;enquête
        </button>
      </div>
    </form>
  );
}
