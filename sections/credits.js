/* 8. Changelog + rolling credits + `git commit -m "Thank you"` finale. */
Site.register({
  id: 'credits',
  title: 'Final release',
  css: `
    #credits .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; align-items: start; }
    #credits .rel { padding: 1rem 1.2rem; margin-bottom: .9rem; opacity: 0; transform: translateY(16px); transition: opacity .6s, transform .6s; }
    #credits .rel.on { opacity: 1; transform: none; }
    #credits .rel .h { display: flex; align-items: center; gap: .6rem; flex-wrap: wrap; margin-bottom: .4rem; }
    #credits .tag { font: 600 .8rem var(--mono); color: var(--blue); background: rgba(56,139,253,.12); padding: .1rem .55rem; border-radius: 6px; }
    #credits .latest { font-size: .7rem; font-weight: 700; color: var(--green); border: 1px solid var(--green); border-radius: 99px; padding: .05rem .55rem; }
    #credits .rel h4 { margin: 0; font-size: 1.05rem; }
    #credits .rel ul { margin: .3rem 0 0; padding-left: 1.1rem; font-size: .88rem; color: #c9d1d9 }
    #credits .rel li { margin: .2rem 0; }
    #credits .k-added { color: var(--green); font-weight: 600; } #credits .k-fixed { color: var(--purple); font-weight: 600; }
    #credits .k-removed { color: var(--red); font-weight: 600; } #credits .k-known { color: var(--amber); font-weight: 600; }
    #credits .roll {
      position: relative; height: 34rem; overflow: hidden; text-align: center;
      background: #000; border: 0; border-radius: 0; box-shadow: none; color: #f2f2f2;
    }
    #credits .roll::before, #credits .roll::after { content: ""; position: absolute; left: 0; right: 0; height: 22%; z-index: 1; pointer-events: none; }
    #credits .roll::before { top: 0; background: linear-gradient(#000, transparent); }
    #credits .roll::after { bottom: 0; background: linear-gradient(transparent, #000); }
    #credits .roll .inner { position: absolute; left: 0; right: 0; top: 100%; }
    #credits.visible .roll .inner.go { animation: roll var(--dur, 28s) linear forwards; }
    @keyframes roll { to { transform: translateY(calc(-100% - 34rem)); } }
    #credits .roll h5 { font: 700 .75rem var(--mono); letter-spacing: .25em; color: #8a8a8a; margin: 2.2rem 0 .6rem; text-transform: uppercase; }
    #credits .roll p { margin: .25rem 0; font-size: 1.05rem; }
    #credits .roll .as { color: #9a9a9a; font-size: .85rem; }
    #credits .roll .big { font-size: 1.7rem; font-weight: 800; }
    #credits .roll .fin { font-size: 1.25rem; font-style: italic; margin-top: 3rem; color: #fff; }
    #credits .term { margin-top: 2.2rem; padding: 1rem 1.2rem; font: .95rem/1.7 var(--mono); }
    #credits .term .p { color: var(--green); }
    #credits .term .dim { color: var(--muted); }
    #credits .term .heart { color: var(--pink); }
    #credits .commit { margin-left: .8rem; font-family: var(--mono); }
    #credits .final { text-align: center; margin-top: 2.4rem; display: none; }
    #credits .final.show { display: block; animation: pop .7s ease-out; }
    #credits .final h2 {
      font-size: clamp(2.6rem, 7vw, 5.5rem); line-height: 1.05; margin: 0;
      background: linear-gradient(90deg, #f778ba, #d29922, #3fb950, #58a6ff, #a371f7);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    #credits .final .names { font-size: 1.4rem; margin-top: 1rem; }
    #credits .final .line { color: var(--muted); margin-top: .8rem; font-size: 1.05rem; }
    #credits footer { margin-top: 3rem; text-align: center; font: .75rem var(--mono); color: #6e7681; }
    @media (max-width: 900px) { #credits .cols { grid-template-columns: 1fr; } #credits .roll { height: 26rem; } }
  `,

  render(c) {
    const [a, b] = c.teachers;
    const note = (n) => {
      const m = /^(Added|Fixed|Removed|Known issue):\s*(.*)$/.exec(n);
      if (!m) return Site.esc(n);
      const k = { Added: 'added', Fixed: 'fixed', Removed: 'removed', 'Known issue': 'known' }[m[1]];
      return `<span class="k-${k}">${m[1]}:</span> ${Site.esc(m[2])}`;
    };
    return `
      <p class="kicker"><b>$</b> cat CHANGELOG.md</p>
      <h2 class="big">Release notes</h2>
      <div class="cols">
        <div>${c.changelog.map((r) => `
          <div class="rel panel">
            <div class="h"><span class="tag">${Site.esc(r.v)}</span>${r.latest ? '<span class="latest">Latest</span>' : ''}<h4>${Site.esc(r.title)}</h4></div>
            <ul>${r.notes.map((n) => `<li>${note(n)}</li>`).join('')}</ul>
          </div>`).join('')}
        </div>

        <div class="roll panel"><div class="inner">
          <p class="big">TeacherOS</p>
          <p class="as">a production by ${Site.esc(c.group)}</p>
          <h5>Starring</h5>
          <p>${Site.esc(a.name)} <span class="as">as</span> ${Site.esc(a.short)}</p>
          <p>${Site.esc(b.name)} <span class="as">as</span> ${Site.esc(b.short)}</p>
          <h5>Special guests</h5>
          <p>Stack Overflow</p><p>Coffee</p><p>The Deadline</p><p>That One Missing Semicolon</p>
          <h5>Students</h5>
          ${c.credits.map((n) => `<p>${Site.esc(n)}</p>`).join('')}
          <h5>Disclaimer</h5>
          <p class="as">No students were harmed in the making of this semester<br>(only their sleep schedules).</p>
          <p class="as">All bugs were fixed by professionals.<br>Do not try this at home.</p>
          <p class="fin">${Site.esc(c.finalLine)}</p>
        </div></div>
      </div>

      <div class="term panel">
        <div><span class="p">students@faculty</span>:<span style="color:var(--blue)">~/gratitude</span>$ git commit -m "Thank you"
          <button class="btn green commit" type="button">⏎ commit</button></div>
        <div class="out"></div>
      </div>

      <div class="final">
        <h2>Happy Teacher’s Day!</h2>
        <div class="names">${Site.esc(a.short)} &amp; ${Site.esc(b.short)}</div>
        <div class="line">${Site.esc(c.finalLine)}</div>
      </div>

      <footer>Built by ${Site.esc(c.group)} · ${c.year} · runs offline · no cookies, just gratitude · press R to replay a section</footer>
    `;
  },

  onEnter(el, c, ctx) {
    // releases slide in one by one
    el.querySelectorAll('.rel').forEach((r, i) => setTimeout(() => ctx.alive && r.classList.add('on'), 250 + i * 350));

    // roll the credits; longer lists roll a bit longer
    const inner = el.querySelector('.roll .inner');
    inner.style.setProperty('--dur', 22 + c.credits.length * 0.8 + 's');
    ctx.sleep(600).then(() => inner.classList.add('go'));

    const btn = el.querySelector('.commit');
    const out = el.querySelector('.out');
    btn.addEventListener('click', async () => {
      btn.remove();
      await Site.typeLines(out, [
        { html: `<span class="dim">[main 2026a1b]</span> Thank you`, pause: 300 },
        { html: ` ${c.teachers.length} teachers changed, <span style="color:var(--green)">∞ insertions(+)</span>, <span style="color:var(--red)">0 deletions(-)</span>`, pause: 500 },
        { html: `<span class="p">students@faculty</span>:<span style="color:var(--blue)">~/gratitude</span>$ git push origin heart`, pause: 300 },
        { html: '<span class="dim">Enumerating objects: 2026, done.</span>', pause: 250 },
        { html: '<span class="dim">Writing objects: 100% (2026/2026), ∞ KiB | ∞ MiB/s, done.</span>', pause: 400 },
        { html: 'To heart.git &nbsp;<span class="heart">❤</span> &nbsp;main → forever', pause: 300 },
      ], ctx);
      const fin = el.querySelector('.final');
      fin.classList.add('show');
      fin.scrollIntoView({ behavior: 'smooth', block: 'center' });
      Site.confetti({ x: innerWidth * 0.25, y: innerHeight * 0.8, count: 140 });
      Site.confetti({ x: innerWidth * 0.75, y: innerHeight * 0.8, count: 140 });
      Site.confettiRain(5000);
    });
  },
});
