/* 2. TeacherOS Dashboard — two "production nodes", live counters, incident log. */
Site.register({
  id: 'dashboard',
  title: 'Dashboard',
  css: `
    #dashboard .bar {
      display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
      padding: .7rem 1rem; margin-bottom: 1rem; font: .85rem var(--mono); color: var(--muted);
    }
    #dashboard .bar b { color: var(--text); }
    #dashboard .bar .sp { flex: 1; }
    #dashboard .pill {
      display: inline-flex; align-items: center; gap: .45em; padding: .15em .7em; border-radius: 999px;
      font: 600 .75rem var(--mono); background: rgba(63,185,80,.12); color: var(--green); border: 1px solid rgba(63,185,80,.4);
    }
    #dashboard .led { width: .6em; height: .6em; border-radius: 50%; background: var(--green); box-shadow: 0 0 8px var(--green); animation: led 1.6s infinite; }
    @keyframes led { 50% { opacity: .35; } }
    #dashboard .nodes { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    #dashboard .node { padding: 1.1rem 1.2rem 1rem; position: relative; overflow: hidden; }
    #dashboard .node::before { content: ""; position: absolute; inset: 0 0 auto 0; height: 3px; background: var(--accent); }
    #dashboard .nhead { display: flex; justify-content: space-between; align-items: center; font: .85rem var(--mono); color: var(--muted); }
    #dashboard .nhead .id { color: var(--text); font-weight: 600; display: flex; align-items: center; gap: .5em; }
    #dashboard .who { margin: .5rem 0 .2rem; font-size: 1.35rem; font-weight: 700; }
    #dashboard .who small { color: var(--muted); font-weight: 400; font-size: .85rem; margin-left: .4em; }
    #dashboard .tags { display: flex; gap: .4rem; flex-wrap: wrap; margin-bottom: .9rem; }
    #dashboard .tag { font: .7rem var(--mono); padding: .1em .55em; border-radius: 4px; background: rgba(88,166,255,.12); color: var(--blue); }
    #dashboard .metrics { display: grid; grid-template-columns: 1fr 1fr; gap: .55rem; }
    #dashboard .m { background: var(--panel-2); border: 1px solid var(--border); border-radius: 8px; padding: .55rem .75rem; }
    #dashboard .m .k { font: .68rem var(--mono); color: var(--muted); text-transform: uppercase; letter-spacing: .06em; }
    #dashboard .m .v { font: 700 1.25rem var(--mono); margin-top: .1rem; white-space: nowrap; }
    #dashboard .m .v.small { font-size: .95rem; }
    #dashboard .inf { display: inline-block; animation: pop .5s ease-out; color: var(--green); }
    #dashboard .coffee { height: .55rem; border-radius: 99px; background: #0d1117; margin-top: .45rem; overflow: hidden; }
    #dashboard .coffee i { display: block; height: 100%; width: 0; background: linear-gradient(90deg, #8b5a2b, #d29922); transition: width 1.2s ease; }
    #dashboard .legend {
      background: linear-gradient(90deg, #f778ba, #d29922, #3fb950, #58a6ff, #a371f7, #f778ba);
      background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; color: transparent;
      animation: shimmer 3s linear infinite;
    }
    @keyframes shimmer { to { background-position: 200% 0; } }
    #dashboard .spark { margin-top: .9rem; }
    #dashboard .spark .k { font: .68rem var(--mono); color: var(--muted); text-transform: uppercase; letter-spacing: .06em; display: flex; justify-content: space-between; }
    #dashboard .spark .plot { position: relative; margin-top: .3rem; }
    #dashboard .spark svg { width: 100%; height: 70px; display: block; overflow: visible; }
    #dashboard .spark .dip { position: absolute; left: 41%; bottom: -2px; font: .62rem var(--mono); color: var(--muted); }
    #dashboard .spark path.line { fill: none; stroke: var(--accent); stroke-width: 2.5; vector-effect: non-scaling-stroke; stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 2.2s ease; }
    #dashboard .spark path.area { fill: var(--accent); opacity: 0; transition: opacity 1.2s 1.6s; }
    #dashboard.visible .spark.go path.line { stroke-dashoffset: 0; }
    #dashboard.visible .spark.go path.area { opacity: .12; }
    #dashboard .log { margin-top: 1rem; padding: .9rem 1.1rem; font: .82rem/1.75 var(--mono); min-height: 12.5em; }
    #dashboard .log .t { color: var(--muted); }
    #dashboard .log .INFO { color: var(--blue); }
    #dashboard .log .WARN { color: var(--amber); }
    #dashboard .log .ERROR { color: var(--red); }
    #dashboard .log .OK { color: var(--green); }
    #dashboard .log div { animation: pop .35s ease-out; transform-origin: left; }
    @media (max-width: 860px) { #dashboard .nodes { grid-template-columns: 1fr; } }
  `,

  render(c) {
    const node = (t) => `
      <div class="node panel" data-id="${t.id}" style="--accent:${t.color}">
        <div class="nhead">
          <span class="id"><span class="led"></span>node-${t.id}</span>
          <span class="pill">HEALTHY</span>
        </div>
        <div class="who">${Site.esc(t.name)}<small>${Site.esc(t.short)}</small></div>
        <div class="tags">${t.subjects.map((s) => `<span class="tag">${Site.esc(s)}</span>`).join('')}</div>
        <div class="metrics">
          <div class="m"><div class="k">Students compiled</div><div class="v" data-count="${t.dashboard.students}">0</div></div>
          <div class="m"><div class="k">Uptime · 99.99%</div><div class="v small uptime">—</div></div>
          <div class="m"><div class="k">Patience</div><div class="v patience">0</div></div>
          <div class="m"><div class="k">Bugs fixed</div><div class="v" data-count="${t.dashboard.bugsFixed}" data-suffix="+">0</div></div>
          <div class="m"><div class="k">Stack Overflow rep</div><div class="v" data-count="${t.dashboard.soRep}">0</div></div>
          <div class="m"><div class="k">Jokes / lecture</div><div class="v" data-count="${t.dashboard.jokesPerLecture}">0</div></div>
          <div class="m"><div class="k">Coffee level · <span class="cpct">HIGH</span></div><div class="coffee"><i data-coffee="${t.dashboard.coffee}"></i></div></div>
          <div class="m"><div class="k">Status</div><div class="v legend">LEGENDARY</div></div>
        </div>
        <div class="spark">
          <div class="k"><span>Student understanding · this semester</span><span>↑ 900%</span></div>
          <div class="plot"><svg viewBox="0 0 300 70" preserveAspectRatio="none"></svg><span class="dip">midterms ↓</span></div>
        </div>
      </div>`;

    return `
      <p class="kicker"><b>$</b> teacheros status --cluster cs-faculty</p>
      <h2 class="big">TeacherOS Dashboard</h2>
      <div class="bar panel">
        <span class="led"></span><b>TeacherOS Console</b>
        <span>cluster: cs-faculty-prod</span><span>region: classroom-1</span>
        <span class="sp"></span>
        <span class="pill">All systems operational</span>
        <span class="clock">--:--:--</span>
      </div>
      <div class="nodes">${c.teachers.map(node).join('')}</div>
      <div class="log panel"></div>
    `;
  },

  onEnter(el, c, ctx) {
    const pad = (n) => String(n).padStart(2, '0');

    // live clock + uptime per teacher
    const clock = el.querySelector('.clock');
    const tick = () => {
      const now = new Date();
      clock.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      c.teachers.forEach((t) => {
        const ms = now - new Date(t.teachingSince);
        const s = Math.max(0, Math.floor(ms / 1000));
        const y = Math.floor(s / 31557600);
        const d = Math.floor((s % 31557600) / 86400);
        const hms = `${pad(Math.floor((s % 86400) / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
        el.querySelector(`.node[data-id="${t.id}"] .uptime`).textContent = `${y}y ${d}d ${hms}`;
      });
    };
    tick();
    ctx.every(1000, tick);

    // counters
    el.querySelectorAll('[data-count]').forEach((v) =>
      Site.countUp(v, +v.dataset.count, ctx, { ms: 1800, suffix: v.dataset.suffix || '' }));

    // patience: counts like a normal number… then gives up and becomes ∞
    el.querySelectorAll('.patience').forEach(async (v) => {
      await Site.countUp(v, 9999, ctx, { ms: 1600 });
      await ctx.sleep(250);
      v.innerHTML = '<span class="inf">∞</span>';
    });

    // coffee wobble
    const cups = [...el.querySelectorAll('[data-coffee]')];
    const pour = () => cups.forEach((i) => {
      const lvl = Math.max(35, +i.dataset.coffee - Math.random() * 30);
      i.style.width = lvl + '%';
      i.closest('.m').querySelector('.cpct').textContent = lvl > 80 ? 'HIGH' : lvl > 55 ? 'OK' : 'REFILL';
    });
    setTimeout(pour, 300);
    ctx.every(1700, pour);

    // sparklines (midterm dip included, honesty matters)
    el.querySelectorAll('.spark').forEach((box, n) => {
      const pts = [8, 10, 9, 16, 22, 19, 12, 28, 35, 33, 44, 52, 50, 62].map((y, i) => [i * (300 / 13), 66 - y - (n ? 2 : 0)]);
      const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
      box.querySelector('svg').innerHTML =
        `<path class="area" d="${d} L300 70 L0 70 Z"></path>` +
        `<path class="line" pathLength="1" d="${d}"></path>`;
      requestAnimationFrame(() => requestAnimationFrame(() => box.classList.add('go')));
    });

    // incident log
    const [a, b] = c.teachers;
    const row = (t, lvl, msg) => ({ html: `<span class="t">[${t}]</span> <span class="${lvl}">${lvl.padEnd(5, ' ').replace(/ /g, '&nbsp;')}</span> ${msg}`, pause: 650 });
    const logLines = [
      row('08:59:58', 'INFO', 'lecture.start — 31 students connected, 4 actually awake'),
      row('09:00:15', 'INFO', `${Site.esc(a.handle)} deployed joke #4512 — laughter latency 0.3 s`),
      row('09:47:12', 'WARN', 'student asked “will this be on the exam?” — auto-resolved: “everything is on the exam”'),
      row('10:15:03', 'ERROR', `NullPointerException in student_project.java — ${Site.esc(b.handle)} hotfix in 30 s`),
      row('23:59:59', 'WARN', 'deadline reached — 47 submissions in the last 60 s (DDoS suspected)'),
      row('00:00:00', 'OK', 'gratitude buffer overflow — keep scrolling ↓'),
    ];
    ctx.sleep(900).then(() => Site.typeLines(el.querySelector('.log'), logLines, ctx));
  },
});
