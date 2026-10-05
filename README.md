# Teacher_day_web_gift
A website for our dearest teachers Emil agai and Munara eje for Teacher's day

## How to run

No internet, no installs, no build. Pick one:

**Option 1 — just open it.** Double-click `index.html` (Chrome recommended).

**Option 2 — local server** (if something doesn't load in option 1):

```bash
cd path/to/Teacher_day_web_gift
python3 -m http.server 8000
```

Then open <http://localhost:8000> in the browser. Stop the server with `Ctrl+C`.

## Presenting

- Press `F11` (Windows) or `Ctrl+Cmd+F` (Mac) for full screen.
- `Space` / `→` = next section, `←` = previous, `R` = replay the current section's animation.
- The first screen types itself out; press any key to skip or continue.

## Editing content

- All names, jokes, numbers, quotes, messages and credits live in **`js/content.js`**. Lines marked `TODO` are placeholders.
- Photos and videos go in **`assets/photos/`** with the names used in `content.js`
  (`munara.jpg`, `emil.jpg`, `memory1.jpg` … `memory6.mp4`). Missing files show a dashed "drop file" box.
- Large photos: shrink them first on a Mac with `sips -Z 1600 assets/photos/*.jpg`.

## Adding, removing or reordering sections

Each section is one file in `sections/`. In `index.html`, the order of the `<script src="sections/…">` lines is the page order:

- **Remove:** delete or comment out its line.
- **Reorder:** move the lines.
- **Add:** create `sections/<name>.js` (copy an existing one as a template) and add one line.
