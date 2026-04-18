import "./PitturePage.css";

export default function PitturePage() {
  return (
    <div className="box-pitture">
      <div className="container-pitture">
        <h3 className="titolo-pitture">Diamo colore ai tuoi progetti</h3>
        <h4 className="sottotitolo-pitture">
          Portaci un campione di tessuto, una foto o un codice colore: <br />
          lo riproduciamo fedelmente per te.
        </h4>
        <div className="flex-pitture">
          <div className="box-image-pitt interno">
            <img className="img-pittura " src="/card-pittura-10.webp"></img>
            <h3 className="titolo-pittura">
              Pittura <br />
              Antimuffa
              <br /> per INTERNO
            </h3>
            <img className="img-secchio" src="/secchi-11.webp"></img>
          </div>

          <div className="box-image-pitt esterno ">
            <img className="img-pittura " src="/card-pittura-11.webp"></img>
            <h3 className="titolo-pittura">
              Pittura al <br />
              Quarzo per <br />
              ESTERNO
            </h3>
            <img className="img-secchio" src="/secchi-10.webp"></img>
          </div>

          <div className="box-image-pitt legno ">
            <img className="img-pittura " src="/card-pittura-12.webp"></img>
            <h3 className="titolo-pittura">
              Pittura <br />
              per LEGNO
            </h3>
            <img className="img-secchio-legno" src="/secchi-12.webp"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
