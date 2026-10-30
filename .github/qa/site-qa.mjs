#!/usr/bin/env node
/**
 * ONTOH 홈페이지 품질 검사 (PR 자동 검사용)
 *
 * 저장소 루트의 모든 *.html 을 실제 브라우저(Chromium)로 열어 아래를 검사한다.
 *   1. 접근성: axe-core 로 WCAG 2.0/2.1/2.2 A·AA 규칙 검사 → critical·serious 위반이면 실패
 *   2. 모바일 가로 넘침: 390px 화면에서 페이지가 옆으로 스크롤되면 실패
 *   3. 키보드 포커스: Tab 으로 이동할 때 포커스가 화면에 보이고 테두리가 표시되는지 → 아니면 실패
 *
 * 일부러 허용한 항목은 allowlist.json 에 이유와 함께 적는다.
 * 대비 판정·검사 방식은 plugin87/ux-ui-agent-skills(MIT)의 a11y-audit·design-qa 기준을 따른다.
 *
 * 사용: node .github/qa/site-qa.mjs <baseUrl>   예) node .github/qa/site-qa.mjs http://127.0.0.1:8080/
 */
import { chromium } from 'playwright';
import { readFileSync, readdirSync, appendFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const base = (process.argv[2] || 'http://127.0.0.1:8080/').replace(/\/?$/, '/');
const require = createRequire(import.meta.url);
const axeSrc = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const allow = JSON.parse(readFileSync(join(here, 'allowlist.json'), 'utf8'));
const pages = readdirSync(root).filter(f => f.endsWith('.html')).sort();
const TAB_STEPS = 40;

const allowed = (page, rule, target) =>
  allow.axe.some(a => a.rule === rule && (a.pages === '*' || a.pages.includes(page)) && target.includes(a.selectorContains));

// 분석 동의 배너가 화면을 가리지 않게 '거부' 상태로 시작
const denyConsent = () => {
  try { localStorage.setItem('ontoh-analytics-consent-v1', JSON.stringify({ choice: 'denied', timestamp: Date.now() })); } catch (e) {}
};

// 로컬에서는 QA_CHANNEL=chrome 으로 설치된 Chrome 사용 가능 (CI 는 내려받은 Chromium)
const browser = await chromium.launch(process.env.QA_CHANNEL ? { channel: process.env.QA_CHANNEL } : {});
const failures = [];
const fail = (page, kind, msg) => failures.push({ page, kind, msg });

for (const page of pages) {
  // ---------- 데스크톱: axe + 키보드 ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(denyConsent);
    const p = await ctx.newPage();
    await p.goto(base + page, { waitUntil: 'networkidle', timeout: 60000 });
    await p.addStyleTag({ content: '*{transition:none!important;animation:none!important}' });
    // 스크롤 등장(reveal) 효과로 숨어 있는 요소를 최종 모습으로 맞춘 뒤 검사
    await p.evaluate(() => {
      document.querySelectorAll('.reveal,[class*="stagger"],[data-hero-kicker],[data-hero-title],[data-hero-subtitle]')
        .forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; el.style.visibility = 'visible'; });
    });

    await p.addScriptTag({ content: axeSrc });
    const violations = await p.evaluate(async () => (await window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
      resultTypes: ['violations'],
    })).violations);
    for (const v of violations) {
      if (!['critical', 'serious'].includes(v.impact)) continue;
      for (const n of v.nodes) {
        const target = n.target.join(' ');
        if (allowed(page, v.id, target)) continue;
        fail(page, `접근성 ${v.id}`, `${v.help} :: ${target} :: ${(n.failureSummary || '').split('\n').slice(1, 2).join('').trim()}`);
      }
    }

    await p.evaluate(() => { window.scrollTo(0, 0); document.activeElement && document.activeElement.blur(); });
    for (let i = 0; i < TAB_STEPS; i++) {
      await p.keyboard.press('Tab');
      await p.waitForTimeout(60); // 포커스 이벤트 처리(지도 iframe 표시 등) 대기
      const r = await p.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const cs = getComputedStyle(el), b = el.getBoundingClientRect();
        // iframe(지도 등)은 포커스가 내부 문서로 들어가므로 감싼 요소의 :focus-within 표시로 판정
        const ringOf = s => (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none';
        const frameRing = el.tagName === 'IFRAME' && el.parentElement && ringOf(getComputedStyle(el.parentElement));
        return {
          label: (el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30),
          ring: ringOf(cs) || frameRing,
          visible: b.width > 0 && b.height > 0 && cs.visibility !== 'hidden' && +cs.opacity > 0,
        };
      });
      if (!r) continue;
      if (!r.visible) fail(page, '키보드 포커스', `Tab ${i + 1}번째 "${r.label}" 이(가) 화면에 보이지 않음`);
      else if (!r.ring) fail(page, '키보드 포커스', `Tab ${i + 1}번째 "${r.label}" 에 포커스 표시가 없음`);
    }
    await ctx.close();
  }

  // ---------- 모바일 390px: 가로 넘침 ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    await ctx.addInitScript(denyConsent);
    const p = await ctx.newPage();
    await p.goto(base + page, { waitUntil: 'networkidle', timeout: 60000 });
    const o = await p.evaluate(() => {
      const W = document.documentElement.clientWidth, sw = document.documentElement.scrollWidth;
      if (sw <= W + 1) return null;
      const culprits = [];
      for (const el of document.querySelectorAll('main *, footer *')) {
        const b = el.getBoundingClientRect();
        if (b.width && b.right > W + 1 && !el.closest('.m-swipe,[data-swipe],.overflow-x-auto,.overflow-hidden,dialog,.mobile-menu'))
          culprits.push(el.tagName.toLowerCase() + '.' + String(el.className).split(' ').slice(0, 3).join('.'));
      }
      return { sw, W, culprits: culprits.slice(0, 3) };
    });
    if (o) fail(page, '모바일 가로 넘침', `390px 화면에서 폭 ${o.sw}px (원인 후보: ${o.culprits.join(', ') || '확인 필요'})`);
    await ctx.close();
  }
  console.log(`검사 완료: ${page}`);
}
await browser.close();

// ---------- 결과 ----------
const lines = [];
if (failures.length) {
  lines.push(`## 홈페이지 품질 검사: 실패 ${failures.length}건`, '', '| 페이지 | 항목 | 내용 |', '|---|---|---|');
  for (const f of failures) lines.push(`| ${f.page} | ${f.kind} | ${f.msg.replace(/\|/g, '\\|')} |`);
  lines.push('', '의도한 예외라면 `.github/qa/allowlist.json` 에 이유와 함께 추가하세요.');
} else {
  lines.push(`## 홈페이지 품질 검사: 통과`, '', `${pages.length}개 페이지 · 접근성(axe WCAG 2.2 AA) · 모바일 가로 넘침 · 키보드 포커스`);
}
const out = lines.join('\n');
console.log('\n' + out);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, out + '\n');
process.exit(failures.length ? 1 : 0);
