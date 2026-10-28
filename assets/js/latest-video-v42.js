(() => {
  'use strict';

  const JSON_URL = 'latest-video.json';

  async function loadLatestVideo() {
    const card = document.querySelector('[data-latest-youtube-card]');
    if (!card) return;

    const thumb = card.querySelector('[data-latest-youtube-thumb]');
    const title = card.querySelector('[data-latest-youtube-title]');

    try {
      const response = await fetch(`${JSON_URL}?v=${Date.now()}`, {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`latest-video.json returned HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.videoId) {
        throw new Error('latest-video.json does not contain a videoId');
      }

      const videoId = String(data.videoId).trim();
      const videoUrl =
        data.url ||
        `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;

      const cacheKey = encodeURIComponent(
        data.published || videoId || Date.now()
      );

      const hqThumbnail =
        `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg?v=${cacheKey}`;

      const mqThumbnail =
        `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/mqdefault.jpg?v=${cacheKey}`;

      card.href = videoUrl;

      if (title && data.title) {
        title.textContent = data.title;
      }

      if (thumb) {
        thumb.onerror = () => {
          thumb.onerror = null;
          thumb.src = mqThumbnail;
        };

        thumb.src = hqThumbnail;
      }

      console.info('Latest YouTube video loaded:', {
        videoId,
        title: data.title,
        thumbnail: hqThumbnail
      });

    } catch (error) {
      console.warn('Latest YouTube video could not be loaded.', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadLatestVideo, { once: true });
  } else {
    loadLatestVideo();
  }
})();
