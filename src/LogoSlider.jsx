import './LogoSlider.css';

// r = proporzione larghezza/altezza del logo (ritagliato senza margini).
// La larghezza si calcola in modo che tutti i loghi abbiano circa la stessa "presenza".
const AREA = 3000;
const logos = [
  { src: '/loghi/boero.png', alt: 'Boero', r: 1.24 },
  { src: '/loghi/elematic.png', alt: 'Elematic', r: 5.18 },
  { src: '/loghi/far.png', alt: 'Far', r: 2.39 },
  { src: '/loghi/faren.png', alt: 'Faren', r: 6.91 },
  { src: '/loghi/giacomini.png', alt: 'Giacomini', r: 5.0 },
  { src: '/loghi/sigill.png', alt: 'Sigill', r: 2.15 },
  { src: '/loghi/stanley.png', alt: 'Stanley', r: 6.47 },
  { src: '/loghi/vorpa.png', alt: 'Vorpa', r: 3.89 },
].map((l) => ({ ...l, w: Math.round(Math.sqrt(AREA * l.r)) }));

export default function LogoSlider() {
  return (
    <div className="logo-slider-container">
      <div className="logo-slide-track">
        {[...logos, ...logos].map((logo, i) => {
          const copia = i >= logos.length; // seconda serie, serve solo per lo scorrimento continuo
          return (
            <div className="logo-item" key={i} aria-hidden={copia ? 'true' : undefined}>
              <img
                src={logo.src}
                alt={copia ? '' : logo.alt}
                width={logo.w}
                height={Math.round(logo.w / logo.r)}
                style={{ '--w': `${logo.w}px` }}
                loading="lazy"
                decoding="async"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
