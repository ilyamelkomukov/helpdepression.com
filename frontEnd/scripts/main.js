import Nav from '../components/Nav/Nav.js';
import WhatProblemSlide from '../components/WhatProblem/WhatProblem.js';
import Hero from '../components/Hero/Hero.js';
import ImpactAreas from '../components/ImpactAreas/ImpactAreas.js';
import FearsGo from '../components/FearsGo/FearsGo.js'

"use strict";

$("document").ready(()=> {

  _detectIOS();

  Nav.changeNavIfPageAlreadyScrolled();
  Nav.showHideNav();
  Nav.makeHamburgerToggleable();
  Nav.makeNavScrollable();

  // start carousel
  $(".owl-carousel").owlCarousel({
    items: 1,
    // autoplay: true,
    autoplayHoverPause: true,
    rewind: true,
    dots: false,
    nav: true,
    center: true,
    startPosition: 0
  });

  WhatProblemSlide.animateProblemSlides();
  WhatProblemSlide.letItRain();

  $('a[rel="m_PageScroll2id"]')
    .mPageScroll2id({
      offset:".nav-wrapper",
      appendHash: true
    });

    ImpactAreas.makeHighlightAreas();

    FearsGo.makeFearsGo();
});


function _detectIOS() {
  if (window.navigator.platform.indexOf('Mac') != -1) {
    $('body')
      .addClass('_mac');
  }
}
