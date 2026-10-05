/* 4. Stack Overflow thread — "How do I properly thank two CS professors?". Tap the vote arrows. */
Site.register({
  id: 'stackoverflow',
  title: 'Stack Overflow',
  css: `
    #stackoverflow .so { --so: #f48024; --link: #3ca4ff; overflow: hidden; }
    #stackoverflow .top { display: flex; align-items: center; gap: 1rem; padding: .6rem 1rem; border-bottom: 3px solid var(--so); background: #1b1f24; }
    #stackoverflow .logo { display: flex; align-items: flex-end; gap: .45rem; font-size: 1.05rem; white-space: nowrap; }
    #stackoverflow .logo b { font-weight: 800; }
    #stackoverflow .stack { display: inline-flex; flex-direction: column; gap: 2px; padding-bottom: 2px; }
    #stackoverflow .stack i { display: block; height: 3px; background: var(--so); }
    #stackoverflow .stack i:nth-child(1) { width: 18px; transform: rotate(-24deg) translate(2px, 2px); }
    #stackoverflow .stack i:nth-child(2) { width: 18px; transform: rotate(-12deg); }
    #stackoverflow .stack i:nth-child(3) { width: 18px; }
    #stackoverflow .stack i:nth-child(4) { width: 22px; height: 6px; background: transparent; border: 3px solid #bcbbbb; border-top: 0; }
    #stackoverflow .search { flex: 1; background: #2d333b; border: 1px solid #444c56; border-radius: 6px; padding: .35rem .7rem; color: var(--muted); font-size: .85rem; }
    #stackoverflow .me { font: .8rem var(--mono); color: var(--muted); white-space: nowrap; }
    #stackoverflow .me b { color: var(--text); }
    #stackoverflow .body { padding: 1.3rem 1.5rem 1.6rem; }
    #stackoverflow h3 { font-size: 1.55rem; font-weight: 500; margin: 0 0 .4rem; color: #e7e9eb; }
    #stackoverflow .meta { font-size: .78rem; color: var(--muted); padding-bottom: .9rem; border-bottom: 1px solid var(--border); margin-bottom: 1rem; }
    #stackoverflow .meta b { color: var(--text); font-weight: 400; margin-right: 1.2rem; }
    #stackoverflow .closed { background: #22313f; border: 1px solid #39739d; border-radius: 6px; padding: .8rem 1rem; font-size: .85rem; margin-bottom: 1.2rem; }
    #stackoverflow .closed b { color: #fff; }
    #stackoverflow .post { display: grid; grid-template-columns: 3.2rem 1fr; gap: 1.1rem; }
    #stackoverflow .votes { display: flex; flex-direction: column; align-items: center; gap: .3rem; }
    #stackoverflow .arrow {
      width: 2.4rem; height: 2.4rem; border-radius: 50%; border: 1px solid #444c56; background: transparent; color: #9fa6ad;
      cursor: pointer; display: grid; place-items: center; font-size: 1rem; transition: background .2s, color .2s, border-color .2s;
    }
    #stackoverflow .arrow:hover { background: #3d2a1a; }
    #stackoverflow .arrow.on { background: var(--so); border-color: var(--so); color: #fff; }
    #stackoverflow .count { font-size: 1.3rem; font-weight: 600; color: #e7e9eb; }
    #stackoverflow .accepted { color: #5eba7d; font-size: 1.8rem; line-height: 1; }
    #stackoverflow .text { font-size: .95rem; line-height: 1.6; color: #d0d4d8; }
    #stackoverflow .text p { margin: 0 0 .8rem; }
    #stackoverflow pre { background: #1b1f24; border-radius: 6px; padding: .7rem 1rem; font: .85rem var(--mono); margin: 0 0 .8rem; }
    #stackoverflow .kw { color: #ff7b72; } #stackoverflow .str { color: #a5d6ff; } #stackoverflow .fn { color: #d2a8ff; }
    #stackoverflow del { color: #8b949e; }
    #stackoverflow .tags { display: flex; gap: .35rem; flex-wrap: wrap; margin: .6rem 0 1rem; }
    #stackoverflow .tags span { background: #2c3a46; color: #9cc3db; font-size: .72rem; padding: .2rem .5rem; border-radius: 4px; }
    #stackoverflow .usercard { display: flex; justify-content: flex-end; }
    #stackoverflow .usercard > div { background: #1f2a36; border-radius: 4px; padding: .5rem .7rem; font-size: .75rem; color: var(--muted); min-width: 13rem; }
    #stackoverflow .usercard .u { display: flex; gap: .5rem; align-items: center; margin-top: .3rem; }
    #stackoverflow .av { width: 2rem; height: 2rem; border-radius: 4px; display: grid; place-items: center; color: #fff; font: 700 .75rem var(--mono); }
    #stackoverflow .usercard a { color: var(--link); }
    #stackoverflow .comments { margin: .8rem 0 0 4.3rem; border-top: 1px solid var(--border); }
    #stackoverflow .comments div { font-size: .8rem; padding: .45rem 0; border-bottom: 1px solid var(--border); color: #c5cad0; }
    #stackoverflow .comments a { color: var(--link); }
    #stackoverflow .comments .score { color: var(--so); margin-right: .5rem; font-weight: 700; }
    #stackoverflow .ah { display: flex; justify-content: space-between; align-items: center; margin: 1.6rem 0 1rem; font-size: 1.2rem; }
    #stackoverflow .ah small { font-size: .75rem; color: var(--muted); }
    #stackoverflow .answer { border-bottom: 1px solid var(--border); padding-bottom: 1.2rem; margin-bottom: 1.2rem; }
    #stackoverflow .answer.acc .text { border-left: 3px solid #5eba7d; padding-left: 1rem; }
    #stackoverflow .deleted { background: rgba(248,81,73,.08); border: 1px solid rgba(248,81,73,.3); border-radius: 6px; padding: .8rem 1rem; font-size: .85rem; color: #e1a1a0; }
    #stackoverflow .deleted s { color: #8b949e; }
    #stackoverflow .toast {
      position: fixed; left: 50%; bottom: 2rem; transform: translate(-50%, 200%); background: #1f2a36; border: 1px solid #f1b600;
      color: #fff; padding: .7rem 1.2rem; border-radius: 8px; font-size: .95rem; z-index: 70; transition: transform .4s cubic-bezier(.3,1.6,.5,1);
      box-shadow: 0 10px 30px rgba(0,0,0,.5);
    }
    #stackoverflow .toast.show { transform: translate(-50%, 0); }
    @media (max-width: 700px) { #stackoverflow .search { display: none; } #stackoverflow .comments { margin-left: 0; } }
  `,

  render(c) {
    const [a, b] = c.teachers;
    const me = Site.esc(c.studentsName);
    const av = (t, color) => `<span class="av" style="background:${color}">${Site.esc(t)}</span>`;
    const votes = (n, extra = '') => `
      <div class="votes">
        <button class="arrow up" type="button" aria-label="Upvote">▲</button>
        <div class="count" data-n="${n}">${n.toLocaleString('en-US')}</div>
        <button class="arrow down" type="button" aria-label="Downvote">▼</button>
        ${extra}
      </div>`;

    return `
      <p class="kicker"><b>$</b> open stackoverflow.com/q/2026</p>
      <div class="so panel">
        <div class="top">
          <span class="logo"><span class="stack"><i></i><i></i><i></i><i></i></span>stack<b>overflow</b></span>
          <span class="search">🔍 how to thank professor without it being marked as duplicate</span>
          <span class="me"><b>${me}</b> · <span class="rep">1</span> rep</span>
        </div>
        <div class="body">
          <h3>How do I properly thank two Computer Science professors?</h3>
          <div class="meta"><b>Asked</b>today <b>Modified</b>just now <b>Viewed</b>2,026 times</div>

          <div class="closed"><b>Closed.</b> This question is <i>opinion-based</i>. Everyone already agrees on the answer.
            Closed 2 mins ago by <span style="color:var(--link)">${Site.esc(a.handle)}</span>, <span style="color:var(--link)">${Site.esc(b.handle)}</span>
            — reason: <i>“too emotional for a technical Q&amp;A site”</i>.</div>

          <div class="post">
            ${votes(-2)}
            <div>
              <div class="text">
                <p>We are a group of students who survived Java, Python, statistics and discrete math thanks to two professors.
                  Today is Teacher’s Day and we need to say thank you <b>properly</b>.</p>
                <p>What we tried:</p>
                <pre><span class="fn">print</span>(<span class="str">"thank you"</span>)</pre>
                <p>It works, but it feels like <code>O(1)</code> for something that deserves <code>O(∞)</code>.
                  We also tried copying last year’s card, but it was flagged as a duplicate.</p>
                <p>What is the best practice for thanking two legendary professors? <del title="removed: noise">Thanks in advance!!!</del></p>
              </div>
              <div class="tags"><span>gratitude</span><span>teachers-day</span><span>python</span><span>java</span><span>discrete-math</span><span>statistics</span></div>
              <div class="usercard"><div>asked today
                <div class="u">${av('S', '#5a7d9a')}<div><a>${me}</a><br>1 · ●0 ●0 ●2</div></div></div></div>
            </div>
          </div>

          <div class="comments">
            <div><span class="score">47</span>Possible duplicate of <a>Teacher’s Day 2025</a> – <a>senior_student</a> 3 hours ago</div>
            <div><span class="score">31</span>${Site.esc(b.says.comment)} – <a>${Site.esc(b.handle)}</a> 2 hours ago</div>
            <div><span class="score">29</span>${Site.esc(a.says.comment)} – <a>${Site.esc(a.handle)}</a> 2 hours ago</div>
            <div><span class="score">12</span>Works on my machine. – <a>group_leader</a> 1 hour ago</div>
          </div>

          <div class="ah"><span>2 Answers</span><small>Sorted by: Highest score (default)</small></div>

          <div class="answer acc">
            <div class="post">
              ${votes(2026, '<div class="accepted" title="Accepted answer">✔</div>')}
              <div>
                <div class="text">${c.thankYou.map((p) => `<p>${Site.esc(p)}</p>`).join('')}</div>
                <div class="usercard"><div>answered just now
                  <div class="u">${av('S', '#5a7d9a')}<div><a>${me}</a><br><span class="rep">1</span> · ●0 ●0 ●2</div></div></div></div>
              </div>
            </div>
          </div>

          <div class="answer">
            <div class="post">
              ${votes(-404)}
              <div class="deleted">🗑 <b>This answer was deleted by a moderator.</b> Reason: AI-generated content is not allowed.<br>
                <s>“As an AI language model, I cannot feel gratitude, but here are 10 generic ways to thank a teacher…”</s>
                <div style="margin-top:.4rem;color:var(--muted)">— ChatGPT, answered 1 min ago</div></div>
            </div>
          </div>
        </div>
      </div>
      <div class="toast">🏅 New badge earned: <b>Grateful Student</b> — upvoted the truth 5 times</div>
    `;
  },

  onEnter(el, c, ctx) {
    let rep = 1;
    let ups = 0;
    const repEls = el.querySelectorAll('.rep');
    const toast = el.querySelector('.toast');

    el.querySelectorAll('.votes').forEach((v) => {
      const count = v.querySelector('.count');
      const vote = (delta, btn) => {
        const n = +count.dataset.n + delta;
        count.dataset.n = n;
        count.textContent = n.toLocaleString('en-US');
        btn.classList.add('on');
        setTimeout(() => btn.classList.remove('on'), 350);
        if (delta > 0) {
          rep += 10;
          repEls.forEach((r) => (r.textContent = rep.toLocaleString('en-US')));
          Site.floatText(btn, '+10', '#f48024');
          if (++ups === 5) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3200);
          }
        } else {
          Site.floatText(btn, 'nope', '#f85149');
          // downvoting gratitude is not allowed — bounce back
          setTimeout(() => { count.dataset.n = n + 1; count.textContent = (n + 1).toLocaleString('en-US'); }, 500);
        }
      };
      const up = v.querySelector('.up');
      const down = v.querySelector('.down');
      up.addEventListener('click', () => vote(+1, up));
      down.addEventListener('click', () => vote(-1, down));
    });
  },
});
