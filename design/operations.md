# ONTOH 디자인 시스템 운영 · 거버넌스

_담당자 · 신규 컴포넌트 기준 · 변경 내역 · 폐기 절차 · 리뷰 · 정기 점검._  
_토큰: [tokens.md](tokens.md) · 컴포넌트: [components.md](components.md) · 용어: [glossary.md](glossary.md) · 접근성: [a11y.md](a11y.md)_

**업데이트**: 2026-07-28 · 섹션 10

---

## 1. 담당자 (Ownership)

### 구조
| 역할 | 담당 | 책임 |
|---|---|---|
| **디자인 시스템 오너** | CEO 김태건 (contact@ontoh.co.kr) | 브랜드 방향 · 컬러/타이포 결정 · 신규 컴포넌트 승인 |
| **구현 · 문서화** | AI 협업 (Claude Code) | 실 구현 · 문서 최신화 · 정합성 감사 |
| **리뷰어** | CEO 김태건 | 배포 전 최종 승인 |

### 소통 채널
- 코드 · 문서 변경: Git commit + PR (필요 시)
- 브랜드 결정: 직접 대화 → CHECKLIST 진행 로그에 기록

### 규모에 맞는 운영
- 현재 팀 크기가 작음 → 별도 회의체 · 별도 도구 없음
- **단일 담당자 · 문서 우선 · AI 협업** 모델
- 향후 팀 확장 시 이 문서 갱신 (신규 역할 · 리뷰 프로세스 추가)

---

## 2. 신규 컴포넌트 추가 기준

### 추가 판단 체크리스트
새 컴포넌트를 만들기 전 반드시 확인:

- [ ] **재사용 가능성** — 최소 2개 페이지 이상에서 사용 예정인가?
- [ ] **기존 컴포넌트 조합으로 불가능** — Card + Tag + Kicker 조합으로 대체 불가능?
- [ ] **토큰 준수** — tokens.md의 색상 · 타이포 · 여백만 사용?
- [ ] **CLAUDE.md 규정 준수** — 이모지 X · 보라/네온 X · 직각 · 헤어라인?
- [ ] **접근성 확인** — Focus · 대비 · 키보드 · 44px+ 터치 영역?

### 프로세스
1. **필요성 논의** — CEO와 사용 상황 · 대안 검토
2. **명명** — [glossary.md](glossary.md) `.컴포넌트-이름` 규칙 (kebab-case · prefix 유지)
3. **components.md 항목 추가** — 목적/사용 상황/Property/Do/Don't/텍스트 규칙
4. **tokens.md 반영** — 신규 토큰 필요 시 논의 후 추가
5. **preview/components.html 추가** — 실물 확인용
6. **최소 1개 페이지에 실사용** — 문서만 두지 말 것
7. **CHECKLIST.md 진행 로그** — 신규 컴포넌트 추가 사실 기록

### 지양
- 문서에만 있는 유령 컴포넌트
- 한 페이지만을 위한 일회성 컴포넌트 (인라인 Tailwind로 해결)
- 3열 균등 카드 반복 → Bento · Zig-Zag 로 대체

---

## 3. 변경 내역 확인

### Primary Source · Git commit 히스토리

```bash
# 최근 커밋 확인
git log --oneline -20

# 특정 파일 변경 이력
git log --follow -- design/tokens.md

# 특정 클래스의 변경 이력
git log -S ".btn-primary" -- design/
```

### Secondary Source · CHECKLIST.md 진행 로그
각 섹션 완료 시점 · 주요 결정 사항 기록. Git commit이 "무엇이 바뀌었는지"를 알려주면 CHECKLIST가 "왜 · 무엇을 근거로 바뀌었는지"를 알려줌.

