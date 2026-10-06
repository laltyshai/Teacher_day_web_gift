/* TeacherOS core — section registry, mounting, scroll triggers, presenter keys, helpers.
 *
 * Section contract (each sections/*.js):
 *   Site.register({
 *     id: 'leetcode',                 // <section id="leetcode">
 *     title: 'Two Professors',        // nav-dot label
 *     className: 'optional extra classes',
 *     css: `#leetcode .x { … }`,      // injected once
 *     render: (c) => `<div>…</div>`,  // c = window.CONTENT, returns HTML
 *     onEnter: (el, c, ctx) => { … }, // runs once when the section scrolls into view
 *   });
 *
 * ctx (per mount; a replay with the R key kills the old one and makes a new one):
 *   ctx.sleep(ms)     promise; never resolves once the section is replayed (cancels async flows)
 *   ctx.every(ms, fn) interval, auto-stopped on replay
 *   ctx.fast          true → sleeps become 0 (used to skip animations)
 *   ctx.onKey = (e) => true   claim a key press while this section is current
 */
(function () {
  'use strict';

  const defs = [];
  const mounted = []; // { def, el, ctx, entered, dot }
  let cur = 0;

  /* ---------- helpers ---------- */

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function makeCtx() {
    const ctx = {
      alive: true,
      fast: false,
      timers: [],
      onKey: null,
      sleep(ms) {
        return new Promise((resolve) => {
          const t = setTimeout(() => { if (ctx.alive) resolve(); }, ctx.fast ? 0 : ms);
          ctx.timers.push(t);
        });
      },
      every(ms, fn) {
        const t = setInterval(() => (ctx.alive ? fn() : clearInterval(t)), ms);
        ctx.timers.push(t);
        return t;
      },
      kill() {
        ctx.alive = false;
        ctx.timers.forEach((t) => { clearTimeout(t); clearInterval(t); });
        ctx.timers.length = 0;
      },
    };
    return ctx;
  }

  /** Type `text` into `el` character by character. */
  async function typeText(el, text, ctx, charMs = 18) {
    const chars = Array.from(String(text));
    el.classList.add('typing');
    for (let i = 1; i <= chars.length; i++) {
      if (ctx.fast) { el.textContent = chars.join(''); break; }
      el.textContent = chars.slice(0, i).join('');
      await ctx.sleep(charMs);
    }
    el.classList.remove('typing');
  }

  /** Append lines to `box`. A line is a string, or { text, html, cls, pause }:
   *  text is typed, then html (if given) replaces it; html alone appears instantly. */
  async function typeLines(box, lines, ctx, { charMs = 12, lineMs = 140 } = {}) {
    for (const line of lines) {
      const spec = typeof line === 'string' ? { text: line } : line;
      const div = document.createElement('div');
      if (spec.cls) div.className = spec.cls;
      box.appendChild(div);
      if (spec.text != null) await typeText(div, spec.text, ctx, charMs);
      if (spec.html != null) div.innerHTML = spec.html;
      await ctx.sleep(spec.pause != null ? spec.pause : lineMs);
    }
  }

  /** Animate a number in `el` from 0 to `to`. */
  function countUp(el, to, ctx, { ms = 1400, decimals = 0, prefix = '', suffix = '' } = {}) {
    return new Promise((resolve) => {
      const t0 = performance.now();
      const fmt = (v) => prefix + v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
      (function frame(now) {
        if (!ctx.alive) return;
        const p = ctx.fast ? 1 : Math.min(1, (now - t0) / ms);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(to * eased);
        if (p < 1) requestAnimationFrame(frame);
        else resolve();
      })(t0);
    });
  }

  /** Image (or video) with a dashed "drop photo here" fallback when the file is missing. */
  function photo(src, label = '', cls = '') {
    const isVideo = /\.(mp4|webm|mov)$/i.test(src || '');
    const fail = "this.parentNode.classList.add('missing')";
    const media = !src
      ? ''
      : isVideo
        ? `<video src="${esc(src)}#t=0.1" controls muted playsinline preload="metadata" onerror="${fail}"></video>`
        : `<img src="${esc(src)}" alt="${esc(label)}" loading="lazy" onerror="${fail}">`;
    return `<div class="photo ${src ? '' : 'missing'} ${cls}">${media}` +
      `<span class="missing-label">📷 drop file:<br>${esc(src || 'assets/photos/…')}</span></div>`;
  }

  /** Floating "+10" style label above an element. */
  function floatText(anchor, text, color) {
    const r = anchor.getBoundingClientRect();
    const span = document.createElement('span');
    span.className = 'float-plus';
    span.textContent = text;
    if (color) span.style.color = color;
    span.style.left = r.left + window.scrollX + r.width / 2 - 12 + 'px';
    span.style.top = r.top + window.scrollY - 6 + 'px';
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 950);
  }

  /* ---------- confetti (canvas, no library) ---------- */

  const confetti = (() => {
    const colors = ['#3fb950', '#58a6ff', '#a371f7', '#d29922', '#f85149', '#f778ba', '#ffffff'];
    let canvas, g, parts = [], running = false;

    function ensure() {
      if (canvas) return;
      canvas = document.getElementById('confetti');
      g = canvas.getContext('2d');
      resize();
      window.addEventListener('resize', resize);
    }
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function piece(x, y, vx, vy) {
      return { x, y, vx, vy, w: rand(6, 12), h: rand(8, 16), r: rand(0, 6.28), vr: rand(-0.25, 0.25), c: pick(colors), t: rand(0, 6.28), life: 0 };
    }
    function run() {
      if (!running) { running = true; requestAnimationFrame(tick); }
    }
    function burst({ x = innerWidth / 2, y = innerHeight * 0.65, count = 160, spread = 65, power = 17 } = {}) {
      ensure();
      for (let i = 0; i < count; i++) {
        const a = ((-90 + rand(-spread, spread)) * Math.PI) / 180;
        const v = power * rand(0.45, 1.1);
        parts.push(piece(x, y, Math.cos(a) * v, Math.sin(a) * v));
      }
      run();
    }
    function rain(ms = 4000) {
      ensure();
      const end = performance.now() + ms;
      (function drop() {
        for (let i = 0; i < 7; i++) parts.push(piece(rand(0, innerWidth), -20, rand(-1, 1), rand(1, 4)));
        run();
        if (performance.now() < end) setTimeout(drop, 60);
      })();
    }
    function tick() {
      g.clearRect(0, 0, innerWidth, innerHeight);
      parts = parts.filter((p) => p.y < innerHeight + 40 && p.life < 900);
      for (const p of parts) {
        p.life++;
        p.vx *= 0.985;
        p.vy = p.vy * 0.97 + 0.28;
        p.t += 0.12;
        p.x += p.vx + Math.sin(p.t) * 0.6;
        p.y += p.vy;
        p.r += p.vr;
        g.save();
        g.translate(p.x, p.y);
        g.rotate(p.r);
        g.fillStyle = p.c;
        g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.t)));
        g.restore();
      }
      if (parts.length) requestAnimationFrame(tick);
      else { running = false; g.clearRect(0, 0, innerWidth, innerHeight); }
    }
    return { burst, rain };
  })();

  /* ---------- mounting ---------- */

  function renderInto(m) {
    try {
      m.el.innerHTML = '<div class="wrap">' + m.def.render(window.CONTENT || {}, Site) + '</div>';
    } catch (e) {
      console.error(`[section ${m.def.id}] render failed`, e);
      m.el.innerHTML = `<div class="wrap"><p class="mono">section "${esc(m.def.id)}" failed to render: ${esc(e.message)}</p></div>`;
    }
  }

  function enter(m) {
    m.entered = true;
    m.el.classList.add('visible');
    if (!m.def.onEnter) return;
    try {
      const res = m.def.onEnter(m.el, window.CONTENT || {}, m.ctx);
      if (res && res.catch) res.catch((e) => console.error(`[section ${m.def.id}] onEnter failed`, e));
    } catch (e) {
      console.error(`[section ${m.def.id}] onEnter failed`, e);
    }
  }

  function replay(m) {
    if (!m) return;
    m.ctx.kill();
    m.ctx = makeCtx();
    m.el.classList.remove('visible');
    renderInto(m);
    void m.el.offsetWidth; // restart the reveal transition
    enter(m);
  }

  /* ---------- navigation ---------- */

  function goto(i) {
    const m = mounted[Math.max(0, Math.min(mounted.length - 1, i))];
    if (m) m.el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function next() {
    const m = mounted[cur];
    if (!m) return;
    const r = m.el.getBoundingClientRect();
    // tall section: page through it before jumping on
    if (r.bottom > innerHeight + 40) window.scrollBy({ top: innerHeight * 0.85, behavior: 'smooth' });
    else goto(cur + 1);
  }

  function prev() {
    const m = mounted[cur];
    if (!m) return;
    if (m.el.getBoundingClientRect().top < -40) goto(cur);
    else goto(cur - 1);
  }

  function onScroll() {
    if (!mounted.length) return;
    const mid = innerHeight / 2;
    let idx = 0;
    mounted.forEach((m, i) => { if (m.el.getBoundingClientRect().top <= mid) idx = i; });
    if (idx !== cur || !mounted[cur].dot.classList.contains('active')) {
      mounted.forEach((m, i) => m.dot.classList.toggle('active', i === idx));
      cur = idx;
    }
    const max = document.documentElement.scrollHeight - innerHeight;
    document.getElementById('progress').style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
  }

  function onKey(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    const m = mounted[cur];
    if (m && m.ctx.onKey && m.ctx.onKey(e) === true) { e.preventDefault(); return; }

    switch (e.key) {
      case ' ':
      case 'ArrowRight':
      case 'PageDown':
        e.preventDefault();
        if (tag === 'button') e.target.blur(); // stop Space from "clicking" a focused button
        if (e.key === ' ' && e.shiftKey) prev(); else next();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        prev();
        break;
      case 'r':
      case 'R':
        replay(m);
        break;
    }
  }

  function start() {
    const style = document.createElement('style');
    style.textContent = defs.map((d) => d.css || '').join('\n');
    document.head.appendChild(style);

    const app = document.getElementById('app');
    const dots = document.getElementById('dots');

    defs.forEach((def, i) => {
      const el = document.createElement('section');
      el.className = 'sec' + (def.className ? ' ' + def.className : '');
      el.id = def.id;
      const m = { def, el, ctx: makeCtx(), entered: false, dot: null };
      mounted.push(m);
      renderInto(m);
      app.appendChild(el);

      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', def.title || def.id);
      dot.innerHTML = `<span>${esc(def.title || def.id)}</span>`;
      // dots never keep focus, so a later Space/Enter can't re-trigger them
      dot.addEventListener('mousedown', (e) => e.preventDefault());
      dot.addEventListener('click', () => { dot.blur(); goto(i); });
      dots.appendChild(dot);
      m.dot = dot;
    });

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const m = mounted.find((x) => x.el === en.target);
        if (m && !m.entered) enter(m);
      }),
      { rootMargin: '0px 0px -35% 0px' } // fire when the section's top passes 65% of the screen
    );
    mounted.forEach((m) => obs.observe(m.el));

    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  const Site = {
    register: (def) => defs.push(def),
    goto,
    next,
    prev,
    goToId: (id) => goto(mounted.findIndex((m) => m.def.id === id)),
    replayCurrent: () => replay(mounted[cur]),
    esc,
    rand,
    pick,
    sleep,
    typeText,
    typeLines,
    countUp,
    photo,
    floatText,
    confetti: confetti.burst,
    confettiRain: confetti.rain,
  };
  window.Site = Site;

  document.addEventListener('DOMContentLoaded', start);
})();
