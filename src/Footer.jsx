import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          
          <div className="footer-brand">
            <img 
              src="/logo.webp" 
              alt="Edilmarket - Ferramenta Strudà" 
              className="footer-logo" 
            />
            <p className="footer-text">
              <strong>Edilmarket di Russo Claudio</strong><br />
              La tua ferramenta di fiducia a Strudà (Lecce) dal 1986.
            </p>
          </div>

          <nav className="footer-nav">
            <div className="footer-col">
              <span className="footer-label">Contatti</span>

              {/* Riga Posizione (Fondamentale per la SEO locale) */}
              <div className="contact-row">
                <a 
                  href="http://googleusercontent.com/maps.google.com/7" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-link"
                >
                  <div className="icon-circle">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="fa-icon" />
                  </div>
                  <span className="contact-text">Provinciale Lecce-Vernole, Strudà</span>
                </a>
              </div>

              {/* Riga Email */}
              <div className="contact-row">
                <a href="mailto:Edilmarket62@hotmail.it" className="contact-link">
                  <div className="icon-circle">
                    <FontAwesomeIcon icon={faEnvelope} className="fa-icon" />
                  </div>
                  <span className="contact-text">Edilmarket62@hotmail.it</span>
                </a>
              </div>

              {/* Riga Telefono */}
              <div className="contact-row">
                <a href="tel:+393204173656" className="contact-link">
                  <div className="icon-circle">
                    <FontAwesomeIcon icon={faPhoneAlt} className="fa-icon" />
                  </div>
                  <span className="contact-text">+39 320 417 3656</span>
                </a>
              </div>
            </div>
          </nav>
        </div>

        {/* Barra finale per dati legali e copyright */}
        <div className="footer-bottom">
          <div className="footer-line"></div>
          <div className="legal-info">
            <p>© {currentYear} Edilmarket | P.IVA: 02452660752 | pec: edilmarket62@pec.it | <a href="/privacy">Privacy Policy</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}