### 문서 하단 업데이트 날짜
각 design/*.md 파일 하단에 `**업데이트**: YYYY-MM-DD` 표기 · 마지막 수정 시점 명확히.

### 버전 표기
- **SKILL.md · README.md** 하단에 vX.Y 표기
- Minor 변경 (문서 · 예시): patch 없음 · 날짜만 갱신
- 컴포넌트/토큰 추가: minor 증가 (v3.1 → v3.2)
- 브랜드/체계 대변경: major 증가

### 변경 알림 (팀 확장 시)
- 현재는 CEO 단독 → 별도 알림 불필요
- 팀 확장 시: 주요 변경은 Slack/이메일 · 문서 링크 공유

---

## 4. 기존 컴포넌트 폐기 (Deprecation) 절차

### 판단 기준
- **6개월 이상 어느 페이지에서도 사용되지 않음**
- 대체 컴포넌트가 있음
- 브랜드/토큰 변경으로 정합성 깨짐

### 프로세스
1. **사용처 최종 확인**
   ```bash
   # 클래스 · 컴포넌트 이름 전 검색
   grep -r "class-name" --include="*.html" --include="*.md"
   ```
2. **`components.md`에서 항목 제거** → `deprecated` 섹션 하단 추가 (역사 보존)
3. **CSS 정의를 각 페이지에서 제거** (Python batch)
4. **관련 이미지/자산을 `archive/`로 이동** — 삭제 금지 (되돌릴 수 있어야 함)
5. **CHECKLIST.md 진행 로그** — "X 컴포넌트 폐기 · 대체: Y" 기록

### 실제 폐기 사례
- `tech.html` → 삭제 후 3카드를 `about.html`로 이동 (2026 초)
- `.dlink` → `.dropdown-link` 로 리네임 (섹션 1)
- `.corp-card` → `.card` 로 통일 (섹션 1)
- 이전 CTA 카피 "도입 상담 신청" → "무료 현장 진단" (섹션 4)

### 지양
- 그냥 파일 삭제만 (임팩트 미확인)
- 사용 중인 컴포넌트를 리팩토링 없이 폐기
- 아카이브 없는 삭제 → 되돌릴 수 없음

---

## 5. 디자이너 · 개발자 협업 리뷰

### 현재 구조 (Solo · AI 협업)
- **디자이너·개발자 = CEO 김태건 (동일 인물)** · AI 협업 (Claude)
- 리뷰 = **셀프 리뷰** + **AI cross-check**

### 셀프 리뷰 체크리스트
배포 전 확인 (모든 변경):
- [ ] Preview 파일에서 실물 확인 (`design/preview/index.html`)
- [ ] 3-4개 페이지에서 크로스 브라우징 (Chrome · Safari · 모바일)
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Git commit 메시지에 "무엇을 · 왜" 명시

### AI Cross-check 체크리스트
Claude에게 물어볼 것:
- "이 변경이 CLAUDE.md 규정을 준수하나?"
- "components.md · tokens.md 와 일치하나?"
- "다른 페이지의 유사한 컴포넌트와 정합성 있나?"

### 팀 확장 시 (Future)
- 디자이너 합류 시 → Figma 파일 · 디자인 리뷰 미팅 도입
- 개발자 합류 시 → PR 리뷰 · 코드 오너십 도입
- 지금은 리뷰 프로세스보다 **문서 우선**으로 대응

---

## 6. 정기 사용 현황 점검

### 분기별 (Quarterly · 90일)
매 분기 초에 다음 실행:

1. **CHECKLIST.md 10섹션 순회** — 각 항목 재확인 · 여전히 통과하나?
2. **컴포넌트 사용 현황 감사**
   ```bash
   # 각 컴포넌트 사용 페이지 수 파악
   for cls in btn card tag kicker dropdown-link; do
     n=$(grep -r "class=[\"'][^\"']*\.\?$cls" --include="*.html" -l | wc -l)
     echo "$cls: $n files"
   done
   ```
3. **미사용 컴포넌트 후보 리스트업** → 폐기 검토 (§4 프로세스)
4. **신규 페이지 · 브랜드 요구 반영** → tokens/components 갱신 필요성 판단

### 반기별 (Semi-annually · 180일)
1. **Lighthouse 전 페이지 실측** → Accessibility · Performance · SEO · Best Practices 점수 기록
2. **경쟁사 · 벤치마크 재검토** — 시재건설 · Q Place · 한솔홈데코 등 톤 대조
3. **CLAUDE.md · SKILL.md · README.md 요약** 최신 상태 확인

### 자동화 후보 (Future)
- [ ] GitHub Actions로 Lighthouse CI 도입 (PR마다 자동 점수)
- [ ] `unused-css` 스크립트 (사용 안 하는 CSS 클래스 자동 감지)
- [ ] Broken link checker (내부 링크 · 이미지 경로 검증)

---

## 7. 문서 vs 실제 코드 · 정합성 유지

### 원칙
- **코드가 진실** — 문서는 코드를 반영하는 스냅샷
- 코드 변경 시 관련 문서 동시 갱신 (같은 커밋)
- 문서만 갱신하고 코드 안 바뀌면 = 유령 문서 (금지)

### 정합성 체크 (반기별)
```bash
# 1. components.md 에 있는 클래스가 실제 CSS에 있나?
grep -oE '\.[\w-]+' design/components.md | sort -u > /tmp/docs.txt
grep -horE '\.[\w-]+\s*{' *.html | sort -u > /tmp/code.txt
comm -23 /tmp/docs.txt /tmp/code.txt  # 문서에만 있는 클래스

# 2. 실제 페이지에서 쓰이는 클래스가 tokens.md 색상만 쓰나?
# (수동 검토 필요)
```

### 신규 리팩토링 후 필수 확인
- CHECKLIST.md 진행 로그 갱신
- components.md · tokens.md 반영 확인
- SKILL.md 요약 반영 확인

---

## 8. 현황 (2026-07-28 기준)

| 항목 | 상태 |
|---|---|
| 1. 담당자 정의 | ✅ CEO 김태건 · AI 협업 |
| 2. 신규 컴포넌트 기준 | ✅ 5개 체크리스트 · 7단계 프로세스 |
| 3. 변경 내역 확인 방법 | ✅ Git + CHECKLIST + 문서 날짜 |
| 4. 폐기 절차 | ✅ 5단계 프로세스 · archive/ 규정 |
| 5. 리뷰 프로세스 | ✅ 셀프 리뷰 + AI cross-check |
| 6. 정기 점검 주기 | ✅ 분기 · 반기 · 자동화 후보 |
| 7. 문서-코드 정합성 | ✅ 원칙 · 체크 방법 · 신규 후 필수 |

---

## 진행 로그

### 2026-07-28
- 초안 · 섹션 10 완료 시점 운영·거버넌스 문서 확정
- 담당자 · 신규 컴포넌트 기준 · 변경 내역 · 폐기 · 리뷰 · 정기 점검 규정 정리
- 현재 규모 (Solo + AI 협업)에 맞는 운영 모델 · 팀 확장 시 갱신 지점 명시
