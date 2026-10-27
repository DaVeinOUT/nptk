// ─────────────────────────────────────────────────────────────────────────────
//  LES QUESTIONS DU JEU
//  15 vraies infos insolites (avec leur source) + 15 fake news inventées.
//
//  Pour ajouter une question : copie un bloc { … }, colle-le dans la bonne
//  section, change l'« id » (il doit être unique) et remplis les champs.
//  Le README explique chaque champ. Si un champ est mal rempli, le jeu
//  affiche la liste des erreurs au démarrage au lieu de se lancer.
//
//  ⚠️ Les fake news ci-dessous sont ENTIÈREMENT INVENTÉES pour un atelier
//  pédagogique : comptes, organismes, experts et « études » n'existent pas.
//  Aucune image n'est utilisée : les photos sont décrites entre crochets.
// ─────────────────────────────────────────────────────────────────────────────
import type { Question } from "@/lib/types";

// ── 15 VRAIES INFOS INSOLITES ────────────────────────────────────────────────
// Chaque info a été vérifiée sur la page indiquée dans « source ».
const vraies: Question[] = [
  {
    id: "v-wombat",
    type: "vrai",
    compte: "@Planete_Animaux",
    texte:
      "😱 Les wombats, des marsupiaux d'Australie, font des crottes… en forme de CUBE ! Des chercheurs ont même reçu un prix scientifique pour avoir compris comment.",
    illustration: "🟫",
    likes: "48,2 k",
    explication:
      "Vrai ! En 2019, une équipe a reçu le prix Ig Nobel de physique pour avoir étudié comment et pourquoi les wombats font des crottes cubiques. Le ton « choc » ne suffit donc pas à repérer une fake : il faut vérifier.",
    source: {
      media: "Improbable Research — site officiel des prix Ig Nobel",
      date: "12 septembre 2019",
      url: "https://improbable.com/ig/winners/",
    },
  },
  {
    id: "v-chat-liquide",
    type: "vrai",
    compte: "@Labo_Curieux",
    texte:
      "Un physicien français a reçu un prix pour avoir étudié une question très sérieuse : un chat est-il un solide… ou un liquide ? 🐈📦",
    illustration: "🐈",
    likes: "21,7 k",
    explication:
      "Vrai ! Marc-Antoine Fardin a reçu le prix Ig Nobel de physique 2017 pour avoir utilisé la science des écoulements afin de savoir si un chat peut être à la fois solide et liquide.",
    source: {
      media: "ENS de Lyon (site officiel)",
      date: "septembre 2017",
      url: "https://www.ens-lyon.fr/en/node/350483",
    },
  },
  {
    id: "v-bourdons-balles",
    type: "vrai",
    compte: "@Nature_en_Direct",
    texte:
      "Des scientifiques ont observé des bourdons qui font rouler de petites balles en bois… juste pour s'amuser, sans recevoir aucune récompense ! 🐝⚽",
    illustration: "🐝",
    likes: "9 312",
    explication:
      "Vrai ! Une étude de l'université Queen Mary de Londres a montré que des bourdons roulent des balles sans rien gagner en échange : c'est la première fois qu'on observe un insecte qui « joue » avec un objet.",
    source: {
      media: "Queen Mary University of London (communiqué officiel)",
      date: "27 octobre 2022",
      url: "https://www.qmul.ac.uk/sbbs/news/items/first-ever-study-shows-bumble-bees-play.html",
    },
  },
  {
    id: "v-rats-cache-cache",
    type: "vrai",
    compte: "@Sciences_Fun",
    texte:
      "Des chercheurs à Berlin ont appris à des rats à jouer à cache-cache avec des humains. Les rats savaient se cacher ET chercher ! 🐀🙈",
    illustration: "🐀",
    likes: "15,3 k",
    explication:
      "Vrai ! Des chercheurs de l'université Humboldt de Berlin ont montré que des rats apprennent vite à jouer à cache-cache et à changer de rôle. L'étude a été publiée dans la revue Science.",
    source: {
      media: "Université Humboldt de Berlin (communiqué en allemand)",
      date: "12 septembre 2019",
      url: "https://idw-online.de/de/news723380",
    },
  },
  {
    id: "v-mars-coucher-bleu",
    type: "vrai",
    compte: "@Espace_Curieux",
    texte: "Sur la planète Mars, le coucher de soleil n'est pas orange… il est BLEU ! 🌅 Un robot l'a photographié.",
    illustration: "🔵",
    likes: "33,1 k",
    explication:
      "Vrai ! Le robot Curiosity de la NASA a photographié un coucher de soleil bleuté sur Mars en 2015. La fine poussière martienne laisse mieux passer la lumière bleue près du Soleil.",
    source: {
      media: "NASA (Scientific Visualization Studio)",
      date: "21 mai 2015",
      url: "https://svs.gsfc.nasa.gov/11875",
    },
  },
  {
    id: "v-elephants-prenoms",
    type: "vrai",
    compte: "@Savane_Infos",
    texte:
      "Les éléphants d'Afrique s'appellent avec une sorte de « prénom » : un appel destiné à un éléphant précis… et c'est lui qui répond ! 🐘📣",
    illustration: "🐘",
    likes: "27,9 k",
    explication:
      "Vrai ! Une étude publiée en 2024 dans Nature Ecology & Evolution montre que les éléphants sauvages s'interpellent avec des appels qui ressemblent à des prénoms.",
    source: {
      media: "Colorado State University (communiqué officiel)",
      date: "10 juin 2024",
      url: "https://newsmediarelations.colostate.edu/2024/06/10/elephants-have-names-for-each-other-like-people-do-new-study-shows/",
    },
  },
  {
    id: "v-pluie-diamants",
    type: "vrai",
    compte: "@Cosmos_Express",
    texte:
      "Au cœur des planètes Uranus et Neptune, il pourrait pleuvoir… des diamants ! 💎 Des scientifiques ont recréé ce phénomène en laboratoire.",
    illustration: "💎",
    likes: "41,5 k",
    explication:
      "Vrai ! En 2017, des chercheurs du laboratoire SLAC (université Stanford) ont recréé avec des lasers la « pluie de diamants » qui se formerait à l'intérieur de ces planètes géantes de glace.",
    source: {
      media: "SLAC National Accelerator Laboratory (Stanford)",
      date: "21 août 2017",
      url: "https://www6.slac.stanford.edu/news/2017-08-21-scientists-create-diamond-rain-forms-interior-icy-giant-planets",
    },
  },
  {
    id: "v-golf-lune",
    type: "vrai",
    compte: "@Histoire_Insolite",
    texte: "En 1971, un astronaute a sorti un club et a frappé une balle de golf… sur la Lune ! ⛳🌕",
    illustration: "⛳",
    likes: "18,6 k",
    explication:
      "Vrai ! Pendant la mission Apollo 14, Alan Shepard est devenu la première personne à frapper une balle de golf sur la Lune, pour montrer jusqu'où elle irait avec une gravité plus faible.",
    source: {
      media: "NASA (page « Who Was Alan Shepard? »)",
      date: "11 mai 2011",
      url: "https://www.nasa.gov/learning-resources/for-kids-and-students/who-was-alan-shepard-grades-k-4/",
    },
  },
  {
    id: "v-manchots-espace",
    type: "vrai",
    compte: "@Planete_Animaux",
    texte:
      "Des scientifiques ont découvert de nouvelles colonies de manchots empereurs… en repérant leurs crottes depuis l'espace ! 🐧🛰️",
    illustration: "🐧",
    likes: "12,8 k",
    explication:
      "Vrai ! Sur des images satellites, les crottes des manchots forment de grandes taches brunes sur la glace. Cette méthode a permis de trouver 11 nouvelles colonies en Antarctique.",
    source: {
      media: "ESA — Agence spatiale européenne (ESA Kids)",
      date: "18 novembre 2020",
      url: "https://kids.esa.int/kids/en/news/Spotting_penguin_poo_from_space",
    },
  },
  {
    id: "v-astronautes-grandissent",
    type: "vrai",
    compte: "@Espace_Curieux",
    texte:
      "Dans l'espace, les astronautes grandissent ! 🚀📏 Leur taille augmente d'environ 3 % en quelques jours… puis ils rapetissent en revenant sur Terre.",
    illustration: "🚀",
    likes: "22,4 k",
    explication:
      "Vrai ! Sans gravité, la colonne vertébrale n'est plus tassée : selon la NASA, les astronautes gagnent environ 3 % de taille en 3 à 4 jours, puis reprennent leur taille sur Terre.",
    source: {
      media: "NASA (fiche pédagogique Mission X)",
      date: "avril 2018",
      url: "https://www.nasa.gov/wp-content/uploads/2018/05/whatisyourspaceheight.pdf",
    },
  },
  {
    id: "v-pates-cacio",
    type: "vrai",
    compte: "@Cuisine_et_Science",
    texte:
      "Des physiciens ont reçu un prix pour avoir étudié la sauce des pâtes « cacio e pepe »… et comment éviter qu'elle fasse des grumeaux ! 🍝🔬",
    illustration: "🍝",
    likes: "6 457",
    explication:
      "Vrai ! En 2025, des chercheurs italiens, espagnols, allemands et autrichiens ont reçu le prix Ig Nobel de physique pour leurs découvertes sur la physique de cette sauce au fromage.",
    source: {
      media: "Improbable Research — site officiel des prix Ig Nobel",
      date: "18 septembre 2025",
      url: "https://improbable.com/ig/winners/",
    },
  },
  {
    id: "v-tardigrades",
    type: "vrai",
    compte: "@Micro_Monde",
    texte:
      "Des animaux minuscules, les tardigrades, ont survécu 12 jours exposés au vide de l'espace ! 🔬🚀 Ce sont les premiers animaux connus à avoir fait ça.",
    illustration: "🔬",
    likes: "11,2 k",
    explication:
      "Vrai ! En 2007, environ 3 000 tardigrades (« oursons d'eau ») ont voyagé sur la mission Foton-M3. Ils ont survécu à l'exposition à l'espace, comme l'a annoncé l'Agence spatiale européenne.",
    source: {
      media: "ESA — Agence spatiale européenne",
      date: "10 novembre 2008",
      url: "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Research/Tiny_animals_survive_exposure_to_space",
    },
  },
  {
    id: "v-lego-mer",
    type: "vrai",
    compte: "@Mer_et_Plages",
    texte:
      "En 1997, une énorme vague a fait tomber d'un cargo un conteneur rempli de près de 5 millions de pièces Lego. Des années plus tard, on en trouvait encore sur les plages anglaises ! 🧱🌊",
    illustration: "🧱",
    likes: "30,5 k",
    explication:
      "Vrai ! Le cargo Tokio Express a perdu sa cargaison dans une tempête en 1997. En 2014, des promeneurs ramassaient encore des dragons et des palmes Lego sur les plages du sud de l'Angleterre.",
    source: {
      media: "The World (radio publique PRX)",
      date: "21 juillet 2014",
      url: "https://theworld.org/stories/2014/07/21/cargo-spill-left-5-million-pieces-lego-ocean-woman-has-been-finding-them",
    },
  },
  {
    id: "v-chienne-1022-mots",
    type: "vrai",
    compte: "@Animaux_Genies",
    texte: "Une chienne border collie connaissait le nom de 1 022 jouets différents… et savait les retrouver ! 🐕🧸",
    illustration: "🐕",
    likes: "52,0 k",
    explication:
      "Vrai ! Chaser, une border collie, a appris le nom de 1 022 objets en trois ans avec deux chercheurs d'une université américaine. L'étude a été publiée en 2011.",
    source: {
      media: "NPR (radio publique américaine)",
      date: "11 janvier 2011",
      url: "https://www.npr.org/sections/thetwo-way/2011/01/11/132839704/good-dog-border-collie-learns-more-than-1-000-words",
    },
  },
  {
    id: "v-rats-voitures",
    type: "vrai",
    compte: "@Sciences_Fun",
    texte: "Des scientifiques ont appris à des rats à conduire de minuscules voitures… pour gagner des céréales ! 🐀🚗",
    illustration: "🚗",
    likes: "38,7 k",
    explication:
      "Vrai ! Des chercheurs de l'université de Richmond (États-Unis) ont appris à des rats à piloter de petites voitures, avec des céréales comme récompense.",
    source: {
      media: "NPR (radio publique américaine)",
      date: "23 octobre 2019",
      url: "https://www.npr.org/transcripts/772557752",
    },
  },
];

