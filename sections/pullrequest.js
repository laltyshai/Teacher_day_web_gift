/* 6. Pull Request #2026 — merge students into production. CI checks run, then tap Merge. */
Site.register({
  id: 'pullrequest',
  title: 'Pull Request',
  css: `
    #pullrequest h3 { font-size: 1.7rem; font-weight: 400; margin: 0 0 .5rem; }
    #pullrequest h3 span { color: var(--muted); }
    #pullrequest .state { display: flex; align-items: center; gap: .7rem; flex-wrap: wrap; font-size: .88rem; color: var(--muted); padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
    #pullrequest .state b { color: var(--text); }
    #pullrequest .badge { display: inline-flex; gap: .4em; align-items: center; padding: .35em .9em; border-radius: 99px; background: #238636; color: #fff; font-weight: 600; font-size: .85rem; transition: background .4s; }
    #pullrequest .badge.merged { background: #8957e5; animation: pop .5s; }
    #pullrequest .br { font: .78rem var(--mono); background: rgba(56,139,253,.15); color: var(--blue); padding: .1em .5em; border-radius: 6px; }
    #pullrequest .tabs { display: flex; gap: 1.6rem; font-size: .85rem; color: var(--muted); margin: .9rem 0 1.1rem; border-bottom: 1px solid var(--border); }
    #pullrequest .tabs span { padding-bottom: .6rem; }
    #pullrequest .tabs .on { color: var(--text); border-bottom: 2px solid #f78166; }
    #pullrequest .tabs i { font-style: normal; background: #30363d; border-radius: 99px; padding: 0 .5em; margin-left: .3em; font-size: .75rem; }
    #pullrequest .plus { color: var(--green); } #pullrequest .minus { color: var(--red); }
    #pullrequest .grid { display: grid; grid-template-columns: 1fr 15rem; gap: 1.4rem; }
    #pullrequest .grid > * { min-width: 0; }
    #pullrequest .cm { border: 1px solid var(--border); border-radius: 8px; margin-bottom: 1rem; overflow: hidden; }
    #pullrequest .cm .h { background: #1b2330; padding: .5rem .9rem; font-size: .82rem; color: var(--muted); border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: .5rem; }
    #pullrequest .cm .h b { color: var(--text); }
    #pullrequest .cm .b { padding: .8rem .95rem; font-size: .9rem; }
    #pullrequest .av { width: 1.6rem; height: 1.6rem; border-radius: 50%; display: inline-grid; place-items: center; color: #fff; font: 700 .62rem var(--mono); flex: none; }
    #pullrequest .diff .h { font-family: var(--mono); background: var(--panel-2); }
    #pullrequest table { border-collapse: collapse; width: 100%; font: .8rem/1.75 var(--mono); }
    #pullrequest td { padding: 0 .6rem; white-space: pre; }
    #pullrequest td.n { width: 2.4rem; color: #6e7681; text-align: right; user-select: none; }
    #pullrequest tr.del { background: rgba(248,81,73,.13); } #pullrequest tr.del td.c { color: #ffb3ad; }
    #pullrequest tr.add { background: rgba(63,185,80,.14); } #pullrequest tr.add td.c { color: #aff5b4; }
    #pullrequest tr.del td.n, #pullrequest tr.add td.n { background: rgba(0,0,0,.12); }
    #pullrequest tr.hunk td { color: var(--muted); background: rgba(56,139,253,.08); }
    #pullrequest tbody tr { opacity: 0; transform: translateX(-12px); }
    #pullrequest.visible tbody tr { animation: diffin .35s ease forwards; animation-delay: calc(var(--i) * 90ms + 400ms); }
    @keyframes diffin { to { opacity: 1; transform: none; } }
    #pullrequest .review .h { background: rgba(35,134,54,.12); }
    #pullrequest .review .ok { color: var(--green); font-weight: 600; }
    #pullrequest .merge { border: 1px solid var(--border); border-left: 4px solid var(--amber); border-radius: 8px; overflow: hidden; transition: border-color .4s; }
    #pullrequest .merge.ready { border-left-color: var(--green); }
    #pullrequest .merge.done { border-left-color: #8957e5; }
    #pullrequest .merge .sum { padding: .8rem 1rem; font-weight: 600; border-bottom: 1px solid var(--border); display: flex; gap: .6rem; align-items: center; }
    #pullrequest .checks div { display: flex; align-items: center; gap: .7rem; padding: .42rem 1rem; font-size: .84rem; border-bottom: 1px solid var(--border); }
    #pullrequest .checks .st { width: 1.1rem; text-align: center; color: var(--amber); }
    #pullrequest .checks .st.ok { color: var(--green); animation: pop .35s; }
    #pullrequest .checks .t { color: var(--muted); margin-left: auto; font-size: .75rem; }
    #pullrequest .mfoot { padding: .9rem 1rem; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
    #pullrequest .mfoot small { color: var(--muted); }
    #pullrequest .side h4 { font-size: .78rem; color: var(--muted); margin: 0 0 .5rem; font-weight: 600; }
    #pullrequest .side > div { padding-bottom: .9rem; margin-bottom: .9rem; border-bottom: 1px solid var(--border); font-size: .85rem; }
    #pullrequest .rv { display: flex; align-items: center; gap: .5rem; margin: .35rem 0; }
    #pullrequest .rv .s { margin-left: auto; color: var(--muted); }
    #pullrequest .rv .s.ok { color: var(--green); }
    #pullrequest .lbl { display: inline-block; font-size: .7rem; font-weight: 600; padding: .1em .6em; border-radius: 99px; margin: 0 .25rem .3rem 0; border: 1px solid; }
    #pullrequest .ms { height: .5rem; background: #30363d; border-radius: 99px; margin-top: .4rem; overflow: hidden; }
    #pullrequest .ms i { display: block; height: 100%; width: 0; background: var(--green); transition: width 1.5s ease .6s; }
    #pullrequest.visible .ms i { width: 100%; }
    #pullrequest .mergebtn.purple:disabled { opacity: 1; cursor: default; }
    @media (max-width: 900px) { #pullrequest .grid { grid-template-columns: 1fr; } }
  `,

  render(c) {
    const [a, b] = c.teachers;
    const me = Site.esc(c.studentsName);
    const av = (t) => `<span class="av" style="background:${t.color}">${Site.esc(t.initials)}</span>`;
    const stu = `<span class="av" style="background:#5a7d9a">S</span>`;

    const diff = [
      ['hunk', '', '', '@@ -1,8 +1,8 @@ class Student'],
      ['', 1, 1, 'class Student:'],
      ['', 2, 2, '    def solve(self, problem):'],
      ['del', 3, '', '-       panic()'],
      ['del', 4, '', '-       copy_from_stackoverflow(problem)   # without reading the question'],
      ['del', 5, '', '-       print("it works on my machine")'],
      ['del', 6, '', '-       return "can I get an extension?"'],
      ['add', '', 3, `+       self.read_the_error_message()      # thanks, ${b.short}`],
      ['add', '', 4, `+       idea = self.think(problem)         # thanks, ${a.short}`],
      ['add', '', 5, '+       self.test(idea)'],
      ['add', '', 6, '+       return self.clean_code(idea)       # submitted before the deadline'],
    ];

    const checks = [
      ['build / compile_brain', '2m'],
      ['test / java (OOP, no God classes)', '41s'],
      ['test / discrete_math (proofs by induction)', '1m'],
      ['test / statistics (n = 30, normal enough)', '12s'],
      ['lint / no missing semicolons', '3s'],
      ['security / no plagiarism detected', '9s'],
    ];

    return `
      <p class="kicker"><b>$</b> gh pr view 2026</p>
      <h3>Merge <code>students</code> into <code>production</code> <span>#2026</span></h3>
      <div class="state">
        <span class="badge"><span class="ic">⇅</span> <span class="lbltxt">Open</span></span>
        <span><b>${me}</b> wants to merge <b>2,026</b> commits into <span class="br">production</span> from <span class="br">semester/all-nighters</span></span>
      </div>
      <div class="tabs">
        <span class="on">Conversation <i>4</i></span><span>Commits <i>2,026</i></span><span>Checks <i>6</i></span>
        <span>Files changed <i>1</i> <span class="plus">+4</span> <span class="minus">−4</span></span>
      </div>

      <div class="grid">
        <div>
          <div class="cm">
            <div class="h">${stu}<b>${me}</b> commented</div>
            <div class="b">This PR refactors a group of panicking freshmen into engineers who read the stack trace first.
              Huge thanks to the two best reviewers in the faculty. 🙏</div>
          </div>

          <div class="cm diff">
            <div class="h">student.py <span style="margin-left:auto"><span class="plus">+4</span> <span class="minus">−4</span></span></div>
            <div style="overflow-x:auto"><table><tbody>${diff.map(([cls, o, n, line], i) => `
              <tr class="${cls}" style="--i:${i}"><td class="n">${o}</td><td class="n">${n}</td><td class="c">${Site.esc(line)}</td></tr>`).join('')}
            </tbody></table></div>
          </div>

          ${[b, a].map((t) => `
            <div class="cm review">
              <div class="h">${av(t)}<b>${Site.esc(t.handle)}</b> <span class="ok">✓ approved these changes</span></div>
              <div class="b">${Site.esc(t.says.review)}</div>
            </div>`).join('')}

          <div class="merge">
            <div class="sum"><span class="spinner" style="color:var(--amber)"></span><span class="sumtxt">Some checks haven’t completed yet</span></div>
            <div class="checks">${checks.map(([name, t]) => `
              <div><span class="st"><span class="spinner"></span></span>${Site.esc(name)}<span class="t">${t}</span></div>`).join('')}
            </div>
            <div class="mfoot">
              <button class="btn green mergebtn" type="button" disabled>Merge pull request</button>
              <small class="mnote">Waiting for checks to pass…</small>
            </div>
          </div>
        </div>

        <aside class="side">
          <div><h4>Reviewers</h4>
            ${[a, b].map((t) => `<div class="rv">${av(t)}${Site.esc(t.handle)}<span class="s ok">✓</span></div>`).join('')}</div>
          <div><h4>Labels</h4>
            <span class="lbl" style="color:#3fb950;border-color:#3fb950">teachers-day</span>
            <span class="lbl" style="color:#a371f7;border-color:#a371f7">legendary</span>
            <span class="lbl" style="color:#d29922;border-color:#d29922">no-more-panic</span>
            <span class="lbl" style="color:#58a6ff;border-color:#58a6ff">good first issue</span></div>
          <div><h4>Assignees</h4>${stu} ${me}</div>
          <div><h4>Milestone</h4>Teacher’s Day ${c.year}<div class="ms"><i></i></div></div>
        </aside>
      </div>
    `;
  },

  onEnter(el, c, ctx) {
    const merge = el.querySelector('.merge');
    const btn = el.querySelector('.mergebtn');
    const note = el.querySelector('.mnote');

    async function runChecks() {
      await ctx.sleep(1600);
      for (const st of el.querySelectorAll('.checks .st')) {
        await ctx.sleep(Site.rand(450, 900));
        st.innerHTML = '✓';
        st.classList.add('ok');
      }
      merge.classList.add('ready');
      el.querySelector('.sum').innerHTML = '<span style="color:var(--green)">✓</span> All checks have passed';
      btn.disabled = false;
      note.textContent = 'This branch has no conflicts with the base branch.';
    }

    btn.addEventListener('click', () => {
      btn.disabled = true;
      merge.classList.remove('ready');
      merge.classList.add('done');
      el.querySelector('.sum').innerHTML = '<span style="color:#a371f7">⇅</span> Pull request successfully merged and closed';
      note.innerHTML = `<b style="color:var(--text)">${Site.esc(c.studentsName)}</b> merged commit <code>2026a1b</code> into <span class="br">production</span>. Ready for the real world.`;
      btn.textContent = 'Merged';
      btn.classList.replace('green', 'purple');
      const badge = el.querySelector('.badge');
      badge.classList.add('merged');
      badge.querySelector('.lbltxt').textContent = 'Merged';
      const r = btn.getBoundingClientRect();
      Site.confetti({ x: r.left + r.width / 2, y: r.top, count: 180 });
    });

    runChecks();
  },
});
