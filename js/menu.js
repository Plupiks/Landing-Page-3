'use strict';

const headerMenuOptions = {
  container: '#headerMenu',
  logoImageActivate: true,
  logoTextActivate: true,
  enableAnimation: true,
};

function headerMenu() {
  // Сontainer selection
  const headerMenuContainer = headerMenuOptions.hasOwnProperty('container')
    ? document.querySelector(headerMenuOptions.container)
    : document.querySelector('header');

  // Button selection
  const headerMenuButton = headerMenuContainer.querySelector('.header__menu-button');

  // Header menu logo elements
  const logoImage = headerMenuContainer.querySelector('.header__logo img');
  const logoText = headerMenuContainer.querySelector('.header__logo span');

  // Header menu elements selection
  const headerMenuLogo = headerMenuContainer.querySelector('.header__logo');
  const headerMenuBody = headerMenuContainer.querySelector('.header__nav');
  const headerMenuList = headerMenuContainer.querySelector('.nav__list');
  const headerMenyLinks = headerMenuContainer.querySelectorAll('.nav__link');
  const backdropElem = headerMenuContainer.querySelector('.backdrop');

  // Functions Init
  defaultsValues();
  enableLogoElem();
  enableAnimation();
  mobileContainerPadding();
  showHideMenu();
  hideMenuOnResizeLoad();
  hideMenuOnClickBackdrop();
  hideMenuOnClickLinks();

  // Funсtions
  function enableLogoElem() {
    // Activate logo image
    if (typeof headerMenuOptions.logoImageActivate === 'boolean') {
      if (headerMenuOptions.logoImageActivate !== true) {
        logoImage.setAttribute('aria-disabled', true);
      }
    } else {
      console.log('invalid value of logoImageActivate');
    }

    // Activate logo text
    if (typeof headerMenuOptions.logoTextActivate === 'boolean') {
      if (headerMenuOptions.logoTextActivate !== true) {
        logoText.setAttribute('aria-disabled', true);
      }
    } else {
      console.log('invalid value of logoTextActivate');
    }
  }

  function enableAnimation() {
    // checking the value of the parameters
    if (typeof headerMenuOptions.enableAnimation === 'boolean') {
      // check if animations on
      if (headerMenuOptions.enableAnimation === true) {
        headerMenuLogo.setAttribute('data-animation', true);
        headerMenuButton.setAttribute('data-animation', true);
        headerMenuList.classList.add('anim-active');
      }
    } else {
      // Notification of incorrectly entered parameters
      console.log('invalid value of enableAnimation');
    }
  }

  // Padding for ul (.nav__list)
  function mobileContainerPadding() {
    const mobileMenuBody = headerMenuContainer.querySelector('.nav__list');

    $(window).on('load resize', () => {
      const headerMenuHeight = headerMenuContainer.clientHeight;

      if ($(window).width() <= 992) {
        mobileMenuBody.style.paddingTop = headerMenuHeight + 20 + 'px';
      } else {
        mobileMenuBody.style.paddingTop = '';
      }
    });
  }

  // Show/Hide menu when we click on mobile menu button
  function showHideMenu() {
    // Toggle aria-expanded for sliding navigation
    headerMenuButton.addEventListener('click', () => {
      // Slide menu when click button
      if (!headerMenuBody.hasAttribute('aria-expanded') || headerMenuBody.getAttribute('aria-expanded') === 'false') {
        headerMenuBody.setAttribute('aria-expanded', true);
      } else if (headerMenuBody.getAttribute('aria-expanded') === 'true') {
        headerMenuBody.setAttribute('aria-expanded', false);
      }

      // Slide animation when menu slide left/right
      if (!headerMenuList.hasAttribute('data-slide') || headerMenuList.getAttribute('data-slide') === 'right') {
        headerMenuList.setAttribute('data-slide', 'left');
      } else if (headerMenuList.getAttribute('data-slide') === 'left') {
        headerMenuList.setAttribute('data-slide', 'right');
      }

      // Add class for the backdrop (on/off backdrop)
      if (backdropElem.classList.contains('backdropOn')) {
        backdropElem.classList.remove('backdropOn');
        backdropElem.classList.add('backdropOff');
      } else {
        backdropElem.classList.remove('backdropOff');
        backdropElem.classList.add('backdropOn');
      }
    });
  }

  function hideMenuOnResizeLoad() {
    $(window).on('load resize', () => {
      // Disable backdrop animation when website load
      backdropElem.classList.remove('backdropOff');
      backdropElem.classList.remove('backdropOn');
      headerMenuBody.removeAttribute('aria-expanded');
      headerMenuList.removeAttribute('data-slide');
    });
  }

  function defaultsValues() {
    // if there is no setting to disable the logo element (Logo Icon)
    if (!headerMenuOptions.hasOwnProperty('logoImageActivate')) {
      logoImage.setAttribute('aria-disabled', false);
    }

    // if there is no setting to disable the logo element (Logo Text)
    if (!headerMenuOptions.hasOwnProperty('logoTextActivate')) {
      logoText.setAttribute('aria-disabled', false);
    }

    // if there is no setting to animate elements
    if (!headerMenuOptions.hasOwnProperty('enableAnimation')) {
      headerMenuLogo.setAttribute('data-animation', false);
      headerMenuButton.setAttribute('data-animation', false);
      headerMenuList.classList.add('anim-disable');
    }
  }

  // Hide menu when we click on backdrop
  function hideMenuOnClickBackdrop() {
    backdropElem.addEventListener('click', () => {
      headerMenuBody.setAttribute('aria-expanded', false);
      headerMenuList.setAttribute('data-slide', 'right');

      backdropElem.classList.remove('backdropOn');
      backdropElem.classList.add('backdropOff');
    });
  }

  // Hide menu when we click on backdrop
  function hideMenuOnClickLinks() {
    $(window).on('load resize', () => {
      headerMenyLinks.forEach((link) => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 992) {
            headerMenuBody.setAttribute('aria-expanded', false);
            headerMenuList.setAttribute('data-slide', 'right');

            backdropElem.classList.remove('backdropOn');
            backdropElem.classList.add('backdropOff');
          }
        });
      });
    });
  }
}
headerMenu();
