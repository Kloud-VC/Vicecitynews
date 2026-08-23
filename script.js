// Vice City News — minimal JS. Hero date stamp + scroll-triggered reveals via GSAP.

document.addEventListener('DOMContentLoaded', () => {
  const dateEl = document.getElementById('hero-date');
  if (dateEl) {
    const today = new Date();
    const formatted = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    dateEl.textContent = formatted.toUpperCase();
  }

  // Scroll-triggered reveals — skipped entirely if the user prefers reduced motion,
  // or if GSAP failed to load (e.g. offline / CDN blocked) so content never gets stuck hidden.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Timeline entries: fade + rise, staggered
    gsap.from('.timeline-entry', {
      scrollTrigger: {
        trigger: '.timeline-track',
        start: 'top 85%',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
    });

    // About section: quiet fade-in, no movement
    gsap.from('.about-inner', {
      scrollTrigger: {
        trigger: '.about',
        start: 'top 85%',
      },
      opacity: 0,
      duration: 0.6,
      ease: 'power1.out',
    });
  }
});
