
/* CSI Shanthi Church - reliable animation layer */
(() => {
  'use strict';

  const doc = document;
  const root = doc.documentElement;
  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) return;

  root.classList.add('motion-enabled');

  const addClasses = (selector, ...classes) => {
    doc.querySelectorAll(selector).forEach(el => el.classList.add(...classes));
  };

  /* Assign reveal classes */
  addClasses(
    'section:not(.page-hero) > .container > .eyebrow, ' +
    'section:not(.page-hero) > .container > .section-title, ' +
    'section:not(.page-hero) > .container > .lead',
    'motion-reveal'
  );

  addClasses(
    '.image-panel, .youtube-card, .offering-card, .cta-panel, .hero-seal-card, .archive-note',
    'motion-reveal', 'motion-scale'
  );

  addClasses(
    '.ministry-card, .person-card, .link-card, .service-card, .feature, .timeline-item, .contact-row',
    'motion-reveal'
  );

  /* Split layouts come from opposite directions */
  doc.querySelectorAll('.split').forEach(split => {
    const children = [...split.children];
    if (children[0]) children[0].classList.add('motion-reveal', 'motion-left');
    if (children[1]) children[1].classList.add('motion-reveal', 'motion-right');
  });

  /* Stagger repeated grids */
  [
    '.schedule-grid',
    '.grid-3',
    '.grid-2',
    '.ministry-list',
    '.archive-grid',
    '.timeline'
  ].forEach(selector => {
    doc.querySelectorAll(selector).forEach(group => {
      [...group.children].forEach((child, index) => {
        child.classList.add('motion-reveal');
        child.style.setProperty('--motion-delay', `${Math.min(index, 8) * 70}ms`);
      });
    });
  });

  const revealAll = () => {
    doc.querySelectorAll('.motion-reveal').forEach(el => el.classList.add('motion-visible'));
  };

  if (!('IntersectionObserver' in window)) {
    revealAll();
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('motion-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.10,
      rootMargin: '0px 0px -5% 0px'
    });

    doc.querySelectorAll('.motion-reveal').forEach(el => observer.observe(el));

    /* Anything already in view should animate promptly */
    requestAnimationFrame(() => {
      doc.querySelectorAll('.motion-reveal').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * .94 && r.bottom > 0) {
          el.classList.add('motion-visible');
          observer.unobserve(el);
        }
      });
    });
  }

  /* Bible language switch animation - independent of the Bible API code */
  const passageCard = doc.querySelector('.daily-passage-card');
  doc.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!passageCard) return;
      passageCard.classList.remove('motion-passage-swap');
      void passageCard.offsetWidth;
      passageCard.classList.add('motion-passage-swap');
      setTimeout(() => passageCard.classList.remove('motion-passage-swap'), 460);
    });
  });
})();
