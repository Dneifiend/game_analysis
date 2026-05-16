---
name: game-analysis
description: Creates premium, highly analytical post-launch game analysis HTML pages with a sophisticated dark-themed glassmorphism layout. Conducts deep web searches for qualitative and quantitative game data, generating professional reports featuring hero sections, dynamic metric cards, strategic SWOT, technical/art breakdowns, and monetization/retention analysis.
---

# Premium Game Analysis Page Creator

⚠️ **Badge Color Rule**: Use ONLY 5 predefined colors (purple, gold, blue, pink, teal). Do NOT create new badge classes. See AGENTS.md for full convention.

Creates visually stunning, highly professional dark-themed HTML analysis pages for games. Each page must serve as a comprehensive, executive-level report with state-of-the-art web design aesthetics.

## When to Use

Use this skill when the user asks you to:
- Create an analysis/report page for a game
- "게임 분석 페이지 만들어줘"
- "게임 동향 분석 HTML로 작성해줘"
- Make a dashboard with multiple game analysis pages
- "상위 페이지 만들어줘" (for index page linking multiple reports)

## Workflow

### Step 1: Deep Qualitative & Quantitative Data Gathering

Search the web thoroughly for the game using MCP `search_google` tool:

```text
1. "{game_name} 게임 분석 리뷰 2026"
2. "{game_name} 매출 순위 트래픽 지표"
3. "{game_name} 과금 모델 BM 평가"
4. "{game_name} 엔진 기술적 특징 최적화"
5. "{game_name} 개발자 인터뷰 로드맵"
```

Collect these critical data points:
- **Core Info**: Developer, Publisher, Engine, Platforms, Release Date.
- **Quantitative Metrics**: Sales, DAU/MAU estimates, Metacritic/Steam scores, App Store rankings.
- **Core Loop & Mechanics**: Detailed breakdown of the gameplay loop and unique systems.
- **Art & Technology**: Art style, graphical achievements, optimization status.
- **Monetization (BM) & Retention**: How the game makes money (P2W evaluation, Battle Pass, Gacha rates) and how it retains players.
- **Strategic SWOT**: Deep analysis of Strengths, Weaknesses, Opportunities, and Threats in the current market context.
- **Community Sentiment**: Nuanced breakdown of player feedback (both praise and pain points).
- **Future Outlook**: Planned updates, roadmap, and expected lifecycle.

### Step 2: Create the Premium Analysis HTML

Generate a single self-contained HTML file. The design MUST WOW the user, feeling extremely premium, responsive, and dynamic.

**Design System & Aesthetics (CRITICAL):**
- **Typography**: Use `Pretendard` for a modern, sleek look. (`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">`)
- **Theme Colors**:
  - RPG/Subculture: Purple/Pink (`#8b5cf6`, `#ec4899`) → `purple` badge
  - Action/MOBA: Gold/Orange (`#f59e0b`, `#f97316`) → `gold` badge
  - Strategy/Sim: Blue/Cyan (`#0ea5e9`, `#06b6d4`) → `blue` badge
  - Horror/Survival: Red/Crimson (`#ef4444`, `#be123c`) → `pink` badge
  - Casual/Sports: Teal/Green (`#14b8a6`, `#10b981`) → `teal` badge
- **Premium Glassmorphism**: Cards must use `background: rgba(20, 20, 25, 0.4);`, `backdrop-filter: blur(16px) saturate(180%);`, and `border: 1px solid rgba(255, 255, 255, 0.08);`.
- **Dynamic Interactions**: Implement hover effects on cards (`.glass-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.5); border-color: rgba(255,255,255,0.15); }`) with smooth transitions (`transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);`).
- **Gradients & Glows**: Use multi-stop linear/radial gradients for backgrounds and text (`background-clip: text; color: transparent;`). Add subtle neon text-shadows for key metrics.
- **Background**: Deep dark `#05050a` with a subtle, animated radial gradient orb in the background representing the theme color, plus a very faint grid overlay (`background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)...`).

**Required Sections (Executive Structure, In Order):**

