(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Header scroll state ── */
  const header = document.querySelector('.site-header');
  const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  /* ── Atmosphere grid visibility on scroll ── */
  const atmoGrid = document.querySelector('.atmosphere-grid');
  if (atmoGrid) {
    const showGrid = () => atmoGrid.classList.toggle('is-visible', window.scrollY > 80);
    showGrid();
    window.addEventListener('scroll', showGrid, { passive: true });
  }

  /* ── Typewriter ── */
  const phraseTarget = document.querySelector('[data-typewriter-text]');
  const phrases = document.documentElement.lang.startsWith('es')
    ? ['tecnologia', 'datos confiables', 'IA aplicada', 'interoperabilidad', 'gobernanza']
    : ['technology', 'trusted data', 'applied AI', 'interoperability', 'governance'];

  if (phraseTarget && !reducedMotion) {
    let phrase = 0;
    let character = phrases[0].length;
    let deleting = false;

    const type = () => {
      const current = phrases[phrase];
      character += deleting ? -1 : 1;
      phraseTarget.textContent = current.slice(0, character);
      let pause = deleting ? 42 : 74;
      if (!deleting && character === current.length) { deleting = true; pause = 1800; }
      if (deleting && character === 0) { deleting = false; phrase = (phrase + 1) % phrases.length; pause = 380; }
      window.setTimeout(type, pause);
    };
    window.setTimeout(() => { deleting = true; type(); }, 1800);
  }

  /* ── GSAP animations ── */
  if (reducedMotion || typeof window.gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });

  // Hero entrance — snappy, ease-out strong (fix #1: reduced from .7 to .5)
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-card', { y: 22, autoAlpha: 0, duration: .5 }, .08)
    .from('.hero-note', { x: -18, autoAlpha: 0, duration: .45 }, .2)
    .from('.hero-badge', { x: 18, autoAlpha: 0, duration: .45 }, .25)
    .from('.scroll-cue', { y: 8, autoAlpha: 0, duration: .3 }, .5);

  // Progress bar (fix #8: smoother scrub)
  gsap.to('#progress-bar', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: .5 }
  });

  // Reveal on scroll (fix #6: stagger tightened from .08 to .05)
  ScrollTrigger.batch('.reveal', {
    start: 'top 88%',
    onEnter: batch => gsap.from(batch, { y: 18, autoAlpha: 0, duration: .5, stagger: .05, overwrite: true })
  });

  // Hero parallax
  gsap.to('.hero-card', {
    y: -14,
    scale: .985,
    scrollTrigger: { trigger: '.hero', start: '55% top', end: 'bottom top', scrub: .35 }
  });

  ScrollTrigger.refresh();
})();
