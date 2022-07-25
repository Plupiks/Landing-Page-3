document.addEventListener('DOMContentLoaded', function () {
  // Menu
  function menu() {
    // PC header
    const menuBG = document.querySelector('.header');
    const menuBody = document.querySelector('.header__body');

    // Navigation
    const linksBody = document.querySelector('.nav__links');
    const links = document.querySelectorAll('.nav__link');

    // Mobile header
    const checkbox = document.querySelector('.checkbox');
    const mobileMenuBody = document.querySelector('.burger-menu__content');
    const mobileMenuButton = document.querySelector('.burger-menu__button');

    // Backdrop (for mobile)
    const backdrop = document.querySelector('.backdrop');

    const backgroundColor = $(':root').css('--headerBG');

    // Переміщаю навігацію до бургер меню
    function moveLinksToOtherBlock() {
      $(window).on('resize load', () => {
        if (window.matchMedia('(max-width:992px').matches) {
          $(linksBody).prependTo($(mobileMenuBody));
        } else {
          $(linksBody).appendTo($(menuBody));
        }
      });
    }
    moveLinksToOtherBlock();

    // Відкриваю меню при нажимані
    function showMenuMobile() {
      // Анімація відкриття для меню
      function slideRight() {
        // Ширина від 992px до 376px
        if ($(window).width() <= 992 && $(window).width() > 400) {
          if ($(checkbox).prop('checked') === false) {
            $(mobileMenuBody).css('transform', 'translateX(0px)');
            $(backdrop).addClass('backdrop-active');
            $(menuBG).css('background', 'none');
          } else {
            $(mobileMenuBody).css('transform', 'translateX(-300px)');
            $(backdrop).removeClass('backdrop-active');
            $(menuBG).css('background', backgroundColor);
          }
        }

        // Ширина від 376px до 0px
        else if ($(window).width() <= 400) {
          if ($(checkbox).prop('checked') === false) {
            $(mobileMenuBody).css('transform', 'translateX(0px)');
            $(backdrop).addClass('backdrop-active');
          } else {
            $(mobileMenuBody).css('transform', 'translateX(-395px)');
            $(backdrop).removeClass('backdrop-active');
          }
        }

        // Ширина від 992px і вище
        else {
          $(backdrop).removeClass('backdrop-active');
        }
      }

      // Ховаю меню при ресайзі
      function closeMenuHover() {
        $(window).on('resize', function () {
          $(checkbox).prop('checked', false);

          // Ширина від 992px до 376px
          if ($(window).width() <= 992 && $(window).width() > 400) {
            $(mobileMenuBody).css('transform', 'translateX(-300px)');
            $(backdrop).removeClass('backdrop-active');
          }

          // Ширина від 376px до 0px
          else if ($(window).width() < 400) {
            $(mobileMenuBody).css('transform', 'translateX(-395px)');
            $(backdrop).removeClass('backdrop-active');
          }

          // Ширина від 992px і вище
          else {
            $(mobileMenuBody).css('transform', 'translateX(0px)');
            $(backdrop).removeClass('backdrop-active');
          }
        });
      }
      closeMenuHover();

      // Показую меню при нажиманні на кнопку
      mobileMenuButton.addEventListener('click', function () {
        slideRight();
        $(checkbox).prop('checked', !$(checkbox).prop('checked'));
      });

      // Ховаю меню при нажиманні на силку
      $(window).on('load resize', () => {
        if ($(window).width() < 992) {
          links.forEach(function (link, i) {
            link.addEventListener('click', function () {
              slideRight();
              $(checkbox).prop('checked', !$(checkbox).prop('checked'));
            });
          });
        }
      });

      backdrop.addEventListener('click', function () {
        slideRight();
        $(checkbox).prop('checked', !$(checkbox).prop('checked'));
      });
    }
    showMenuMobile();
  }
  menu();

  //ButtonUp
  function buttonUp() {
    // Показ кнопки
    const buttonUp = document.querySelector('.button-up');
    $(window).on('load resize scroll', function () {
      const offsetTop = scrollY;
      if (offsetTop >= 480) {
        buttonUp.classList.add('button-show');
      } else {
        buttonUp.classList.remove('button-show');
      }
    });

    // Скролл наверх
    buttonUp.addEventListener('click', function () {
      $('html,body').animate({ scrollTop: $('.impressum').offset().top + 'px' }, 500);
    });
  }
  buttonUp();
});
