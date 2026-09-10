
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


  const getSiteLanguage = () =>
    localStorage.getItem('shanthi-site-language') === 'kn' ? 'kn' : 'en';

  // Avoid half-translated announcements:
  // if titleKn is missing, use the complete English announcement.
  const getAnnouncementCopy = item => {
    if (getSiteLanguage() === 'kn' && item && item.titleKn) {
      return {
        title: item.titleKn,
        description: item.descriptionKn || item.description || '',
        buttonText: item.buttonTextKn || item.buttonText || 'View details',
        isKannada: true
      };
    }
    return {
      title: item?.title || 'Church announcement',
      description: item?.description || '',
      buttonText: item?.buttonText || 'View details',
      isKannada: false
    };
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
    return new Intl.DateTimeFormat(getSiteLanguage() === 'kn' ? 'kn-IN' : 'en-IN', {
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
    const response = await fetch(`${DATA_URL}?v=${Date.now()}`, { cache:'no-store' });
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
      const copy = getAnnouncementCopy(item);
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
          <strong>${escapeHTML(copy.title)}</strong>
          ${copy.description ? `<span>${escapeHTML(copy.description)}</span>` : ''}
        </div>
        ${href ? `<a class="announcement-running-link" href="${escapeHTML(href)}">${escapeHTML(copy.buttonText)} <span aria-hidden="true">→</span></a>` : ''}
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
      const copy = getAnnouncementCopy(item);
      const images = getImages(item);

      let mediaHTML = '';

      if (images.length > 1) {
        mediaHTML = `
          <div class="announcement-media-shell" data-announcement-media data-title="${escapeHTML(copy.title)}">
            <div class="announcement-gallery" data-announcement-gallery>
              <div class="announcement-gallery-track">
                ${images.map((src, i) => `
                  <button class="announcement-gallery-slide ${i === 0 ? 'is-active' : ''}"
                          type="button"
                          data-gallery-slide
                          data-fullscreen-index="${i}"
                          aria-label="Open image ${i + 1} full screen">
                    <img src="${escapeHTML(src)}" alt="${escapeHTML(copy.title)} — image ${i + 1}">
                  </button>
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

            <div class="announcement-media-actions">
              <button type="button" class="announcement-media-btn" data-gallery-fullscreen>⛶ Full screen</button>
              <button type="button" class="announcement-media-btn" data-gallery-list>▦ View all images</button>
            </div>

            <div class="announcement-image-list" data-gallery-list-panel hidden>
              ${images.map((src, i) => `
                <button type="button"
                        class="announcement-image-list-item"
                        data-list-image="${i}"
                        aria-label="Open image ${i + 1} full screen">
                  <img src="${escapeHTML(src)}" alt="${escapeHTML(copy.title)} — image ${i + 1}">
                </button>
              `).join('')}
            </div>

            <script type="application/json" data-gallery-images>${JSON.stringify(images)}</script>
          </div>
        `;
      } else if (images.length === 1) {
        mediaHTML = `
          <div class="announcement-media-shell" data-announcement-media data-title="${escapeHTML(copy.title)}">
            <button class="announcement-page-image announcement-single-open"
                    type="button"
                    data-single-fullscreen
                    aria-label="Open image full screen">
              <img src="${escapeHTML(images[0])}" alt="${escapeHTML(copy.title)}">
            </button>
            <div class="announcement-media-actions">
              <button type="button" class="announcement-media-btn" data-gallery-fullscreen>⛶ Full screen</button>
            </div>
            <script type="application/json" data-gallery-images>${JSON.stringify(images)}</script>
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
            <h3>${escapeHTML(copy.title)}</h3>
            ${copy.description ? `<p>${escapeHTML(copy.description)}</p>` : ''}
            ${href ? `<a class="announcement-card-link" href="${escapeHTML(href)}">${escapeHTML(copy.buttonText)} <span aria-hidden="true">→</span></a>` : ''}
          </div>
        </article>
      `;
    }).join('');

    initAnnouncementGalleries(grid);
  }

  function ensureAnnouncementLightbox() {
    let modal = document.querySelector('[data-announcement-lightbox]');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.className = 'announcement-lightbox';
    modal.hidden = true;
    modal.setAttribute('data-announcement-lightbox', '');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Announcement image viewer');

    modal.innerHTML = `
      <div class="announcement-lightbox-backdrop" data-lightbox-close></div>
      <div class="announcement-lightbox-panel">
        <div class="announcement-lightbox-topbar">
          <div class="announcement-lightbox-title" data-lightbox-title></div>
          <div class="announcement-lightbox-counter" data-lightbox-counter></div>
          <button class="announcement-lightbox-close" type="button" data-lightbox-close aria-label="Close full screen viewer">×</button>
        </div>

        <div class="announcement-lightbox-stage">
          <button class="announcement-lightbox-arrow prev" type="button" data-lightbox-prev aria-label="Previous image">‹</button>
          <img data-lightbox-image alt="">
          <button class="announcement-lightbox-arrow next" type="button" data-lightbox-next aria-label="Next image">›</button>
        </div>

        <div class="announcement-lightbox-thumbs" data-lightbox-thumbs></div>
      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  }

  function openAnnouncementLightbox(images, index = 0, title = '') {
    if (!images?.length) return;

    const modal = ensureAnnouncementLightbox();
    const image = modal.querySelector('[data-lightbox-image]');
    const titleEl = modal.querySelector('[data-lightbox-title]');
    const counter = modal.querySelector('[data-lightbox-counter]');
    const thumbs = modal.querySelector('[data-lightbox-thumbs]');
    const prev = modal.querySelector('[data-lightbox-prev]');
    const next = modal.querySelector('[data-lightbox-next]');

    let current = Math.max(0, Math.min(index, images.length - 1));

    const show = nextIndex => {
      current = (nextIndex + images.length) % images.length;
      image.src = images[current];
      image.alt = `${title || 'Announcement'} — image ${current + 1}`;
      titleEl.textContent = title || 'Announcement';
      counter.textContent = `${current + 1} / ${images.length}`;

      [...thumbs.children].forEach((thumb, i) => {
        thumb.classList.toggle('is-active', i === current);
        thumb.setAttribute('aria-pressed', i === current ? 'true' : 'false');
      });

      prev.hidden = images.length < 2;
      next.hidden = images.length < 2;
    };

    thumbs.innerHTML = images.map((src, i) => `
      <button type="button"
              class="announcement-lightbox-thumb"
              data-lightbox-thumb="${i}"
              aria-label="Show image ${i + 1}">
        <img src="${escapeHTML(src)}" alt="">
      </button>
    `).join('');

    thumbs.querySelectorAll('[data-lightbox-thumb]').forEach((thumb, i) => {
      thumb.addEventListener('click', () => show(i));
    });

    prev.onclick = () => show(current - 1);
    next.onclick = () => show(current + 1);

    const close = () => {
      modal.hidden = true;
      document.body.classList.remove('announcement-lightbox-open');
      document.removeEventListener('keydown', onKey);
    };

    const onKey = event => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft' && images.length > 1) show(current - 1);
      if (event.key === 'ArrowRight' && images.length > 1) show(current + 1);
    };

    modal.querySelectorAll('[data-lightbox-close]').forEach(el => {
      el.onclick = close;
    });

    modal.hidden = false;
    document.body.classList.add('announcement-lightbox-open');
    document.addEventListener('keydown', onKey);
    show(current);
    modal.querySelector('[data-lightbox-close]')?.focus();
  }

  function initAnnouncementGalleries(scope) {
    scope.querySelectorAll('[data-announcement-media]').forEach(media => {
      let images = [];
      try {
        images = JSON.parse(media.querySelector('[data-gallery-images]')?.textContent || '[]');
      } catch (e) {
        images = [];
      }

      const title = media.dataset.title || 'Announcement';
      const gallery = media.querySelector('[data-announcement-gallery]');
      const listPanel = media.querySelector('[data-gallery-list-panel]');
      const listButton = media.querySelector('[data-gallery-list]');
      const fullscreenButton = media.querySelector('[data-gallery-fullscreen]');

      let current = 0;

      if (gallery) {
        const slides = [...gallery.querySelectorAll('[data-gallery-slide]')];
        const dots = [...gallery.querySelectorAll('[data-gallery-dot]')];
        const prev = gallery.querySelector('[data-gallery-prev]');
        const next = gallery.querySelector('[data-gallery-next]');

        const show = index => {
          if (!slides.length) return;
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

        prev?.addEventListener('click', event => {
          event.stopPropagation();
          show(current - 1);
        });
        next?.addEventListener('click', event => {
          event.stopPropagation();
          show(current + 1);
        });

        dots.forEach((dot, i) => {
          dot.addEventListener('click', event => {
            event.stopPropagation();
            show(i);
          });
        });

        slides.forEach((slide, i) => {
          slide.addEventListener('click', () => openAnnouncementLightbox(images, i, title));
        });

        show(0);
      }

      media.querySelector('[data-single-fullscreen]')?.addEventListener('click', () => {
        openAnnouncementLightbox(images, 0, title);
      });

      fullscreenButton?.addEventListener('click', () => {
        openAnnouncementLightbox(images, current, title);
      });

      listButton?.addEventListener('click', () => {
        if (!listPanel) return;
        const opening = listPanel.hidden;
        listPanel.hidden = !opening;
        listButton.classList.toggle('is-active', opening);
        listButton.textContent = opening ? '▦ Hide image list' : '▦ View all images';
      });

      media.querySelectorAll('[data-list-image]').forEach((button, i) => {
        button.addEventListener('click', () => openAnnouncementLightbox(images, i, title));
      });
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

  window.addEventListener('shanthi-language-change', () => init());

  init();
})();
