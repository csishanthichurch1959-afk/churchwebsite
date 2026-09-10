
/* CSI Shanthi Church — GitHub-only scheduled announcements */
(() => {
  'use strict';

  const DATA_URL = 'announcements.json';
  const ROTATE_MS = 6500;

  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const escapeHTML = (value = '') =>
    String(value).replace(/[&<>"']/g, ch => ({
      '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;'
    })[ch]);

  const safeLink = (value = '') => {
    const raw = String(value || '').trim();
    if (!raw) return '';
    if (/^(https?:|mailto:|tel:)/i.test(raw)) return raw;
    if (/^(\/|\.\/|\.\.\/|[a-zA-Z0-9_-]+\.html(?:[#?].*)?|#[a-zA-Z0-9_-]+)/.test(raw)) return raw;
    return '';
  };

  const parseDate = value => {
    if (!value) return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  };

  const isActive = (item, now = new Date()) => {
    if (!item || item.enabled === false) return false;
    const start = parseDate(item.start);
    const end = parseDate(item.end);
    if (start && now < start) return false;
    if (end && now > end) return false;
    return true;
  };

  const formatEventDate = value => {
    const d = parseDate(value);
    if (!d) return '';
    return new Intl.DateTimeFormat('en-IN', {
      weekday:'short',
      day:'numeric',
      month:'short',
      year:'numeric',
      hour:'numeric',
      minute:'2-digit'
    }).format(d);
  };


  const getImages = item => {
    const list = Array.isArray(item?.images)
      ? item.images
      : (item?.image ? [item.image] : []);

    return list
      .map(value => String(value || '').trim())
      .filter(Boolean);
  };

  const sortAnnouncements = items =>
    [...items].sort((a, b) => {
      const featuredDiff = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      if (featuredDiff) return featuredDiff;
      const ad = parseDate(a.eventDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      const bd = parseDate(b.eventDate)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      return ad - bd;
    });

  async function loadData() {
    const response = await fetch(DATA_URL, { cache:'no-store' });
    if (!response.ok) throw new Error(`Announcements returned ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('announcements.json must contain an array.');
    return sortAnnouncements(data.filter(item => isActive(item)));
  }

  function renderHome(items) {
    const section = document.querySelector('[data-announcements-home]');
    if (!section) return;

    if (!items.length) {
      section.hidden = true;
      return;
    }

    const stage = section.querySelector('[data-announcement-stage]');
    const card = section.querySelector('[data-announcement-item]');
    const dotsWrap = section.querySelector('[data-announcement-dots]');
    if (!stage || !card || !dotsWrap) return;

    section.hidden = false;

    let current = 0;
    let timer = null;

    const renderOne = index => {
      current = (index + items.length) % items.length;
      const item = items[current];
      const href = safeLink(item.link);
      const eventDate = formatEventDate(item.eventDate);
      const images = getImages(item);
      const image = images[0] || '';

      card.classList.remove('announcement-enter');
      void card.offsetWidth;

      card.innerHTML = `
        ${image ? `<div class="announcement-running-thumb"><img src="${escapeHTML(image)}" alt=""></div>` : ''}
        <div class="announcement-running-copy">
          <div class="announcement-running-meta">
            ${item.featured ? '<span class="announcement-featured">Featured</span>' : ''}
            ${eventDate ? `<span>${escapeHTML(eventDate)}</span>` : ''}
          </div>
          <strong>${escapeHTML(item.title || 'Church announcement')}</strong>
          ${item.description ? `<span>${escapeHTML(item.description)}</span>` : ''}
        </div>
        ${href ? `<a class="announcement-running-link" href="${escapeHTML(href)}">${escapeHTML(item.buttonText || 'View details')} <span aria-hidden="true">→</span></a>` : ''}
      `;

      card.classList.add('announcement-enter');

      [...dotsWrap.children].forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
        dot.setAttribute('aria-pressed', i === current ? 'true' : 'false');
      });
    };

    dotsWrap.innerHTML = '';
    if (items.length > 1) {
      items.forEach((_, i) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'announcement-dot';
        button.setAttribute('aria-label', `Show announcement ${i + 1}`);
        button.addEventListener('click', () => {
          renderOne(i);
          restart();
        });
        dotsWrap.appendChild(button);
      });
    }

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };

    const restart = () => {
      stop();
      if (!reduceMotion && items.length > 1) {
        timer = window.setInterval(() => renderOne(current + 1), ROTATE_MS);
      }
    };

    renderOne(0);
    restart();

    section.addEventListener('mouseenter', stop);
    section.addEventListener('mouseleave', restart);
    section.addEventListener('focusin', stop);
    section.addEventListener('focusout', restart);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else restart();
    });
  }

  function renderPage(items) {
    const section = document.querySelector('[data-announcements-page]');
    if (!section) return;

    const loading = section.querySelector('[data-announcements-loading]');
    const grid = section.querySelector('[data-announcements-grid]');
    const empty = section.querySelector('[data-announcements-empty]');
    const error = section.querySelector('[data-announcements-error]');

    if (loading) loading.hidden = true;
    if (error) error.hidden = true;

    if (!items.length) {
      if (empty) empty.hidden = false;
      if (grid) grid.innerHTML = '';
      return;
    }

    if (empty) empty.hidden = true;

    grid.innerHTML = items.map((item, index) => {
      const href = safeLink(item.link);
      const eventDate = formatEventDate(item.eventDate);
      const images = getImages(item);

      let mediaHTML = '';

      if (images.length > 1) {
        mediaHTML = `
          <div class="announcement-gallery" data-announcement-gallery>
            <div class="announcement-gallery-track">
              ${images.map((src, i) => `
                <div class="announcement-gallery-slide ${i === 0 ? 'is-active' : ''}" data-gallery-slide>
                  <img src="${escapeHTML(src)}" alt="${escapeHTML(item.title || 'Church announcement')} — image ${i + 1}">
                </div>
              `).join('')}
            </div>

            <button class="announcement-gallery-arrow prev" type="button" data-gallery-prev aria-label="Previous image">‹</button>
            <button class="announcement-gallery-arrow next" type="button" data-gallery-next aria-label="Next image">›</button>

            <div class="announcement-gallery-dots" aria-label="Announcement images">
              ${images.map((_, i) => `
                <button type="button"
                        class="announcement-gallery-dot ${i === 0 ? 'is-active' : ''}"
                        data-gallery-dot="${i}"
                        aria-label="Show image ${i + 1}"
                        aria-pressed="${i === 0 ? 'true' : 'false'}"></button>
              `).join('')}
            </div>
          </div>
        `;
      } else if (images.length === 1) {
        mediaHTML = `
          <div class="announcement-page-image">
            <img src="${escapeHTML(images[0])}" alt="${escapeHTML(item.title || 'Church announcement')}">
          </div>
        `;
      } else {
        mediaHTML = `
          <div class="announcement-page-mark" aria-hidden="true">
            <img src="assets/images/logo-official-transparent.png" alt="">
          </div>
        `;
      }

      return `
        <article class="announcement-page-card ${item.featured ? 'is-featured' : ''}" style="--announcement-index:${index}">
          ${mediaHTML}
          <div class="announcement-page-content">
            <div class="announcement-page-meta">
              ${item.featured ? '<span class="announcement-featured">Featured</span>' : ''}
              ${eventDate ? `<span>${escapeHTML(eventDate)}</span>` : ''}
            </div>
            <h3>${escapeHTML(item.title || 'Church announcement')}</h3>
            ${item.description ? `<p>${escapeHTML(item.description)}</p>` : ''}
            ${href ? `<a class="announcement-card-link" href="${escapeHTML(href)}">${escapeHTML(item.buttonText || 'View details')} <span aria-hidden="true">→</span></a>` : ''}
          </div>
        </article>
      `;
    }).join('');

    initAnnouncementGalleries(grid);
  }

  function initAnnouncementGalleries(scope) {
    scope.querySelectorAll('[data-announcement-gallery]').forEach(gallery => {
      const slides = [...gallery.querySelectorAll('[data-gallery-slide]')];
      const dots = [...gallery.querySelectorAll('[data-gallery-dot]')];
      const prev = gallery.querySelector('[data-gallery-prev]');
      const next = gallery.querySelector('[data-gallery-next]');

      if (slides.length < 2) return;

      let current = 0;

      const show = index => {
        current = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
          slide.classList.toggle('is-active', i === current);
        });

        dots.forEach((dot, i) => {
          const active = i === current;
          dot.classList.toggle('is-active', active);
          dot.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
      };

      prev?.addEventListener('click', () => show(current - 1));
      next?.addEventListener('click', () => show(current + 1));

      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => show(i));
      });

      show(0);
    });
  }

  async function init() {
    const hasHome = document.querySelector('[data-announcements-home]');
    const hasPage = document.querySelector('[data-announcements-page]');
    if (!hasHome && !hasPage) return;

    try {
      const active = await loadData();
      renderHome(active);
      renderPage(active);
    } catch (err) {
      console.error('Announcements:', err);

      if (hasHome) hasHome.hidden = true;

      if (hasPage) {
        const loading = hasPage.querySelector('[data-announcements-loading]');
        const error = hasPage.querySelector('[data-announcements-error]');
        if (loading) loading.hidden = true;
        if (error) error.hidden = false;
      }
    }
  }

  init();
})();
