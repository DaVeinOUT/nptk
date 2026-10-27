# Info ou Intox ?

Jeu pédagogique de sensibilisation aux fake news, pour des jeunes de 11 à 17 ans.
Une publication s'affiche au tableau, la salle vote à main levée (**vraie info insolite** ou **fake news inventée ?**),
l'animateur clique la réponse majoritaire, puis l'écran révèle la vérité avec une explication.

- 30 questions : 15 vraies infos vérifiées (avec leur source) et 15 fake news entièrement inventées.
- Mode « 1 salle » ou « 2 équipes », minuteur optionnel, pilotage complet au clavier.
- Aucune base de données, aucun compte, aucun secret : tout le contenu est dans `data/questions.ts`.

> ⚠️ Les fake news du jeu sont **inventées pour un atelier**. Chaque carte affiche « Jeu pédagogique — Info ou Intox ? »
> et, après la révélation d'une fake, un bandeau rouge « FAKE — inventée pour un atelier », pour qu'une capture d'écran
> ne puisse pas circuler comme une vraie info.

---

## 1. Installer

Il faut **Node.js 20.9 ou plus récent** (version « LTS » sur [nodejs.org](https://nodejs.org)).

```bash
# Dans le dossier du projet :
npm install
```

`npm install` télécharge les bibliothèques listées dans `package.json` (dans le dossier `node_modules/`).

## 2. Lancer

| Commande        | À quoi ça sert                                                                    |
| --------------- | --------------------------------------------------------------------------------- |
| `npm run dev`   | Lance le site en mode développement sur <http://localhost:3000> (se recharge seul) |
| `npm run build` | Prépare la version finale : des fichiers HTML/CSS/JS dans le dossier `out/`       |
| `npm run start` | Affiche la version finale (dossier `out/`) sur <http://localhost:3000>            |
| `npm test`      | Lance les tests automatiques (Vitest)                                             |
| `npm run lint`  | Vérifie le style et les erreurs courantes du code (ESLint)                        |

Pour un atelier, le plus fiable est d'utiliser le site déployé sur Vercel (voir § 6), ou `npm run build` puis `npm run start`.

Le jeu n'a pas besoin de serveur : `npm run build` produit un site « statique » (de simples fichiers dans `out/`).
C'est pour ça qu'il fonctionne chez n'importe quel hébergeur (Netlify, Vercel, GitHub Pages…).

## 3. Animer une partie

1. **Accueil** → « Lancer une partie » (ou `Espace`).
2. **Paramètres** : nombre de questions (5 à 20, 10 par défaut), mode 1 salle ou 2 équipes (noms de 20 caractères max),
   minuteur (20 s par défaut, désactivable).
3. **Question** : la salle vote, l'animateur appuie sur `V` ou `F` (il peut changer d'avis), puis `Espace` pour révéler.
4. **Révélation** : tampon VRAI/FAKE, explication, source (vraie info) ou technique + indices (fake). `Espace` pour continuer.
5. **Fin** : score final et « Les 5 réflexes ».

### Touches de l'animateur

| Touche   | Action                                                                  |
| -------- | ----------------------------------------------------------------------- |
| `V`      | Vraie info                                                              |
| `F`      | Fake news                                                               |
| `Espace` | Révéler la réponse / passer à la question suivante                      |
| `1`, `2` | Choisir l'équipe qui répond (mode 2 équipes)                            |
| `P`      | Mettre le minuteur en pause / le relancer                               |
| `Échap`  | Retour à l'accueil (une fenêtre demande confirmation pendant une partie) |
| `H`      | Masquer / afficher le rappel des touches en bas de l'écran              |

**Règles de score**

- 1 bonne réponse = 1 point. Mauvaise réponse ou pas de réponse = 0 point.
- On peut révéler sans avoir choisi (salle indécise, temps écoulé) : ça compte « pas de réponse ».
- Quand le minuteur arrive à 0, il affiche « Temps écoulé ! » mais ne bloque rien : l'animateur garde la main.
- En mode 2 équipes, les équipes répondent **chacune leur tour** automatiquement ; `1`/`2` (ou un clic sur le nom) force l'équipe qui répond.
- Le tirage est aléatoire, moitié vraies infos / moitié fakes (à une près si le nombre est impair),
  et jamais plus de 3 questions du même type d'affilée.

---

## 4. Comment le code est organisé

```
app/
  layout.tsx          Le « cadre » de toutes les pages : polices, langue, couleur de fond
  page.tsx            La page d'accueil : valide les questions puis affiche le jeu (ou un message d'erreur)
  globals.css         Couleurs du thème, animations, réglage « moins d'animations »
components/
  Jeu.tsx             Le chef d'orchestre : état de la partie, clavier, minuteur, choix de l'écran
  EcranAccueil.tsx    Écran titre
  EcranParametres.tsx Formulaire des paramètres
  EcranQuestion.tsx   Carte + boutons VRAIE INFO / FAKE NEWS + révélation
  CartePost.tsx       La publication façon réseau social (avec la mention « Jeu pédagogique »)
  Tampon.tsx          Le tampon animé VRAI / FAKE
  Revelation.tsx      Panneau d'explication : source, ou technique + indices
  BarreScore.tsx      Score de la salle ou des deux équipes
  CompteurAnime.tsx   Nombre qui défile quand le score change
  Minuteur.tsx        Le minuteur (cliquable pour la pause)
  EcranFin.tsx        Score final + « Les 5 réflexes »
  AideClavier.tsx     Rappel des touches
  ConfirmationQuitter.tsx  Fenêtre « Retourner à l'accueil ? »
  ErreurDonnees.tsx   Message affiché si le fichier de questions est invalide
lib/
  types.ts            La forme des données (Question, Technique, Parametres…)
  schema.ts           Les règles de validation des questions (Zod)
  partie.ts           Les règles du jeu (points, tour des équipes…) dans une fonction « reducer »
  tirage.ts           Le tirage aléatoire équilibré
  techniques.ts       Nom et explication de chaque technique de manipulation
  nettoyage.ts        Nettoyage des noms d'équipe
  typographie.ts      Espaces insécables avant « ? ! : » (typographie française)
data/
  questions.ts        LES 30 QUESTIONS
tests/                Tests automatiques (tirage, scores, mode 2 équipes, validation)
```

**Quelques notions pour s'y retrouver**

- **Composant** : une fonction qui renvoie un morceau d'interface (du « JSX », qui ressemble à du HTML).
  Ex. `CartePost` reçoit une question et renvoie la carte.
- **État (`useState`, `useReducer`)** : une donnée qui peut changer (score, question en cours…).
  Quand elle change, React met l'écran à jour tout seul.
- **Reducer** (`lib/partie.ts`) : toutes les règles du jeu sont dans une seule fonction
  `(état actuel, action) → nouvel état`. Exemple : l'action `REVELER` calcule si la réponse est juste et ajoute le point.
  Comme cette fonction ne touche pas à l'écran, on peut la tester facilement.
- **Classes Tailwind** : le style est écrit directement dans `className`
  (`text-2xl` = grand texte, `bg-papier` = fond crème, `md:` = « à partir d'un écran moyen »,
  `court:` = « sur un écran peu haut », comme un vidéoprojecteur 1280×720).
  Les couleurs du thème sont définies dans `app/globals.css`.

**Modifier une couleur** : change la valeur dans `app/globals.css` (bloc `@theme`). Exemple : `--color-surligneur: #ffd166;`.

---

## 5. Ajouter (ou modifier) une question

Tout se passe dans **`data/questions.ts`**. Copie un bloc `{ … }` existant, colle-le dans la bonne liste
(`vraies` ou `fakes`), puis modifie-le.

### Les champs

| Champ          | Obligatoire ?                | Description                                                                 |
| -------------- | ---------------------------- | --------------------------------------------------------------------------- |
| `id`           | oui                          | Identifiant **unique**, sans espace. Ex. `"v-pieuvre"` ou `"f-cantine"`.    |
| `type`         | oui                          | `"vrai"` ou `"fake"`.                                                       |
| `compte`       | oui                          | Nom du compte affiché sur la carte. Ex. `"@Planete_Animaux"`.               |
| `texte`        | oui                          | Le texte de la publication, **280 caractères maximum**.                     |
| `illustration` | non                          | Un émoji affiché en haut à droite de la carte. Ex. `"🐙"`.                  |
| `photo`        | non                          | La description d'une photo, affichée « [Photo : …] » (au lieu d'une image). |
| `likes`        | oui                          | Nombre de « j'aime » affiché. Ex. `"12,4 k"`.                               |
| `explication`  | oui                          | La phrase affichée à la révélation.                                         |
| `source`       | **oui si vrai**, non si fake | `{ media: "…", date: "…", url: "https://…" }`. L'URL doit être en `https`.  |
| `technique`    | **oui si fake**, non si vrai | Une des 9 techniques (liste ci-dessous).                                    |
| `indices`      | **oui si fake**, non si vrai | 2 ou 3 phrases : ce qui permettait de repérer la fake.                      |

