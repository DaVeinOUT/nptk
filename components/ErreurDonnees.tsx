// Affiché à la place du jeu si data/questions.ts est vide ou mal rempli.
export function ErreurDonnees({ erreurs }: { erreurs: string[] }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-6 px-6 py-12">
      <p className="font-mono text-lg font-semibold tracking-widest text-surligneur uppercase">Dossier bloqué</p>
      <h1 className="font-titre text-4xl md:text-5xl">Le fichier de questions contient des erreurs</h1>
      <p className="text-xl">
        Le jeu ne peut pas démarrer. Ouvre le fichier <code className="font-mono text-surligneur">data/questions.ts</code>{" "}
        et corrige les points suivants :
      </p>
      <ul className="list-disc space-y-2 rounded-xl bg-nuit-clair p-6 pl-10 font-mono text-lg">
        {erreurs.map((erreur, i) => (
          <li key={i}>{erreur}</li>
        ))}
      </ul>
      <p className="text-lg">Le README explique à quoi sert chaque champ d&apos;une question.</p>
    </main>
  );
}
