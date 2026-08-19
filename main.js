(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const phraseTarget = document.querySelector('[data-typewriter-text]');
  const phrases = document.documentElement.lang.startsWith('es')
    ? ['tecnología', 'datos confiables', 'IA aplicada', 'operación crítica']
    : ['technology', 'trusted data', 'applied AI', 'critical operations'];
  if (phraseTarget && !reducedMotion) {
    let phrase = 0;
    let character = phrases[0].length;
    let deleting = false;
    const type = () => {
      const current = phrases[phrase];
      character += deleting ? -1 : 1;
      phraseTarget.textContent = current.slice(0, character);
      let pause = deleting ? 42 : 74;
      if (!deleting && character === current.length) { deleting = true; pause = 2600; }
      if (deleting && character === 0) { deleting = false; phrase = (phrase + 1) % phrases.length; pause = 380; }
      window.setTimeout(type, pause);
    };
    window.setTimeout(() => { deleting = true; type(); }, 1800);
  }

  if (reducedMotion || typeof window.gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });

  gsap.timeline({ defaults: { ease: 'power2.out' } })
    .from('.hero-card', { y: 24, autoAlpha: 0, duration: .7 }, .1)
    .from('.hero-note', { x: -20, autoAlpha: 0, duration: .55 }, .25)
    .from('.profile-card', { x: 20, autoAlpha: 0, duration: .55 }, .3)
    .from('.scroll-cue', { y: 10, autoAlpha: 0, duration: .35 }, .58);

  gsap.to('#progress-bar', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: .35 }
  });

  ScrollTrigger.batch('.reveal', {
    start: 'top 88%',
    onEnter: batch => gsap.from(batch, { y: 20, autoAlpha: 0, duration: .55, stagger: .08, overwrite: true })
  });

  gsap.to('.hero-card', {
    y: -12,
    scale: .985,
    scrollTrigger: { trigger: '.hero', start: '55% top', end: 'bottom top', scrub: .35 }
  });
  ScrollTrigger.refresh();
})();
