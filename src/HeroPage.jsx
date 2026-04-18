import { useState } from "react";
import "./HeroPage.css";
import Grainient from './Grainient';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
export default function HeroPage() {
 
  return (
<div className="box-hero">

<div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>  <Grainient
    color1="#e21e25"
    color2="#ffa8ab"
    color3="#2e60b7"
    timeSpeed={1.2}
    colorBalance={-0.04}
    warpStrength={1}
    warpFrequency={5}
    warpSpeed={1.9}
    warpAmplitude={80}
    blendAngle={-10}
    blendSoftness={0.05}
    rotationAmount={120}
    noiseScale={2.05}
    grainAmount={0}
    grainScale={2}
    grainAnimated={false}
    contrast={1.5}
    gamma={1}
    saturation={1.1}
    centerX={0}
    centerY={-0.03}
    zoom={0.75}
  />
</div>
<div className="logo-container">
    <img src="/logo.webp" alt="Logo" className="logo-img" />
    <div className="contact-icons">
          {/* Link alla Mappa con Icona Vettoriale */}
          <a 
            href="https://www.google.com/maps/place/Ferramenta+Edilmarket+di+Russo+Claudio/@40.3128055,18.2789037,17z/data=!3m1!4b1!4m6!3m5!1s0x1344306efb00b8db:0x54e5c0a4d8f269f3!8m2!3d40.3128055!4d18.2814786!16s%2Fg%2F11y3n1x3s?entry=ttu&g_ep=EgoyMDI2MDQxNC4wIKXMDSoASAFQAw%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon-link"
            title="Vedi posizione su Maps"
          >
            <div className="icon-circle">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="fa-icon" />
            </div>
          </a>

          {/* Link al Telefono con Icona Vettoriale */}
          <a 
            href="tel:+39012345678" 
            className="icon-link"
            title="Chiama ora"
          >
            <div className="icon-circle">
              <FontAwesomeIcon icon={faPhoneAlt} className="fa-icon" />
            </div>
          </a>
        </div>
      </div>
      <div className="container-hero">
       
        <div className="box-title">
        <h1 className="titolo">IL TUO PUNTO DI </h1>
        <h1 className="titolo2">RIFERIMENTO</h1>
        <h2 className="sotto-titolo">
          Dalla viteria specialistica alle vernici su misura,
          <br />
          la ferramenta di fiducia al tuo servizio.
        </h2>
        </div>
      </div>


      <div className="brush-fine"></div>
    </div>
  );
}
