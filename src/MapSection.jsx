import React from 'react';
import './MapSection.css';

export default function MapSection() {
  // Sostituisci con le tue coordinate reali o indirizzo
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.2127!2d18.2934!3d40.2878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1344306efb00b8db%3A0x54e5c0a4d8f269f3!2sFerramenta%20Edilmarket!5e0!3m2!1sit!2sit!4v1713360000000!5m2!1sit!2sit";
  const directLink = "https://maps.app.goo.gl/ZHyKq1Zq2Q6AqtgS9";

  return (
    <section className="map-section">
              <h4 className='vieni'> Vieni a trovarci!</h4>

      <div className="map-container-outer">

        <a 
          href={directLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="map-click-area"
        >
          <div className="map-frame">
            <iframe
              src={mapUrl}
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