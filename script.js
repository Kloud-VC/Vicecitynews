// Vice City News — minimal, no-dependency JS.
// Purely cosmetic: stamps today's date in the hero meta line.

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
});
