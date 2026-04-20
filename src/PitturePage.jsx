import { useEffect, useRef } from "react";
import "./PitturePage.css";

export default function PitturePage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      threshold: 0.7, // La card deve essere visibile al 70% per attivarsi
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-active");
        } else {
          entry.target.classList.remove("is-active");
        }
      });
    }, observerOptions);

    const cards = containerRef.current.querySelectorAll(".box-image-pitt");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);
  return (
    <div className="box-pitture">
      <div className="container-pitture">
        <h2 className="titolo-pitture">Pitture e Sistema Tintometrico a Strudà</h2>
        <h4 className="sottotitolo-pitture">
  Con il nostro <strong>tintometro professionale</strong>, portaci un campione di tessuto, 
  una foto o un codice colore: lo riproduciamo fedelmente per te.
</h4>
{/* Aggiungiamo il ref al contenitore dello scroll */}
<div className="flex-pitture" ref={containerRef}>
            <div className="box-image-pitt interno">
            <img className="img-pittura " src="/card-pittura-10.webp" alt="Pittura antimuffa per interni professionale"></img>
            <h3 className="titolo-pittura">
              Pittura <br />
              Antimuffa
              <br /> per INTERNO
            </h3>
            <img className="img-secchio" src="/secchi-11.webp" alt=" Secchio pittura antimuffa per interni professionale"></img>
          </div>

          <div className="box-image-pitt esterno ">
            <img className="img-pittura " src="/card-pittura-11.webp" alt="Pittura antimuffa Edilmarket" 
  />
            <h3 className="titolo-pittura">
              Pittura al <br />
              Quarzo per <br />
              ESTERNO
            </h3>
            <img className="img-secchio" src="/secchi-10.webp" alt="Secchio di pittura antimuffa Edilmarket" 
  />
          </div>

          <div className="box-image-pitt legno ">
            <img className="img-pittura " src="/card-pittura-12.webp" alt="Impregnante per legno Edilmarket" 
  />
            <h3 className="titolo-pittura">
              Pittura <br />
              per LEGNO
            </h3>
            <img className="img-secchio-legno" src="/secchi-12.webp" alt="Secchio Impregnante per legno Edilmarket" 
  />
          </div>
        </div>
      </div>
    </div>
  );
}
