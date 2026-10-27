import { questions } from "@/data/questions";
import { validerQuestions } from "@/lib/schema";
import { ErreurDonnees } from "@/components/ErreurDonnees";
import { Jeu } from "@/components/Jeu";

// Cette page tourne sur le serveur (et au moment du build) :
// on vérifie les questions une fois, avant d'envoyer le jeu au navigateur.
export default function Page() {
  const resultat = validerQuestions(questions);
  if (!resultat.ok) {
    return <ErreurDonnees erreurs={resultat.erreurs} />;
  }
  return <Jeu banque={resultat.questions} />;
}
