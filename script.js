document.addEventListener('DOMContentLoaded', () => {

  /* ── ナビ開閉 ────────── */
  const toggle  = document.getElementById('nav-toggle');
  const overlay = document.getElementById('nav-overlay');
  const panel   = document.getElementById('nav-panel');

  function openNav()  { panel.classList.add('open');  overlay.classList.add('open');  toggle.classList.add('active'); }
  function closeNav() { panel.classList.remove('open'); overlay.classList.remove('open'); toggle.classList.remove('active'); }

  if (toggle)   toggle.addEventListener('click', openNav);
  if (overlay)  overlay.addEventListener('click', closeNav);

  /* ── スクロール時ヘッダー影 ── */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ── アクティブナビ強調 ── */
  const curPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-panel a, .desktop-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === curPage || (curPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── 自動フェイドイン（IntersectionObserver）── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

});
