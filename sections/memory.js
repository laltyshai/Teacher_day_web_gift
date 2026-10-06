/* 7. RUN MEMORY.exe — Windows-98 "copying memories" dialog, then a desktop of photos, notes and quotes. */
Site.register({
  id: 'memory',
  title: 'MEMORY.exe',
  css: `
    #memory .w98, #memory .w98 button { font-family: Tahoma, "MS Sans Serif", Geneva, Verdana, sans-serif; }
    #memory .desk {
      position: relative; background: #008080; border-radius: 10px; overflow: hidden; min-height: 78vh;
      display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(0,0,0,.5);
    }
    #memory .area { flex: 1; position: relative; padding: 1.2rem; }
    #memory .icons { position: absolute; left: 1.2rem; top: 1.2rem; display: flex; flex-direction: column; gap: 1.3rem; z-index: 1; }
    #memory .icon { width: 6.5rem; text-align: center; color: #fff; font-size: .78rem; cursor: pointer; background: none; border: 0; padding: 0; }
    #memory .icon .g { font-size: 2.3rem; display: block; filter: drop-shadow(1px 1px 0 rgba(0,0,0,.4)); }
    #memory .icon span:last-child { display: inline-block; padding: 0 .2rem; margin-top: .2rem; }
    #memory .icon:hover span:last-child, #memory .icon:focus span:last-child { background: #000080; outline: 1px dotted #fff; }
    #memory .launch { position: absolute; inset: 0; display: grid; place-items: center; }
    #memory .bevel {
      background: #c0c0c0; color: #000; border: 2px solid; border-color: #fff #404040 #404040 #fff;
      box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #dfdfdf;
    }
    #memory .bevel:active { border-color: #404040 #fff #fff #404040; }
    #memory .runbtn { font-size: 1.5rem; font-weight: 700; padding: 1.1rem 2.2rem; cursor: pointer; animation: nudge 2.4s ease-in-out infinite; }
    #memory .runbtn small { display: block; font-size: .75rem; font-weight: 400; margin-top: .3rem; }
    @keyframes nudge { 0%,100% { transform: none } 50% { transform: translateY(-6px) } }
    #memory .win { background: #c0c0c0; color: #000; border: 2px solid; border-color: #dfdfdf #404040 #404040 #dfdfdf; box-shadow: inset 1px 1px 0 #fff, 2px 2px 12px rgba(0,0,0,.35); }
    #memory .tb { background: linear-gradient(90deg, #000080, #1084d0); color: #fff; font-weight: 700; font-size: .82rem; padding: .25rem .3rem .25rem .5rem; display: flex; align-items: center; gap: .4rem; }
    #memory .tb .x { margin-left: auto; display: flex; gap: 2px; }
    #memory .tb .x i { width: 1.1rem; height: 1rem; background: #c0c0c0; color: #000; font: 700 .65rem/1rem Tahoma, sans-serif; text-align: center; font-style: normal; border: 1px solid; border-color: #fff #404040 #404040 #fff; }
    #memory .copy { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: min(30rem, 92%); z-index: 5; }
    #memory .copy .in { padding: 1rem 1.1rem 1.1rem; font-size: .85rem; }
    #memory .fly { position: relative; height: 3.2rem; display: flex; justify-content: space-between; align-items: center; font-size: 2.2rem; margin-bottom: .6rem; }
    #memory .fly .paper { position: absolute; left: 2.6rem; top: .4rem; font-size: 1.4rem; animation: fly 1s linear infinite; }
    @keyframes fly { 0% { transform: translate(0, 10px) rotate(-20deg); opacity: 0 } 15% { opacity: 1 } 50% { transform: translate(9rem, -14px) rotate(0) } 85% { opacity: 1 } 100% { transform: translate(18rem, 10px) rotate(20deg); opacity: 0 } }
    #memory .prog { height: 1.35rem; border: 2px solid; border-color: #808080 #fff #fff #808080; background: #fff; padding: 2px; margin: .7rem 0 .4rem; }
    #memory .prog i { display: block; height: 100%; width: 0; background: repeating-linear-gradient(90deg, #000080 0 .7rem, transparent .7rem .85rem); }
    #memory .copy .row { display: flex; justify-content: space-between; align-items: center; margin-top: .6rem; }
    #memory .copy button { padding: .25rem 1.2rem; cursor: not-allowed; }
    #memory .shown { display: grid; grid-template-columns: 1.65fr 1fr; gap: 1rem; padding-left: 7.5rem; }
    #memory .shown[hidden] { display: none; }
    #memory .shown .pop { opacity: 0; transform: scale(.85); }
    #memory .shown .pop.on { animation: pop .45s ease-out forwards; }
    #memory .pol video { pointer-events: none; }
    #memory .gal .in { padding: .9rem; background: #fff; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem .9rem; border: 2px solid; border-color: #808080 #fff #fff #808080; margin: .3rem; }
    #memory .pol { min-width: 0; background: #fafafa; padding: .45rem .45rem 0; box-shadow: 0 4px 12px rgba(0,0,0,.25); transform: rotate(var(--r)); cursor: zoom-in; transition: transform .25s; border: 0; font: inherit; color: inherit; text-align: center; }
    #memory .pol:hover { transform: rotate(0) scale(1.05); z-index: 2; position: relative; }
    #memory .pol .photo { aspect-ratio: 4 / 3; }
    #memory .pol .photo video { pointer-events: none; }
    #memory .pol video::-webkit-media-controls { display: none !important; }
    #memory .pol .cap { font: .78rem/1.25 "Marker Felt", "Chalkboard SE", "Comic Sans MS", cursive; color: #333; padding: .4rem .1rem .5rem; min-height: 2.6rem; }
    #memory .pol.vid .photo::after { content: "▶"; position: absolute; inset: 0; display: grid; place-items: center; font-size: 2rem; color: #fff; text-shadow: 0 2px 8px #000; pointer-events: none; }
    #memory .col { display: flex; flex-direction: column; gap: 1rem; }
    #memory .note .in { background: #fff; margin: .3rem; padding: .7rem .8rem; font: .82rem/1.55 "Lucida Console", Monaco, monospace; white-space: pre-wrap; border: 2px solid; border-color: #808080 #fff #fff #808080; }
    #memory .menu { font-size: .75rem; padding: .15rem .5rem; display: flex; gap: .9rem; }
    #memory .stickies { display: grid; grid-template-columns: 1fr 1fr; gap: .8rem; }
    #memory .sticky { padding: .7rem .75rem .6rem; font: .82rem/1.35 "Marker Felt", "Chalkboard SE", "Comic Sans MS", cursive; color: #2b2b2b; box-shadow: 0 6px 14px rgba(0,0,0,.3); transform: rotate(var(--r)); }
    #memory .sticky img { display: block; width: 100%; height: auto; }
    #memory .sticky b { display: block; margin-top: .4rem; font-size: .72rem; opacity: .7; }
    #memory .task { height: 2.4rem; background: #c0c0c0; border-top: 2px solid #fff; display: flex; align-items: center; gap: .4rem; padding: 0 .3rem; position: relative; z-index: 6; }
    #memory .start { font-weight: 700; padding: .15rem .6rem; cursor: pointer; display: flex; gap: .3rem; align-items: center; }
    #memory .tbtn { font-size: .75rem; padding: .2rem .7rem; max-width: 11rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
    #memory .clock { margin-left: auto; font-size: .75rem; padding: .2rem .7rem; border: 1px solid; border-color: #808080 #fff #fff #808080; }
    #memory .smenu { position: absolute; left: .3rem; bottom: 2.4rem; width: 17rem; display: none; z-index: 7; }
    #memory .smenu.open { display: flex; }
    #memory .smenu .side { background: linear-gradient(0deg, #000080, #1084d0); color: #fff; writing-mode: vertical-rl; transform: rotate(180deg); font-weight: 800; padding: .5rem .3rem; font-size: 1rem; }
    #memory .smenu ul { list-style: none; margin: 0; padding: .3rem 0; flex: 1; font-size: .82rem; }
    #memory .smenu li { padding: .45rem .8rem; cursor: pointer; }
    #memory .smenu li:hover { background: #000080; color: #fff; }
    #memory .smenu .msg { padding: 0 .8rem .5rem; font-size: .75rem; color: #800000; min-height: 1rem; }
    #memory .lb { position: fixed; inset: 0; background: rgba(0,0,0,.88); display: none; align-items: center; justify-content: center; flex-direction: column; z-index: 90; cursor: zoom-out; padding: 2rem; }
    #memory .lb.open { display: flex; }
    #memory .lb .photo { width: min(90vw, 1200px); height: min(78vh, 800px); background: transparent; }
    #memory .lb .photo img, #memory .lb .photo video { object-fit: contain; }
    #memory .lb .cap { color: #fff; margin-top: 1rem; font: 1.2rem "Marker Felt", "Chalkboard SE", "Comic Sans MS", cursive; }
    @media (max-width: 1000px) {
      #memory .shown { grid-template-columns: 1fr; padding-left: 0; padding-top: 6.5rem; }
      #memory .icons { flex-direction: row; }
      #memory .gal .in { grid-template-columns: repeat(2, 1fr); }
    }
  `,

  render(c) {
    const rot = () => Site.rand(-4, 4).toFixed(1) + 'deg';
    const colors = ['#fff59d', '#f8bbd0', '#b3e5fc', '#c5e1a5'];
    const quotes = c.teachers.map((t) => `${t.short}:\n${t.quote}`).join('\n\n');
    return `
      <p class="kicker"><b>C:\\STUDENTS&gt;</b> MEMORY.exe</p>
      <div class="desk w98">
        <div class="area">
          <div class="icons">
            <button class="icon" type="button"><span class="g">🖥️</span><span>My Computer</span></button>
            <button class="icon" type="button"><span class="g">🗑️</span><span>Recycle Bin (full of bugs)</span></button>
            <button class="icon runicon" type="button"><span class="g">💾</span><span>MEMORY.exe</span></button>
          </div>

          <div class="launch">
            <button class="bevel runbtn" type="button">▶ RUN MEMORY.exe<small>double-click not required (it is ${c.year})</small></button>
          </div>

          <div class="shown" hidden>
            <div class="win gal pop">
              <div class="tb">📁 C:\\Memories\\${Site.esc(c.group)}<span class="x"><i>_</i><i>□</i><i>×</i></span></div>
              <div class="in">${c.memories.map((m, i) => `
                <button class="pol ${/\.(mp4|webm|mov)$/i.test(m.src) ? 'vid' : ''}" type="button" data-i="${i}" style="--r:${rot()}">
                  ${Site.photo(m.src, m.caption)}
                  <div class="cap">${Site.esc(m.caption)}</div>
                </button>`).join('')}
              </div>
            </div>
            <div class="col">
              <div class="win note pop">
                <div class="tb">📝 quotes.txt - Notepad<span class="x"><i>_</i><i>□</i><i>×</i></span></div>
                <div class="menu">File Edit Search Help</div>
                <div class="in">${Site.esc(quotes)}</div>
              </div>
              <div class="stickies">${c.messages.map((m, i) => `
                <div class="sticky pop" style="--r:${rot()};background:${colors[i % colors.length]}"><img src="${Site.esc(m.img)}" alt=""></div>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="task">
          <div class="smenu bevel">
            <div class="side">Teacher<b>OS</b> 98</div>
            <div style="flex:1">
              <ul>
                <li>📚 Programs ▸ Java, Python, R…</li>
                <li>📄 Documents ▸ homework_FINAL_final_v3.docx</li>
                <li>⚙️ Settings ▸ Patience: ∞ (locked)</li>
                <li class="shut">⏻ Shut Down…</li>
              </ul>
              <div class="msg"></div>
            </div>
          </div>
          <button class="bevel start" type="button">🪟 Start</button>
          <span class="bevel tbtn">💾 MEMORY.exe</span>
          <span class="clock">--:--</span>
        </div>

        <div class="lb"><div class="lbimg"></div><div class="cap"></div></div>
      </div>
    `;
  },

  onEnter(el, c, ctx) {
    const area = el.querySelector('.area');
    const launch = el.querySelector('.launch');
    const shown = el.querySelector('.shown');
    const lb = el.querySelector('.lb');
    let ran = false;

    // taskbar clock + start menu
    const clock = el.querySelector('.clock');
    const tick = () => { const d = new Date(); clock.textContent = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); };
    tick();
    ctx.every(10000, tick);
    const smenu = el.querySelector('.smenu');
    el.querySelector('.start').addEventListener('click', () => smenu.classList.toggle('open'));
    el.querySelector('.shut').addEventListener('click', () => {
      smenu.querySelector('.msg').textContent = '⚠ Cannot shut down: memories are still in use.';
    });

    async function run() {
      if (ran) return;
      ran = true;
      launch.remove();
      const dlg = document.createElement('div');
      dlg.className = 'win copy';
      dlg.innerHTML = `
        <div class="tb">Copying…<span class="x"><i>×</i></span></div>
        <div class="in">
          <div class="fly"><span>📁</span><span class="paper">📄</span><span>📁</span></div>
          <div class="file">memories_${c.year}.zip</div>
          <div>From ‘Lectures’ to ‘Forever’</div>
          <div class="prog"><i></i></div>
          <div class="row"><span class="eta">Calculating…</span><button class="bevel" type="button" title="Cancel is not an option" disabled>Cancel</button></div>
        </div>`;
      area.appendChild(dlg);
      const bar = dlg.querySelector('.prog i');
      const eta = dlg.querySelector('.eta');
      const etas = ['3 years remaining', '2 seconds remaining', '5 years remaining', '47 minutes remaining', 'Calculating…', '1 second remaining'];
      for (let p = 0; p <= 100; p += 2) {
        bar.style.width = p + '%';
        if (p % 18 === 0) eta.textContent = etas[(p / 18) % etas.length];
        await ctx.sleep(p > 85 ? 90 : 55);
      }
      eta.textContent = 'Done! 0 memories lost.';
      await ctx.sleep(600);
      dlg.remove();
      shown.hidden = false;
      for (const p of shown.querySelectorAll('.pop')) { p.classList.add('on'); await ctx.sleep(220); }
    }

    el.querySelector('.runbtn').addEventListener('click', run);
    el.querySelector('.runicon').addEventListener('click', run);

    // lightbox
    const open = (m) => {
      el.querySelector('.lbimg').innerHTML = Site.photo(m.src, m.caption);
      const v = el.querySelector('.lbimg video');
      if (v) { v.muted = false; v.play().catch(() => {}); }
      el.querySelector('.lb .cap').textContent = m.caption;
      lb.classList.add('open');
    };
    const close = () => { lb.classList.remove('open'); el.querySelector('.lbimg').innerHTML = ''; };
    el.querySelectorAll('.pol').forEach((p) => p.addEventListener('click', () => open(c.memories[+p.dataset.i])));
    lb.addEventListener('click', (e) => { if (e.target.tagName !== 'VIDEO') close(); });
    ctx.onKey = (e) => {
      if (lb.classList.contains('open') && (e.key === 'Escape' || e.key === ' ')) { close(); return true; }
      return false;
    };
  },
});
