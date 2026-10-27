"use client";
import { useEffect, useRef, useState } from "react";

// Un nombre qui « défile » jusqu'à sa nouvelle valeur.
// Si l'ordinateur demande moins d'animations, le nombre change d'un coup.
export function CompteurAnime({ valeur, duree = 700 }: { valeur: number; duree?: number }) {
  const [affiche, setAffiche] = useState(valeur);
  const precedent = useRef(valeur);

  useEffect(() => {
    const depart = precedent.current;
    if (depart === valeur) return;
    const sansAnimation = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const debut = performance.now();

    let image = requestAnimationFrame(function etape(maintenant) {
      const progression = sansAnimation ? 1 : Math.min(1, (maintenant - debut) / duree);
      const actuel = Math.round(depart + (valeur - depart) * progression);
      precedent.current = actuel;
      setAffiche(actuel);
      if (progression < 1) image = requestAnimationFrame(etape);
    });
    return () => cancelAnimationFrame(image);
  }, [valeur, duree]);

  return (
    <>
      <span aria-hidden className="inline-block tabular-nums">
        {affiche}
      </span>
      <span className="sr-only">{valeur}</span>
    </>
  );
}
