# ONTOH 웹사이트 빠른 시작 가이드

## 🚀 5분 안에 배포하기

### 1단계: GitHub에 코드 업로드

```bash
# 프로젝트 폴더로 이동
cd ontoh-website

# Git 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: ONTOH website"

# GitHub repository 생성 후 연결 (your-username을 실제 사용자명으로 변경)
git remote add origin https://github.com/your-username/ontoh-website.git

# 푸시
git branch -M main
git push -u origin main
```

### 2단계: GitHub Pages 활성화

1. GitHub repository 페이지 접속
2. **Settings** 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Source**에서:
   - Branch: `main` 선택
   - Folder: `/ (root)` 선택
5. **Save** 클릭

✅ 5분 후 `https://your-username.github.io/ontoh-website/` 에서 접속 가능!

### 3단계: 커스텀 도메인 연결 (ontoh.co.kr)

#### 3-1. GitHub Pages에서 설정
1. Settings → Pages → Custom domain
2. `ontoh.co.kr` 입력
3. Save

#### 3-2. DNS 설정 (도메인 등록업체)

**A 레코드 4개 추가**:
```
Type: A, Name: @, Value: 185.199.108.153
Type: A, Name: @, Value: 185.199.109.153
Type: A, Name: @, Value: 185.199.110.153
Type: A, Name: @, Value: 185.199.111.153
```

**CNAME 레코드 추가** (www 서브도메인):
```
Type: CNAME, Name: www, Value: your-username.github.io
```

#### 3-3. HTTPS 활성화
- DNS 전파 완료 후 (24~48시간)
- Settings → Pages → **Enforce HTTPS** 체크

---

## 📝 콘텐츠 수정 방법

### 텍스트 수정
1. `index.html` 파일 열기
2. 수정할 텍스트 찾기
3. 저장 후:
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```
4. 5~10분 후 자동 반영

### 색상 변경
1. `css/style.css` 파일 열기
2. 최상단 `:root` 섹션에서 변경:
   ```css
   --primary-color: #1b2e6a;  /* 브랜드 메인 색상 */
   ```

### 연락처 변경
```html
<!-- index.html에서 찾기: -->
<a href="mailto:contact@ontoh.co.kr">contact@ontoh.co.kr</a>

<!-- 이메일 주소 변경 -->
```

---

## 🔧 로컬에서 테스트

```bash
# Python으로 로컬 서버 실행
python -m http.server 8000

# 브라우저에서 접속
# http://localhost:8000
```

---

## 📞 도움이 필요하신가요?

- **상세 배포 가이드**: [DEPLOYMENT.md](DEPLOYMENT.md) 참조
- **프로젝트 전체 문서**: [README.md](README.md) 참조
- **문의**: contact@ontoh.co.kr

---

**배포 성공을 기원합니다! 🎉**