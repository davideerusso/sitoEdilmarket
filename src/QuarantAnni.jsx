import "./QuarantAnni.css";

export default function QuarantAnni() {
  return (
<section className="box-quaranta" aria-labelledby="esperienza-title">
      {/* Mesh superiore */}
      <img src="/brush40-12.webp" alt="" aria-hidden="true" />

      <div className="container-flex-quaranta">
        <div className="quaranta-testo">
          <header>
            <div className="numero-grande" id="esperienza-title">40 ANNI</div>
            <div className="container-testo">
              <span className="testo-piccolo">DI</span>
              <h2 className="testo-grande">ESPERIENZA</h2>
            </div>
          </header>
         
        </div>

        <img 
          className="claudio" 
          src="/claudio.webp" 
          alt="Claudio di Edilmarket - Esperienza quarantennale in ferramenta" 
        />
      </div>

      {/* Mesh inferiore */}
      <img className="sotto" src="/brush40-13.webp" alt="" aria-hidden="true" />
            </section>  );
}
