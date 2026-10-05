/* 1. BIOS Boot, 1986 edition — the opening screen. Any key / tap → glitch → next section. */
Site.register({
  id: 'boot',
  title: 'BIOS',
  css: `
    #boot { background: #000; padding: 0; align-items: stretch; }
    #boot > .wrap { max-width: none; transform: none; }
    #boot .bios {
      position: relative; min-height: 100vh; padding: 3vh 4vw 4vh;
      font: 1.05rem/1.55 var(--mono); color: #c8c8c8; cursor: pointer;
      text-shadow: 0 0 6px rgba(255,255,255,.25);
      animation: crt-flicker 4s infinite;
    }
    #boot .bios::after { /* scanlines */
      content: ""; position: absolute; inset: 0; pointer-events: none;
      background: repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.28) 2px 3px);
    }
    #boot .head { display: flex; justify-content: space-between; gap: 2rem; margin-bottom: 2.2vh; }
    #boot .award { display: flex; gap: .9rem; align-items: center; }
    #boot .award .logo {
      width: 2.6rem; height: 2.6rem; flex: none;
    }
    #boot .award .logo img { width: 100%; height: 100%; object-fit: contain; display: block; }
    #boot .star { text-align: right; color: #4fb6ff; line-height: 1.2; font-weight: 700; }
    #boot .star small { display: block; color: #3a8ccc; font-weight: 400; font-size: .7rem; letter-spacing: .2em; }
    #boot .log div { white-space: pre-wrap; min-height: 1.55em; }
    #boot .ok { color: #3fe05c; }
    #boot .warn { color: #ffb000; }
    #boot .err { color: #ff4f4f; }
    #boot .hi { color: #fff; font-weight: 700; }
    #boot .party { color: #ff6ad5; font-weight: 700; }
    #boot .prompt {
      margin-top: 3vh; color: #fff; font-weight: 700; opacity: 0; transition: opacity .4s;
    }
    #boot .prompt.show { opacity: 1; }
    #boot .prompt span { animation: blink 1s steps(1) infinite; }
    #boot .foot { position: absolute; left: 4vw; right: 4vw; bottom: 3vh; display: flex; justify-content: space-between; color: #8a8a8a; font-size: .8rem; }
    #boot .skip { color: #555; }
    #boot .bios.glitch { animation: glitch .55s steps(2) forwards; }
    @keyframes crt-flicker { 0%,100% { opacity: 1 } 92% { opacity: 1 } 93% { opacity: .85 } 94% { opacity: 1 } }
    @keyframes glitch {
      0%   { transform: none; filter: none; }
      20%  { transform: translate(-8px, 2px) skewX(6deg); filter: hue-rotate(90deg) contrast(2); }
      40%  { transform: translate(10px, -3px); filter: invert(1); }
      60%  { transform: translate(-4px, 0) scaleY(.6); filter: hue-rotate(-90deg) saturate(4); }
      80%  { transform: scaleY(.02); filter: brightness(4); }
      100% { transform: scaleY(.002); filter: brightness(6); opacity: 0; }
    }
  `,

  render: (c) => `
    <div class="bios" role="button" aria-label="Boot TeacherOS">
      <div class="head">
        <div class="award">
          <div class="logo"><img src="assets/AIT_logo.png" alt="AIT logo"></div>
          <div><div class="hi">Award-Winning Teachers BIOS v1.984</div>
          <div>Copyright (C) 1980s, OG Millennial Code Masters.</div></div>
        </div>
        <div class="star">★ TEACHER<br>STAR<small>CERTIFIED LEGEND</small></div>
      </div>
      <div class="log"></div>
      <div class="prompt">Press any key to celebrate <span>_</span></div>
      <div class="foot">
        <span>Press <b>DEL</b> to delete homework (Permission denied)</span>
        <span class="skip">tap to skip</span>
      </div>
    </div>
  `,

  onEnter(el, c, ctx) {
    const [a, b] = c.teachers;
    const d = new Date();
    const date = [d.getDate(), d.getMonth() + 1, d.getFullYear()].map((n) => String(n).padStart(2, '0')).join('.');
    const dots = (label, w = 44) => label.padEnd(w, '.') + ' ';
    const log = el.querySelector('.log');
    const bios = el.querySelector('.bios');
    const prompt = el.querySelector('.prompt');
    let done = false;
    let leaving = false;

    const lines = [
      { text: 'CPU : Human Brain  ∞ GHz, 2 cores detected', pause: 260 },
      { html: 'Memory Test : <span class="mem">0</span>GB', pause: 0 },
      { text: '', pause: 120 },
      {
        text: dots('Detecting professors') + a.name + ' & ' + b.name,
        html: esc(dots('Detecting professors')) + name(a) + ' &amp; ' + name(b) + '  <span class="ok">[ OK ]</span>',
      },
      { text: dots('Checking Stack Overflow reputation'), html: esc(dots('Checking Stack Overflow reputation')) + '<span class="ok">[ LEGENDARY ]</span>' },
      { text: dots('Loading patience.sys'), html: esc(dots('Loading patience.sys')) + '<span class="ok">[ ∞ ]</span>' },
      { text: dots('Calibrating humor level'), html: esc(dots('Calibrating humor level')) + '<span class="party">[ PEAK — even the compiler laughed ]</span>' },
      {
        text: dots('Loading surprise_exam.exe'),
        html: esc(dots('Loading surprise_exam.exe')) + '<span class="warn">[ ARMED by </span>' + name(b, true) + '<span class="warn"> — date: RIGHT NOW ]</span>',
      },
      { text: dots('Request exam time extension'), html: esc(dots('Request exam time extension')) + '<span class="err">[ 403 Forbidden ]</span>' },
      { text: dots('GET /monthly_plov_solutions'), html: esc(dots('GET /monthly_plov_solutions')) + '<span class="err">[ 420 Bad Request ]</span>' },
      { text: '', pause: 200 },
      { text: `System date: ${date}`, pause: 300 },
      { html: '<span class="party">*** TEACHER\'S DAY DETECTED ***</span>', pause: 200 },
    ];
    function esc(s) { return Site.esc(s); }
    function name(t, short) { return `<span style="color:${t.color};font-weight:700">${esc(short ? t.short : t.name)}</span>`; }

    async function boot() {
      await ctx.sleep(400);
      await Site.typeLines(log, lines.slice(0, 2), ctx, { charMs: 14 });
      // memory test count-up, the most 80s thing possible
      const mem = log.querySelector('.mem');
      for (let k = 0; k <= 640; k += 32) { mem.textContent = k; await ctx.sleep(40); }
      await Site.typeLines(log, lines.slice(2), ctx, { charMs: 10, lineMs: 160 });
      prompt.classList.add('show');
      done = true;
    }

    async function leave() {
      if (leaving) return;
      leaving = true;
      bios.classList.add('glitch');
      await Site.sleep(560);
      Site.next();
      await Site.sleep(900);
      // restore so scrolling back up shows the finished screen
      bios.classList.remove('glitch');
      leaving = false;
    }

    function act() {
      if (!done) { ctx.fast = true; return; } // first press skips the typing
      leave();
    }

    bios.addEventListener('click', act);
    ctx.onKey = (e) => {
      if (['Shift', 'Meta', 'Control', 'Alt', 'ArrowLeft', 'PageUp', 'r', 'R'].includes(e.key)) return false;
      act();
      return true;
    };
    boot();
  },
});
