import "./QuarantAnni.css";

export default function QuarantAnni() {
  return (
    <div className="box-quaranta">
      {/* Mesh superiore */}
      <img src="/brush40-12.webp" alt="" />

      <div className="container-flex-quaranta">
        <div className="quaranta-testo">
          <div className="numero-grande">40 ANNI</div>
          <div className="container-testo">
            <span className="testo-piccolo">DI</span>
            <span className="testo-grande">ESPERIENZA</span>
          </div>
        </div>

        <img className="claudio" src="/claudio.webp" alt="Claudio" />
      </div>

      {/* Mesh inferiore */}
      <img className="sotto" src="/brush40-13.webp" alt="" />
    </div>
  );
}
