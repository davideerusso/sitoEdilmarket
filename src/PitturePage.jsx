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
        <h3 className="titolo-pitture">Diamo colore ai tuoi progetti</h3>
        <h4 className="sottotitolo-pitture">
          Portaci un campione di tessuto, una foto o un codice colore:
 lo riproduciamo fedelmente per te.
        </h4>
{/* Aggiungiamo il ref al contenitore dello scroll */}
<div className="flex-pitture" ref={containerRef}>
            <div className="box-image-pitt interno">
            <img className="img-pittura " src="/card-pittura-10.webp"></img>
            <h3 className="titolo-pittura">
              Pittura <br />
              Antimuffa
              <br /> per INTERNO
            </h3>
            <img className="img-secchio" src="/secchi-11.webp"></img>
          </div>

          <div className="box-image-pitt esterno ">
            <img className="img-pittura " src="/card-pittura-11.webp"></img>
            <h3 className="titolo-pittura">
              Pittura al <br />
              Quarzo per <br />
              ESTERNO
            </h3>
            <img className="img-secchio" src="/secchi-10.webp"></img>
          </div>

          <div className="box-image-pitt legno ">
            <img className="img-pittura " src="/card-pittura-12.webp"></img>
            <h3 className="titolo-pittura">
              Pittura <br />
              per LEGNO
            </h3>
            <img className="img-secchio-legno" src="/secchi-12.webp"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
