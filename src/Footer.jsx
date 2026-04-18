import './Footer.css';


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
                <p>Edilmarket62@hotmail.it</p>
                <p>+39 3204173656</p>
              </div>
            </nav>
          </div>
  
  
        
          
  
        </div>
      </footer>
    );
  }