# ONTOH Design System

> 건설현장 안전관리 Physical AI 기업 · **주식회사 온토** 웹사이트 브랜드 · 컴포넌트 시스템

---

> ## ⚠️ 이 문서는 참조용입니다 — 최신 규격은 디자인 시스템 포털
>
> **단일 소스(Single Source of Truth)는 [`design/portal/`](portal/index.html) 입니다.**
> 이 문서(v3.0 · 2026-07-22)는 포털보다 오래됐습니다. 값이 다르면 **포털이 맞습니다.**
>
> | 찾는 것 | 포털에서 보세요 |
> |---|---|
> | 타입 스케일 · 웨이트 | [`portal/foundations/typography.html`](portal/foundations/typography.html) |
> | 컬러 | [`portal/foundations/color.html`](portal/foundations/color.html) |
> | 모션 · easing · duration | [`portal/foundations/motion.html`](portal/foundations/motion.html) |
> | Radius · Elevation · Spacing | [`portal/foundations/`](portal/foundations/) |
> | Kicker · Tag · Card · Button 등 | [`portal/components/`](portal/components/) |
> | Hero · Section · CTA 패턴 | [`portal/patterns/`](portal/patterns/) |
> | 신규 페이지 착수 | [`portal/get-started/`](portal/get-started/) |
>
> 아래 본문 중 **§4.2 스케일**과 **§6.1 Kicker**는 포털 기준으로 갱신했습니다.
> 나머지 절은 갱신 전이므로 포털과 대조해 사용하세요.

---

