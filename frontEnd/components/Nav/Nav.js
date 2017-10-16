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
        if (($(this).outerWidth() >= 640) && navs.is('.navs_navbar-show')) {
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

    if ((scrollTop > neededDistance) && !hasClass) {
      neededElem
        .addClass('header_fixed');
    }
  },

  makeNavScrollable () {
    $(document)
      .scroll(function () {

        var neededElem = $('.site-header'),
          neededDistance = neededElem.outerHeight(),
          scrollTop = $(document).scrollTop(),
          hasClass = neededElem.hasClass('header_fixed');

        if ((scrollTop > neededDistance) && !hasClass) {

          neededElem
            .addClass('header_fixed show-bounce');
        } else if ((scrollTop > neededDistance) && hasClass) {

          return ;

        } else {

          neededElem
            .removeClass('header_fixed show-bounce');
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