**Techniques possibles** : `"titre-choc"`, `"fausse-source"`, `"chiffre-invente"`, `"faux-expert"`,
`"image-hors-contexte"`, `"image-ia"`, `"faux-compte-officiel"`, `"urgence-partage"`, `"satire-prise-au-serieux"`.

### Exemple : une vraie info

```ts
{
  id: "v-exemple",
  type: "vrai",
  compte: "@Nature_en_Direct",
  texte: "Le texte de la publication, tel qu'il apparaît sur la carte.",
  illustration: "🐙",
  likes: "8 450",
  explication: "Vrai ! Une phrase qui explique l'info.",
  source: {
    media: "Nom du média ou de l'institution",
    date: "12 mars 2024",
    url: "https://www.exemple.org/article",
  },
},
```

### Exemple : une fake news

```ts
{
  id: "f-exemple",
  type: "fake",
  compte: "@Compte_Invente",
  texte: "🚨 INCROYABLE !!! …",
  illustration: "📢",
  likes: "25,1 k",
  explication: "Inventé ! Une phrase qui explique la manipulation.",
  technique: "titre-choc",
  indices: ["Premier indice.", "Deuxième indice.", "Troisième indice (facultatif)."],
},
```

### Règles de contenu (à respecter pour chaque nouvelle question)

