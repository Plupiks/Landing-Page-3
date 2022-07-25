import { scrollIntoView } from './vendors/seamless-scroll-polyfill/scrollIntoView.js'; // Для коректної роботи скролу в Safari

// API Type JS
function typeJs() {
  const stringArray = $('.typed').data('typed-items').split(',');
  const typed = new Typed('#typed', {
    strings: [...stringArray],
    typeSpeed: 100,
    backSpeed: 80,
    loop: true,
    backDelay: 1800,
  });

  function startTypedOnScroll() {
    $(window).on('scroll', () => {
      const scrtollYValue = scrollY;
      const offsetTop = $('.hero__title').offset().top - 40;

      if (scrtollYValue < offsetTop) {
        typed.start();
      } else {
        typed.stop();
      }
    });
  }
  startTypedOnScroll();
}
typeJs();

// background elem position (width > 3000)
function bgElemPosition() {
  const bgElem = document.querySelector('.services-row-2__background-color');

  $(window).on('resize load', () => {
    const windowWidth = $(window).width();
    if ($(window).width() > 3000) {
      $(bgElem).css('left', `calc((-${windowWidth}px) + (100%)`);
    } else {
      $(bgElem).css('left', `0px`);
    }
  });
}
bgElemPosition();

// Fancybox
Fancybox.bind('[data-fancybox="gallery-group"]', {
  dragToClose: false,
  closeButton: 'top',
  Toolbar: false,
  hideScrollbar: false,

  Image: {
    zoom: false,
  },

  Carousel: {
    friction: 0.7,
  },
});

// Scroll to sections
function scrollToSection() {
  const anchors = document.querySelectorAll('a[href^="#s-"]');

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const blockID = anchor.getAttribute('href'); // Отримую силки з назвами блоків до яких буду скролити

      $('html,body').animate({ scrollTop: $('' + blockID).offset().top - 40 + 'px' }, 500);
    });
  }
}
scrollToSection();

// Scroll to hero section
function scrolToHero() {
  const headerLink = document.querySelector('.header__logo');
  headerLink.addEventListener('click', (e) => {
    e.preventDefault;
    scrollIntoView(document.querySelector('#s-hero'), {
      behavior: 'smooth',
      block: 'start',
    });
  });
}
scrolToHero();

// Scroll to hero section (footer)
if (document.querySelector('.footer')) {
  const headerLink2 = document.querySelector('.footer__logo');
  headerLink2.addEventListener('click', (e) => {
    e.preventDefault;
    scrollIntoView(document.querySelector('#s-hero'), {
      behavior: 'smooth',
      block: 'start',
    });
  });
}

// // Активний клас для меню при скролі
function activeClassMenu() {
  const menuLinks = document.querySelectorAll('.nav__item a[href^="#s-"]');
  const sections = document.querySelectorAll('section');
  $(window).on('scroll load', () => {
    const scrollTop = scrollY;

    sections.forEach((section) => {
      if (section.offsetTop <= scrollTop + 300) {
        menuLinks.forEach((link) => {
          if (link.getAttribute('href').replace('#', '') === section.getAttribute('id')) {
            link.classList.add('link-active');
          } else {
            link.classList.remove('link-active');
          }
        });
      }
    });
  });
}
activeClassMenu();

AOS.init({
  // Global settings:
  once: true,
  duration: 1000,
  delay: 100,
  anchorPlacement: 'top',
});
