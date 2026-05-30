/* nav.js — TS conditioning shared navigation script */
(function () {
  const header = document.getElementById('site-header');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  /* ── Header scroll behaviour ── */
  function updateHeader() {
    if (!header) return;
    const isLightPage = header.dataset.light === 'true';
    if (window.scrollY > 60) {
      header.classList.remove('transparent', 'light-bg');
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
      if (isLightPage) {
        header.classList.add('light-bg');
      } else {
        header.classList.add('transparent');
      }
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ── Hamburger / mobile nav ── */
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const open = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Active nav link ── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(function (a) {
    if (a.getAttribute('href') === currentPage) {
      a.classList.add('active');
    }
  });

  /* ── Scroll fade-in (IntersectionObserver) ── */
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(function (el) {
    io.observe(el);
  });

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      const open = item.classList.toggle('open');
      item.querySelectorAll('.faq-a').forEach(function (a) {
        a.style.maxHeight = open ? a.scrollHeight + 'px' : '0';
      });
    });
  });
})();
