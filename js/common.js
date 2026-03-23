/* ==================== ONTOH Common Scripts ==================== */

document.addEventListener('DOMContentLoaded', function() {

  // ==================== Scroll Reveal (IntersectionObserver) ====================
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(function(el) {
    revealObserver.observe(el);
  });

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

});

// ==================== Global Functions ====================
function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
}
