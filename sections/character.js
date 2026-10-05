/* 3. Character Select — 8-bit RPG "choose your professor". Tap a card to select. */
Site.register({
  id: 'character',
  title: 'Character Select',
  css: `
    #character {
      background:
        radial-gradient(circle at 20% 30%, rgba(163,113,247,.18), transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(88,166,255,.15), transparent 40%),
        #0a0a1a;
    }
    #character .px { font-family: var(--mono); text-transform: uppercase; letter-spacing: .08em; }
    #character .title {
      text-align: center; font: 900 clamp(1.8rem, 4.2vw, 3.2rem)/1.1 var(--mono); letter-spacing: .06em;
      color: #fff; text-shadow: 4px 4px 0 #a371f7, 8px 8px 0 #1f1147; margin: 0;
    }
    #character .sub { text-align: center; color: #ffd84d; margin: .8rem 0 2rem; font-size: .9rem; animation: blink 1.2s steps(1) infinite; }
    #character .row { display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.6rem; align-items: center; }
    #character .vs { font: 900 2.2rem var(--mono); color: #ffd84d; text-shadow: 3px 3px 0 #b3261e; text-align: center; }
    #character .vs small { display: block; font-size: .7rem; color: #aaa; text-shadow: none; letter-spacing: .1em; }
    #character .card {
      --c: #fff; position: relative; background: #12122a; padding: 1.2rem 1.3rem 1.1rem; cursor: pointer;
      box-shadow: 0 -4px 0 0 #fff, 0 4px 0 0 #fff, -4px 0 0 0 #fff, 4px 0 0 0 #fff, 8px 8px 0 4px rgba(0,0,0,.6);
      transition: transform .15s, box-shadow .3s;
      margin: 4px;
    }
    #character .card:hover { transform: translateY(-4px); }
    #character .card.sel {
      box-shadow: 0 -4px 0 0 var(--c), 0 4px 0 0 var(--c), -4px 0 0 0 var(--c), 4px 0 0 0 var(--c), 0 0 40px 6px var(--c);
      animation: sel-flash .45s steps(2) 2;
    }
    @keyframes sel-flash { 50% { background: #2a2a55; } }
    #character .player { font: 700 .8rem var(--mono); color: var(--c); letter-spacing: .15em; }
    #character .top { display: flex; gap: 1.1rem; align-items: center; margin: .6rem 0 1rem; }
    #character canvas {
      width: 7.5rem; height: 7.5rem; image-rendering: pixelated; image-rendering: crisp-edges;
      background: #000; flex: none; box-shadow: 0 0 0 4px #000, 0 0 0 6px var(--c);
    }
    #character canvas.photo { image-rendering: auto; }
    #character .name { font: 800 1.25rem/1.15 var(--mono); color: #fff; text-transform: uppercase; }
    #character .lvl { font: .78rem var(--mono); color: #ffd84d; margin-top: .3rem; text-transform: uppercase; }
    #character .hint { font: .62rem var(--mono); color: #777; margin-top: .4rem; }
    #character .stat { display: grid; grid-template-columns: 8.5rem 1fr 2.6rem; align-items: center; gap: .6rem; font: .78rem var(--mono); color: #ddd; text-transform: uppercase; margin: .32rem 0; }
    #character .blocks { display: grid; grid-template-columns: repeat(10, 1fr); gap: 3px; }
    #character .blocks i { height: .85rem; background: #26264a; }
    #character .blocks i.on { background: var(--c); box-shadow: inset 0 -3px 0 rgba(0,0,0,.35); }
    #character .blocks.low i.on { background: #ff5a5a; }
    #character .num { text-align: right; color: #aaa; }
    #character .moves { margin-top: .9rem; min-height: 6.2rem; font: .82rem/1.65 var(--mono); color: #cfcfff; }
    #character .moves .ult { color: #ffd84d; font-weight: 700; }
    #character .press { text-align: center; margin-top: .8rem; font: 700 .8rem var(--mono); color: #ffd84d; animation: blink 1s steps(1) infinite; }
    #character .card.sel .press { display: none; }
    #character .badge {
      position: absolute; top: -1rem; right: -1rem; background: var(--c); color: #000;
      font: 900 .9rem var(--mono); padding: .35rem .7rem; transform: rotate(8deg) scale(0); transition: transform .3s cubic-bezier(.3,1.8,.5,1);
    }
    #character .card.sel .badge { transform: rotate(8deg) scale(1); }
    #character .coop {
      margin: 2rem auto 0; text-align: center; font: 800 1.1rem var(--mono); color: #000; background: #ffd84d;
      padding: .7rem 1.2rem; max-width: 46rem; transform: scale(0); transition: transform .4s cubic-bezier(.3,1.8,.5,1);
      box-shadow: 6px 6px 0 #b3261e;
    }
    #character .coop.show { transform: scale(1); }
    @media (max-width: 900px) {
      #character .row { grid-template-columns: 1fr; }
      #character .stat { grid-template-columns: 7rem 1fr 2.4rem; }
    }
  `,

  render(c) {
    const card = (t, i) => `
      <div class="card" data-i="${i}" style="--c:${t.color}" role="button" tabindex="0" aria-label="Select ${Site.esc(t.short)}">
        <div class="badge">SELECTED!</div>
        <div class="player">PLAYER ${i + 1}</div>
        <div class="top">
          <canvas width="12" height="12"></canvas>
          <div>
            <div class="name">${Site.esc(t.short)}</div>
            <div class="lvl">LV 99 · ${Site.esc(t.rpg.cls)}</div>
            <div class="hint"></div>
          </div>
        </div>
        ${t.rpg.stats.map(([k, raw]) => { const v = Math.max(0, Math.min(10, raw)); return `
          <div class="stat"><span>${Site.esc(k)}</span>
            <span class="blocks ${v <= 3 ? 'low' : ''}" data-v="${v}">${'<i></i>'.repeat(10)}</span>
            <span class="num">0/10</span></div>`; }).join('')}
        <div class="moves"></div>
        <div class="press">▶ PRESS TO SELECT</div>
      </div>`;
    const [a, b] = c.teachers;
    return `
      <h2 class="title">Choose your professor</h2>
      <p class="sub px">2 players · co-op mode · insert coin</p>
      <div class="row">
        ${card(a, 0)}
        <div class="vs">&amp;<small>CO-OP</small></div>
        ${card(b, 1)}
      </div>
      <div class="coop">★ CO-OP MODE UNLOCKED — combined power: OVER 9000 ★</div>
    `;
  },

  onEnter(el, c, ctx) {
    // 12×12 pixel professor, used when no photo is available
    const SPRITE = [
      '....HHHH....',
      '...HHHHHH...',
      '..HHHHHHHH..',
      '..HSSSSSSH..',
      '..SGGSSGGS..',
      '..SGWSSGWS..',
      '..SSSSSSSS..',
      '...SSMMSS...',
      '....SSSS....',
      '..CCCCCCCC..',
      '.CCCCTTCCCC.',
      '.CCCCTTCCCC.',
    ];
    const drawSprite = (cv, color) => {
      const g = cv.getContext('2d');
      const pal = { H: '#2b1d14', S: '#f1c27d', G: '#111', W: '#fff', M: '#b5554a', C: color, T: '#fff' };
      SPRITE.forEach((row, y) => [...row].forEach((ch, x) => {
        if (pal[ch]) { g.fillStyle = pal[ch]; g.fillRect(x, y, 1, 1); }
      }));
    };
    const drawPhoto = (cv, img) => {
      cv.width = cv.height = 240;
      cv.classList.add('photo');
      const g = cv.getContext('2d');
      const s = Math.min(img.naturalWidth, img.naturalHeight);
      g.imageSmoothingEnabled = true;
      g.imageSmoothingQuality = 'high';
      g.drawImage(img, (img.naturalWidth - s) / 2, (img.naturalHeight - s) / 3, s, s, 0, 0, 240, 240);
    };

    const cards = [...el.querySelectorAll('.card')];
    cards.forEach((card, i) => {
      const t = c.teachers[i];
      const cv = card.querySelector('canvas');
      drawSprite(cv, t.color);
      const img = new Image();
      img.onload = () => drawPhoto(cv, img);
      img.onerror = () => { card.querySelector('.hint').textContent = `drop ${t.photo} for a pixel portrait`; };
      img.src = t.photo;
    });

    let selected = 0;
    async function select(card) {
      if (card.classList.contains('sel')) return;
      card.classList.add('sel');
      const t = c.teachers[+card.dataset.i];
      const bars = [...card.querySelectorAll('.blocks')];
      // fill stat bars block by block
      await Promise.all(bars.map(async (bar) => {
        const v = +bar.dataset.v;
        const blocks = bar.querySelectorAll('i');
        const num = bar.parentNode.querySelector('.num');
        for (let k = 0; k < v; k++) {
          blocks[k].classList.add('on');
          num.textContent = `${k + 1}/10`;
          await ctx.sleep(70);
        }
      }));
      const moves = card.querySelector('.moves');
      await Site.typeLines(moves, [
        ...t.rpg.moves.map((m) => '► ' + m),
        { text: '★ ULTIMATE: ' + t.rpg.ultimate, cls: 'ult' },
      ], ctx, { charMs: 16, lineMs: 120 });
      selected++;
      if (selected === cards.length) {
        el.querySelector('.coop').classList.add('show');
        const r = el.querySelector('.coop').getBoundingClientRect();
        Site.confetti({ x: r.left + r.width / 2, y: r.top, count: 120 });
      }
    }

    cards.forEach((card) => {
      card.addEventListener('click', () => select(card));
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter') select(card); });
    });
  },
});
