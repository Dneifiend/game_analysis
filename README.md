# 게임 동향 분석 리포트

출시 후 게임 분석 보고서를 모은 정적 대시보드입니다.

## 구조

```
index.html        ← 좌우 패널 대시보드 (카드 목록 + iframe)
reports.json      ← 분석 보고서 메타데이터
content/*.html    ← 개별 게임 분석 페이지
```

## 사용법

`index.html`을 브라우저에서 열면 좌측 패널에 보고서 목록이 표시됩니다. 카드를 클릭하면 우측 iframe에 해당 분석 페이지가 로드됩니다.

## 보고서 추가

1. `content/`에 분석 HTML 생성 (`yyyymmdd_{slug}-analysis.html`)
2. `reports.json`에 항목 추가
3. `index.html`에 배지 CSS 클래스 추가

자세한 내용은 `AGENTS.md` 참고.

## 기술 스택

- 순수 HTML/CSS/JS (정적 파일)
- Google Fonts (Noto Sans KR)
- 빌드 도구 · 패키지 매니저 · 테스트 프레임워크 없음
