/* LensRift drag-strip — Apple-style 1:1 pointer tracking with spring settle.
   - Pointer Events + setPointerCapture; content stays glued to the grab point.
   - Release hands velocity to a spring aimed at the momentum-projected snap point
     (Apple projection: (v/1000) * d / (1-d), d = 0.998).
   - Critically damped (ratio 1.0, response ~0.35s) by default; ratio 0.8 only on
     hard flicks. Rubber-band resistance past the edges. Grabbing mid-settle
     interrupts from the live position — never from the target.
   - Mouse/pen only: touch keeps native momentum scrolling. Reduced motion:
     no custom drag or springs at all, native scroll + snap takes over. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

  /* Apple's rubber-band: progressive resistance past a boundary. */
  function rubberband(overshoot, dimension, constant) {
    var c = constant == null ? 0.55 : constant;
    return (overshoot * dimension * c) / (dimension + c * Math.abs(overshoot));
  }

  /* Apple momentum projection for a release velocity in px/s. */
  function project(velocity, rate) {
    var d = rate == null ? 0.998 : rate;
    return (velocity / 1000) * d / (1 - d);
  }

  /* Critically-damped-ish spring stepper (semi-implicit Euler).
     ratio: damping ratio (1.0 = no overshoot, 0.8 = slight bounce).
     response: seconds to roughly settle. Returns a cancel function. */
  function springTo(setter, from, target, velocity, ratio, response, onDone) {
    var omega = 4 / Math.max(0.05, response);
    var stiffness = omega * omega;
    var damping = 2 * ratio * omega;
    var x = from, v = velocity || 0, raf = 0, last = performance.now();
    function frame(now) {
      var dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      var F = -stiffness * (x - target) - damping * v;
      v += F * dt;
      x += v * dt;
      setter(x);
      if (Math.abs(x - target) < 0.5 && Math.abs(v) < 12) {
        setter(target);
        if (onDone) onDone();
        return;
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return function cancel() { cancelAnimationFrame(raf); };
  }

  function snapPoints(strip) {
    var pts = [];
    var cards = strip.querySelectorAll('.strip-card');
    for (var i = 0; i < cards.length; i++) pts.push(cards[i].offsetLeft);
    return pts;
  }

  function nearestSnap(pts, x) {
    var best = pts[0] == null ? 0 : pts[0];
    for (var i = 1; i < pts.length; i++) {
      if (Math.abs(pts[i] - x) < Math.abs(best - x)) best = pts[i];
    }
    return best;
  }

  function maxScroll(strip) { return Math.max(0, strip.scrollWidth - strip.clientWidth); }

  function initStrip(strip) {
    if (strip.__lrStrip) return;
    strip.__lrStrip = true;

    var cancelSpring = null;
    var dragging = false, engaged = false;
    var startX = 0, startScroll = 0, moved = 0;
    var history = []; // [x, t] pairs for release-velocity tracking

    function stopSpring() {
      if (cancelSpring) { cancelSpring(); cancelSpring = null; }
    }

    function settle(target, velocity) {
      stopSpring();
      var hardFlick = Math.abs(velocity || 0) > 1200;
      cancelSpring = springTo(
        function (x) { strip.scrollLeft = x; },
        strip.scrollLeft, target, velocity || 0,
        hardFlick ? 0.8 : 1.0, 0.35,
        function () { cancelSpring = null; updateArrows(); }
      );
    }

    /* Arrow buttons + edge state via IntersectionObserver (no scroll listeners). */
    var wrap = strip.closest('.strip-wrap');
    var prevBtn = wrap ? wrap.querySelector('[data-strip-prev]') : null;
    var nextBtn = wrap ? wrap.querySelector('[data-strip-next]') : null;
    function updateArrows() {
      var max = maxScroll(strip);
      if (prevBtn) prevBtn.disabled = strip.scrollLeft <= 4;
      if (nextBtn) nextBtn.disabled = strip.scrollLeft >= max - 4;
    }
    if ('IntersectionObserver' in window && (prevBtn || nextBtn)) {
      var cards = strip.querySelectorAll('.strip-card');
      if (cards.length) {
        var edgeObs = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.target === cards[0] && prevBtn) prevBtn.disabled = en.isIntersecting && strip.scrollLeft <= 4 ? true : strip.scrollLeft <= 4;
            if (en.target === cards[cards.length - 1] && nextBtn) nextBtn.disabled = en.isIntersecting ? true : strip.scrollLeft >= maxScroll(strip) - 4;
          });
          if (prevBtn && !cards[0]) prevBtn.disabled = true;
        }, { root: strip, threshold: 0.9 });
        edgeObs.observe(cards[0]);
        edgeObs.observe(cards[cards.length - 1]);
      }
    }
    updateArrows();

    function goTo(dir) {
      var pts = snapPoints(strip);
      if (!pts.length) return;
      var cur = strip.scrollLeft, dest = dir > 0 ? pts[pts.length - 1] : pts[0];
      for (var i = 0; i < pts.length; i++) {
        if (dir > 0 && pts[i] > cur + 8) { dest = pts[i]; break; }
        if (dir < 0 && pts[i] < cur - 8) dest = pts[i];
      }
      settle(clamp(dest, 0, maxScroll(strip)), 0);
    }
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(1); });
    strip.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(-1); }
    });

    if (reduceMotion) return; // native scroll only from here down

    strip.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      if (e.button != null && e.button !== 0) return;
      stopSpring(); // interrupt from the live position
      dragging = true; engaged = false; moved = 0;
      startX = e.clientX; startScroll = strip.scrollLeft;
      history = [[e.clientX, performance.now()]];
      try { strip.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
    });

    strip.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      var dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      if (!engaged && Math.abs(dx) < 10) return; // hysteresis before committing
      if (!engaged) { engaged = true; strip.classList.add('is-dragging'); }
      var now = performance.now();
      history.push([e.clientX, now]);
      if (history.length > 6) history.shift();
      var raw = startScroll - dx;
      var max = maxScroll(strip);
      var x = raw;
      if (raw < 0) x = rubberband(raw, strip.clientWidth);
      else if (raw > max) x = max + rubberband(raw - max, strip.clientWidth);
      strip.scrollLeft = x;
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      strip.classList.remove('is-dragging');
      if (!engaged) return;
      if (moved > 6) {
        // Suppress the click that follows a real drag (capture phase, once).
        document.addEventListener('click', function swallow(ev) {
          document.removeEventListener('click', swallow, true);
          ev.preventDefault(); ev.stopPropagation();
        }, true);
      }
      // Release velocity from recent history (px/s), handed to the spring.
      var v = 0;
      if (history.length >= 2) {
        var a = history[0], b = history[history.length - 1];
        var dt = (b[1] - a[1]) / 1000;
        if (dt > 0.005) v = -((b[0] - a[0]) / dt);
      }
      v = clamp(v, -6000, 6000);
      var pts = snapPoints(strip);
      var projected = strip.scrollLeft + project(v);
      var dest = pts.length ? nearestSnap(pts, projected) : strip.scrollLeft;
      settle(clamp(dest, 0, maxScroll(strip)), v);
      updateArrows();
    }
    strip.addEventListener('pointerup', endDrag);
    strip.addEventListener('pointercancel', endDrag);
  }

  function initAll() {
    document.querySelectorAll('[data-drag-strip]').forEach(initStrip);
  }

  // Media-loader re-renders grids after fetch; it calls this hook when done.
  window.LensRiftInitStrips = initAll;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
