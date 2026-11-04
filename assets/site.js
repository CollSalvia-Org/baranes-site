(() => {
  'use strict';
  // Metadata belongs to the document. In particular, visiting a preview or an
  // old host must not replace its canonical URL or turn an article into a site.
  const description = document.querySelector('meta[name="description"]')?.content || '';
  function fillMeta(key, value, property = false) {
    if (!value) return;
    const attr = property ? 'property' : 'name';
    let element = document.querySelector(`meta[${attr}="${key}"]`);
    if (element?.content.trim()) return;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, key);
      document.head.appendChild(element);
    }
    element.content = value;
  }
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = new URL(location.pathname.replace(/index\.html$/, ''), 'https://baranes.ai').href;
    document.head.appendChild(canonical);
  }
  fillMeta('theme-color', '#0b1827');
  fillMeta('og:title', document.title, true);
  fillMeta('og:description', description, true);
  fillMeta('og:type', 'website', true);
  fillMeta('og:url', canonical.href, true);
  fillMeta('twitter:card', 'summary');
  fillMeta('twitter:title', document.title);
  fillMeta('twitter:description', description);

  const path = location.pathname.replace(/index\.html$/, '');
  const brand = document.querySelector('.brand');
  const root = brand ? new URL(brand.href, location.href).pathname.replace(/index\.html$/, '') : '/';
  document.querySelectorAll('[data-nav][href]').forEach(link => {
    const href = new URL(link.href, location.href).pathname.replace(/index\.html$/, '');
    const active = href === root ? path === root : path.startsWith(href);
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
})();
