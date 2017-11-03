let Nav = {

  makeHamburgerToggleable() {
    $('.hamburger-wrapper')
      .click(function() {

        _makeHamburgerToggleable($(this));
    });
  },

  showHideNav() {
    var navs = $('.navbar-small-screen .navs');

    $('.hamburger-wrapper')
      .click(() => {

        navs
          .toggleClass('navs_navbar-show');
    });

    // remove css rules for small screen if the hamburger was clicked and
    // the window was resized to bigger
    // note: we need to bind resize event handler to window
    $(window)
      .resize(function() {
        if (($(this).outerWidth() >= 1164) && navs.is('.navs_navbar-show')) {
          navs
            .removeClass('navs_navbar-show');

            _makeHamburgerToggleable($('.hamburger-wrapper'));
        }
      });
  },

  changeNavIfPageAlreadyScrolled() {

    var neededElem = $('.site-header'),
      neededDistance = neededElem.outerHeight(),
      scrollTop = $(document).scrollTop(),
      hasClass = neededElem.hasClass('header_fixed');

    if ((scrollTop > neededDistance)) {
      neededElem
        .addClass('show-header');
    }
  },

  makeNavScrollable () {

    var _thresholdScroll = $(document).scrollTop();

    $(document)
      .scroll(function () {

        if ($('.navbar-small-screen .navs').is('.navs_navbar-show')) {

          $('.navbar-small-screen .navs')
          .removeClass('navs_navbar-show');

        }

        if ($('.hamburger-wrapper .middle').is('.clockwise')) {
          $('.hamburger-wrapper')
            .find('.middle')
              .eq(0)
                .removeClass("clockwise")
                .end()
              .eq(1)
                .removeClass("counter-clockwise")
                .end()
              .end()
            .find(".top, .bottom")
              .removeClass("_hidden");
        }

        var neededElem = $('.site-header'),
          neededDistance = neededElem.outerHeight(),
          scrollTop = $(document).scrollTop(),
          hasHeaderFixed = neededElem.hasClass('header_fixed'),
          hasHeaderShow = neededElem.hasClass('show-header');

        if ((scrollTop > neededDistance) && !hasHeaderFixed) {

          neededElem
            .addClass('header_fixed');

          _thresholdScroll = scrollTop;
            console.log('in header fixed');
            console.log(`_thresholdScroll: ${_thresholdScroll}`);
            console.log(`scrollTop: ${scrollTop}`);
            console.log(`neededDistance: ${neededDistance}`);

        } else if (((_thresholdScroll - scrollTop) > 0) && hasHeaderFixed) {

          neededElem
            .addClass('show-header');
          _thresholdScroll = scrollTop;
          console.log('in header show');
          console.log(`_thresholdScroll: ${_thresholdScroll}`);
          console.log(`scrollTop: ${scrollTop}`);
          console.log(`neededDistance: ${neededDistance}`);

        } else if (((scrollTop - _thresholdScroll) > 0) && hasHeaderFixed) {

          _thresholdScroll = scrollTop;
          neededElem
            .removeClass('show-header');

        } else if (scrollTop <= neededDistance) {

          console.log('in delete');
          neededElem
            .removeClass('header_fixed show-header');
            _thresholdScroll = 0;
        }
      });
  }
};

function _makeHamburgerToggleable(hamburger) {
  hamburger
    .find('.middle')
      .eq(0)
        .toggleClass("clockwise")
        .end()

      .eq(1)
        .toggleClass("counter-clockwise");

  hamburger
    .find(".top, .bottom")
    .toggleClass("_hidden");
}

export default Nav;
