// En français, on met une espace avant « ? ! : ; » et à l'intérieur des guillemets « ».
// Une espace normale permet au navigateur de couper la ligne juste avant le « ? »,
// qui se retrouve alors tout seul au début de la ligne suivante.
// On remplace donc ces espaces par des espaces insécables (qui ne coupent jamais).
const INSECABLE = String.fromCharCode(0x00a0);

export function insecables(texte: string): string {
  return texte.replace(/ ([?!:;»])/g, `${INSECABLE}$1`).replace(/« /g, `«${INSECABLE}`);
}
