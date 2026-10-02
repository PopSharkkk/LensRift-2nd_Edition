/* Apple-inspired interactions — ported from WebPro quiz1/js/main.js + LensRift modal/filter */
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    revealEls.forEach(el => el.classList.add('revealed'));
  } else {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObs.observe(el));
  }

  // Mobile nav (identical to quiz1)
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay = document.querySelector('.nav-mobile-overlay');
  if (hamburger && overlay) {
    const setMenu = (open) => {
      hamburger.classList.toggle('active', open);
      overlay.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    hamburger.addEventListener('click', () => {
      setMenu(!overlay.classList.contains('active'));
    });
    overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('active')) { setMenu(false); hamburger.focus(); } });
  }

  // Nav scrolled state
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // Smooth anchors (instant when reduced motion is requested)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); }
    });
  });

  // Hero parallax — rAF-throttled so scroll stays on the compositor path
  const heroes = document.querySelectorAll('.hero');
  if (heroes.length && !reduceMotion) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      heroes.forEach(h => {
        const c = h.querySelector('.hero-content');
        if (c && y < vh) {
          c.style.opacity = Math.max(0, 1 - (y / (vh * 0.7)));
          c.style.transform = `translateY(${y * 0.3}px)`;
        }
      });
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  // Counters
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

  // Portfolio filter (Apple pills)
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

  // Portfolio modal (event delegation — works for DB-injected cards too)
  const modal = document.getElementById('portfolio-modal');
  const mClose = document.getElementById('bento-modal-close');
  const mImg = document.getElementById('bento-modal-img');
  const mVidWrap = document.getElementById('bento-modal-video-container');
  const mFrame = document.getElementById('bento-modal-iframe');
  const mTitle = document.getElementById('bento-modal-title');
  const mCat = document.getElementById('bento-modal-cat');
  const mDesc = document.getElementById('bento-modal-desc');
  let lastFocus = null;
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (mFrame) mFrame.removeAttribute('src');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function openItem(item) {
    const type = item.dataset.itemType;
    const title = item.dataset.title || '';
    mTitle.textContent = title;
    mCat.textContent = item.dataset.category || '';
    mDesc.textContent = item.dataset.description || '';
    if (type === 'video' && item.dataset.videoUrl) {
      mImg.style.display = 'none'; mVidWrap.style.display = 'block';
      mFrame.src = item.dataset.videoUrl || '';
    } else {
      mVidWrap.style.display = 'none'; mImg.style.display = 'block';
      mImg.src = item.dataset.src || '';
      mImg.alt = title || 'Photo detail view';
      if (mFrame) mFrame.removeAttribute('src');
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
      if (item) openItem(item);
    });
    if (mClose) mClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });
  }

  // Contact form — inline status feedback instead of alert()
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const name = document.getElementById('contact-name');
      const greeting = name && name.value.trim() ? `Thank you, ${name.value.trim()} — ` : 'Thank you — ';
      status.textContent = `${greeting}your message is on its way. We reply within 2 business days.`;
      status.hidden = false;
      form.querySelectorAll('input, textarea').forEach(f => { f.value = ''; });
    });
  }
});
