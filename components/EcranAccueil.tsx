export function EcranAccueil({ onLancer }: { onLancer: () => void }) {
  return (
    <div className="m-auto flex max-w-5xl animate-apparition flex-col items-center gap-[4vh] text-center">
      <p className="font-mono text-lg font-semibold tracking-[0.3em] text-surligneur uppercase md:text-2xl">
        Dossier d&apos;enquête · Classé confidentiel
      </p>
      <h1 className="font-titre text-[clamp(3rem,9vw,8rem)] leading-none">
        Info <span className="text-surligneur">ou</span> Intox&nbsp;?
      </h1>
      <p className="max-w-3xl text-2xl leading-snug md:text-3xl">
        Une publication s&apos;affiche. À vous de mener l&apos;enquête&nbsp;: vraie info insolite ou fake news inventée&nbsp;?
      </p>
      <button
        type="button"
        onClick={onLancer}
        className="rounded-2xl bg-surligneur px-10 py-5 font-titre text-3xl text-nuit shadow-[0_8px_0_#b8902f] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none md:text-4xl"
      >
        Lancer une partie
      </button>
      <p className="font-mono text-lg">
        ou appuie sur <kbd className="rounded-md border-2 border-papier px-2 py-0.5 font-semibold">Espace</kbd>
      </p>
    </div>
  );
}
