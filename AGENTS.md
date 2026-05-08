# OpenCode Agent Guide

## Responses
- Always respond in Korean (한국어로 답변).

## Repo structure
- Working dir & root: `C:\OpenCode`
- Key dirs:
  - `content/` – HTML reports (e.g., `20260507_*.html`)
  - `skills/` – OpenCode skill templates (including game-analysis)
  - `.git\hooks` – Git hooks (do not edit)

## Commands
- Use `bash` for shell commands; add a brief description.
- Use `task` to launch agents; set `subagent_type` (`explore`, `general`, `code-reviewer`, …).

## Workflow
- No commit/push without explicit request.
- Preserve existing instruction files; edit only `AGENTS.md` when asked.
- Check `git status` before committing.

## Skills
- `game-analysis` generates dark‑themed analysis HTML pages.
- Config located in `skills\game-analysis\`.
- Analysis pages saved to `content/` directory with format: `yyyymmdd_{game-slug}-analysis.html`
- Index/dashboard pages saved as `index.html` in root directory
- **After creating a new analysis page, always:**
  1. Add entry to `reports.json` (append to end of array)
  2. Add badge CSS class in `index.html` (`.game-card .badge.{class} { color: #hex; }`)
  3. Add `loadReport` case in `index.html` with correct card index (0-based, matching JSON order)
  4. Reorder `reports.json` entries by date descending (newest first)
- All content must be in Korean

## Game Analysis Specifics
When using game-analysis skill:
1. Search uses `websearch` with `type: deep` for game data
2. Output follows strict structure: Hero → Key Metrics → Timeline → Game Overview → SWOT → Reception → Key Systems → Competitor Landscape → Business Model & Future
   - 과금모델 요청 시 Business Model 섹션을 강화 (비교표·심층분석 포함)
3. Color schemes by genre (5가지 테마로 구분):
   - Purple/magenta gradient: subculture, fantasy, RPG
   - Gold/orange gradient: action, competitive, MOBA
   - Blue/cyan gradient: simulation, strategy, sandbox
   - Red/pink gradient: horror, survival, indie
   - Teal/green gradient: sports, racing, casual
4. All HTML files are self-contained (only external dependency: Google Fonts CDN)

## Git & Ignore Rules
- `.gitignore` allows: `content/`, `index.html`, `reports.json`, `.gitignore`
- All other root files are gitignored by default
- `reports.json` entries must be sorted newest-first
- `content/` files follow naming: `yyyymmdd_{slug}-analysis.html`