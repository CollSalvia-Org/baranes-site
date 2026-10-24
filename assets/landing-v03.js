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

  const root = document.querySelector('[data-path]');
  if (!root) return;
  const steps = [...root.querySelectorAll('.v03-pstep')];
  const buttons = steps.map(step => step.querySelector('button'));
  const detail = root.querySelector('#path-detail');
  const texts = [...detail.querySelectorAll('[data-detail]')];
  const gate = root.querySelector('.v03-path__gate');
  const replay = root.querySelector('[data-replay]');
  const expander = root.querySelector('.v03-path__expander');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = matchMedia('(max-width: 640px)');
  let timers = [];
  let selection = 0;

  const stop = () => { timers.forEach(clearTimeout); timers = []; };
  const reach = count => {
    steps.forEach((step, i) => {
      step.classList.toggle('v03-is-reached', i < count);
      step.classList.toggle('v03-is-linked', i < count - 1);
    });
    gate.classList.toggle('v03-is-on', count === steps.length);
  };
  const finish = () => { stop(); root.dataset.state = 'done'; reach(steps.length); };
  const show = index => {
    selection = index;
    texts.forEach(text => {
      const visible = Number(text.dataset.detail) === index;
      text.hidden = !visible;
      text.classList.toggle('v03-is-shown', visible);
    });
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(index === i + 1)));
  };
  const play = () => {
    finish();
    if (reduce.matches || !expander.open) return;
    root.classList.add('v03-no-anim');
    reach(0);
    root.dataset.state = 'idle';
    void root.offsetWidth;
    root.classList.remove('v03-no-anim');
    root.dataset.state = 'run';
    // Only the diagram moves. The explanation stays readable throughout (< 5 s).
    for (let count = 1; count <= steps.length; count++) {
      timers.push(setTimeout(() => reach(count), 180 + (count - 1) * 340));
    }
    timers.push(setTimeout(finish, 2400));
  };

  buttons.forEach((button, i) => button.addEventListener('click', () => {
    finish(); show(selection === i + 1 ? 0 : i + 1);
  }));
  replay.addEventListener('click', () => {
    show(0); expander.open = true; play();
  });
  root.addEventListener('focusin', finish);
  expander.addEventListener('toggle', () => { if (!expander.open) finish(); });
  const fit = () => { finish(); expander.open = !narrow.matches; };
  narrow.addEventListener('change', fit);
  reduce.addEventListener('change', finish);
  fit();
  if (!reduce.matches && !narrow.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect(); play();
      }
    }, {threshold: .2});
    observer.observe(root);
  }
})();
