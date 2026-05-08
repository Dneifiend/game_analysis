# OpenCode Agent Guide — game_analyze

## Language
- 모든 응답은 한국어로 작성 (`Always respond in Korean.`)
- 커밋 로그는 한국어로 작성

## Repo Overview
- Static site dashboard: `index.html` (left-right panel: card list + iframe), `reports.json` (metadata), `content/*.html` (analysis pages)
- No build tools, no package.json, no tests, no CI/CD config
- No `.gitignore` — all files are intentionally tracked
- Git remote: `origin` → `https://github.com/Dneifiend/game_analysis.git`

## Adding a New Analysis Report (순서대로 정확히 수행)
1. Create HTML in `content/` — filename: `yyyymmdd_{slug}-analysis.html`
2. Append entry to `reports.json` (id, badge, title, genre, desc, written, tags, url)
3. Add badge CSS class in `index.html`: `.game-card .badge.{class} { color: #hex; }` — convention: publisher/studio name (netease, rockstar, perfectworld, krafton, sony)
4. No manual `loadReport` case needed — JS dynamically renders cards from JSON via `data-id` attribute
5. No manual reordering needed — JS auto-sorts by `written` descending at runtime; conventional to keep JSON ordered newest-first
6. All content must be in Korean

## Game Analysis HTML Conventions
- **Section order**: Hero → Key Metrics → Timeline → Game Overview → SWOT → Reception → Key Systems → Competitor Landscape → Business Model & Future
- **Color themes**: Purple/magenta (RPG, fantasy, subculture), Gold/orange (action, MOBA, competitive), Blue/cyan (sim, strategy, sandbox), Red/pink (horror, survival, indie), Teal/green (sports, racing, casual)
- **Self-contained HTML** — only Google Fonts CDN (`Noto Sans KR`) as external dependency
- Dark background `#06060c`, glass cards, fade-in scroll animations, grid overlay
- Search uses `websearch` with `type: deep`
- 과금모델 요청 시 Business Model 섹션 확장 (비교표·심층분석 포함)

## Workflow Rules
- No `git commit` / `git push` without explicit user request
- Preserve existing instruction files (`SKILL.md`, etc.)
- Check `git status` before any commit
