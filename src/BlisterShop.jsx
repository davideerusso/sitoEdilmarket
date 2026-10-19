/*
 * BlisterShop: la card dello shop a forma di blister appeso, per la versione React del sito.
 * È un involucro sottile attorno al componente <blister-shop> (site/componenti/blister-shop.js):
 * stile, animazioni e trascinamento stanno tutti lì, qui si passano solo i dati.
 *
 * Uso:
 *   import BlisterShop from "./BlisterShop";
 *
 *   <BlisterShop
 *     href="/shop"
 *     colore={chiaro ? undefined : tintaCharlie}   // colore del pelo di Charlie
 *     chiaro={charlieNero}                          // true: cartoncino bianco
 *     prodotti={[
 *       { src: "/img/shop/pennello-prodotto.webp", bolla: "/img/shop/pennello-bolla.webp",
 *         width: 818, height: 156, alt: "Pennello tondo da 20" },
 *     ]}
 *   />
 *
 * Le immagini vanno servite dal sito: copia site/img/shop/ in public/img/shop/.
 * A ogni cambio di `colore` la card riceve un colpetto, come quando si sceglie una tinta per Charlie.
 */
import { useEffect, useRef } from "react";
import "../site/componenti/blister-shop.js";

export default function BlisterShop({
  href = "/shop",
  titolo = "Shop online",
  invito = "Apri lo shop e ordina",
  colore,
  chiaro = false,
  logo = "/img/shop/logo-sagoma.webp",
  intervallo = 4000,
  prodotti = [],
  className,
  style,
}) {
  const ref = useRef(null);
  const primo = useRef(true);

  // colpetto quando cambia il colore (non al primo disegno)
  useEffect(() => {
    if (primo.current) { primo.current = false; return; }
    ref.current?.colpisci?.();
  }, [colore, chiaro]);

  return (
    <blister-shop
      ref={ref}
      className={className}
      style={style}
      href={href}
      titolo={titolo}
      invito={invito}
      colore={colore}
      chiaro={chiaro ? "" : undefined}
      logo={logo}
      intervallo={String(intervallo)}
    >
      {prodotti.map((p) => (
        <img key={p.src} src={p.src} data-bolla={p.bolla} width={p.width} height={p.height} alt={p.alt || ""} />
      ))}
    </blister-shop>
  );
}
