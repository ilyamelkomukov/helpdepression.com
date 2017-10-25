import Nav from '../components/Nav/Nav.js';
import WhatProblemSlide from '../components/WhatProblem/WhatProblem.js';
import Hero from '../components/Hero/Hero.js';

const s2id = require('page-scroll-to-id');

"use strict";

$("document").ready(()=> {

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

  $('a[rel="m_PageScroll2id"]')
    .mPageScroll2id({
      offset:".nav-wrapper"
    });
});


function _makeScrollToId() {
  console.log('in here');
}
