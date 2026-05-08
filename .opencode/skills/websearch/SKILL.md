
---
name: websearch
description: Creates post-launch game analysis HTML pages with a dark-themed dashboard layout. Searches web for game data, then generates a comprehensive analysis page with hero sections, stat cards, timelines, SWOT analysis, competitor landscape, and future outlook. Optionally creates an index page with left-right panel layout linking multiple game reports.
---

# 웹 검색 스크래퍼 스킬 (Web Search Scraper Skill)

## 개요
이 스킬은 웹 검색 결과를 주기적인 웹 스크래핑을 통해 가져와 요약하는 기능을 제공합니다. 구글 검색의 동적 방어 로직을 우회하기 위해 DuckDuckGo의 HTML 구조를 기반으로 스크래핑 전략을 입안했습니다.

## 사용 방법
이 스킬은 `google-search-scraper.py` 스크립트를 실행하는 것을 모방합니다.

### 1. 스크립트 실행
스크립트가 저장된 현재 작업 디렉터리에서 `python .opencode/skills/websearch/google-search-scraper.py`를 실행합니다.

### 2. 입력
스크립트가 실행될 때, 검색할 키워드를 파라미터로 전달합니다.


### 3. 출력
스크립트는 총 2페이지 분량의 검색 결과(최대 10개씩)를 수집한 후, 해당 검색 결과의 목록과 요약된 내용을 출력합니다.

## 기술적 배경 및 한계점
*   **검색엔진:** DuckDuckGo의 HTML 인터페이스를 사용합니다.
*   **안정성:** 스크래퍼는 Anti-bot 대응 (재시도 로직, 랜덤 지연 시간, 헤더 관리)을 적용하여 안정성을 높였습니다.
*   **제한 사항:** 이 스킬은 **스크래핑**에 의존하므로, 웹사이트 구조가 변경되면 동작이 멈출 수 있습니다. 일반적인 검색 API를 사용하는 것이 가장 안정적입니다.

## 사용 명령어 예시
```bash
python google-search-scraper.py 검색어
```