/* ============================================================
   Rohi Kids™ — About Page Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Animated counter for "By the Numbers" ---- */
  const counters = document.querySelectorAll('.number-card__num[data-target]');

  const formatNum = (n, target) => {
    if (target >= 1000) return n.toLocaleString() + '+';
    if (target === 48) return (n / 10).toFixed(1);
    return n.toString();
  };

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = formatNum(Math.floor(current), target);
      if (current >= target) clearInterval(timer);
    }, step);
  };

  if ('IntersectionObserver' in window) {
    const counterObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => counterObs.observe(el));
  } else {
    counters.forEach(el => {
      const t = parseInt(el.dataset.target, 10);
      el.textContent = formatNum(t, t);
    });
  }

});
