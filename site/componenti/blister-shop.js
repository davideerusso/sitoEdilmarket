/*
 * <blister-shop> — la card dello shop a forma di blister appeso.
 * Edil Market di Claudio Russo, Strudà.
 *
 * Uso:
 *   <script src="componenti/blister-shop.js" defer></script>
 *
 *   <blister-shop href="shop" colore="#8C1710" chiaro>
 *     <img src="img/shop/pennello-prodotto.webp" data-bolla="img/shop/pennello-bolla.webp"
 *          width="818" height="156" alt="Pennello tondo da 20">
 *     <!-- altri prodotti: girano da soli ogni 4 secondi -->
 *   </blister-shop>
 *
 * Attributi (tutti facoltativi):
 *   href        dove porta il clic                       (predefinito: "shop")
 *   titolo      scritta grande in alto                   (predefinito: "Shop online")
 *   invito      frase accanto alla freccia               (predefinito: "Apri lo shop e ordina")
 *   colore      colore del cartoncino, in esadecimale    (predefinito: #8C1710)
 *   chiaro      se presente, cartoncino bianco e testi scuri (es. quando Charlie è nero)
 *   logo        sagoma del logo stampata dietro          (predefinito: "img/shop/logo-sagoma.webp")
 *   intervallo  millisecondi tra un prodotto e l'altro   (predefinito: 4000)
 *   presto      se presente, lo shop non è ancora aperto: niente link, orologio al posto della freccia
 *
 * Sul telefono il blister segue l'inclinazione del telefono (giroscopio): su iPhone il permesso
 * si chiede al primo tocco sulla pagina.
 *
 * Nella pagina conviene riservare lo spazio finché lo script non è caricato:
 *   blister-shop:not(:defined){display:block;width:360px;max-width:100%;aspect-ratio:360/178;visibility:hidden}
 *
 * Prodotti: ogni <img> figlio è un prodotto. src = foto scontornata, data-bolla = plastica sagomata,
 * width/height = proporzioni. Si generano entrambe con strumenti/blister.py.
 * Se aggiungi, togli o cambi gli <img> anche dopo il caricamento, la giostra si aggiorna da sola.
 *
 * Comportamento: dondola piano, si inclina verso il mouse, se lo premi e trascini oscilla come un pendolo
 * imperniato sul foro e torna con una molla; la luce sul cartoncino segue il movimento, i riflessi sulla plastica restano fermi.
 * Trascinare non apre il link.
 * Con "riduci movimento" attivo non dondola da solo e i prodotti non girano.
 *
 * Metodi ed eventi:
 *   el.colpisci(forza)   piccola spinta da destra (forza 1 = colpetto leggero)
 *   ascolta l'evento "tinta-charlie" su document e risponde con un colpetto.
 */
