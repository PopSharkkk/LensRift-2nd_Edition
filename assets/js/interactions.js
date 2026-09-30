/* Apple-inspired interactions — ported from WebPro quiz1/js/main.js + LensRift modal/filter */
document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  // Mobile nav (identical to quiz1)
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay = document.querySelector('.nav-mobile-overlay');
  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    });
    overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hamburger.classList.remove('active'); overlay.classList.remove('active'); document.body.style.overflow = '';
    }));
  }

  // Nav scrolled state
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // Smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // Hero parallax
  const heroes = document.querySelectorAll('.hero');
  if (heroes.length) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroes.forEach(h => {
        const c = h.querySelector('.hero-content');
        if (c && y < window.innerHeight) {
          c.style.opacity = Math.max(0, 1 - (y / (window.innerHeight * 0.7)));
          c.style.transform = `translateY(${y * 0.3}px)`;
        }
      });
    }, { passive: true });
  }

  // Counters
  document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
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
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const t = btn.dataset.type;
      if (videoBlock) videoBlock.style.display = (t === 'all' || t === 'video') ? '' : 'none';
      if (photoBlock) photoBlock.style.display = (t === 'all' || t === 'photo') ? '' : 'none';
    }));
  }

  // Portfolio modal
  const modal = document.getElementById('portfolio-modal');
  const mClose = document.getElementById('bento-modal-close');
  const mImg = document.getElementById('bento-modal-img');
  const mVidWrap = document.getElementById('bento-modal-video-container');
  const mFrame = document.getElementById('bento-modal-iframe');
  const mTitle = document.getElementById('bento-modal-title');
  const mCat = document.getElementById('bento-modal-cat');
  const mDesc = document.getElementById('bento-modal-desc');
  const items = document.querySelectorAll('.portfolio-item');
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (mFrame) mFrame.src = '';
  }
  if (modal && items.length) {
    items.forEach(item => item.addEventListener('click', () => {
      const type = item.dataset.itemType;
      mTitle.textContent = item.dataset.title || '';
      mCat.textContent = item.dataset.category || '';
      mDesc.textContent = item.dataset.description || '';
      if (type === 'video') {
        mImg.style.display = 'none'; mVidWrap.style.display = 'block';
        mFrame.src = item.dataset.videoUrl || '';
      } else {
        mVidWrap.style.display = 'none'; mImg.style.display = 'block';
        mImg.src = item.dataset.src || '';
        if (mFrame) mFrame.src = '';
      }
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }));
    if (mClose) mClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }
});
