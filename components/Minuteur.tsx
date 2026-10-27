type Props = {
  restant: number;
  enPause: boolean;
  actif: boolean; // false pendant la révélation : le minuteur est figé
  onBasculerPause: () => void;
};

export function Minuteur({ restant, enPause, actif, onBasculerPause }: Props) {
  const ecoule = restant === 0;
  const urgent = actif && !enPause && restant > 0 && restant <= 5;

  let couleurs = "bg-nuit-clair text-papier border-papier";
  if (ecoule) couleurs = "bg-alerte-fonce text-white border-alerte-fonce";
  else if (urgent) couleurs = "bg-alerte-fonce text-white border-alerte-fonce animate-clignote";
  else if (enPause) couleurs = "bg-surligneur text-nuit border-surligneur";

  let texte = `${restant} s`;
  if (ecoule) texte = "Temps écoulé !";
  else if (enPause) texte = `⏸ Pause · ${restant} s`;

  return (
    <button
      type="button"
      role="timer"
      onClick={onBasculerPause}
      disabled={!actif || ecoule}
      aria-label={ecoule ? "Temps écoulé" : `${restant} secondes restantes${enPause ? ", en pause" : ""}`}
      title="Pause : touche P"
      className={`min-w-36 rounded-xl border-4 px-4 py-1.5 font-mono text-2xl font-semibold tabular-nums disabled:cursor-default md:text-3xl ${couleurs}`}
    >
      <span aria-hidden>⏱ </span>
      {texte}
    </button>
  );
}
