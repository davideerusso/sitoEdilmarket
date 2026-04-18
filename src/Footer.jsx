
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-main">
          <div className="footer-brand">
            <img 
              src="/logo.webp" 
              alt="Logo" 
              className="footer-logo" 
            />
            <p className="footer-text">
              La tua ferramenta di fiducia.
            </p>
          </div>

          <nav className="footer-nav">
          <div className="footer-col">
  <span className="footer-label">Contatti</span>

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
      </div>
    </footer>
  );
}