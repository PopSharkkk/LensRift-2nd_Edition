/* LensRift interactions — reveal, menu, anchors, counters, filter, modal, form,
   photo motion (scroll scrub + staggered parallax + hover zoom).
   No scroll listeners anywhere: all motion is IntersectionObserver-gated rAF,
   transform/opacity only. */
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const Springs = window.LensRiftSpring || null;
  const clamp = Springs ? Springs.clamp : ((v, lo, hi) => Math.min(hi, Math.max(lo, v)));

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll('.reveal:not(.revealed)');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('revealed'));
  } else {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObs.observe(el));
  }

  // ---------- Mobile nav ----------
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay = document.querySelector('.nav-mobile-overlay');
  if (hamburger && overlay) {
    const setMenu = (open) => {
      hamburger.classList.toggle('active', open);
      overlay.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    hamburger.addEventListener('click', () => setMenu(!overlay.classList.contains('active')));
    overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) { setMenu(false); hamburger.focus(); }
    });
  }

  // ---------- Nav scrolled state (sentinel, no scroll events) ----------
  const nav = document.querySelector('.nav');
  const sentinel = document.getElementById('nav-sentinel');
  if (nav && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      nav.classList.toggle('scrolled', !entry.isIntersecting);
    }).observe(sentinel);
  } else if (nav) {
    nav.classList.add('scrolled');
  }

  // ---------- Smooth anchors ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (!id || id.length < 2) return;
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); }
    });
  });

  // ---------- Shared observer-gated rAF loop (hero drift + photo motion) ----------
  const heroes = Array.from(document.querySelectorAll('.hero')).map(h => ({
    el: h, content: h.querySelector('.hero-inner'), visible: false
  })).filter(h => h.content);
  const scrubEls = Array.from(document.querySelectorAll('[data-scrub]'));
  const pxEls = Array.from(document.querySelectorAll('[data-parallax]'));
  const zoomState = new Map();
  scrubEls.forEach(el => {
    const host = el.closest('.card, .gallery-item') || el;
    zoomState.set(el, { zoom: 1, zoomT: 1 });
    host.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse') zoomState.get(el).zoomT = 1.06;
    });
    host.addEventListener('pointerleave', () => { zoomState.get(el).zoomT = 1; });
  });
  const motionTargets = new Set();
  let motionRunning = false;
  function motionFrame() {
    if (motionTargets.size === 0) {
      motionRunning = false;
      heroes.forEach(h => { h.content.style.opacity = ''; h.content.style.transform = ''; });
      return;
    }
    const vh = window.innerHeight, y = window.scrollY;
    heroes.forEach(h => {
      if (!motionTargets.has(h.el) || !h.visible) return;
      if (y < vh * 1.2) {
        h.content.style.opacity = Math.max(0, 1 - (y / (vh * 0.85)));
        h.content.style.transform = `translateY(${y * 0.18}px)`;
      }
    });
    scrubEls.forEach(el => {
      if (!motionTargets.has(el)) return;
      const r = el.getBoundingClientRect();
      const off = Math.abs((r.top + r.height / 2) - vh / 2) / (vh * 0.75);
      const bell = Math.max(0, Math.cos(Math.min(1, off) * Math.PI / 2));
      const st = zoomState.get(el);
      st.zoom += (st.zoomT - st.zoom) * 0.2;
      el.style.setProperty('--scrub', ((1 + 0.12 * bell) * st.zoom).toFixed(4));
      el.style.setProperty('--dim', (0.62 + 0.38 * bell).toFixed(3));
    });
    pxEls.forEach(el => {
      if (!motionTargets.has(el)) return;
      const r = el.getBoundingClientRect();
      const f = parseFloat(el.dataset.parallax || '1', 10) || 1;
      const px = clamp((vh / 2 - (r.top + r.height / 2)) * (1 - f) * 0.15, -20, 20);
      el.style.setProperty('--px', px.toFixed(1) + 'px');
    });
    requestAnimationFrame(motionFrame);
  }
  function motionKick() {
    if (!motionRunning && motionTargets.size > 0) { motionRunning = true; requestAnimationFrame(motionFrame); }
  }
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const all = [...heroes.map(h => h.el), ...scrubEls, ...pxEls];
    if (all.length) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(en => {
          if (en.isIntersecting) motionTargets.add(en.target);
          else motionTargets.delete(en.target);
          const h = heroes.find(x => x.el === en.target);
          if (h) h.visible = en.isIntersecting;
        });
        motionKick();
      }, { threshold: 0 });
      all.forEach(el => obs.observe(el));
    }
  }

  // ---------- Counters ----------
  document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if (!Number.isFinite(target)) return;
    if (reduceMotion) { el.textContent = target.toLocaleString() + suffix; return; }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        let cur = 0; const step = Math.max(1, Math.ceil(target / 40));
        const iv = setInterval(() => {
          cur += step; if (cur >= target) { cur = target; clearInterval(iv); }
          el.textContent = cur.toLocaleString() + suffix;
        }, 30);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  // ---------- Portfolio filter ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const videoBlock = document.querySelector('.portfolio-group-video');
  const photoBlock = document.querySelector('.portfolio-group-photo');
  if (filterBtns.length && (videoBlock || photoBlock)) {
    filterBtns.forEach(btn => btn.addEventListener('click', () => {
      filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const t = btn.dataset.type;
      if (videoBlock) videoBlock.style.display = (t === 'all' || t === 'video') ? '' : 'none';
      if (photoBlock) photoBlock.style.display = (t === 'all' || t === 'photo') ? '' : 'none';
    }));
  }

  // ---------- Lightbox: anchored origin, zoom/pan/pinch, momentum, prev/next ----------
  const modal = document.getElementById('portfolio-modal');
  const mBox = document.querySelector('.modal-content');
  const mMedia = document.getElementById('bento-modal-media');
  const mClose = document.getElementById('bento-modal-close');
  const mImg = document.getElementById('bento-modal-img');
  const mVidWrap = document.getElementById('bento-modal-video-container');
  const mFrame = document.getElementById('bento-modal-iframe');
  const mTitle = document.getElementById('bento-modal-title');
  const mCat = document.getElementById('bento-modal-cat');
  const mDesc = document.getElementById('bento-modal-desc');
  const mCount = document.getElementById('bento-modal-count');
  const mContact = document.getElementById('modal-contact');
  const lbBar = modal ? modal.querySelector('.lb-bar') : null;
  const lbPrev = document.getElementById('lb-prev');
  const lbNext = document.getElementById('lb-next');
  const lbIn = document.getElementById('lb-zoom-in');
  const lbOut = document.getElementById('lb-zoom-out');
  const lbReset = document.getElementById('lb-zoom-reset');
  let lastFocus = null, items = [], idx = 0, isVideo = false;
  const view = { s: 1, x: 0, y: 0 }; // live zoom/pan, always animated from here
  let panCancel = null;

  function applyView() {
    mImg.style.transform = `translate(${view.x}px, ${view.y}px) scale(${view.s})`;
    mMedia.classList.toggle('is-panning', view.s > 1.01);
  }
  function panBounds() {
    const bw = Math.max(0, (mImg.clientWidth * view.s - mMedia.clientWidth) / 2);
    const bh = Math.max(0, (mImg.clientHeight * view.s - mMedia.clientHeight) / 2);
    return { bw, bh };
  }
  function stopPan() { if (panCancel) { panCancel(); panCancel = null; } }
  function springView(t, v, done) {
    stopPan();
    if (!Springs || reduceMotion) {
      view.s = t.s; view.x = t.x; view.y = t.y; applyView();
      if (done) done();
      return;
    }
    const from = { s: view.s, x: view.x, y: view.y };
    const vel = v || { s: 0, x: 0, y: 0 };
    const omega = 4 / 0.3, k = omega * omega, c = 2 * omega; // damping 1.0, response 0.3s
    let cx = from.x, cy = from.y, cs = from.s, vx = vel.x, vy = vel.y, vs = vel.s;
    let last = performance.now(), raf = 0;
    (function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      vx += (-k * (cx - t.x) - c * vx) * dt; cx += vx * dt;
      vy += (-k * (cy - t.y) - c * vy) * dt; cy += vy * dt;
      vs += (-k * (cs - t.s) - c * vs) * dt; cs += vs * dt;
      view.x = cx; view.y = cy; view.s = cs; applyView();
      if (Math.abs(cx - t.x) < 0.5 && Math.abs(cy - t.y) < 0.5 && Math.abs(cs - t.s) < 0.005 &&
          Math.abs(vx) < 12 && Math.abs(vy) < 12 && Math.abs(vs) < 0.2) {
        view.x = t.x; view.y = t.y; view.s = t.s; applyView();
        panCancel = null;
        if (done) done();
        return;
      }
      raf = requestAnimationFrame(frame);
    })(last);
    panCancel = () => cancelAnimationFrame(raf);
  }
  function zoomTo(ns, cx, cy) {
    // Zoom around a point (client coords relative to media box center).
    ns = clamp(ns, 1, 3);
    const r = mMedia.getBoundingClientRect();
    const px = (cx == null ? r.width / 2 : cx - r.left) - r.width / 2;
    const py = (cy == null ? r.height / 2 : cy - r.top) - r.height / 2;
    const k = ns / view.s;
    springView({ s: ns, x: px - (px - view.x) * k, y: py - (py - view.y) * k });
  }
  function renderItem() {
    const item = items[idx];
    if (!item) return;
    const type = item.dataset.itemType;
    const title = item.dataset.title || '';
    mTitle.textContent = title;
    mCat.textContent = item.dataset.category || '';
    mDesc.textContent = item.dataset.description || '';
    if (mCount) mCount.textContent = `${idx + 1} / ${items.length}`;
    stopPan();
    view.s = 1; view.x = 0; view.y = 0; applyView();
    isVideo = (type === 'video' && !!item.dataset.videoUrl);
    if (isVideo) {
      mImg.style.display = 'none'; mVidWrap.style.display = 'block';
      mFrame.src = item.dataset.videoUrl || '';
      if (lbBar) lbBar.style.display = 'none';
    } else {
      mVidWrap.style.display = 'none'; mImg.style.display = 'block';
      mImg.src = item.dataset.src || '';
      mImg.alt = title ? title + ' — full view' : 'Photo full view';
      if (mFrame) mFrame.removeAttribute('src');
      if (lbBar) lbBar.style.display = '';
    }
  }
  function step(d) {
    if (!items.length) return;
    idx = (idx + d + items.length) % items.length;
    renderItem();
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (mFrame) mFrame.removeAttribute('src');
    stopPan();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function openItem(item, ev) {
    items = Array.from(document.querySelectorAll('.portfolio-item'));
    idx = Math.max(0, items.indexOf(item));
    renderItem();
    // Anchored origin: grow from where the visitor tapped.
    if (mBox && ev && ev.clientX != null) {
      const r = mBox.getBoundingClientRect();
      mBox.style.transformOrigin = `${clamp(ev.clientX - r.left, 0, r.width)}px ${clamp(ev.clientY - r.top, 0, r.height)}px`;
    } else if (mBox) {
      mBox.style.transformOrigin = '';
    }
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (mClose) mClose.focus();
  }
  if (modal) {
    document.addEventListener('click', (e) => {
      const item = e.target.closest ? e.target.closest('.portfolio-item') : null;
      if (item) openItem(item, e);
    });
    if (mClose) mClose.addEventListener('click', closeModal);
    if (mContact) mContact.addEventListener('click', () => closeModal());
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => {
      if (!modal.classList.contains('is-open')) {
        if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) return; // menu handles it
        return;
      }
      if (e.key === 'Escape') { closeModal(); return; }
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const d = e.key === 'ArrowRight' ? 1 : -1;
        if (!isVideo && view.s > 1.01) {
          const { bw } = panBounds();
          springView({ s: view.s, x: clamp(view.x + d * -80, -bw, bw), y: view.y });
        } else step(d);
        return;
      }
      // Focus trap: keep Tab cycling inside the dialog.
      if (e.key === 'Tab') {
        const f = Array.from(modal.querySelectorAll('button, a[href], iframe'))
          .filter(el => el.offsetParent !== null && !el.disabled);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    if (lbPrev) lbPrev.addEventListener('click', e => { e.stopPropagation(); step(-1); });
    if (lbNext) lbNext.addEventListener('click', e => { e.stopPropagation(); step(1); });
    if (lbIn) lbIn.addEventListener('click', e => { e.stopPropagation(); if (!isVideo) zoomTo(view.s * 1.25); });
    if (lbOut) lbOut.addEventListener('click', e => { e.stopPropagation(); if (!isVideo) zoomTo(view.s / 1.25); });
    if (lbReset) lbReset.addEventListener('click', e => { e.stopPropagation(); springView({ s: 1, x: 0, y: 0 }); });

    // 1:1 pan + pinch on the media surface.
    const pointers = new Map();
    let panning = false, pinch = null, history = [];
    function rb(v, max) {
      if (!Springs) return clamp(v, -max, max);
      if (v < -max) return -max + Springs.rubberband(v + max, mMedia.clientWidth || 300);
      if (v > max) return max + Springs.rubberband(v - max, mMedia.clientWidth || 300);
      return v;
    }
    mMedia.addEventListener('pointerdown', (e) => {
      if (isVideo || mImg.style.display === 'none') return;
      stopPan();
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      try { mMedia.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
      if (pointers.size === 1) {
        // Possible pan: engage after a small hysteresis so taps stay taps.
        panning = false;
        history = [{ x: e.clientX, y: e.clientY, t: performance.now(), vx: view.x, vy: view.y }];
      } else if (pointers.size === 2) {
        panning = false;
        const [a, b] = [...pointers.values()];
        pinch = {
          dist: Math.hypot(a.x - b.x, a.y - b.y) || 1,
          s0: view.s, x0: view.x, y0: view.y,
          mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2
        };
      }
    });
    mMedia.addEventListener('pointermove', (e) => {
      if (!pointers.has(e.pointerId)) return;
      const prev = pointers.get(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2 && pinch) {
        // Pinch zoom from the live value; midpoint stays glued.
        const [a, b] = [...pointers.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        const ns = clamp(pinch.s0 * dist / pinch.dist, 1, 3);
        const r = mMedia.getBoundingClientRect();
        const rx = mx - r.left - r.width / 2, ry = my - r.top - r.height / 2;
        const r0x = pinch.mx - r.left - r.width / 2, r0y = pinch.my - r.top - r.height / 2;
        const k = ns / pinch.s0;
        view.s = ns;
        view.x = rx - (r0x - pinch.x0) * k + (mx - pinch.mx);
        view.y = ry - (r0y - pinch.y0) * k + (my - pinch.my);
        const { bw, bh } = panBounds();
        view.x = rb(view.x, bw); view.y = rb(view.y, bh);
        applyView();
        return;
      }
      if (pointers.size === 1 && view.s > 1.01) {
        const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
        history.push({ x: e.clientX, y: e.clientY, t: performance.now(), vx: view.x, vy: view.y });
        if (history.length > 6) history.shift();
        if (!panning && Math.hypot(e.clientX - history[0].x, e.clientY - history[0].y) < 6) return;
        panning = true;
        const { bw, bh } = panBounds();
        view.x = rb(view.x + dx, bw);
        view.y = rb(view.y + bh, bh);
        applyView();
      }
    });
    function endPointer(e) {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinch = null;
      if (pointers.size === 0 && panning) {
        panning = false;
        // Velocity handoff: project where the pan was going, spring into bounds.
        let vx = 0, vy = 0;
        if (history.length >= 2 && Springs && !reduceMotion) {
          const a = history[0], b = history[history.length - 1];
          const dt = (b.t - a.t) / 1000;
          if (dt > 0.005) {
            vx = clamp((b.vx - a.vx) / dt, -4000, 4000);
            vy = clamp((b.vy - a.vy) / dt, -4000, 4000);
          }
        }
        const { bw, bh } = panBounds();
        const px = Springs && !reduceMotion ? view.x + Springs.project(vx) : view.x;
        const py = Springs && !reduceMotion ? view.y + Springs.project(vy) : view.y;
        if (view.s <= 1.01) springView({ s: 1, x: 0, y: 0 });
        else springView({ s: view.s, x: clamp(px, -bw, bw), y: clamp(py, -bh, bh) }, { s: 0, x: vx, y: vy });
      }
    }
    mMedia.addEventListener('pointerup', endPointer);
    mMedia.addEventListener('pointercancel', endPointer);
    mMedia.addEventListener('wheel', (e) => {
      if (isVideo || mImg.style.display === 'none' || reduceMotion) return;
      e.preventDefault();
      zoomTo(view.s * (e.deltaY < 0 ? 1.12 : 0.89), e.clientX, e.clientY);
    }, { passive: false });
    mMedia.addEventListener('dblclick', (e) => {
      if (isVideo || reduceMotion) return;
      e.preventDefault();
      zoomTo(view.s > 1.5 ? 1 : 2, e.clientX, e.clientY);
    });
  }

  // ---------- Contact form ----------
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form && status) {
    const fields = Array.from(form.querySelectorAll('.field'));
    fields.forEach(f => {
      const input = f.querySelector('input, textarea');
      if (input) input.addEventListener('input', () => f.classList.remove('invalid'));
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstBad = null;
      fields.forEach(f => {
        const input = f.querySelector('input, textarea');
        if (!input) return;
        const bad = !input.checkValidity() || !input.value.trim();
        f.classList.toggle('invalid', bad);
        if (bad && !firstBad) firstBad = input;
      });
      if (firstBad) { firstBad.focus(); return; }
      const nameEl = document.getElementById('contact-name');
      const name = nameEl && nameEl.value.trim() ? nameEl.value.trim().split(' ')[0] : null;
      status.textContent = name
        ? `Thank you, ${name} — your message is on its way. We reply within two business days.`
        : 'Thank you — your message is on its way. We reply within two business days.';
      status.hidden = false;
      status.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
      form.querySelectorAll('input, textarea').forEach(f => { f.value = ''; });
    });
  }
});
