(() => {
  'use strict';

  async function loadLatestVideo() {
    const card = document.querySelector('[data-latest-youtube-card]');
    if (!card) return;

    const thumb = card.querySelector('[data-latest-youtube-thumb]');
    const title = card.querySelector('[data-latest-youtube-title]');

    try {
      const response = await fetch(`latest-video.json?v=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      if (!data || !data.videoId) return;

      const url = data.url || `https://www.youtube.com/watch?v=${encodeURIComponent(data.videoId)}`;
      const thumbnail = data.thumbnail || `https://i.ytimg.com/vi/${encodeURIComponent(data.videoId)}/maxresdefault.jpg`;

      card.href = url;

      if (thumb) {
        thumb.src = thumbnail;
        thumb.onerror = () => {
          thumb.onerror = null;
          thumb.src = `https://i.ytimg.com/vi/${encodeURIComponent(data.videoId)}/hqdefault.jpg`;
        };
      }

      if (title && data.title) {
        title.textContent = data.title;
      }
    } catch (error) {
      // Keep the built-in fallback card if the JSON cannot be read.
      console.warn('Latest YouTube video could not be loaded.', error);
    }
  }

  document.addEventListener('DOMContentLoaded', loadLatestVideo);
})();
