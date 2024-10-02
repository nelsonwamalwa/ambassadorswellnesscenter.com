/**
 * Updated: Jun 29 2024 with Bootstrap v5.3.3
 * Author: Wamalwa Nelson
 */

(() => {
  "use strict";

  // Toggle .scrolled class when the page scrolls
  const toggleScrolled = () => {
    const body = document.body;
    const header = document.querySelector('#header');
    if (header.classList.contains('scroll-up-sticky') || header.classList.contains('sticky-top') || header.classList.contains('fixed-top')) {
      window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
    }
  };

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  // Mobile navigation toggle functionality
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const toggleMobileNav = () => {
    document.body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  };
  mobileNavToggleBtn.addEventListener('click', toggleMobileNav);

  // Hide mobile navigation on same-page or hash link click
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) toggleMobileNav();
    });
  });

  // Toggle dropdowns in mobile navigation
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggle.parentNode.classList.toggle('active');
      toggle.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopPropagation();
    });
  });

  // Remove preloader after page load
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  // Scroll-to-top button visibility toggle
  const scrollTopBtn = document.querySelector('.scroll-top');
  const toggleScrollTop = () => {
    if (scrollTopBtn) {
      window.scrollY > 100 ? scrollTopBtn.classList.add('active') : scrollTopBtn.classList.remove('active');
    }
  };
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  // Initialize animation on scroll (AOS)
  const initAOS = () => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  };
  window.addEventListener('load', initAOS);

  // Initialize GLightbox
  GLightbox({ selector: '.glightbox' });

  // Initialize Pure Counter
  new PureCounter();

  // FAQ item toggle functionality
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach(item => {
    item.addEventListener('click', () => item.parentNode.classList.toggle('faq-active'));
  });

  // Initialize Swiper sliders
  const initSwipers = () => {
    document.querySelectorAll(".init-swiper").forEach(swiperElement => {
      const config = JSON.parse(swiperElement.querySelector(".swiper-config").textContent.trim());
      swiperElement.classList.contains("swiper-tab") ? initSwiperWithCustomPagination(swiperElement, config) : new Swiper(swiperElement, config);
    });
  };
  window.addEventListener("load", initSwipers);

  // Handle scrolling to the correct position for hash links
  window.addEventListener('load', () => {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => {
        const section = document.querySelector(window.location.hash);
        const scrollMarginTop = parseInt(getComputedStyle(section).scrollMarginTop);
        window.scrollTo({ top: section.offsetTop - scrollMarginTop, behavior: 'smooth' });
      }, 100);
    }
  });

  // Navmenu scroll spy
  const navmenuLinks = document.querySelectorAll('.navmenu a');
  const navmenuScrollspy = () => {
    navmenuLinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      const isActive = position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight);
      link.classList.toggle('active', isActive);
    });
  };
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
