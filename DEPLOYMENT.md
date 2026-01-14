# GitHub Pages 배포 및 커스텀 도메인 설정 가이드

## 📋 목차
1. [GitHub Repository 생성 및 코드 업로드](#1-github-repository-생성-및-코드-업로드)
2. [GitHub Pages 활성화](#2-github-pages-활성화)
3. [커스텀 도메인 (ontoh.co.kr) 연결](#3-커스텀-도메인-ontohcokr-연결)
4. [DNS 설정](#4-dns-설정)
5. [HTTPS 활성화](#5-https-활성화)
6. [배포 확인](#6-배포-확인)
7. [문제 해결](#7-문제-해결)

---

## 1. GitHub Repository 생성 및 코드 업로드

### 1-1. GitHub Repository 생성
1. GitHub (https://github.com)에 로그인
2. 우측 상단 `+` 버튼 클릭 → `New repository` 선택
3. Repository 설정:
   - **Repository name**: `ontoh-website` (또는 원하는 이름)
   - **Description**: "ONTOH 회사 소개 웹사이트"
   - **Public** 선택 (GitHub Pages는 Public repository에서 무료)
   - **README 추가 체크 해제** (이미 README.md 파일이 있음)
4. `Create repository` 클릭

### 1-2. 로컬에서 코드 업로드

```bash
# 프로젝트 폴더로 이동
cd your-project-folder

# Git 초기화 (처음 한 번만)
git init

# 원격 저장소 연결
git remote add origin https://github.com/your-username/ontoh-website.git

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: ONTOH website"

# GitHub에 푸시 (main 브랜치)
git branch -M main
git push -u origin main
```

> **참고**: `your-username`을 실제 GitHub 사용자명으로 변경하세요.

---

## 2. GitHub Pages 활성화

### 2-1. GitHub Pages 설정
1. GitHub repository 페이지로 이동
2. 상단 메뉴에서 `Settings` 클릭
3. 왼쪽 사이드바에서 `Pages` 클릭
4. **Source** 섹션에서:
   - **Branch**: `main` 선택
   - **Folder**: `/ (root)` 선택
5. `Save` 버튼 클릭

### 2-2. 배포 확인
- 몇 분 후 자동으로 배포됩니다
- 배포 완료 시 `https://your-username.github.io/ontoh-website/` URL이 생성됩니다
- 페이지 상단에 "Your site is live at..." 메시지가 나타납니다

---

## 3. 커스텀 도메인 (ontoh.co.kr) 연결

### 3-1. CNAME 파일 생성

프로젝트 루트에 `CNAME` 파일을 생성하고 다음 내용을 입력:

```
ontoh.co.kr
```

**중요**: 
- 파일명은 정확히 `CNAME` (대문자, 확장자 없음)
- 내용은 한 줄로 도메인만 입력

### 3-2. GitHub에 CNAME 파일 업로드

```bash
# CNAME 파일 추가
git add CNAME

# 커밋
git commit -m "Add CNAME for custom domain"

# 푸시
git push origin main
```

### 3-3. GitHub Pages에서 커스텀 도메인 설정
1. GitHub repository → `Settings` → `Pages`
2. **Custom domain** 섹션에 `ontoh.co.kr` 입력
3. `Save` 클릭
4. "DNS check in progress" 메시지 확인

---

## 4. DNS 설정

도메인 등록업체(가비아, 후이즈 등)에서 DNS 레코드를 설정해야 합니다.

### 4-1. Apex Domain (ontoh.co.kr) 설정

**A 레코드 4개 추가**:
```
Type: A
Name: @ (또는 비워둠)
Value: 185.199.108.153

Type: A
Name: @ (또는 비워둠)
Value: 185.199.109.153

Type: A
Name: @ (또는 비워둠)
Value: 185.199.110.153

Type: A
Name: @ (또는 비워둠)
Value: 185.199.111.153
```

### 4-2. www 서브도메인 설정 (선택사항)

**CNAME 레코드 추가**:
```
Type: CNAME
Name: www
Value: your-username.github.io
```

### 4-3. DNS 설정 예시 (가비아 기준)

1. 가비아 로그인 → My가비아 → 서비스 관리
2. 도메인 관리 → DNS 정보 → 설정 버튼 클릭
3. 호스트 관리 → 레코드 추가:

| 레코드 타입 | 호스트명 | 값/위치 | TTL |
|------------|---------|---------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| CNAME | www | your-username.github.io | 3600 |

4. 저장 후 24~48시간 내 DNS 전파 완료

### 4-4. DNS 전파 확인

```bash
# DNS 조회 명령어 (터미널/명령 프롬프트)
nslookup ontoh.co.kr

# 또는 온라인 도구 사용
# https://www.whatsmydns.net/
```

---

## 5. HTTPS 활성화

### 5-1. GitHub Pages HTTPS 설정
1. DNS 전파 완료 후 (24~48시간)
2. GitHub repository → `Settings` → `Pages`
3. **Enforce HTTPS** 체크박스 활성화
4. 체크박스 활성화되면 자동으로 SSL 인증서 발급 (무료)

### 5-2. HTTPS 강제 리다이렉트 확인
- `http://ontoh.co.kr` 접속 시 자동으로 `https://ontoh.co.kr`로 리다이렉트
- 브라우저 주소창에 자물쇠 아이콘 확인

---

## 6. 배포 확인

### 6-1. 체크리스트
- [ ] GitHub Pages 배포 완료 (`https://your-username.github.io/ontoh-website/` 접속 가능)
- [ ] CNAME 파일 생성 및 커밋
- [ ] DNS A 레코드 4개 설정
- [ ] DNS 전파 완료 (`nslookup ontoh.co.kr` 결과 확인)
- [ ] `http://ontoh.co.kr` 접속 가능
- [ ] HTTPS 활성화 (`https://ontoh.co.kr` 접속 가능)
- [ ] 모든 섹션 정상 작동 확인

### 6-2. 테스트 URL
- GitHub Pages 기본 URL: `https://your-username.github.io/ontoh-website/`
- 커스텀 도메인: `https://ontoh.co.kr`

---

## 7. 문제 해결

### 문제 1: "DNS check failed" 오류
**원인**: DNS 레코드 설정이 잘못되었거나 전파가 완료되지 않음

**해결**:
1. DNS A 레코드가 정확히 4개 설정되었는지 확인
2. TTL 값을 3600으로 설정
3. 24~48시간 대기 후 재시도
4. `nslookup ontoh.co.kr` 명령어로 DNS 확인

### 문제 2: 404 Not Found 오류
**원인**: 파일 경로 문제 또는 GitHub Pages 설정 오류

**해결**:
1. GitHub repository → `Settings` → `Pages`에서 Branch가 `main`, Folder가 `/ (root)`인지 확인
2. `index.html` 파일이 루트 디렉토리에 있는지 확인
3. 대소문자 구분 확인 (파일명, 폴더명)

### 문제 3: CSS/JS 파일이 로드되지 않음
**원인**: 상대 경로 문제

**해결**:
1. `index.html`에서 CSS/JS 파일 경로 확인:
   ```html
   <!-- 올바른 경로 -->
   <link rel="stylesheet" href="css/style.css">
   <script src="js/main.js"></script>
   ```
2. 파일이 `css/`, `js/` 폴더에 정확히 위치하는지 확인

### 문제 4: HTTPS 체크박스가 비활성화됨
**원인**: DNS 전파가 완료되지 않았거나 CNAME 파일 문제

**해결**:
1. DNS 전파 완료 확인 (24~48시간 대기)
2. `CNAME` 파일 내용이 `ontoh.co.kr`만 있는지 확인 (빈 줄 없이)
3. GitHub Pages → Custom domain 필드에 도메인이 정확히 입력되었는지 확인
4. 24시간 후 재시도

### 문제 5: 변경사항이 반영되지 않음
**원인**: 브라우저 캐시 또는 GitHub Pages 빌드 지연

**해결**:
1. 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
2. 시크릿 모드에서 접속
3. GitHub repository → `Actions` 탭에서 배포 진행 상황 확인
4. 5~10분 대기 후 재시도

---

## 📞 추가 지원

배포 과정에서 문제가 발생하면:
- GitHub Pages 공식 문서: https://docs.github.com/en/pages
- GitHub 커뮤니티: https://github.community/
- ONTOH 담당자: ktg@ontoh.co.kr

---

## ✅ 배포 완료 후

### 유지보수
1. 콘텐츠 수정 시 로컬에서 파일 수정
2. Git으로 변경사항 커밋 및 푸시:
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```
3. 자동으로 GitHub Pages에 반영 (5~10분 소요)

### 성능 최적화
- Google Search Console에 사이트맵 제출
- Google Analytics 연동 (원하는 경우)
- 이미지 최적화 (WebP 포맷 사용)
- CDN 활용 (Cloudflare 등)

### 백업
- GitHub repository가 자동으로 모든 버전 관리
- 정기적으로 로컬 백업 권장

---

**배포 성공을 기원합니다! 🚀**