1. **Hero Banner** — Cinematic full-width header. Game title (gradient text), elegant subtitle, metadata row with dot labels. Background should feature animated glowing particles (`.particles`) and a rich gradient overlay.
2. **Executive Summary & Key Metrics (Bento Grid)** — A modern "Bento Box" style grid layout (`display: grid; gap: 16px;`). Show critical stats (Score, Sales, Rank, Peak CCU) with glowing numbers and mini CSS-based progress bars or sparklines.
3. **Core Loop & Unique Mechanics** — Deep dive into what makes the game fun. Use a 3-column layout of premium cards. Each card must have a distinct title and analytical text focusing on *why* it works (e.g., combat rhythm, progression psychology).
4. **Art Direction & Technical Execution** — Analyze the visuals, sound design, and engine optimization. Use a 2-column split (Art vs. Tech).
5. **Strategic SWOT Analysis** — 2×2 grid (`.swot-grid`). Each quadrant must have a tinted background of its respective color (Strength: Green, Weakness: Red, Opportunity: Blue, Threat: Gold). Do not just list facts; provide *strategic implications*. **Crucial**: Lists must use `position: relative` for custom `::before` bullets.
6. **Monetization (BM) & Retention Strategy** — How the game monetizes and keeps players coming back. Include a CSS-based "P2W Severity" meter or value assessment bar.
7. **Community Sentiment & Reception** — 2-column layout (Positive/Negative) with summarized user feedback trends and actual player quotes. Use a sleek "insight box" for the overall consensus.
8. **Timeline & Future Roadmap** — A sleek vertical timeline (`.timeline`) showing pre-launch, launch, and future milestones.
9. **Final Analyst Verdict** — A prominent, beautifully styled insight box (`.insight-box` with gradient border) at the bottom summarizing the game's market impact and future potential.

**Implementation Rules:**
- Everything must be in a single HTML file (CSS inside `<style>`).
- Use IntersectionObserver to add `.visible` to elements with a base `.fade-in` class for elegant scroll-reveal animations.
- Scrollbar must be custom styled (`::-webkit-scrollbar`) to match the theme color.
- **Section Headers**: Must have a sleek, uppercase English subtitle (`font-size: 0.8rem; letter-spacing: 2px; color: var(--theme-color);`) above the Korean title, accompanied by a colored accent line.
- Dot labels (`category indicator`): `<span><span class="dot"></span> LABEL</span>` — a small colored dot before text.
- Maintain `position: relative` on `li` elements when using `::before` pseudo-elements for absolute positioning of custom bullet points.

### Step 3: Create Index Page (if multiple games)

When the user says "상위 페이지" or wants a dashboard linking multiple reports:

```
Layout: header + left-right split
Left panel (320px): game list cards (Premium glassmorphism style)
  - Each card: publisher badge, title, genre, description, date, tags
  - Active state with colored border/glow and translate effect
Right panel: iframe loading selected game's HTML
  - frame-wrap div with seamless background matching parent
```

### Step 4: Save Files

Place all files in the current workspace directory.

File naming convention:
- `index.html` — dashboard/index page (located in workspace root)
- `content/{ID}-analysis.html` — individual game pages (ID = ID_yyyymmddhhmmss, e.g. `ID_20260514123045`)

### Step 5: Register in reports.json & Update index.html

After creating a new analysis page, register it in the dashboard system:

**5a. Add entry to `reports.json`** (located at workspace root)

Append a new entry at the end of the array with this structure:

```json
{
  "id": "{ID}",
  "badge": {
    "class": "{color-name}",
    "text": "{PUBLISHER · DEVELOPER}"
  },
  "title": "{게임명}",
  "genre": "{English Title}",
  "desc": "{한줄 설명}<br>{추가 설명}",
  "written": "{yyyy-mm-ddTHH:MM:SS}",
  "tags": [
    "{태그1}",
    "{태그2}",
    "{태그3}",
    "{태그4}"
  ],
  "url": "content/{ID}-analysis.html"
}
```
⚠️ **`{ID}` format**: Must be `ID_yyyymmddhhmmss` (e.g. `ID_20260514123045`). The `written` field uses ISO 8601 with full time.
⚠️ **`{color-name}` must be one of: `purple`, `gold`, `blue`, `pink`, `teal`**. Choose by genre.

**5b. Set badge CSS class in `index.html`**

⚠️ **Important**: AGENTS.md convention — use ONLY these 5 predefined color names. Do NOT create new badge classes. Choose the color based on the genre and apply the corresponding CSS class.

**5c. (Do NOT manually edit index.html loadReport function)**

⚠️ **STRICTLY FORBIDDEN**: Do NOT add manual `else if` cases to the `loadReport()` function in `index.html`. The dashboard system dynamically loads reports based on the `id` field in `reports.json`. No code modification in `index.html` is required for new reports.

## Example Output Structure

```
index.html                    ← left-right dashboard (optional)
content/
  ID_20260507120000-analysis.html    ← game analysis page
  ID_20260507153000-analysis.html    ← game analysis page
```

Each analysis page is fully self-contained (no external dependencies except Google Fonts/Pretendard CDN) and can be opened directly in a browser.
