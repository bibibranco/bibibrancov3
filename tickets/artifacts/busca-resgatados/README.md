# Busca Resgatados screens (PORT-205)

Rebuilt from the project's code, https://github.com/buscaresgatados/pesquisa-listas (Vue + Tailwind,
DM Sans, `#111827` / `#00DC82`), as of commit `c5727e7` (May 11, 2024), the last version that showed
the consulted lists. List names, copy and the email come from that code; the two search results are
an example built on the "Maria Alice dos Santos" / "Maria dos Santos" case from the article.

Render at a 1024px viewport, device scale 2.5 (Playwright), into `content/work/busca-resgatados/`:
- `cover.png`: sources.html with the `.section` blocks hidden, content centred, clipped to x 62, y 0, 900×450 (2:1, wide enough to survive the 16:10 phone crop), device scale 3
- `sources.png`: sources.html at 1024×1080, clipped to the Listas consultadas section (x 160, 704 wide, from 4px above the section to 16px below it)
- `search-box.png`: sources.html at 1024×640, clipped to x 160, y 0, 704×300
- `results.png`: results.html at 1024×900, clipped to x 160, y 0, 704×610
