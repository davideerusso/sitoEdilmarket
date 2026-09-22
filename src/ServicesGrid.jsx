import './ServicesGrid.css';
import DotField from './DotField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTools, faPaintRoller, faLightbulb,
  faHardHat, faHammer, faFaucet, faKey
} from '@fortawesome/free-solid-svg-icons';

// Icona "vite" disegnata apposta (Font Awesome gratuito non ne ha una)
function ScrewIcon() {
  return (
    <svg className="service-svg" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M144 24h224a40 40 0 0 1 40 40v28a40 40 0 0 1-40 40H144a40 40 0 0 1-40-40V64a40 40 0 0 1 40-40z" />
      <path d="M212 150h88v250l-44 88-44-88z" />
      <path d="M168 214l176-40v44l-176 40z" />
      <path d="M168 294l176-40v44l-176 40z" />
      <path d="M184 368l144-34v40l-144 34z" />
    </svg>
  );
}

const services = [
  { id: 1, title: "Ferramenta", icon: faTools, desc: "Utensileria professionale, elettroutensili e forniture per officina." },
  { id: 2, title: "Colorificio", icon: faPaintRoller, desc: "Sistema tintometrico professionale per vernici e pitture personalizzate." },
  { id: 3, title: "Viteria", icon: null, desc: "Assortimento completo di viteria inox, bulloneria e sistemi di fissaggio." },
  { id: 4, title: "Elettricità", icon: faLightbulb, desc: "Materiale elettrico civile e industriale, illuminazione LED e cavi." },
  { id: 5, title: "Edilizia", icon: faHardHat, desc: "Materiali edili, cartongesso, malte e soluzioni tecniche per il cantiere." },
  { id: 6, title: "Fai da Te", icon: faHammer, desc: "Articoli per bricolage, giardinaggio e manutenzione domestica." },
  { id: 7, title: "Idraulica", icon: faFaucet, desc: "Raccorderia, rubinetteria e componenti per impianti idraulici." },
  { id: 8, title: "Sicurezza", icon: faKey, desc: "Servizio duplicazione chiavi, serrature europee e casseforti." },
];

export default function ServicesGrid() {
  return (
    <section id="servizi" className="services-section">
      {/* Sfondo a puntini: solo decorativo */}
      <div className="services-dots" aria-hidden="true">
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
          glowColor="transparent"
        />
      </div>

      <div className="services-inner">
        <h2 className="services-title">Servizi Ferramenta</h2>

        <ul className="services-list">
          {services.map((service) => (
            <li key={service.id} className="service-item">
              <span className="service-icon">
                {service.icon ? <FontAwesomeIcon icon={service.icon} /> : <ScrewIcon />}
              </span>
              <div className="service-body">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
