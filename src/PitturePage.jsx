import { useEffect, useRef, useState } from "react";
import "./PitturePage.css";

const schede = [
  {
    cls: "interno",
    img: "/card-pittura-10.webp",
    imgAlt: "Soggiorno con pareti tinteggiate",
    titolo: ["Pittura", "antimuffa", "per interni"],
    secchio: "/secchi-11.webp",
    secchioCls: "img-secchio",
    secchioAlt: "Secchio di pittura antimuffa per interni",
  },
  {
    cls: "esterno",
    img: "/card-pittura-11.webp",
    imgAlt: "Facciata di casa tinteggiata",
    titolo: ["Pittura", "al quarzo", "per esterni"],
    secchio: "/secchi-10.webp",
    secchioCls: "img-secchio",
    secchioAlt: "Secchio di pittura al quarzo per esterni",
  },
  {
    cls: "legno",
    img: "/card-pittura-12.webp",
    imgAlt: "Scala e pareti in legno",
    titolo: ["Prodotti", "per il legno"],
    secchio: "/secchi-12.webp",
    secchioCls: "img-secchio-legno",
    secchioAlt: "Barattolo di prodotto per il legno",
  },
];

export default function PitturePage() {
  const containerRef = useRef(null);
  const [attiva, setAttiva] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
            setAttiva(Number(entry.target.dataset.index));
          } else {
            entry.target.classList.remove("is-active");
          }
        });
      },
      { root: containerRef.current, threshold: 0.7 } // la card deve essere visibile al 70%
    );

    const cards = containerRef.current.querySelectorAll(".box-image-pitt");
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // Pallini sotto il carosello (solo su telefono): portano alla scheda scelta
  const vaiAllaScheda = (i) => {
    const box = containerRef.current;
    const card = box.querySelectorAll(".box-image-pitt")[i];
    const b = box.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    const riduciMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    box.scrollTo({
      left: box.scrollLeft + (c.left - b.left) - (b.width - c.width) / 2,
      behavior: riduciMovimento ? "auto" : "smooth",
    });
  };

  return (
    <div className="box-pitture">
      <div className="container-pitture">
        <h2 className="titolo-pitture">Pitture e Sistema Tintometrico</h2>
        <p className="sottotitolo-pitture">
          Con il nostro <strong>tintometro professionale</strong> coloriamo le pitture per interni ed
          esterni: portaci un campione di tessuto, una foto o un codice colore e lo riproduciamo
          fedelmente.
        </p>

        <div className="flex-pitture" ref={containerRef}>
          {schede.map((s, i) => (
            <div className={`box-image-pitt ${s.cls}`} data-index={i} key={s.cls}>
              <img className="img-pittura" src={s.img} alt={s.imgAlt} loading="lazy" decoding="async" />
              <h3 className="titolo-pittura">
                {s.titolo.map((riga, r) => (
                  <span key={r}>
                    {r > 0 && <br />}
                    {riga}
                  </span>
                ))}
              </h3>
              <img className={s.secchioCls} src={s.secchio} alt={s.secchioAlt} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>

        <div className="pitture-dots" role="group" aria-label="Scegli la scheda">
          {schede.map((s, i) => (
            <button
              key={s.cls}
              type="button"
              className={`pitture-dot${attiva === i ? " is-active" : ""}`}
              aria-label={s.titolo.join(" ")}
              aria-current={attiva === i ? "true" : undefined}
              onClick={() => vaiAllaScheda(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
