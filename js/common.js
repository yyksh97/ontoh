/* ==================== ONTOH Common Scripts ==================== */

// ==================== GSAP · 전역 초기화 (사이트 전체 공통) ====================
// GSAP CDN이 로드되어 있으면 CustomEase 등록 · 기본 easing 설정
if (typeof gsap !== 'undefined') {
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
  if (typeof CustomEase !== 'undefined') {
    CustomEase.create('ontoh', '0.16, 1, 0.3, 1'); // ONTOH 시그니처 easing (cubic-bezier와 동일)
    gsap.defaults({ ease: 'ontoh', duration: 0.9 });
  }
}

document.addEventListener('DOMContentLoaded', function() {

  // ==================== Scroll Reveal (GSAP ScrollTrigger · fallback IntersectionObserver) ====================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // GSAP 방식 · 진입/역방향 시 자연스러운 재생
    document.querySelectorAll('.reveal').forEach(function(el) {
      gsap.fromTo(el,
        { y: 32, opacity: 0, filter: 'blur(4px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)',
          duration: 0.9, ease: 'ontoh',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          onStart: function() { el.classList.add('visible'); },
        }
      );
    });
  } else {
    // Fallback · GSAP 미로드 시 기존 IntersectionObserver
    const revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el) {
      revealObserver.observe(el);
    });
  }

  // ==================== Hero 시퀀스 인트로 + Ken Burns 배경 (data-hero-* 자동 매칭) ====================
  // 모든 페이지에 자동 적용 · data-hero-kicker/title/subtitle 있으면 순차 등장 · data-hero-kb 있으면 배경 Ken Burns
  if (typeof gsap !== 'undefined') {
    var prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduce) {
      // Hero 시퀀스 인트로
      var heroEls = [
        document.querySelector('[data-hero-kicker]'),
        document.querySelector('[data-hero-title]'),
        document.querySelector('[data-hero-subtitle]'),
      ].filter(Boolean);
      if (heroEls.length) {
        gsap.set(heroEls, { y: 24, opacity: 0 });
        // 첫 화면 내용이 늦게 보이지 않도록 짧게 (전체 약 0.9초)
        var heroTl = gsap.timeline();
        heroEls.forEach(function(el, i) {
          heroTl.to(el, { y: 0, opacity: 1, duration: 0.5, ease: 'ontoh' }, i === 0 ? 0 : '-=0.3');
        });
      }
      // Ken Burns Hero 배경
      var heroKb = document.querySelector('[data-hero-kb]');
      if (heroKb) {
        gsap.set(heroKb, { scale: 1.05, x: 0, y: 0 });
        gsap.to(heroKb, {
          scale: 1.22, x: -30, y: -20,
          duration: 12, ease: 'none', repeat: -1, yoyo: true,
        });
      }
    }
  } else {
    // Fallback · GSAP 미로드 시 opacity 원복
    document.querySelectorAll('[data-hero-kicker], [data-hero-title], [data-hero-subtitle]').forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  // ==================== Nav: 투명 → 글래스 전환 ====================
  const nav = document.getElementById('mainNav');
  if (nav) {
    function updateNav() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollY > 80) {
        nav.classList.remove('nav-transparent');
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
        nav.classList.add('nav-transparent');
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  // ==================== Mobile Menu ====================
  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (menuClose) {
    menuClose.addEventListener('click', function() {
      closeMobileMenu();
    });
  }

  // 모바일 메뉴 링크 클릭 시 자동 닫기
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        closeMobileMenu();
      });
    });
  }

  // Esc 로 모바일 메뉴 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) closeMobileMenu();
  });

  // ==================== 모바일 탭 전환 (data-mtabs) ====================
  document.querySelectorAll('[data-mtabs]').forEach(function(box) {
    var tabs = box.querySelectorAll('[data-mtab]');
    var panels = box.querySelectorAll('[data-mpanel]');
    if (!tabs.length || !panels.length) return;
    var keys = Array.prototype.map.call(tabs, function(t) { return t.getAttribute('data-mtab'); });
    function show(key) {
      tabs.forEach(function(t) { t.setAttribute('aria-selected', t.getAttribute('data-mtab') === key ? 'true' : 'false'); });
      panels.forEach(function(p) {
        var on = p.getAttribute('data-mpanel') === key;
        p.classList.toggle('is-active', on);
        if (on) p.classList.add('visible');
      });
    }
    tabs.forEach(function(t) { t.addEventListener('click', function() { show(t.getAttribute('data-mtab')); }); });
    // 좌우 스와이프로 다음/이전 탭
    var x0 = null, y0 = null;
    box.addEventListener('touchstart', function(e) { if (e.target.closest('[data-mpanel]')) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; } }, { passive: true });
    box.addEventListener('touchend', function(e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5 || window.innerWidth >= 640) return;
      var cur = keys.indexOf(box.querySelector('[data-mtab][aria-selected="true"]').getAttribute('data-mtab'));
      var next = cur + (dx < 0 ? 1 : -1);
      if (next >= 0 && next < keys.length) show(keys[next]);
    }, { passive: true });
    box.querySelectorAll('.m-tabs[hidden]').forEach(function(el) { el.hidden = false; });
    box.classList.add('mtabs-on');
    show(keys[0]);
  });

  // ==================== 모바일 가로 스와이프 진행 바 (.m-swipe) ====================
  document.querySelectorAll('.m-swipe').forEach(function(track) {
    // 가로로 넘기는 카드는 등장 애니메이션 없이 고정 (넘길 때 위로 튀는 현상 방지)
    if (window.innerWidth < 640) { track.classList.remove('reveal'); Array.prototype.forEach.call(track.children, function(el) { el.classList.remove('reveal'); el.classList.add('visible'); }); }
    var bar = document.createElement('div');
    bar.className = 'm-swipe-bar';
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = '<i></i>';
    track.parentNode.insertBefore(bar, track.nextSibling);
    var fill = bar.firstChild;
    function update() {
      var max = track.scrollWidth;
      fill.style.width = (max > 0 ? Math.min(100, (track.scrollLeft + track.clientWidth) / max * 100) : 100) + '%';
    }
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  // ==================== 모바일 바로가기 칩 (.m-jump) ====================
  document.querySelectorAll('.m-jump').forEach(function(bar) {
    var btns = bar.querySelectorAll('[data-jump]');
    var header = document.querySelector('header');
    function offset() { return (header ? header.offsetHeight : 0) + bar.offsetHeight + 8; }
    function mark(id) {
      btns.forEach(function(b) {
        var on = b.getAttribute('data-jump') === id;
        b.setAttribute('aria-current', on ? 'true' : 'false');
        if (on && b.scrollIntoView) bar.firstElementChild.scrollTo({ left: b.offsetLeft - 24, behavior: 'smooth' });
      });
    }
    // 다른 칩을 누르거나 사용자가 직접 스크롤하면 이전 보정은 취소
    var jumpSeq = 0;
    ['touchstart', 'wheel'].forEach(function(ev) {
      window.addEventListener(ev, function(e) { if (!bar.contains(e.target)) jumpSeq++; }, { passive: true });
    });
    btns.forEach(function(b) {
      b.addEventListener('click', function() {
        var t = document.getElementById(b.getAttribute('data-jump'));
        if (!t) return;
        var seq = ++jumpSeq;
        window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - offset() + 1, behavior: 'smooth' });
        // 스크롤이 멈춘 뒤 지연 로딩 이미지 등으로 위치가 밀렸으면 보정
        var last = -1, tries = 0;
        setTimeout(function wait() {
          if (seq !== jumpSeq) return;
          var y = window.pageYOffset;
          if (y !== last && ++tries < 40) { last = y; return setTimeout(wait, 100); }
          var d = t.getBoundingClientRect().top - offset();
          if (Math.abs(d) > 6) window.scrollBy({ top: d + 1, behavior: 'auto' });
        }, 200);
      });
    });
    var current = null;
    function onScroll() {
      var y = offset() + 4, found = null;
      btns.forEach(function(b) {
        var t = document.getElementById(b.getAttribute('data-jump'));
        if (t && t.getBoundingClientRect().top <= y) found = b.getAttribute('data-jump');
      });
      if (found !== current) { current = found; mark(found); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  });

  // ==================== Smooth Scroll ====================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ==================== 모바일 목차 (data-mtoc) ====================
  document.querySelectorAll('[data-mtoc]').forEach(function(box, bi) {
    var heads = box.querySelectorAll('h2');
    if (heads.length < 3) return;
    var toc = document.createElement('details');
    toc.className = 'm-toc';
    var html = '<summary>목차 <iconify-icon icon="solar:alt-arrow-down-linear"></iconify-icon></summary><ol>';
    heads.forEach(function(h, i) {
      if (!h.id) h.id = 'sec-' + (bi + 1) + '-' + (i + 1);
      var label = h.textContent.replace(/\s+/g, ' ').trim().replace(/^(제\d+조)\s*/, '$1 ');
      html += '<li><a href="#' + h.id + '">' + label.replace(/</g, '&lt;') + '</a></li>';
    });
    toc.innerHTML = html + '</ol>';
    box.insertBefore(toc, heads[0].closest('[data-mtoc] > *') || heads[0]);
    toc.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function(e) {
        var t = document.getElementById(a.getAttribute('href').slice(1));
        if (!t) return;
        e.preventDefault();
        toc.open = false;
        var header = document.querySelector('header');
        window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - (header ? header.offsetHeight : 0) - 16, behavior: 'smooth' });
      });
    });
  });

  // 가로 스크롤 탭: 누른 탭이 화면 안으로 오게
  document.addEventListener('click', function(e) {
    var t = e.target.closest('.ba-tab, .hc-tab');
    if (!t || window.innerWidth >= 640) return;
    var row = t.parentElement;
    row.scrollTo({ left: t.offsetLeft - (row.clientWidth - t.offsetWidth) / 2, behavior: 'smooth' });
  });

  // ==================== Tab UI ====================
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns.length > 0) {
    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        tabBtns.forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
        const panel = document.getElementById('tab-' + tabId);
        if (panel) panel.classList.add('active');
      });
    });
  }


  // ==================== 서비스 소개 영상 (YouTube · 누를 때만 플레이어 로드) ====================
  function ytSrc(id) {
    return 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1';
  }
  function ytFrame(id, title) {
    var f = document.createElement('iframe');
    f.src = ytSrc(id);
    f.title = title || 'YouTube 동영상';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    f.allowFullscreen = true;
    return f;
  }
  // 페이지 안 영상: 썸네일 자리를 그대로 플레이어로 바꾼다
  document.querySelectorAll('.yt-facade[data-yt]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var box = document.createElement('div');
      box.className = 'yt-facade';
      box.appendChild(ytFrame(btn.getAttribute('data-yt'), btn.getAttribute('aria-label')));
      btn.replaceWith(box);
      box.querySelector('iframe').focus();
    });
  });
});

// ==================== Global Functions ====================
function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// 지도 iframe 에 포커스가 들어가면 감싼 영역에 포커스 표시 (iframe 내부 포커스는 CSS 로 감지되지 않음)
(function () {
  var frames = document.querySelectorAll('.map-frame');
  if (!frames.length) return;
  function sync() {
    frames.forEach(function (wrap) {
      wrap.classList.toggle('is-focused', document.activeElement === wrap.querySelector('iframe'));
    });
  }
  window.addEventListener('blur', function () { setTimeout(sync, 0); });
  window.addEventListener('focus', sync);
  document.addEventListener('focusin', sync);
})();
