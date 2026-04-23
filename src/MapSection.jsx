import React from 'react';
import './MapSection.css';

  // Sostituisci con le tue coordinate reali o indirizzo
  export default function MapSection() {
// Ho aggiunto il parametro per lo zoom ravvicinato direttamente nell'URL
const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11103.102596655657!2d18.273098890488217!3d40.31214390633416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1344306efb00b8db%3A0x54e5c0a4d8f269f3!2sFerramenta%20Edilmarket%20di%20Russo%20Claudio!5e0!3m2!1sit!2sit!4v1776951980415!5m2!1sit!2sit";
    const directLink = "https://share.google/EcQtz3TnDrcULWFbN";
  
    return (
      <section className="map-section" id="dove-siamo">
        <div className="map-container-outer">
          <h2 className='vieni'>Vieni a trovarci</h2>
          
  
          <a 
            href={directLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="map-click-area"
            title="Apri indicazioni stradali su Google Maps"
          >
            <div className="map-frame">
              <iframe
                src={mapUrl}
                title="Posizione Edilmarket a Strudà"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </a>
        </div>
      </section>
    );
  }