(function () {
  if (customElements.get('blister-shop')) return;

  try { CSS.registerProperty({ name: '--cs', syntax: '<color>', inherits: true, initialValue: '#8C1710' }); } catch (e) {}

  // sagoma del cartoncino (360×178) con la linguetta smussata e il foro a sombrero
  const FORO = 'M163 15a2 2 0 0 1 2-2h8c1.6 0 1.6-7 7-7s5.4 7 7 7h8a2 2 0 0 1 0 4H165a2 2 0 0 1-2-2Z';
  const SAGOMA = 'M16 22H104L117.5 4.5Q120 0 125 0H235Q240 0 242.5 4.5L256 22H344Q360 22 360 38V162Q360 178 344 178H16Q0 178 0 162V38Q0 22 16 22Z';
  const MASCHERA = "url(\"data:image/svg+xml," + encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 178'><path fill-rule='evenodd' d='" + SAGOMA + ' ' + FORO + "'/></svg>") + "\")";

  const CSS_TESTO = `
:host{--cs:#8C1710;--ease:cubic-bezier(.23,1,.32,1);display:block;position:relative;width:360px;max-width:100%;color:#F6F0E4;
  cursor:grab;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;transition:--cs .7s var(--ease);
  filter:drop-shadow(0 18px 18px rgba(0,0,0,.3)) drop-shadow(0 2px 3px rgba(0,0,0,.15))}
:host(.tira){cursor:grabbing}
:host([presto]) a{cursor:inherit}
:host([chiaro]){color:#15171C}
a{display:block;color:inherit;text-decoration:none;outline:none;-webkit-user-drag:none}
/* cartoncino colorato: tinta piatta e un po' pastello (stemperata col color carta del sito), senza lucido */
.blister{--gx:0px;--fondo:color-mix(in oklab,var(--cs) 74%,#F6F0E4);position:relative;display:block;aspect-ratio:360/178;overflow:hidden;
  background:var(--fondo);
  transform-origin:50% 10px;transform:perspective(820px) rotateX(7deg) rotateY(14deg);will-change:transform;touch-action:none;
  -webkit-mask:${MASCHERA} 0 0/100% 100% no-repeat;mask:${MASCHERA} 0 0/100% 100% no-repeat}
:host([chiaro]) .blister{background:linear-gradient(165deg,#F6F0E4 0%,#F0E9DA 60%,#E8DFCD 100%)}   /* "bianco": il crema del sito */
/* luce che scorre sul cartoncino quando si inclina: fascia chiara con un filo d'ombra accanto (si vede anche sul bianco);
   passa sopra il fondo e il logo ma sotto le scritte, il prodotto e la plastica (che hanno i loro riflessi fermi) */
:host(:not([chiaro])) .blister::after{display:none}   /* il riflesso che scorre resta solo sul cartoncino bianco */
.blister::after{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;
  background:linear-gradient(105deg,rgba(20,24,30,0) 24%,rgba(20,24,30,.09) 35%,rgba(246,240,228,.62) 44%,rgba(246,240,228,.18) 49%,rgba(246,240,228,0) 57%) calc(50% + var(--gx) * 1.3) 0/220% 100% no-repeat}
.logo{position:absolute;z-index:0;right:-8px;top:26px;height:172px;aspect-ratio:553/518;background:color-mix(in oklab,var(--fondo) 80%,#F6F0E4);opacity:.75;
  -webkit-mask:var(--logo) 0 0/100% 100% no-repeat;mask:var(--logo) 0 0/100% 100% no-repeat}
:host([chiaro]) .logo{background:#E9E1D0;opacity:1}
.titolo{position:absolute;z-index:1;left:16px;top:30px;font:800 25px/1 var(--f-display,"Archivo",system-ui,sans-serif);font-stretch:108%;letter-spacing:-.005em;text-transform:uppercase}
.giostra{position:absolute;z-index:2;left:10px;right:16px;top:68px;pointer-events:none}
.pezzo{position:absolute;inset:0;opacity:0;transform:translateX(24px) scale(.94);transition:opacity .45s ease,transform .6s var(--ease)}
.pezzo.attivo{opacity:1;transform:none}
.pezzo.esce{opacity:0;transform:translateX(-24px) scale(.96)}
.pezzo img{position:absolute;inset:0;width:100%;height:100%;-webkit-user-drag:none}
/* profondità: il prodotto sta sollevato sul cartoncino, quindi quando il blister si muove scivola un po' di più
   (parallasse) e la sua ombra si allunga dalla parte opposta; un riflesso gli passa sopra come sulla plastica */
.pezzo .prod{transform:translateX(clamp(-5px, var(--gx) * -.2, 5px));
  filter:drop-shadow(clamp(-1px, 1px + var(--gx) * .08, 3px) 3px 2px rgba(0,0,0,.34)) drop-shadow(clamp(0px, 6px + var(--gx) * .2, 12px) 13px 10px rgba(0,0,0,.3))}
.pezzo .bolla{transform:translateX(clamp(-2px, var(--gx) * -.08, 2px));filter:drop-shadow(clamp(1px, 3px + var(--gx) * .1, 6px) 7px 7px rgba(0,0,0,.22))}
.pezzo .riflesso{position:absolute;inset:0;transform:translateX(clamp(-5px, var(--gx) * -.2, 5px));pointer-events:none;mix-blend-mode:screen;opacity:.55;
  -webkit-mask:var(--prod) 0 0/100% 100% no-repeat;mask:var(--prod) 0 0/100% 100% no-repeat;
  background:linear-gradient(100deg,rgba(246,240,228,0) 40%,rgba(246,240,228,.55) 47%,rgba(246,240,228,0) 54%) 30% 0/260% 100% no-repeat}
.pezzo .lucido{position:absolute;inset:0;-webkit-mask:var(--bolla) 0 0/100% 100% no-repeat;mask:var(--bolla) 0 0/100% 100% no-repeat;
  background:linear-gradient(100deg,rgba(246,240,228,0) 38%,rgba(246,240,228,.7) 46%,rgba(246,240,228,0) 52%,rgba(246,240,228,0) 60%,rgba(246,240,228,.35) 63%,rgba(246,240,228,0) 66%) 50% 0/240% 100% no-repeat}   /* fermo: non esce dalla bolla inclinando */
.vai{position:absolute;z-index:3;left:16px;bottom:14px;display:inline-flex;align-items:center;gap:9px;font:700 15px/1 var(--f-testo,"Figtree",system-ui,sans-serif);letter-spacing:-.01em}
.vai i{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:#F6F0E4;color:var(--cs);transition:transform .3s var(--ease),background .3s var(--ease),color .3s var(--ease)}
:host([chiaro]) .vai i{background:#15171C;color:#F6F0E4}
.vai svg{width:12px;height:12px}
.foro{position:absolute;z-index:6;left:44.444%;top:2.247%;width:11.111%;overflow:visible;pointer-events:none}
.foro path{fill:none;stroke-width:1.1}
.foro .ombra{stroke:color-mix(in oklab,var(--cs) 55%,#000);transform:translateY(-.6px)}
.foro .luce{stroke:color-mix(in oklab,var(--cs) 45%,#F6F0E4);transform:translateY(.9px)}
:host([chiaro]) .foro .ombra{stroke:rgba(90,78,60,.4)}
:host([chiaro]) .foro .luce{stroke:#F6F0E4}
a:focus-visible .blister{outline:3px solid currentColor;outline-offset:-6px}
@media (hover:hover) and (pointer:fine){
  :host(:hover) .vai i{transform:rotate(45deg);background:#15171C;color:#F6F0E4}
  :host([chiaro]:hover) .vai i{background:#DF2F26}}
@media (prefers-reduced-motion:reduce){.pezzo,.vai i{transition:none}}`;

  const FRECCIA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>';
  const OROLOGIO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2"/></svg>';
  const quieto = matchMedia('(prefers-reduced-motion: reduce)');
  const touch = matchMedia('(pointer: coarse)');
  const mouseFine = matchMedia('(hover: hover) and (pointer: fine)');

  class BlisterShop extends HTMLElement {
    static get observedAttributes() { return ['href', 'titolo', 'invito', 'colore', 'logo', 'presto']; }

    constructor() {
      super();
      this._ang = 0; this._vel = 0; this._tira = false; this._mosso = false;
      this._hx = 0; this._hy = 0; this._hxT = 0; this._hyT = 0; this._pendenza = 0;
      this._root = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      if (!this._pronto) this._monta();
      this._prec = performance.now();
      this._raf = requestAnimationFrame(t => this._frame(t));
      this._suTinta = () => this.colpisci();
      document.addEventListener('tinta-charlie', this._suTinta);
      this._suVisibile = () => this._riparti();
      document.addEventListener('visibilitychange', this._suVisibile);
      // telefono: il blister segue l'inclinazione. Inclinando di lato pende per restare dritto (come appeso al gancio),
      // inclinando avanti e indietro si piega verso chi guarda
      this._suGiro = e => {
        if (e.gamma == null || this._tira) return;
        const lato = Math.max(-35, Math.min(35, e.gamma)), avanti = Math.max(-30, Math.min(30, (e.beta ?? 45) - 45));
        this._pendenza = -lato * .32;
        this._hxT = lato * .35; this._hyT = -avanti * .25;
      };
      if (touch.matches && 'DeviceOrientationEvent' in window && typeof DeviceOrientationEvent.requestPermission !== 'function')
        addEventListener('deviceorientation', this._suGiro);
      this._riparti();
    }

    disconnectedCallback() {
      cancelAnimationFrame(this._raf); clearInterval(this._giro);
      document.removeEventListener('tinta-charlie', this._suTinta);
      document.removeEventListener('visibilitychange', this._suVisibile);
      removeEventListener('deviceorientation', this._suGiro);
    }

    attributeChangedCallback() { if (this._pronto) this._aggiorna(); }

    /* spinta da destra: forza 1 = colpetto leggero */
    colpisci(forza = 1) { if (!this._tira) this._vel += (42 + Math.random() * 16) * forza; }

    _monta() {
      this._pronto = true;
      this._root.innerHTML = `<style>${CSS_TESTO}</style>
        <a part="link" draggable="false">
          <span class="blister" part="blister">
            <svg class="foro" viewBox="160 4 40 16" aria-hidden="true"><path class="ombra" d="${FORO}"/><path class="luce" d="${FORO}"/></svg>
            <span class="logo" aria-hidden="true"></span>
            <span class="titolo" aria-hidden="true"></span>
            <span class="giostra" aria-hidden="true"></span>
            <span class="vai"><i aria-hidden="true">${FRECCIA}</i><span class="invito"></span></span>
          </span>
        </a>`;
      this._a = this._root.querySelector('a');
      this._bl = this._root.querySelector('.blister');
      this._prodotti();
      this._eventi();
      // se i prodotti (gli <img> figli) cambiano, la giostra si ricostruisce
      new MutationObserver(() => { this._prodotti(); this._riparti(); })
        .observe(this, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'data-bolla', 'width', 'height', 'alt'] });
    }

    _prodotti() {
      const prodotti = [...this.querySelectorAll('img')];
      const giostra = this._root.querySelector('.giostra');
      const w0 = prodotti[0] ? +prodotti[0].getAttribute('width') || 818 : 818, h0 = prodotti[0] ? +prodotti[0].getAttribute('height') || 156 : 156;
      giostra.style.aspectRatio = w0 + '/' + h0;
      giostra.innerHTML = prodotti.map((im, k) => {
        const bolla = im.dataset.bolla || '';
        return `<span class="pezzo${k ? '' : ' attivo'}" style="--bolla:url('${bolla}');--prod:url('${im.getAttribute('src')}')">
          <img class="prod" src="${im.getAttribute('src')}" alt="" draggable="false" decoding="async"><i class="riflesso"></i>
          ${bolla ? `<img class="bolla" src="${bolla}" alt="" draggable="false" decoding="async"><i class="lucido"></i>` : ''}</span>`;
      }).join('');
      this._pezzi = [...giostra.querySelectorAll('.pezzo')];
      this._alt = prodotti.map(im => im.alt).filter(Boolean).join(', ');
      this._aggiorna();
    }

    _aggiorna() {
      const titolo = this.getAttribute('titolo') || 'Shop online', invito = this.getAttribute('invito') || 'Apri lo shop e ordina';
      const presto = this.hasAttribute('presto');
      if (presto) { this._a.removeAttribute('href'); this._a.setAttribute('role', 'img'); this._a.removeAttribute('tabindex'); }
      else { this._a.href = this.getAttribute('href') || 'shop'; this._a.removeAttribute('role'); }
      this._root.querySelector('.vai i').innerHTML = presto ? OROLOGIO : FRECCIA;
      this._a.setAttribute('aria-label', titolo + ': ' + invito + (this._alt ? '. In vetrina: ' + this._alt : ''));
      this._root.querySelector('.titolo').textContent = titolo;
      this._root.querySelector('.invito').textContent = invito;
      this.style.setProperty('--cs', this.getAttribute('colore') || '#8C1710');
      this.style.setProperty('--logo', `url('${this.getAttribute('logo') || 'img/shop/logo-sagoma.webp'}')`);
    }

    _eventi() {
      this.addEventListener('pointerdown', e => {
        if (e.button !== 0) return;
        // il perno è il foro in alto al centro: il punto afferrato segue il dito girando attorno a lui
        const r = this.getBoundingClientRect();
        this._px = r.left + r.width / 2; this._py = r.top + r.height * 10 / 178;
        this._g0 = Math.atan2(e.clientX - this._px, e.clientY - this._py);
        this._tira = true; this._mosso = false; this._x0 = e.clientX; this._a0 = this._ang; this._vel = 0;
        this.classList.add('tira'); this._a.setPointerCapture(e.pointerId);   // cattura sul link: così il clic semplice lo apre ancora
      });
      this.addEventListener('pointermove', e => {
        if (this._tira) {
          const dx = e.clientX - this._x0; if (Math.abs(dx) > 4) this._mosso = true;
          // angolo del puntatore attorno al perno, misurato dalla verticale: andando a destra sotto il perno
          // il cartoncino gira in senso antiorario (rotateZ negativo), come un pendolo spinto da quel lato
          const g = Math.atan2(e.clientX - this._px, e.clientY - this._py);
          let d = g - this._g0; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI;
          const nuovo = Math.max(-15, Math.min(15, this._a0 - d * 180 / Math.PI));
          this._vel = (nuovo - this._ang) * 60; this._ang = nuovo; return;
        }
        if (e.pointerType !== 'mouse' || !mouseFine.matches) return;
        const r = this.getBoundingClientRect();
        this._hxT = ((e.clientX - r.left) / r.width - .5) * 14; this._hyT = -((e.clientY - r.top) / r.height - .5) * 10;
      });
      const molla = () => { if (!this._tira) return; this._tira = false; this.classList.remove('tira'); this._vel = Math.max(-260, Math.min(260, this._vel)); };
      // iPhone: il giroscopio va chiesto con un gesto; lo chiediamo al primo tocco sulla pagina
      // (il blister può stare sotto altri elementi, quindi non aspettiamo un tocco proprio su di lui)
      document.addEventListener('pointerup', () => {
        if (this._chiesto || !touch.matches || typeof DeviceOrientationEvent === 'undefined' || typeof DeviceOrientationEvent.requestPermission !== 'function') return;
        this._chiesto = true;
        DeviceOrientationEvent.requestPermission().then(r => { if (r === 'granted') addEventListener('deviceorientation', this._suGiro); }).catch(() => {});
      });
      this.addEventListener('pointerup', molla); this.addEventListener('pointercancel', molla);
      this.addEventListener('mouseenter', () => clearInterval(this._giro));
      this.addEventListener('mouseleave', () => { this._hxT = 0; this._hyT = 0; this._riparti(); });
      this.addEventListener('focusin', () => clearInterval(this._giro));
      this.addEventListener('focusout', () => this._riparti());
      this._a.addEventListener('click', e => { if (this._mosso) { e.preventDefault(); this._mosso = false; } });   // trascinare non apre lo shop
      this.addEventListener('dragstart', e => e.preventDefault());
    }

    _frame(t) {
      const dt = Math.min(.05, (t - this._prec) / 1000); this._prec = t;
      if (!this._tira) {
        const meta = this._pendenza + (quieto.matches ? 0 : Math.sin(t / 1000 * 2 * Math.PI / 5.5) * 2.2);   // dondolio a riposo (+ inclinazione del telefono)
        this._vel += (-(this._ang - meta) * 38 - this._vel * 2.6) * dt; this._ang += this._vel * dt; // molla smorzata
      }
      this._hx += (this._hxT - this._hx) * Math.min(1, dt * 8); this._hy += (this._hyT - this._hy) * Math.min(1, dt * 8);
      const a = this._ang;
      this._bl.style.transform = `perspective(820px) rotateZ(${a.toFixed(2)}deg) rotateY(${(14 + a * 1.3 + this._hx).toFixed(2)}deg) rotateX(${(7 + this._hy - Math.abs(a) * .15).toFixed(2)}deg)`;
      this._bl.style.setProperty('--gx', (-a * 7 - this._hx * 2.5).toFixed(1) + 'px');
      this._raf = requestAnimationFrame(t2 => this._frame(t2));
    }

    _riparti() {
      clearInterval(this._giro);
      if (!this._pezzi || this._pezzi.length < 2 || quieto.matches || document.hidden) return;
      const ms = +this.getAttribute('intervallo') || 4000;
      this._giro = setInterval(() => {
        const i = this._pezzi.findIndex(p => p.classList.contains('attivo')), a = this._pezzi[i];
        a.classList.replace('attivo', 'esce'); setTimeout(() => a.classList.remove('esce'), 520);
        this._pezzi[(i + 1) % this._pezzi.length].classList.add('attivo');
      }, ms);
    }
  }

  customElements.define('blister-shop', BlisterShop);
})();
