---
name: game-analysis
description: Creates post-launch game analysis HTML pages with a dark-themed dashboard layout. Searches web for game data, then generates a comprehensive analysis page with hero sections, stat cards, timelines, SWOT analysis, competitor landscape, and future outlook. Optionally creates an index page with left-right panel layout linking multiple game reports.
---

# Game Analysis Page Creator

⚠️ **Badge Color Rule**: Use ONLY 5 predefined colors (purple, gold, blue, pink, teal). Do NOT create new badge classes. See AGENTS.md for full convention.

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
- Purple/magenta gradient → subculture, fantasy, RPG games (`#7c5cff`, `#ff6b9d`)
- Gold/orange gradient → action, competitive, MOBA games (`#ff8c00`, `#ffd700`)
- Background: `#06060c` (deep dark), grid overlay with `0.025` opacity

**Required sections (in order):**

1. **Hero** — Full viewport header with game title, subtitle, badge, metadata row, floating particles animation

2. **Key Metrics** — Grid of stat cards with large numbers (`.stat-grid`), metric row, bar chart for regional performance

3. **Timeline** — Vertical timeline (`.timeline`) with date, title, description for each milestone

4. **Game Overview** — Two-column glass card with basic info and platform details, plus lore description

5. **SWOT Analysis** — 2×2 grid (`.swot-grid`) with Strength(green), Weakness(red), Opportunity(blue), Threat(gold)

6. **고유 특징 심층 분석 (Unique Features)** — 게임의 핵심적인 특장점을抽取하여 3개 항목 선정. 각 항목은 상세 설명과 함께圖表/리스트로 구분. 게임만의创新적 메커니즘, 특별한 세계관/스토리텔링, 독특한 커뮤니티 문화 등 포함. `.feature-grid` (2열 그리드), `.feature-card` (각 특징별 카드) 사용

7. **Reception / User Feedback** — Two-column glass cards for positive and negative reviews, plus insight box

7. **Key Systems / Gameplay** — Three-column grid of feature cards

8. **Competitor Landscape** — Bar chart comparing market position, insight box with outlook

9. **Business Model & Future** — Two-column grid + final assessment insight box

**고유 특징 심층 분석 세션 가이드:**
- 각 게임의 **핵심적인 차별화 요소** 3가지를 선정
- 예시: 독특한 전투 시스템, 특별한 커뮤니티 문화,创新적 비즈니스 모델, 세계관/스토리텔링, 기술적 우위 등
- 각 특징마다 **상세 설명 (300~500자)** + **핵심 포인트 리스트 (3~5개)** 구성
- 게임의 **유일성**과 **경쟁 우위**를 부각
- `.feature-grid` (grid-template-columns: repeat(3, 1fr)), `.feature-card` (glass-card 스타일) 사용
- 태그를 사용하여 각 특징의 유형 표시 (`.tag.blue` 등)

**Design patterns to follow:**
- All cards use `glass-card` class with dark translucent backgrounds
- `fade-in` class on all major elements with IntersectionObserver for scroll animation
- Section headers with colored accent bar
- `insight-box` for key takeaways (gradient border with accent color)
- Tags with colored backgrounds (`.tag.green`, `.tag.red`, `.tag.blue`, `.tag.gold`, `.tag.purple`)
- Bar charts with gradient fills (`.bf-purple`, `.bf-gold`, `.bf-pink`, `.bf-blue`, `.bf-teal`, `.bf-red`)
- Custom scrollbar styling matching game theme color
- **Floating particles** in Hero section (`.particles`, `.particle`, `@keyframes float`) with theme-appropriate colors
- **Section divider** after Hero (`.divider` with linear-gradient from transparent to theme color to transparent)

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
- `index.html` — dashboard/index page (located in workspace root)
- `content/{yyyymmdd}_{game-slug}-analysis.html` — individual game pages
- `content/` directory — all analysis HTML files

### Step 5: Register in reports.json & Update index.html

After creating a new analysis page, register it in the dashboard system:

**5a. Add entry to `reports.json`** (located at workspace root)

Append a new entry at the end of the array with this structure:

```json
{
  "id": "{game-slug}",
  "badge": {
    "class": "{color-name}",
    "text": "{PUBLISHER · DEVELOPER}"
  },
  "title": "{게임명}",
  "genre": "{English Title}",
  "desc": "{한줄 설명}<br>{추가 설명}",
  "date": "{YYYY. M. D.}",
  "tags": [
    "{태그1}",
    "{태그2}",
    "{태그3}",
    "{태그4}"
  ],
  "url": "content/{yyyymmdd}_{game-slug}-analysis.html"
}
```

⚠️ **`{color-name}` must be one of: `purple`, `gold`, `blue`, `pink`, `teal`** (see AGENTS.md convention).
Choose by genre: RPG/fantasy → `purple`, Action/MOBA → `gold`, Sim/strategy → `blue`, Horror/indie → `pink`, Sports/casual → `teal`.

**5b. Set badge CSS class in `index.html`**

⚠️ **Important**: AGENTS.md convention — use ONLY these 5 predefined color names. Do NOT create new badge classes.

```css
.game-card .badge.purple { color: #7c5cff; }
.game-card .badge.gold { color: #ff8c00; }
.game-card .badge.blue { color: #00bcd4; }
.game-card .badge.pink { color: #ff6b9d; }
.game-card .badge.teal { color: #26a69a; }
```

Choose by genre: RPG/fantasy → `purple`, Action/MOBA → `gold`, Sim/strategy → `blue`, Horror/indie → `pink`, Sports/casual → `teal`.

**5c. (Do NOT manually edit index.html loadReport function)**

⚠️ **STRICTLY FORBIDDEN**: Do NOT add manual `else if` cases to the `loadReport()` function in `index.html`. The dashboard system dynamically loads reports based on the `id` field in `reports.json`. Adding manual cases will break the dynamic loading system.

The `loadReport(name)` function already handles loading by finding the report in `allReports` (loaded from `reports.json`) using the `id`. No code modification in `index.html` is required for new reports.

## Example Output Structure

```
index.html                    ← left-right dashboard (optional)
content/
  20260507_yihwan-analysis.html    ← game analysis page
  20260507_project-zeta-analysis.html    ← game analysis page
  20260607_gta6-analysis.html    ← game analysis page
  20260508_yeonun-analysis.html  ← game analysis page
```

Each analysis page is fully self-contained (no external dependencies except Google Fonts CDN) and can be opened directly in a browser.
