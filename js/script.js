/* ============================================
   KAYO WERTER — Landing Page Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Navbar Scroll Effect --- */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* --- Mobile Menu Toggle --- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* --- Scroll Reveal --- */
  var revealElements = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    var windowHeight = window.innerHeight;
    var triggerPoint = windowHeight * 0.88;

    revealElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll(); // Trigger on load

  /* --- Active Navbar Link on Scroll --- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.navbar__link');

  function highlightNavLink() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + sectionId) {
            link.style.color = 'var(--accent-light)';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  /* --- Stagger reveal delays for grid items --- */
  var gridSections = [
    '.servicos__grid .servico-card',
    '.portfolio__grid .portfolio-card',
    '.tecnologias__grid .tech-item',
    '.diferenciais__grid .diferencial-item',
    '.depoimentos__grid .depoimento-card'
  ];

  gridSections.forEach(function (selector) {
    var items = document.querySelectorAll(selector);
    items.forEach(function (item, index) {
      item.style.transitionDelay = (index * 0.08) + 's';
    });
  });

  /* --- Hero stats counter animation --- */
  var stats = document.querySelectorAll('.hero__stat-number');
  var statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    var heroSection = document.getElementById('hero');
    if (!heroSection) return;

    var rect = heroSection.getBoundingClientRect();
    if (rect.bottom > 0) {
      statsAnimated = true;
      stats.forEach(function (stat) {
        var text = stat.textContent;
        var match = text.match(/(\d+)/);
        if (match) {
          var target = parseInt(match[0]);
          var suffix = text.replace(match[0], '');
          var current = 0;
          var step = Math.max(1, Math.floor(target / 30));
          var interval = setInterval(function () {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            stat.textContent = current + suffix;
          }, 40);
        }
      });
    }
  }

  window.addEventListener('scroll', animateStats, { passive: true });
  animateStats();

});
