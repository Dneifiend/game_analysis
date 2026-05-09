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
2. Append entry to `reports.json` (id, badge, title, genre, desc, written, tags, url) — `written` uses ISO 8601 with full time (e.g., "2026-05-08T14:30:00")
3. Set badge CSS class in `index.html` — use ONLY one of 5 predefined colors: `.game-card .badge.purple { color: #7c5cff; }`, `.badge.gold { color: #ff8c00; }`, `.badge.blue { color: #00bcd4; }`, `.badge.pink { color: #ff6b9d; }`, `.badge.teal { color: #26a69a; }` (do NOT create new classes)
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

## Testing & URLs
- `index.html`에서 URL 파라미터로 특정 보고서 직접 열기: `index.html?page=20260509_helldivers2-analysis`
- 로컬 테스트 시: 브라우저에서 직접 열면 CORS 오류 발생 → VS Code Live Server 등 로컬 서버 사용 필요

## Skill Usage
- 게임 분석 페이지 생성 시 `game-analysis` skill 사용 권장: `/game-analysis`
- skill이 웹 검색, HTML 생성, reports.json 등록까지 자동화

## Workflow Rules
- No `git commit` or `git push` without explicit user request
- Preserve existing instruction files (`SKILL.md`, etc.)
- Check `git status` before any commit

# [Operational Directive] 분석/디버깅/상태 확인 프로토콜
- 요청이 분석, 디버깅, 또는 상태 확인과 관련되면 이 프로토콜을 절대적으로 따른다.
  - 직접적 접근: 단일 도구 호출로 마무리 짓지 않는다.
  - 결과 해석: 도구 결과를 맹신하지 않고, 그 결과의 기술적 의미를 분석하여 다음 단계를 결정한다.
  - 연속 탐색: 맥락 파악이 안 될 경우, 필요한 모든 도구를 논리적으로 연속 호출한다.
  - 최종 보고: 답변은 다음 구조로 한정한다.
    - 원인: 문제의 근본 원인.
    - 해석: 현재 상태의 기술적 의미.
    - 액션: 사용자에게 필요한 명확하고 구체적인 다음 행동 지시.