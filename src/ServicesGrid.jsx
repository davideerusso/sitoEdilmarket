import React from 'react';
import './ServicesGrid.css';
import DotField from './DotField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTools, faPaintRoller, faHashtag, faLightbulb, 
  faHardHat, faHammer, faFaucet, faKey 
} from '@fortawesome/free-solid-svg-icons';

const services = [
  { id: 1, title: "Ferramenta", icon: faTools, desc: "Utensileria professionale per ogni esigenza." },
  { id: 2, title: "Colorificio", icon: faPaintRoller, desc: "Vernici su misura con sistema tintometrico." },
  { id: 3, title: "Viteria", icon: faHashtag, desc: "Vasto assortimento di bulloneria e fissaggi." },
  { id: 4, title: "Elettricità", icon: faLightbulb, desc: "Materiale elettrico e illuminazione." },
  { id: 5, title: "Edilizia", icon: faHardHat, desc: "Soluzioni tecniche per il cantiere." },
  { id: 6, title: "Fai da Te", icon: faHammer, desc: "Tutto per i tuoi progetti domestici." },
  { id: 7, title: "Idraulica", icon: faFaucet, desc: "Componenti e raccorderia idraulica." },
  { id: 8, title: "Sicurezza", icon: faKey, desc: "Duplicazione chiavi e serrature di sicurezza." },
];

export default function ServicesGrid() {
    return (
<section className="services-section" style={{ position: 'relative', backgroundColor: '#fdfaf5' }}>        
        {/* BACKGROUND ANIMATO - Ora è bloccato dietro tutto */}
       
  
        {/* CONTENUTO - Con zIndex superiore per stare sopra i puntini */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="services-header">
            <h2 className="services-title">I NOSTRI SERVIZI</h2>
            <div className="services-line"></div>
          </div>
          
          <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
      <div className="services-grid" style={{ pointerEvents: 'auto' }}>
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon-wrapper">
                  <FontAwesomeIcon icon={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
          </div>

        </div>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: 0, 
          pointerEvents: 'none' // Importante: permette di cliccare le card sotto i puntini
        }}>
          <DotField
            dotRadius={2}
            dotSpacing={16}
            bulgeStrength={60}
            glowRadius={160}
            sparkle={false}
            waveAmplitude={0}
            cursorRadius={500}
            cursorForce={0.1}
            bulgeOnly
            gradientFrom="#e21e25"
            gradientTo="#ff9ca0"
            glowColor="transparent" /* Cambiato in trasparente per non coprire il crema */
          />
        </div>
      </section>
    );
  }