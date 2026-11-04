/* Home-only interactions. Metadata is declared by the document. */
(() => {
  'use strict';
  if (!document.body.classList.contains('home-v03')) return;

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