// ── 15 FAKE NEWS INVENTÉES ───────────────────────────────────────────────────
// Répartition des techniques : 2 fois chacune pour titre-choc, fausse-source,
// chiffre-invente, faux-expert, image-hors-contexte, image-ia ;
// 1 fois chacune pour faux-compte-officiel, urgence-partage, satire-prise-au-serieux.
const fakes: Question[] = [
  {
    id: "f-devoirs-interdits",
    type: "fake",
    compte: "@InfoChoc_FR",
    texte:
      "🚨🚨 INCROYABLE !!! Les DEVOIRS bientôt INTERDITS dans TOUS les collèges !!! 😱😱 Les profs n'en reviennent pas !!!",
    illustration: "📚",
    likes: "87,3 k",
    explication: "Inventé ! Les majuscules et les émojis d'alerte servent à faire réagir avant de réfléchir.",
    technique: "titre-choc",
    indices: [
      "Des MAJUSCULES et des points d'exclamation partout.",
      "Aucune date, aucune source, aucun nom d'école.",
      "Une décision pareille ferait la une de tous les médias.",
    ],
  },
  {
    id: "f-pluie-bonbons",
    type: "fake",
    compte: "@Buzz_Express_Actu",
    texte:
      "😱😱 DINGUE !!! Une pluie de BONBONS est tombée sur une ville du Sud ce matin !!! 🍬🍬 Les habitants n'en croient pas leurs yeux !!!",
    illustration: "🍬",
    likes: "64,1 k",
    explication: "Inventé ! Le ton affolé cache l'absence totale d'informations vérifiables.",
    technique: "titre-choc",
    indices: [
      "« Une ville du Sud » : laquelle ? Aucun lieu précis.",
      "Pas de photo, pas de témoin nommé, pas de date.",
      "Des émojis et des points d'exclamation pour remplacer les preuves.",
    ],
  },
  {
    id: "f-etude-fenetre",
    type: "fake",
    compte: "@Le_Savoir_Malin",
    texte:
      "📊 Une étude a prouvé que les élèves assis près de la fenêtre ont de meilleures notes que les autres. Les chercheurs recommandent de changer de place tous les mois !",
    illustration: "🪟",
    likes: "14,9 k",
    explication: "Inventé ! « Une étude a prouvé » sans dire laquelle : impossible de vérifier.",
    technique: "fausse-source",
    indices: [
      "Quelle étude ? Aucun nom de chercheur, d'université ni de revue.",
      "Pas de lien pour lire l'étude.",
      "« Les chercheurs recommandent » : lesquels ?",
    ],
  },
  {
    id: "f-pigeons-horloges",
    type: "fake",
    compte: "@Curieux_Du_Net",
    texte:
      "Des scientifiques ont découvert que les pigeons des villes savent lire l'heure sur les horloges des gares. 🕰️🐦 C'est prouvé !",
    illustration: "🐦",
    likes: "19,2 k",
    explication: "Inventé ! « Des scientifiques » et « c'est prouvé », mais aucune preuve n'est montrée.",
    technique: "fausse-source",
    indices: [
      "Aucun scientifique ni laboratoire n'est nommé.",
      "« C'est prouvé ! » sans montrer la moindre preuve.",
      "Pas de lien vers une étude ou un article sérieux.",
    ],
  },
  {
    id: "f-1000-baguettes",
    type: "fake",
    compte: "@Stats_Etonnantes",
    texte:
      "🥖 Chiffre officiel : chaque Français mange en moyenne 1 000 baguettes par an ! Soit presque 3 baguettes par jour, bébés compris.",
    illustration: "🥖",
    likes: "23,6 k",
    explication: "Inventé ! Un chiffre bien rond et impossible pour avoir l'air sérieux.",
    technique: "chiffre-invente",
    indices: [
      "Presque 3 baguettes par jour pour chacun, bébés compris : impossible.",
      "Un nombre trop rond (1 000 pile).",
      "« Chiffre officiel » mais aucun organisme cité.",
    ],
  },
  {
    id: "f-cantine-4000h",
    type: "fake",
    compte: "@Ecole_Infos_Choc",
    texte:
      "🍽️ Les collégiens passent 4 000 heures par an à la cantine ! C'est plus que le temps passé en classe. Les chiffres sont là.",
    illustration: "🍽️",
    likes: "11,4 k",
    explication: "Inventé ! Le calcul est impossible : une année entière ne compte que 8 760 heures.",
    technique: "chiffre-invente",
    indices: [
      "4 000 heures, c'est presque la moitié d'une année entière, nuits comprises.",
      "« Les chiffres sont là » : mais d'où viennent-ils ?",
    ],
  },
  {
    id: "f-expert-nuages",
    type: "fake",
    compte: "@Meteo_Mystere",
    texte:
      "☁️ Selon le Pr Hector Savantin, de l'Académie Internationale des Nuages, les nuages en forme d'animaux annoncent 3 jours de beau temps. 🐘☀️",
    illustration: "☁️",
    likes: "8 105",
    explication: "Inventé ! L'expert et son « académie » n'existent pas.",
    technique: "faux-expert",
    indices: [
      "Ni ce professeur ni cette académie n'existent quand on cherche.",
      "Un vrai météorologue ne prévoit pas le temps avec la forme des nuages.",
      "Un titre ronflant pour impressionner.",
    ],
  },
  {
    id: "f-expert-pyjama",
    type: "fake",
    compte: "@Astuces_Collège",
    texte:
      "« Faire ses devoirs en pyjama fait gagner 2 points de moyenne », affirme le Dr Lina Pixel, directrice de l'Institut Européen du Sommeil Intelligent. 🛌📚",
    illustration: "🛌",
    likes: "29,8 k",
    explication: "Inventé ! Un nom d'institut impressionnant ne prouve rien : celui-ci n'existe pas.",
    technique: "faux-expert",
    indices: [
      "L'« Institut Européen du Sommeil Intelligent » n'a aucun site, aucune publication.",
      "Le Dr Lina Pixel est introuvable.",
      "Aucune étude n'est citée pour le chiffre de 2 points.",
    ],
  },
  {
    id: "f-manchot-lille",
    type: "fake",
    compte: "@Lille_Insolite_Actu",
    texte:
      "❄️ Un manchot s'est échappé du zoo et se promène dans les rues de Lille ce matin ! Ouvrez l'œil ! 🐧",
    photo: "un manchot debout sur un trottoir, près d'une plage",
    likes: "41,0 k",
    explication:
      "Inventé ! La photo pourrait être vraie mais prise ailleurs, par exemple sur une plage d'Afrique du Sud où vivent des manchots : c'est la légende qui ment.",
    technique: "image-hors-contexte",
    indices: [
      "Rien sur la photo ne montre que c'est Lille.",
      "Le zoo et la rue ne sont pas nommés, aucun média local n'en parle.",
      "Une recherche d'image inversée permet de retrouver d'où vient la photo.",
    ],
  },
  {
    id: "f-neige-aout",
    type: "fake",
    compte: "@Meteo_Folle_FR",
    texte: "❄️☀️ Il a neigé en plein mois d'août à Marseille ! Photo prise ce matin par un abonné.",
    photo: "une rue couverte de neige avec des voitures garées",
    likes: "56,3 k",
    explication: "Inventé ! Une vieille photo d'hiver, prise ailleurs, présentée comme une photo du jour.",
    technique: "image-hors-contexte",
    indices: [
      "Aucun lieu reconnaissable de Marseille sur la photo.",
      "« Un abonné » anonyme : impossible de savoir qui l'a prise, ni quand.",
      "La recherche d'image inversée montre souvent qu'une photo date d'une autre année.",
    ],
  },
  {
    id: "f-chat-codeur",
    type: "fake",
    compte: "@Animaux_Stars",
    texte:
      "Voici Pixel, le chat qui a appris à programmer tout seul ! 🐱💻 Il vient de créer son propre jeu vidéo.",
    photo:
      "un chat devant un clavier, avec une patte en trop, des moustaches qui se fondent dans le décor et un écran couvert de lettres illisibles",
    likes: "93,5 k",
    explication: "Inventé ! L'image a été fabriquée par une intelligence artificielle.",
    technique: "image-ia",
    indices: [
      "Des détails bizarres typiques des images IA : patte en trop, contours qui fondent.",
      "Le texte sur l'écran est illisible, comme souvent dans les images générées.",
      "Aucune vidéo, aucun jeu à télécharger : juste une image.",
    ],
  },
  {
    id: "f-burger-geant",
    type: "fake",
    compte: "@Food_Records_Actu",
    texte: "🍔 Record battu : un burger de 12 mètres a été servi hier dans un fast-food de Nantes !",
    photo:
      "un burger géant devant un restaurant, des passants aux mains à six doigts et une enseigne aux lettres déformées",
    likes: "47,2 k",
    explication: "Inventé ! L'image a été générée par IA : regarde les mains et l'enseigne.",
    technique: "image-ia",
    indices: [
      "Des mains à six doigts : un défaut classique des images IA.",
      "Des lettres déformées sur l'enseigne.",
      "Aucun nom de restaurant ni d'organisme qui aurait validé le record.",
    ],
  },
  {
    id: "f-vacances-rallongees",
    type: "fake",
    compte: "@Vacances_Scolaires_Officiel ✔️",
    texte:
      "📢 COMMUNIQUÉ OFFICIEL : les vacances d'été sont rallongées de 2 semaines pour tous les élèves cette année. Plus d'infos bientôt.",
    illustration: "🏖️",
    likes: "112 k",
    explication: "Inventé ! Le compte imite un compte officiel, mais n'en est pas un.",
    technique: "faux-compte-officiel",
    indices: [
      "Le ✔️ fait partie du nom du compte : ce n'est pas un vrai badge de vérification.",
      "Une vraie annonce serait sur le site officiel du ministère et reprise par tous les médias.",
      "Aucun lien vers un texte officiel, juste « plus d'infos bientôt ».",
    ],
  },
  {
    id: "f-appli-secrete",
    type: "fake",
    compte: "@Astuces_Gamers_Secretes",
    texte:
      "⚠️ PARTAGE VITE avant que ce soit supprimé !!! Une appli secrète donne des points illimités dans tous les jeux en ligne. Ils ne veulent pas que tu le saches 🤫 Lien en bio !",
    illustration: "🎮",
    likes: "76,8 k",
    explication: "Inventé ! On te presse de partager pour que tu ne prennes pas le temps de vérifier.",
    technique: "urgence-partage",
    indices: [
      "« Avant que ce soit supprimé » : une pression pour partager vite.",
      "« Ils ne veulent pas que tu le saches » : qui, « ils » ?",
      "Une offre trop belle avec un « lien en bio » : souvent une arnaque.",
    ],
  },
  {
    id: "f-satire-21-sur-20",
    type: "fake",
    compte: "@InfoFlash_Actu",
    texte:
      "Incroyable ce qui se passe dans les écoles !! 😳 « Un collégien obtient 21/20 en maths : son prof pense qu'il a révisé un peu trop » (via La Gazette du Pas-Sérieux)",
    illustration: "📰",
    likes: "17,5 k",
    explication: "Inventé ! C'est une blague d'un site d'humour, partagée comme une vraie info.",
    technique: "satire-prise-au-serieux",
    indices: [
      "La source s'appelle « La Gazette du Pas-Sérieux » : un site d'humour.",
      "21/20, c'est impossible : c'est une blague.",
      "Le compte partage la blague au premier degré, sans le dire.",
    ],
  },
];

export const questions: Question[] = [...vraies, ...fakes];
