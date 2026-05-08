---
name: game-analysis
description: Creates post-launch game analysis HTML pages with a dark-themed dashboard layout. Searches web for game data, then generates a comprehensive analysis page with hero sections, stat cards, timelines, SWOT analysis, competitor landscape, and future outlook. Optionally creates an index page with left-right panel layout linking multiple game reports.
---

# Game Analysis Page Creator

Creates visually polished, dark-themed HTML analysis pages for games post-launch or in-development. Each page is a self-contained report with consistent design language.

## When to Use

Use this skill when the user asks you to:
- Create an analysis/report page for a game
- "게임 분석 페이지 만들어줘"
- "게임 동향 분석 HTML로 작성해줘"
- Make a dashboard with multiple game analysis pages
- "상위 페이지 만들어줘" (for index page linking multiple reports)

## Workflow

### Step 1: Gather Game Data

Search the web thoroughly for the game using `websearch` with type `deep`:

```text
websearch(query: "{game_name} 게임 2026", type: deep)
websearch(query: "{game_name} 출시 매출", type: deep)
websearch(query: "{game_name} 리뷰 평가", type: deep)
```

Collect these data points:
- Developer & Publisher
- Genre & Platform
- Release date & status
- Key metrics (pre-registrations, day-1 revenue, rankings)
- Gameplay features & systems
- SWOT-relevant information
- Competitor landscape
- Community reception (positive/negative)
- Timeline of events
- Business model / monetization
- Future outlook / roadmap

### Step 2: Create the Analysis HTML

Generate a single self-contained HTML file with the following structure:

**Color scheme by genre/theme:**
- Purple/magenta (`#7c5cff`) → RPG, fantasy, subculture · badge class: `purple`
- Gold/orange (`#ff8c00`) → action, competitive, MOBA · badge class: `gold`
- Blue/cyan (`#00bcd4`) → strategy, simulation, sandbox · badge class: `blue`
- Red/pink (`#ff6b9d`) → horror, survival, indie · badge class: `pink`
- Teal/green (`#26a69a`) → sports, racing, casual · badge class: `teal`
- Background: `#06060c` (deep dark), grid overlay with `0.025` opacity

**Required sections (in order):**

1. **Hero** — Full viewport header with game title, subtitle, badge, metadata row, floating particles animation

2. **Key Metrics** — Grid of stat cards with large numbers (`.stat-grid`), metric row, bar chart for regional performance

3. **Timeline** — Vertical timeline (`.timeline`) with date, title, description for each milestone

4. **Game Overview** — Two-column glass card with basic info and platform details, plus lore description

5. **SWOT Analysis** — 2×2 grid (`.swot-grid`) with Strength(green), Weakness(red), Opportunity(blue), Threat(gold)

6. **Reception / User Feedback** — Two-column glass cards for positive and negative reviews, plus insight box

7. **Key Systems / Gameplay** — Three-column grid of feature cards

8. **Competitor Landscape** — Bar chart comparing market position, insight box with outlook

9. **Business Model & Future** — Two-column grid + final assessment insight box

**Design patterns to follow:**
- All cards use `glass-card` class with dark translucent backgrounds
- `fade-in` class on all major elements with IntersectionObserver for scroll animation
- Section headers with colored accent bar
- `insight-box` for key takeaways (gradient border with accent color)
- Tags with colored backgrounds (`.tag.green`, `.tag.red`, `.tag.blue`, `.tag.gold`, `.tag.purple`)
- Bar charts with gradient fills (`.bf-purple`, `.bf-gold`, `.bf-pink`, `.bf-blue`, `.bf-teal`, `.bf-red`)
- Custom scrollbar styling matching game theme color

**CSS architecture:**
- Single embedded `<style>` block
- Google Fonts: `Noto Sans KR`
- All measurements in rem/em/vw — responsive
- Dark theme with low-opacity colored accents
- Grid overlay on fixed position

### Step 3: Create Index Page (if multiple games)

When the user says "상위 페이지" or wants a dashboard linking multiple reports:

```
Layout: header + left-right split
Left panel (320px): game list cards
  - Each card: publisher badge, title, genre, description, date, tags
  - `.game-date` style: font-size 11px, color #444, margin-top 6px
  - Active state with colored border/glow
Right panel: iframe loading selected game's HTML
  - frame-wrap div with seamless background matching parent
  - No border on iframe, border-left on wrap
```

### Step 4: Save Files

Place all files in the current workspace directory.

File naming convention:
- `index.html` — dashboard/index page
- `{game-slug}-analysis.html` — individual game pages (e.g., `yihwan-analysis.html`, `project-zeta-analysis.html`)

## Example Output Structure

```
index.html                    ← left-right dashboard (optional)
yihwan-analysis.html          ← game analysis page
project-zeta-analysis.html    ← game analysis page
```

Each analysis page is fully self-contained (no external dependencies except Google Fonts CDN) and can be opened directly in a browser.
