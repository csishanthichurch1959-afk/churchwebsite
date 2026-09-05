
/* CSI Shanthi Church historical hero slideshow */
(() => {
  'use strict';

  const hero = document.querySelector('[data-history-slideshow]');
  if (!hero) return;

  const slides = [...hero.querySelectorAll('.history-hero-slide')];
  const dots = [...hero.querySelectorAll('.history-dot')];
  const title = hero.querySelector('#historyStoryTitle');
  const text = hero.querySelector('#historyStoryText');

  if (!slides.length) return;

  const stories = [
    {
      title: 'CSI Shanthi Church today',
      text: 'The present church in Wilson Garden.'
    },
    {
      title: 'Where the journey began',
      text: 'The congregation first gathered in a humble rented shed.'
    },
    {
      title: 'The first rebuilt church',
      text: 'A growing congregation took another step toward the church we know today.'
    }
  ];

  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current = 0;
  let timer = null;

  const show = (index) => {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === current);
    });

    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    const story = stories[current];
    if (story && title && text) {
      title.textContent = story.title;
      text.textContent = story.text;
    }
  };

  const stop = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  const start = () => {
    if (reduceMotion || slides.length < 2) return;
    stop();
    timer = window.setInterval(() => show(current + 1), 5600);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      show(i);
      start();
    });
  });

  // Keep autoplay running even when the mouse rests over the hero.
  // Pause only while a slideshow control has keyboard focus.
  hero.addEventListener('focusin', stop);
  hero.addEventListener('focusout', start);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  show(0);

  // Start after the first rendered frame so autoplay begins reliably
  // without requiring any user interaction.
  requestAnimationFrame(() => {
    requestAnimationFrame(start);
  });
})();
