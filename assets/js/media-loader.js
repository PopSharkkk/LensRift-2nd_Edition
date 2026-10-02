/* LensRift media loader — reads the file DB (synced from C:\Database-LensRift)
   Priority: 1) window.LENSRIFT_DB override (Supabase rows)  2) assets/data/media.json
   Grids opt in via: <div data-media-grid="photos|videos|featured" data-media-limit="3"> */
(function () {
  'use strict';

  var TAG_CLASSES = ['tag-clay', 'tag-sage', 'tag-stone'];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function tagClass(seed) {
    var h = 0;
    var str = String(seed || '');
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 997;
    return TAG_CLASSES[h % TAG_CLASSES.length];
  }

  function photoCard(p) {
    return (
      '<article class="card portfolio-item reveal revealed"' +
      ' data-item-type="photo" data-title="' + esc(p.title) + '"' +
      ' data-category="' + esc(p.category) + '" data-src="' + esc(p.src) + '"' +
      ' data-description="' + esc(p.description || '') + '">' +
      '<div class="card-image"><img src="' + esc(p.src) + '" alt="' + esc(p.title) + '" loading="lazy" decoding="async"></div>' +
      '<div class="card-body">' +
      '<p class="tag ' + tagClass(p.title) + '">' + esc(p.category) + '</p>' +
      '<h3 class="card-title">' + esc(p.title) + '</h3>' +
      '<p class="card-desc">' + esc(p.description || '') + '</p>' +
      '</div></article>'
    );
  }

  function videoCard(v) {
    return (
      '<article class="card strip-card portfolio-item reveal revealed"' +
      ' data-item-type="video" data-title="' + esc(v.title) + '"' +
      ' data-category="' + esc(v.category) + '" data-src="' + esc(v.src) + '"' +
      ' data-video-url="' + esc(v.video_url || '') + '"' +
      ' data-description="' + esc(v.description || '') + '">' +
      '<div class="card-image"><img src="' + esc(v.src) + '" alt="' + esc(v.title) + '" loading="lazy" decoding="async" draggable="false">' +
      '<div class="card-play"><span>\u25B6</span></div></div>' +
      '<div class="card-body">' +
      '<p class="tag ' + tagClass(v.title) + '">' + esc(v.category) + '</p>' +
      '<h3 class="card-title">' + esc(v.title) + '</h3>' +
      '<p class="card-desc">' + esc(v.description || '') + '</p>' +
      '</div></article>'
    );
  }

  function byOrder(a, b) { return (a.sort_order || 0) - (b.sort_order || 0); }

  async function getDB() {
    if (window.LENSRIFT_DB) {
      try {
        const { data, error } = await window.LENSRIFT_DB.from('media_items').select('*').order('sort_order');
        if (!error && Array.isArray(data)) {
          return {
            photos: data.filter(r => (r.item_type || r.itemType) === 'photo').map(r => ({
              title: r.title, category: r.category, description: r.description,
              src: r.src, is_featured: r.is_featured, sort_order: r.sort_order
            })),
            videos: data.filter(r => (r.item_type || r.itemType) === 'video').map(r => ({
              title: r.title, category: r.category, description: r.description,
              src: r.src, video_url: r.video_url, sort_order: r.sort_order
            }))
          };
        }
      } catch (e) { /* fall through to JSON */ }
    }
    const res = await fetch('assets/data/media.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('media.json HTTP ' + res.status);
    return res.json();
  }

  function render(grid, db) {
    const kind = grid.getAttribute('data-media-grid');
    const limit = parseInt(grid.getAttribute('data-media-limit') || '0', 10);
    let html = '';
    if (kind === 'photos') {
      const arr = [...(db.photos || [])].sort(byOrder);
      html = (limit > 0 ? arr.slice(0, limit) : arr).map(p => photoCard(p)).join('');
    } else if (kind === 'videos') {
      const arr = [...(db.videos || [])].sort(byOrder);
      html = (limit > 0 ? arr.slice(0, limit) : arr).map(videoCard).join('');
    } else if (kind === 'featured') {
      const feats = [...(db.photos || [])].sort(byOrder);
      const first = feats.find(p => p.is_featured) || feats[0];
      const rest = feats.filter(p => p !== first);
      html = (first ? photoCard(first) : '') +
        (limit > 0 ? rest.slice(0, limit - 1) : rest).map(p => photoCard(p)).join('');
    }
    if (html) grid.innerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const grids = document.querySelectorAll('[data-media-grid]');
    if (!grids.length) return;
    try {
      const db = await getDB();
      grids.forEach(g => { try { render(g, db); } catch (e) { console.warn('media render skipped', e); } });
      if (window.LensRiftInitStrips) window.LensRiftInitStrips();
    } catch (e) {
      console.warn('LensRift DB not loaded, keeping hardcoded cards:', e.message);
    }
  });
})();
