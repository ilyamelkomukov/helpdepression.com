import Nav from '../components/Nav/Nav.js';
import WhatProblemSlide from '../components/WhatProblem/WhatProblem.js';

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
    dots: true,
    center: true
  });

  WhatProblemSlide.animateProblemSlides();
});
