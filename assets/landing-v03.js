/* Home-only interactions. Common site.js remains unchanged. */
(() => {
  'use strict';
  if (!document.body.classList.contains('home-v03')) return;

  // Shared site.js derives metadata from the preview URL. Keep the public home identity.
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = 'https://baranes.ai/';
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.content = 'https://baranes.ai/';
  const theme = document.querySelector('meta[name="theme-color"]');
  if (theme) theme.content = '#0b1827';

  // Registro del hero: el detalle de cada paso se abre al pulsarlo, uno cada vez.
  // La entrada animada es solo CSS y respeta el movimiento reducido.
  const rec = document.querySelector('[data-rec]');
  if (!rec) return;
  const rows = [...rec.querySelectorAll('.v03-row')];
  rows.forEach(row => {
    const button = row.querySelector('.v03-row__btn');
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      rows.forEach(other => {
        const on = other === row && open;
        other.classList.toggle('v03-row--open', on);
        other.querySelector('.v03-row__btn').setAttribute('aria-expanded', String(on));
      });
    });
  });
})();