- **Vraies infos** : un fait réel, vérifié sur une source fiable (AFP, Reuters, BBC, franceinfo, Le Monde, 20 Minutes,
  Ouest-France, Sciences et Avenir, site officiel d'une institution scientifique…). Pas de mort, de violence,
  d'accident grave ni de sujet triste.
- **Fake news** : entièrement inventées. Aucune personne réelle, aucune vraie marque ou entreprise accusée,
  aucun vrai média imité. Sujets interdits : santé et médicaments, vaccins, élections et partis, religions, origines,
  migrants, catastrophes ou attentats réels, guerres. Rien qui puisse faire peur ou nourrir de la haine.
- **Images** : aucune photo de personne réelle. Préférer un émoji ou une description `photo`.

### Et si je me trompe ?

Pas de panique : au démarrage, le jeu **vérifie toutes les questions**. S'il y a une erreur (texte trop long, source
manquante, `id` en double…), il affiche la liste des problèmes au lieu de se lancer, par exemple :

```
Question n°31 (v-exemple) → texte : le texte dépasse 280 caractères
```

Lance aussi `npm test` : un test vérifie que le fichier est valide.

---

## 6. Déployer sur Vercel (gratuit)

1. Mets le projet sur GitHub (c'est déjà le cas si tu lis ce fichier sur GitHub).
2. Va sur [vercel.com](https://vercel.com) et connecte-toi **avec ton compte GitHub**.
3. Clique sur **« Add New… » → « Project »**, puis choisis le dépôt du jeu → **« Import »**.
4. Vercel reconnaît Next.js tout seul : ne change aucun réglage, clique sur **« Deploy »**.
5. Après une minute environ, Vercel donne une adresse du type `https://info-ou-intox.vercel.app` : c'est le jeu en ligne.

Ensuite, **chaque modification envoyée sur la branche principale** (`main`) est redéployée automatiquement.
Aucune variable d'environnement n'est nécessaire. Si un jour il en faut une, elle se met dans un fichier `.env.local`
(jamais dans le code, ce fichier n'est pas envoyé sur GitHub) et dans **Settings → Environment Variables** sur Vercel.

### Avec Netlify

Le dépôt contient un fichier `netlify.toml` qui indique à Netlify de construire le jeu (`npm run build`, dossier `out`).
Sans lui, Netlify afficherait l'ancien fichier `index.html` à la racine au lieu du jeu. Il suffit d'importer le dépôt
sur [netlify.com](https://www.netlify.com) (« Add new site » → « Import an existing project ») : les réglages sont lus automatiquement.

**Conseil atelier** : ouvre le site avant l'atelier et vérifie la connexion de la salle. Mets le navigateur en plein écran (`F11`).

---

## 7. Sécurité et accessibilité

- Seule saisie : les noms d'équipe (20 caractères max, caractères invisibles retirés, affichés comme du texte par React).
  Aucun `dangerouslySetInnerHTML`.
- Liens vers les sources : `target="_blank"` avec `rel="noopener noreferrer"`.
- En-têtes de sécurité HTTP configurés dans `netlify.toml` (Netlify) et `vercel.json` (Vercel).
- Résultat annoncé aux lecteurs d'écran (`aria-live`), boutons accessibles au clavier, contour de focus jaune bien visible,
  contrastes vérifiés (niveau AA), animations coupées si l'ordinateur demande « moins d'animations ».

## 8. Les sources des 15 vraies infos

Chaque URL a été ouverte et vérifiée (octobre 2026). Les grands médias francophones bloquaient l'outil de recherche
utilisé : les sources sont donc surtout des **sites officiels d'institutions scientifiques** (NASA, ESA, universités)
et deux radios publiques (NPR, The World/PRX), presque toutes en anglais. Tu peux les remplacer par des articles
francophones équivalents si tu en trouves.

| Info                                   | Source                                                       |
| -------------------------------------- | ------------------------------------------------------------ |
| Crottes cubiques des wombats           | Site officiel des prix Ig Nobel (rubrique 2019, « wombat »)  |
| Un chat solide ou liquide ?            | ENS de Lyon                                                  |
| Les bourdons jouent à la balle         | Queen Mary University of London                              |
| Des rats jouent à cache-cache          | Université Humboldt de Berlin (communiqué en allemand)       |
| Coucher de soleil bleu sur Mars        | NASA                                                         |
| Les éléphants ont des « prénoms »      | Colorado State University                                    |
| Pluie de diamants sur Uranus et Neptune | SLAC (Stanford)                                             |
| Golf sur la Lune                       | NASA                                                         |
| Crottes de manchots vues de l'espace   | ESA (Agence spatiale européenne)                             |
| Les astronautes grandissent            | NASA (fiche pédagogique Mission X)                           |
| Physique des pâtes cacio e pepe        | Site officiel des prix Ig Nobel (rubrique 2025, « pasta »)   |
| Tardigrades dans l'espace              | ESA                                                          |
| Lego perdus en mer                     | The World (PRX)                                              |
| Une chienne connaît 1 022 jouets       | NPR                                                          |
| Des rats conduisent des voitures       | NPR                                                          |
