/* 5. LeetCode #1: Two Professors — a "Two Sum" pun. Tap Run or Submit. */
Site.register({
  id: 'leetcode',
  title: 'Two Professors',
  css: `
    #leetcode .lc { display: grid; grid-template-columns: 1fr 1.05fr; gap: .6rem; }
    #leetcode .pane { overflow: hidden; display: flex; flex-direction: column; min-width: 0; }
    #leetcode .ed { overflow-x: auto; }
    #leetcode .tabs { display: flex; gap: 1.2rem; padding: .55rem 1rem; background: #1b1f24; border-bottom: 1px solid var(--border); font-size: .8rem; color: var(--muted); }
    #leetcode .tabs b { color: var(--text); font-weight: 600; }
    #leetcode .desc { padding: 1rem 1.2rem 1.2rem; font-size: .9rem; line-height: 1.6; }
    #leetcode h3 { margin: 0 0 .5rem; font-size: 1.35rem; }
    #leetcode .chips { display: flex; gap: .4rem; margin-bottom: .9rem; flex-wrap: wrap; }
    #leetcode .chip { font-size: .72rem; padding: .15rem .6rem; border-radius: 99px; background: #2d333b; color: var(--muted); }
    #leetcode .chip.diff { background: rgba(248,81,73,.15); color: #ff8e88; font-weight: 700; }
    #leetcode code { background: #2d333b; padding: .05rem .35rem; border-radius: 4px; font-size: .85em; }
    #leetcode .ex { background: #1b1f24; border-left: 3px solid #444c56; padding: .55rem .9rem; font: .8rem/1.65 var(--mono); margin: .5rem 0 .9rem; }
    #leetcode .ex b { color: var(--text); }
    #leetcode ul { margin: .3rem 0 .8rem; padding-left: 1.2rem; }
    #leetcode .follow { color: var(--muted); font-size: .85rem; }
    #leetcode .ed { flex: 1; }
    #leetcode .langbar { display: flex; justify-content: space-between; align-items: center; padding: .45rem 1rem; background: #1b1f24; border-bottom: 1px solid var(--border); font: .78rem var(--mono); color: var(--muted); }
    #leetcode pre.code { margin: 0; padding: .9rem 0; font: .82rem/1.7 var(--mono); counter-reset: ln; overflow-x: auto; }
    #leetcode pre.code span.l { display: block; padding: 0 1rem 0 0; white-space: pre; }
    #leetcode pre.code span.l::before { counter-increment: ln; content: counter(ln); display: inline-block; width: 2.6rem; padding-right: .9rem; text-align: right; color: #484f58; }
    #leetcode .kw { color: #ff7b72; } #leetcode .fn { color: #d2a8ff; } #leetcode .str { color: #a5d6ff; }
    #leetcode .ty { color: #ffa657; } #leetcode .cm { color: #8b949e; font-style: italic; } #leetcode .nu { color: #79c0ff; }
    #leetcode .actions { display: flex; justify-content: flex-end; gap: .6rem; padding: .6rem 1rem; border-top: 1px solid var(--border); background: #1b1f24; }
    #leetcode .console { border-top: 1px solid var(--border); padding: .9rem 1.1rem; min-height: 13.5rem; font-size: .85rem; }
    #leetcode .console .idle { color: var(--muted); font: .8rem var(--mono); }
    #leetcode .tc { font: .8rem/1.8 var(--mono); color: var(--muted); }
    #leetcode .tc .ok { color: var(--green); }
    #leetcode .verdict { font-size: 1.5rem; font-weight: 700; color: var(--green); animation: pop .4s ease-out; }
    #leetcode .verdict small { font-size: .8rem; color: var(--muted); font-weight: 400; margin-left: .6rem; }
    #leetcode .stats { display: grid; grid-template-columns: 1fr 1fr; gap: .6rem; margin-top: .7rem; }
    #leetcode .st { background: #1b1f24; border-radius: 8px; padding: .6rem .8rem; }
    #leetcode .st .k { font-size: .72rem; color: var(--muted); }
    #leetcode .st .v { font: 700 1.1rem var(--mono); }
    #leetcode .st .v small { color: var(--green); font-size: .75rem; margin-left: .4rem; }
    #leetcode .hist { display: flex; align-items: flex-end; gap: 3px; height: 2.4rem; margin-top: .4rem; }
    #leetcode .hist i { flex: 1; background: #30363d; border-radius: 2px 2px 0 0; height: 0; transition: height .6s ease; }
    #leetcode .hist i.me { background: var(--green); }
    @media (max-width: 900px) { #leetcode .lc { grid-template-columns: 1fr; } }
  `,

  render(c) {
    const [a, b] = c.teachers;
    const code = [
      '<span class="kw">class</span> <span class="ty">Solution</span>:',
      '    <span class="kw">def</span> <span class="fn">twoProfessors</span>(self, teachers: <span class="ty">List</span>[<span class="ty">str</span>], ourSuccess: <span class="ty">float</span>) -&gt; <span class="ty">List</span>[<span class="ty">int</span>]:',
      '        seen = {}',
      '        <span class="kw">for</span> i, t <span class="kw">in</span> <span class="fn">enumerate</span>(teachers):',
      `            <span class="kw">if</span> t <span class="kw">in</span> (<span class="str">"${Site.esc(a.short)}"</span>, <span class="str">"${Site.esc(b.short)}"</span>):`,
      '                seen[t] = i',
      '        <span class="cm"># tried StackOverflow + ChatGPT first: "compiles, but wrong"</span>',
      '        <span class="kw">return</span> <span class="fn">list</span>(seen.values())  <span class="cm"># it was always them</span>',
    ];
    return `
      <p class="kicker"><b>$</b> leetcode submit 1 --lang python3</p>
      <div class="lc">
        <div class="pane panel">
          <div class="tabs"><b>Description</b><span>Editorial</span><span>Solutions (2)</span><span>Submissions</span></div>
          <div class="desc">
            <h3>1. Two Professors</h3>
            <div class="chips"><span class="chip diff">Legendary</span><span class="chip">Array</span><span class="chip">Hash Table</span><span class="chip">Gratitude</span></div>
            <p>Given an array <code>teachers</code> and a number <code>ourSuccess</code>, return the indices of the
              <b>two teachers</b> that add up to <code>ourSuccess</code>.</p>
            <p>You may assume each input has exactly one solution, and you may not use the same teacher twice
              (they are already doing double shifts).</p>
            <div class="ex"><b>Input:</b> teachers = ["${Site.esc(a.short)}", "${Site.esc(b.short)}", "StackOverflow", "ChatGPT"], ourSuccess = ∞<br>
              <b>Output:</b> [0, 1]<br>
              <b>Explanation:</b> teachers[0] + teachers[1] == ∞. StackOverflow and ChatGPT only got us to “compiles, but wrong”.</div>
            <b>Constraints:</b>
            <ul>
              <li><code>teachers.length == 2</code> (and that is plenty)</li>
              <li><code>1 &lt;= patience &lt;= ∞</code></li>
              <li><code>coffee.cups &gt;= 3</code> per lecture day</li>
              <li>Only one valid answer exists.</li>
            </ul>
            <p class="follow"><b>Follow-up:</b> Can you thank them in less than <code>O(n²)</code>? — No. Gratitude is <code>O(∞)</code>.</p>
          </div>
        </div>

        <div class="pane panel">
          <div class="langbar"><span>Python3 ▾</span><span>Auto · ⟲</span></div>
          <div class="ed"><pre class="code">${code.map((l) => `<span class="l">${l}</span>`).join('')}</pre></div>
          <div class="actions"><button class="btn run" type="button">▶ Run</button><button class="btn green submit" type="button">Submit</button></div>
          <div class="console"><div class="idle">Console · press Run or Submit</div></div>
        </div>
      </div>
    `;
  },

  onEnter(el, c, ctx) {
    const box = el.querySelector('.console');
    const run = el.querySelector('.run');
    const submit = el.querySelector('.submit');
    let busy = false;

    async function doRun() {
      if (busy) return;
      busy = true;
      box.innerHTML = '<div class="tc"><span class="spinner"></span> Running…</div>';
      await ctx.sleep(900);
      box.innerHTML = `<div class="tc"><span class="ok">● Case 1 passed</span><br>Input: teachers = [${c.teachers.map((t) => `"${Site.esc(t.short)}"`).join(', ')}, …]<br>
        Output: [0, 1]<br>Expected: [0, 1]<br>Stdout: thank you thank you thank you</div>`;
      busy = false;
    }

    async function doSubmit() {
      if (busy) return;
      busy = true;
      submit.disabled = true;
      box.innerHTML = '<div class="tc"><span class="spinner"></span> Judging…</div>';
      await ctx.sleep(700);
      const cases = [
        'semester 1 — Java basics',
        'semester 2 — Python, but make it Pythonic',
        'discrete math — proof by "it is obvious"',
        'statistics — n = 30, close enough to normal',
        'final exam — 3 a.m. edition',
        'testcase 2026 — Teacher’s Day',
      ];
      const tc = document.createElement('div');
      tc.className = 'tc';
      box.innerHTML = '';
      box.appendChild(tc);
      for (const name of cases) {
        tc.insertAdjacentHTML('beforeend', `<div><span class="ok">✓</span> ${Site.esc(name)} <span style="float:right">0 ms</span></div>`);
        await ctx.sleep(330);
      }
      await ctx.sleep(300);
      const bars = [3, 8, 14, 22, 30, 26, 18, 12, 7, 4, 2, 1];
      box.innerHTML = `
        <div class="verdict">Accepted<small>2026 / 2026 testcases passed</small></div>
        <div class="stats">
          <div class="st"><div class="k">Runtime</div><div class="v">0 ms<small>Beats 100.00%</small></div>
            <div class="hist">${bars.map((h, i) => `<i data-h="${h}" class="${i === 0 ? 'me' : ''}"></i>`).join('')}</div></div>
          <div class="st"><div class="k">Memory</div><div class="v">Unforgettable<small>Beats 100.00%</small></div>
            <div class="hist">${bars.map((h, i) => `<i data-h="${h}" class="${i === 0 ? 'me' : ''}"></i>`).join('')}</div></div>
        </div>`;
      requestAnimationFrame(() => requestAnimationFrame(() =>
        box.querySelectorAll('.hist i').forEach((i) => (i.style.height = (i.classList.contains('me') ? 100 : +i.dataset.h * 3) + '%'))));
      const r = box.getBoundingClientRect();
      Site.confetti({ x: r.left + r.width / 2, y: r.top + 30, count: 110 });
      submit.disabled = false;
      busy = false;
    }

    run.addEventListener('click', doRun);
    submit.addEventListener('click', doSubmit);
  },
});
