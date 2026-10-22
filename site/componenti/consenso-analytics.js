/* Google Analytics 4 con consenso: GA si carica solo dopo "Accetta" nel banner.
   La scelta resta nel browser (localStorage, tecnico) e si cambia dal link "Preferenze cookie".
   Finché GA_ID è vuoto lo script non fa nulla: niente banner, niente GA. */
(function () {
  var GA_ID = 'G-1BTK7V6TCE'; // es. 'G-ABC123XYZ' — Amministrazione GA → Stream di dati
  var CHIAVE = 'edilmarket-consenso-analytics';

  if (!GA_ID) return;

  function leggi() { try { return localStorage.getItem(CHIAVE); } catch (e) { return null; } }
  function salva(v) { try { localStorage.setItem(CHIAVE, v); } catch (e) {} }

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });

  var caricato = false;
  function avviaGA() {
    if (caricato) return;
    caricato = true;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    gtag('js', new Date());
    gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  // Revoca: cancella i cookie _ga di questo dominio (anche quelli su .dominio)
  function cancellaCookieGA() {
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var nome = c.split('=')[0].trim();
      if (nome.indexOf('_ga') !== 0) return;
      ['', '; domain=' + host, '; domain=.' + host].forEach(function (d) {
        document.cookie = nome + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
      });
    });
  }

  var CSS =
    '.cc-banner{position:fixed;z-index:2147483000;left:16px;right:16px;bottom:16px;margin:0 auto;max-width:560px;' +
    'background:#15171C;color:#F6F0E4;border-radius:14px;padding:18px 20px;box-shadow:0 12px 40px rgba(0,0,0,.28);' +
    'font:15px/1.5 "Figtree",system-ui,-apple-system,"Segoe UI",sans-serif}' +
    '.cc-banner p{margin:0 0 14px}' +
    '.cc-banner a{color:inherit;text-decoration:underline;text-underline-offset:2px}' +
    '.cc-azioni{display:flex;gap:10px;flex-wrap:wrap}' +
    // stessi colori per i due pulsanti: il Garante chiede che rifiutare sia facile quanto accettare
    '.cc-azioni button{flex:1 1 140px;font:600 15px/1 "Figtree",system-ui,sans-serif;padding:13px 16px;border-radius:999px;cursor:pointer;' +
    'border:2px solid #F6F0E4;background:#F6F0E4;color:#15171C}' +
    '.cc-azioni button:focus-visible{outline:3px solid #DF2F26;outline-offset:2px}';

  function mostraBanner() {
    if (document.querySelector('.cc-banner')) return;
    if (!document.getElementById('cc-stile')) {
      var st = document.createElement('style');
      st.id = 'cc-stile';
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    var b = document.createElement('div');
    b.className = 'cc-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Consenso ai cookie statistici');
    b.innerHTML =
      '<p>Usiamo Google Analytics per contare le visite e capire quali pagine vi interessano. ' +
      'Parte solo se accetti. <a href="/privacy#cookie">Privacy e cookie</a></p>' +
      '<div class="cc-azioni"><button type="button" class="cc-rifiuta">Rifiuta</button>' +
      '<button type="button" class="cc-accetta">Accetta</button></div>';
    b.querySelector('.cc-accetta').addEventListener('click', function () {
      salva('si'); b.remove(); avviaGA();
    });
    b.querySelector('.cc-rifiuta').addEventListener('click', function () {
      var eraAttivo = caricato;
      salva('no'); b.remove(); cancellaCookieGA();
      // gtag.js già caricato continua a girare: ricarico per fermarlo davvero
      if (eraAttivo) location.reload();
    });
    document.body.appendChild(b);
  }

  // Link "Preferenze cookie" nel footer o nella privacy: <a href="#" data-preferenze-cookie>
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-preferenze-cookie]');
    if (!a) return;
    e.preventDefault();
    mostraBanner();
  });

  // Contatti: conta i clic su Chiama, Come arrivare, WhatsApp ed email.
  // Parte solo se GA è attivo (consenso dato). In GA4 segnali questi eventi come "eventi chiave".
  function tipoContatto(href) {
    if (/^tel:/i.test(href)) return 'click_chiama';
    if (/^mailto:/i.test(href)) return 'click_email';
    if (/wa\.me|whatsapp\.com/i.test(href)) return 'click_whatsapp';
    if (/maps\.google\.|google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/i.test(href)) return 'click_indicazioni';
    return null;
  }
  function posizione(a) {
    var zona = a.closest('header, footer, section[id], [id]');
    if (!zona) return 'pagina';
    return zona.id || zona.tagName.toLowerCase();
  }
  document.addEventListener('click', function (e) {
    if (!caricato) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var evento = tipoContatto(a.getAttribute('href'));
    if (!evento) return;
    gtag('event', evento, { posizione: posizione(a), pagina: location.pathname });
  }, true);

  var scelta = leggi();
  if (scelta === 'si') avviaGA();
  else if (scelta !== 'no') {
    if (document.body) mostraBanner();
    else document.addEventListener('DOMContentLoaded', mostraBanner);
  }
})();
