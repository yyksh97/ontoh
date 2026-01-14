# ONTOH 회사 소개 웹사이트

![ONTOH](https://img.shields.io/badge/ONTOH-Official%20Website-1b2e6a?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-success?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)

> **가장 현실적인 기술로, 가장 확실한 안전을 만듭니다**

ONTOH의 공식 회사 소개 웹사이트입니다. 산업안전 분야의 혁신적인 솔루션인 ONTOH Vision과 ONTOH Health를 소개합니다.

---

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [배포 방법](#-배포-방법)
- [로컬 개발](#-로컬-개발)
- [유지보수 가이드](#-유지보수-가이드)
- [브랜드 가이드라인](#-브랜드-가이드라인)
- [문의](#-문의)

---

## 🌟 프로젝트 소개

ONTOH는 **사각지대 없는 산업재해 CCTV 관제 & 보건관리 솔루션**을 제공하는 기업입니다.

### 핵심 가치
- **현장을 보고(Vision)**: AI 기반 CCTV 자동 제어 및 위험 상황 판단
- **사람을 살피다(Health)**: 건강검진 데이터 기반 선제적 작업자 보건관리

### 제공 솔루션
1. **ONTOH Vision** - 지능형 CCTV 관제 솔루션
   - AI 기반 CCTV 자동 제어
   - RAG-LMM 기반 복합 상황 판단
   - 현장 맞춤형 안전 교육 자료 생성

2. **ONTOH Health** - 작업자 보건 관리 솔루션
   - 건강검진 데이터 자동 취합
   - 고위험군 스크리닝
   - 개인·현장 맞춤형 건강리포트 생성

---

## ✨ 주요 기능

### 웹사이트 기능
- ✅ **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원
- ✅ **모던한 UI/UX**: 미니멀 디자인과 부드러운 애니메이션
- ✅ **SEO 최적화**: 메타 태그 및 구조화된 데이터
- ✅ **빠른 로딩 속도**: 최적화된 정적 웹사이트
- ✅ **접근성**: ARIA 레이블 및 웹 접근성 준수

### 구현된 섹션
1. **Hero Section**: 브랜드 메시지 및 CTA
2. **Solutions Overview**: 솔루션 소개 카드
3. **ONTOH Vision**: 제품 상세 페이지
4. **ONTOH Health**: 제품 상세 페이지
5. **Why Section**: 문제 인식 및 필요성
6. **Credibility**: R&D 기술력 및 실적
7. **Contact**: 문의 정보 및 CTA
8. **Footer**: 사이트맵 및 회사 정보

---

## 🛠 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, CSS Variables, Animations
- **JavaScript (ES6+)**: Vanilla JS (프레임워크 없이 경량화)

### 외부 라이브러리
- **Google Fonts**: Noto Sans KR, Inter
- **Font Awesome 6.4.0**: 아이콘

### 호스팅
- **GitHub Pages**: 무료 정적 웹사이트 호스팅
- **Custom Domain**: ontoh.co.kr
- **HTTPS**: 자동 SSL 인증서

---

## 📁 프로젝트 구조

```
ontoh-website/
├── index.html              # 메인 HTML 파일
├── css/
│   └── style.css          # 스타일시트
├── js/
│   └── main.js            # JavaScript 로직
├── CNAME                  # 커스텀 도메인 설정
├── README.md              # 프로젝트 문서 (현재 파일)
├── DEPLOYMENT.md          # 배포 가이드
└── .gitignore            # Git 무시 파일 (선택사항)
```

---

## 🚀 배포 방법

### 빠른 배포 (3단계)

1. **GitHub Repository 생성**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ONTOH website"
   git remote add origin https://github.com/your-username/ontoh-website.git
   git push -u origin main
   ```

2. **GitHub Pages 활성화**
   - Repository → Settings → Pages
   - Branch: `main`, Folder: `/ (root)`
   - Save

3. **DNS 설정** (도메인 등록업체)
   - A 레코드 4개 추가 (GitHub Pages IP)
   - 자세한 내용은 [DEPLOYMENT.md](DEPLOYMENT.md) 참조

### 상세 가이드
배포 전체 과정은 **[DEPLOYMENT.md](DEPLOYMENT.md)** 파일을 참조하세요.

---

## 💻 로컬 개발

### 요구사항
- 웹 브라우저 (Chrome, Firefox, Safari, Edge 등)
- 로컬 서버 (선택사항, 개발 편의성)

### 로컬 서버 실행

#### 방법 1: Python (권장)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
→ http://localhost:8000 접속

#### 방법 2: Node.js (http-server)
```bash
# http-server 설치
npm install -g http-server

# 서버 실행
http-server -p 8000
```
→ http://localhost:8000 접속

#### 방법 3: VS Code Live Server
1. VS Code 확장 프로그램 "Live Server" 설치
2. `index.html` 파일에서 우클릭 → "Open with Live Server"

---

## 🔧 유지보수 가이드

### 콘텐츠 수정

#### 1. 텍스트 수정
- `index.html` 파일에서 해당 섹션의 텍스트 수정
- 섹션별 ID로 쉽게 찾을 수 있음 (`#hero`, `#vision`, `#health` 등)

#### 2. 스타일 수정
- `css/style.css` 파일 수정
- CSS Variables로 브랜드 컬러 등을 쉽게 변경 가능:
  ```css
  :root {
      --primary-color: #1b2e6a;
      --accent-vision: #4a90e2;
      --accent-health: #e74c3c;
  }
  ```

#### 3. 기능 추가/수정
- `js/main.js` 파일 수정
- 모듈화된 구조로 쉽게 확장 가능

### 변경사항 배포

```bash
# 변경사항 확인
git status

# 변경된 파일 추가
git add .

# 커밋 (의미있는 메시지 작성)
git commit -m "Update: 설명"

# GitHub에 푸시 (자동으로 배포됨)
git push origin main
```

배포는 5~10분 내 자동으로 완료됩니다.

### 주요 수정 시나리오

#### 연락처 변경
```html
<!-- index.html 파일에서 -->
<a href="mailto:new-email@ontoh.co.kr">new-email@ontoh.co.kr</a>
```

#### 주소 변경
```html
<!-- index.html 파일에서 -->
<p>새 주소 입력<br>(우편번호)</p>
```

#### 통계 수치 업데이트
```html
<!-- Credibility Section -->
<div class="stat-number">10개소</div> <!-- 5개소 → 10개소 -->
```

---

## 🎨 브랜드 가이드라인

### 컬러 팔레트

| 컬러명 | HEX | 용도 |
|--------|-----|------|
| **Primary Navy** | `#1b2e6a` | 로고, CTA 버튼, 주요 강조 |
| **Primary Dark** | `#0f1a3d` | Hover 상태, 그라데이션 |
| **Accent Vision** | `#4a90e2` | ONTOH Vision 관련 |
| **Accent Health** | `#e74c3c` | ONTOH Health 관련 |
| **Text Dark** | `#1a1a1a` | 본문 텍스트 |
| **Text Light** | `#7a7a7a` | 보조 텍스트 |

### 타이포그래피
- **한글**: Noto Sans KR (300, 400, 500, 600, 700, 900)
- **영문**: Inter (400, 500, 600, 700)

### 로고
- **워드마크**: ONTOH (영문) + 온토 (한글)
- **폰트 웨이트**: 900 (Black)
- **최소 여백**: 로고 높이의 0.5배

---

## 📊 현재 기능 상태

### ✅ 완료된 기능
- [x] 반응형 웹 디자인 (모바일/태블릿/데스크톱)
- [x] 네비게이션 (스무스 스크롤, 모바일 메뉴)
- [x] Hero 섹션 (애니메이션)
- [x] Solutions 개요
- [x] ONTOH Vision 상세 페이지
- [x] ONTOH Health 상세 페이지
- [x] Why Section (문제 인식)
- [x] Credibility (기술력 소개)
- [x] Contact 섹션
- [x] Footer
- [x] Scroll to Top 버튼
- [x] SEO 메타 태그
- [x] GitHub Pages 배포 준비

### 🔜 추가 권장 기능 (선택사항)
- [ ] 실제 제품 이미지/스크린샷 추가
- [ ] 고객 사례 섹션
- [ ] 블로그/뉴스 섹션
- [ ] 채용 정보 페이지
- [ ] 다국어 지원 (영문)
- [ ] Google Analytics 연동
- [ ] 챗봇 또는 문의 폼 추가

---

## 📈 SEO 최적화

현재 적용된 SEO 요소:
- ✅ 시맨틱 HTML5 태그
- ✅ Meta Description
- ✅ Open Graph 태그 (소셜 미디어)
- ✅ 구조화된 섹션 ID
- ✅ 이미지 Alt 텍스트 (이미지 추가 시)
- ✅ 모바일 최적화
- ✅ HTTPS

### 추가 SEO 작업 (배포 후)
1. Google Search Console에 사이트 등록
2. `sitemap.xml` 생성 및 제출
3. `robots.txt` 파일 생성
4. 구조화된 데이터 마크업 (JSON-LD)

---

## 🐛 문제 해결

### CSS/JS 파일이 로드되지 않음
- 파일 경로 확인 (`css/style.css`, `js/main.js`)
- 브라우저 캐시 삭제 (Ctrl+Shift+Delete)

### 변경사항이 반영되지 않음
- GitHub Actions 빌드 상황 확인 (Repository → Actions)
- 5~10분 대기 후 재시도
- 브라우저 시크릿 모드에서 접속

### 모바일에서 레이아웃 깨짐
- 브라우저 개발자 도구 (F12) → 모바일 시뮬레이터로 확인
- CSS 미디어 쿼리 확인

---

## 📞 문의

### 프로젝트 관련 문의
- **이메일**: ktg@ontoh.co.kr
- **웹사이트**: ontoh.co.kr

### 회사 정보
- **회사명**: ONTOH (온토)
- **주소**: 서울시 마포구 양화로 124, 504호 (04038)

---

## 📄 라이선스

이 프로젝트는 ONTOH의 내부 자산이며, 무단 복제 및 배포를 금지합니다.

**Copyright © 2025 ONTOH. All rights reserved.**

---

## 🙏 크레딧

### 사용된 오픈소스
- [Google Fonts](https://fonts.google.com/)
- [Font Awesome](https://fontawesome.com/)

### 개발 정보
- **개발 기간**: 2025년 1월
- **배포 플랫폼**: GitHub Pages
- **도메인**: ontoh.co.kr

---

## 📝 업데이트 로그

### v1.0.0 (2025-01-14)
- ✅ 초기 버전 배포
- ✅ ONTOH Vision, ONTOH Health 소개 페이지
- ✅ 반응형 디자인
- ✅ GitHub Pages 배포

---

**웹사이트 개발 및 배포 완료! 🎉**

추가 문의사항이 있으시면 ktg@ontoh.co.kr로 연락주세요.