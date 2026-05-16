import React from 'react';
import './LogoSlider.css';

const logos = [
  { id: 1, src: '/loghi/boero.png', alt: 'Boero' },
  { id: 2, src: '/loghi/elematic.png',  alt: 'Elematic' },
  { id: 3, src: '/loghi/far.png',  alt: 'Far' },
  { id: 4, src: '/loghi/faren.png',  alt: 'Faren' },
  { id: 5, src: '/loghi/giacomini.png', alt: 'Giacomini' },
  { id: 6, src: '/loghi/sigill.png',  alt: 'Sigill' },
  { id: 7, src: '/loghi/stanley.png',  alt: 'Stanley' },
  { id: 8, src: '/loghi/vorpa.png',  alt: 'Vorpa' },


];

export default function LogoSlider() {
  return (
    <div className="logo-slider-container">
      <div className="logo-slide-track">
        {logos.map((logo) => (
          <div className="logo-item" key={`first-${logo.id}`}>
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
        {logos.map((logo) => (
          <div className="logo-item" key={`second-${logo.id}`}>
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}