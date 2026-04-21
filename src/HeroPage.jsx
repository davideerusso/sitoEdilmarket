import { useState } from "react";
import "./HeroPage.css";
import Grainient from './Grainient';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
export default function HeroPage() {
 
// Dati strutturati per la SEO Locale
const schemaData = {
  "@context": "https://schema.org",
  "@type": "HardwareStore", 
  "name": "Edilmarket",
  "image": "https://edilmarket.shop/logo.webp", // Inserisci l'URL completo del tuo logo
  "telephone": "+393204173656",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Provinciale Lecce-vernole", // MODIFICA QUI
    "addressLocality": "Struda",         // MODIFICA QUI
    "postalCode": "73029",                    // MODIFICA QUI
    "addressRegion": "Lecce",           // MODIFICA QUI
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.321024,  // Inserisci le tue coordinate reali
    "longitude": 18.2714368
  },
  "url": "https://www.edilmarket.shop", // Il tuo dominio
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "06:30",
      "closes": "19:00"
    }
  ],
 "areaServed": [
    { "@type": "City", "name": "Lecce" },
    { "@type": "City", "name": "Strudà" },
    { "@type": "City", "name": "Vernole" },
    { "@type": "City", "name": "Melendugno" },
    { "@type": "City", "name": "Lizzanello" },
    { "@type": "City", "name": "Castri di Lecce" },
    { "@type": "City", "name": "Cavallino" },
    { "@type": "City", "name": "San Cesario di Lecce" },
    { "@type": "City", "name": "Merine" }
  ],
 
};

    return (
      <div className="box-hero">
        <Helmet>
        <title>Ferramenta Edilmarket | Viteria e Vernici a Lecce</title>
                <meta name="description" content="Edilmarket: ferramenta specialistica a Strudà. Serviamo Vernole, Melendugno e tutta la provincia di Lecce con viteria, tintometro e articoli per edilizia." />
                  <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        </Helmet>

<div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>  <Grainient
    color1="#e21e25"
    color2="#f05b60"
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
<img src="/logo.webp" alt="Ferramenta Edilmarket - Strudà" className="logo-img" />   
 <div className="contact-icons">
          <a 
  href="https://www.google.com/maps/search/?api=1&query=Edilmarket+Struda+Provinciale+Lecce-vernole" 
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
            href="tel:+393204173656" 
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
  {/* Un unico H1 con parola chiave e città */}
  <h1 className="titolo">
    EdilMarket <br/><span className="titolo2">Il tuo punto di riferimento</span>
  </h1>

  <h2 className="sotto-titolo">
  Dalla viteria specialistica alle vernici su misura,<br/> 
  soluzioni professionali per l'edilizia nella <strong>Provincia di Lecce</strong>.
</h2>
</div>
      </div>
      


      <div className="brush-fine"></div>
    </div>
  );
}