## 목차
1. [브랜드 아이덴티티](#1-브랜드-아이덴티티)
2. [디자인 원칙](#2-디자인-원칙)
3. [디자인 토큰](#3-디자인-토큰)
4. [타이포그래피](#4-타이포그래피)
5. [스페이싱 · 레이아웃](#5-스페이싱--레이아웃)
6. [컴포넌트](#6-컴포넌트)
7. [모션 · 인터랙션](#7-모션--인터랙션)
8. [아이콘](#8-아이콘)
9. [접근성](#9-접근성)
10. [절대 하지 말 것](#10-절대-하지-말-것)
11. [기술 스택](#11-기술-스택)
12. [파일 구조 · 헤더/푸터](#12-파일-구조--헤더푸터)

---

## 1. 브랜드 아이덴티티

| 항목 | 값 |
|---|---|
| **회사명** | ONTOH (온토) · 주식회사 온토 |
| **사업 도메인** | 건설현장 안전관리 Physical AI |
| **제품** | LOOKAT (AI 영상 자율 관제) · ONTOH Health (디지털 보건 관리) |
| **대표이사** | 김태건 |
| **연락처** | contact@ontoh.co.kr · www.ontoh.co.kr |
| **소재지** | (03777) 서울특별시 서대문구 연세로2나길 61, 캠퍼스타운에스큐브 304호 |
| **사업자번호** | 230-88-03436 |

### 브랜드 톤

**시재건설 등 대형 건설사 톤의 "기관형"** — 보수적 건설사 담당자에게 신뢰를 주는 정연함.
연구·특허·논문 기반의 기술 진정성 + 대기업 IR 자료 같은 절제된 위계.

### 로고

- **`assets/logo/ontoh/ontoh-logo-color.svg`** — 라이트 배경용 (딥네이비 로고)
- **`assets/logo/ontoh/ontoh-logo-white.svg`** — 다크 배경용 (푸터 등)
- 로고 네이비 `#1b2e6a`는 **로고 자산 전용** — 웹 UI에는 사용 금지 (`#0A2440` ink 사용)

---

## 2. 디자인 원칙

> **포털이 관리합니다.** 아래 링크가 최신 규격입니다.

| 내용 | 위치 |
|---|---|
| 디자인 원칙 | [`portal/get-started/principles.html`](portal/get-started/principles.html) |
| 보이스 · 톤 | [`portal/foundations/voice-tone.html`](portal/foundations/voice-tone.html) |
| UX 라이팅 | [`portal/foundations/writing.html`](portal/foundations/writing.html) |

## 3. 디자인 토큰

> **포털이 관리합니다.** 아래 링크가 최신 규격입니다.

| 내용 | 위치 |
|---|---|
| 컬러 팔레트 | [`portal/foundations/color.html`](portal/foundations/color.html) |
| Radius | [`portal/foundations/radius.html`](portal/foundations/radius.html) |
| Shadow · Elevation | [`portal/foundations/elevation.html`](portal/foundations/elevation.html) |

## 4. 타이포그래피

> **포털이 관리합니다.** 아래 링크가 최신 규격입니다.

| 내용 | 위치 |
|---|---|
| 타입 스케일 · 웨이트 · 사용 규칙 | [`portal/foundations/typography.html`](portal/foundations/typography.html) |

## 5. 스페이싱 · 레이아웃

> **포털이 관리합니다.** 아래 링크가 최신 규격입니다.

| 내용 | 위치 |
|---|---|
| 스페이싱 스케일 | [`portal/foundations/spacing.html`](portal/foundations/spacing.html) |
| 컨테이너 · 그리드 | [`portal/foundations/layout.html`](portal/foundations/layout.html) |

## 6. 컴포넌트

> **대부분은 포털이 관리합니다.** 아래는 포털 매핑이며, 이 문서에는 **포털에 아직 없는 컴포넌트만** 남겨두었습니다.

| 컴포넌트 | 포털 위치 |
|---|---|
| Kicker | [`portal/components/kicker.html`](portal/components/kicker.html) |
| Tag / Chip | [`portal/components/tag.html`](portal/components/tag.html) |
| Card | [`portal/components/card.html`](portal/components/card.html) |
| KPI Box | [`portal/components/stat-number.html`](portal/components/stat-number.html) |
| Draft Notice | [`portal/components/alert.html`](portal/components/alert.html) |
| GNB 메가메뉴 | [`portal/components/navigation.html`](portal/components/navigation.html) |
| Breadcrumb | [`portal/components/breadcrumb.html`](portal/components/breadcrumb.html) |
| Sub Hero | [`portal/patterns/hero.html`](portal/patterns/hero.html) |
| CTA Section | [`portal/patterns/cta.html`](portal/patterns/cta.html) |
| Button · Form · Lightbox · Dropdown · Feature Carousel | [`portal/components/`](portal/components/) |

**아래는 포털 미수록 — 이 문서가 유일한 출처입니다.**



### 6.2 Section Tag

Kicker의 상세 페이지 버전. Challenge / Solution / Impact 등에 사용.

```html
<p class="section-tag">과제 · Challenge</p>
```

```css
.section-tag { display:inline-block; font-size:12px; font-weight:800;
  letter-spacing:.16em; text-transform:uppercase; color:#0169a9; margin-bottom:1rem; }
.section-tag::before { content:""; display:inline-block; width:4px; height:18px;
  background:#0169a9; vertical-align:middle; margin-right:.6rem; }
```




### 6.6 Summary Strip (4칸 요약 스트립)

사이트 개요 · 사양 · 기간 등을 4칸으로 나열.

```html
<div class="summary-strip">
  <div>
    <p class="text-[11.5px] text-sub/60 font-bold tracking-[0.14em] uppercase mb-2">현장 유형</p>
    <p class="text-[15.5px] font-bold text-ink">공공주택 지구조성</p>
  </div>
  ...
</div>
```

```css
.summary-strip { border:1px solid #E5E7EB; display:grid;
  grid-template-columns:repeat(2, 1fr); background:#fff; }
.summary-strip > div { padding:1.4rem 1.5rem 1.6rem;
  border-right:1px solid #E5E7EB; border-bottom:1px solid #E5E7EB; }
.summary-strip > div:nth-child(2n) { border-right:0; }
.summary-strip > div:nth-last-child(-n+2) { border-bottom:0; }
@media (min-width:768px) {
  .summary-strip { grid-template-columns:repeat(4, 1fr); }
  .summary-strip > div { border-bottom:0; border-right:1px solid #E5E7EB; }
  .summary-strip > div:nth-child(2n) { border-right:1px solid #E5E7EB; }
  .summary-strip > div:last-child { border-right:0; }
}
```

### 6.7 Points List (`.pts`)

법령 · Challenge · Solution의 정형 리스트. 아웃라인 도트 + 헤어라인 divider.

```html
<ul class="pts">
  <li>다수 시공사 병행 시공으로 <b>안전관리 통합 관제 부재</b></li>
  ...
</ul>
```

```css
.pts li { position:relative; padding:12px 0 12px 24px; border-bottom:1px solid #E5E7EB;
  color:#33383e; font-size:15.5px; line-height:1.65; }
.pts li:before { content:""; position:absolute; left:0; top:19px;
  width:8px; height:8px; border:2px solid #0169a9; border-radius:50%; }
.pts li b { color:#0A2440; font-weight:700; }
```

### 6.8 Badge (`.ba`)

인라인 수치 강조.

```html
오경보 <span class="ba">68% 감소</span>
```

```css
.ba { display:inline-block; background:#EAF0FA; color:#0A2440;
  font-weight:800; padding:2px 10px; font-size:14.5px; }
```

### 6.9 Law Chip

법령 · 준수 항목 나열용 칩.

```html
<span class="law-chip">산업안전보건법 제43조 (추락 방지)</span>
```

```css
.law-chip { font-size:13px; font-weight:700; color:#0A2440;
  background:#fff; border:1px solid #E5E7EB; padding:8px 13px; }
.law-chip::before { content:"§ "; color:#0169a9; }
```





### 6.14 Footer (강화 푸터)

3열 그리드 (회사 정보 / 메뉴 / 문의) + 하단 카피라이트 + 개인정보/이용약관 링크.

---

## 7. 모션 · 인터랙션

> **포털이 관리합니다.** 아래 링크가 최신 규격입니다.

| 내용 | 위치 |
|---|---|
| easing · duration · reduced-motion | [`portal/foundations/motion.html`](portal/foundations/motion.html) |

## 8. 아이콘

> **포털이 관리합니다.** 아래 링크가 최신 규격입니다.

| 내용 | 위치 |
|---|---|
| 아이콘 규칙 · Iconify Solar | [`portal/foundations/iconography.html`](portal/foundations/iconography.html) |

## 9. 접근성

> **포털이 관리합니다.** 아래 링크가 최신 규격입니다.

| 내용 | 위치 |
|---|---|
| 접근성 기준 · WCAG | [`portal/foundations/accessibility.html`](portal/foundations/accessibility.html) |
| 상태 표현 | [`portal/foundations/state.html`](portal/foundations/state.html) |

## 10. 절대 하지 말 것

### 10.1 컬러
- 웜 아이보리 · 크림 팔레트
- 쿨 그레이 틴트
- 다크 배경 (본문 · CTA 다크 카드 제외)
- 보라색 · 네온 AI 그라디언트 (`from-purple-* to-pink-*`)
- 로고 네이비 `#1b2e6a` 웹 UI 사용 (로고 자산에만)

### 10.2 타이포
- Pretendard 외 폰트 (Inter · Noto Sans KR · Roboto · 명조 전부)
- 900 Black
- 대문자 남용 (kicker · section-tag 외)

### 10.3 형태
- 큰 라운드 (`rounded-2xl` 이상)
- 큰 그림자 (호버 이외)
- 3열 균등 카드 반복 (Bento · Zig-Zag 사용)
- 인접 섹션 동일 레이아웃

### 10.4 아이콘 · 문구
- 이모지
- AI 클리셰 한국어 ("혁신적인", "원활한", "차세대", "게임 체인저")
- 지어낸 수치 (없으면 "실증 진행 중"으로 표기)

### 10.5 코드
- 미완성 · 플레이스홀더 · `<!-- ... -->` 생략
- `ease-in-out` · `linear` 트랜지션
- `<div onclick>` (버튼 · 링크는 `<button>` · `<a>` 사용)
- `h-screen` (반응형 파괴, `min-h-[100dvh]` 사용)

---

## 11. 기술 스택

| 카테고리 | 기술 | 비고 |
|---|---|---|
| CSS 프레임워크 | **Tailwind CSS CDN** | `https://cdn.tailwindcss.com` |
| 폰트 | **Pretendard** (jsDelivr CDN) | 한국어 필수 |
| 아이콘 | **Iconify Solar** | 다른 셋 금지 |
| JS | 바닐라 JS (`js/common.js`) | 프레임워크 없음 |
| 이미지 자리표시 | `picsum.photos/seed/{name}/{w}/{h}` | Unsplash URL 금지 |
| 뷰포트 | `min-h-[100dvh]` | `h-screen` 금지 |
| 출력 | 단일 HTML 파일 | 빌드 도구 없음 |

### Tailwind 커스텀 설정 (모든 페이지 상단)

```html
<script>
  tailwind.config = {
    theme: { extend: {
      fontFamily: { sans: ['Pretendard', 'system-ui', 'sans-serif'] },
      colors: {
        navy: '#1b2e6a', ink: '#0A2440', body: '#212121', sub: '#555555',
        accent: { DEFAULT: '#0169a9', 300: '#8ed0ff', 400: '#59b4ff' },
        band: '#F5F6F8', hair: '#E5E7EB', ok: '#137a52',
      },
    } },
  }
</script>
```

---

## 12. 파일 구조 · 헤더/푸터

### 12.1 페이지 구조 (전형)

```
<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- meta, title, canonical, og:*, JSON-LD -->
  <!-- Tailwind CDN + Pretendard + Iconify -->
  <!-- tailwind.config 스크립트 -->
  <link rel="stylesheet" href="css/common.css">
  <style>/* 페이지 로컬 스타일 */</style>
</head>
<body class="bg-white font-sans antialiased">
  <header>...GNB + 메가메뉴...</header>
  <div id="mobileMenu">...</div>

  <!-- Sub Hero + Breadcrumb -->
  <section class="relative bg-ink overflow-hidden">...</section>

  <!-- 콘텐츠 섹션 (여러 개) -->
  <section class="border-b border-hair">
    <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16 md:py-20">...</div>
  </section>

  <!-- CTA (선택) -->
  <section>...bg-ink...</section>

  <!-- Footer -->
  <footer class="bg-ink text-white/70">...</footer>

  <script src="js/common.js"></script>
</body>
</html>
```

### 12.2 공용 파일

| 파일 | 역할 |
|---|---|
| `css/common.css` | reveal 애니메이션 · 모바일 메뉴 · 스프링 유틸리티 |
| `js/common.js` | GNB 토글 · 스크롤 reveal · 헤더 스크롤 상태 |

### 12.3 헤더/푸터 복제

새 페이지는 기존 페이지(권장: `about.html`)의 `<header>`와 `<footer>`를 그대로 복제.
서브 폴더(`references/`, `blog/`)에선 상대 경로에 `../` 붙일 것.

---

## 부록: 컬러 코드 원본

- **공식 브랜드 컬러 (로고 자산)**: `#1b2e6a` (Navy) / RGB 27,46,106 / CMYK 75,57,0,58
- **웹 UI 딥네이비**: `#0A2440` (헤드라인·헤더 표준)
- **서브 컬러 · Accent**: `#0169a9` (링크·CTA·수치)

이 3개 색이 브랜드의 골격입니다. 그 외는 지원 팔레트.

---

_본문 v3.0 (2026-07-22) · §4.2 · §6.1 은 포털 기준으로 갱신 (2026-08-25)_
_최신 규격: `design/portal/`_
_Maintained by ONTOH Inc. (contact@ontoh.co.kr)_
