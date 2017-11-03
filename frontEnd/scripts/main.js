import Nav from '../components/Nav/Nav.js';
import WhatProblemSlide from '../components/WhatProblem/WhatProblem.js';
import Hero from '../components/Hero/Hero.js';
import ImpactAreas from '../components/ImpactAreas/ImpactAreas.js';
import FearsGo from '../components/FearsGo/FearsGo.js';
import CallToAction from '../components/CallToAction/CallToAction.js';
import OrderForm from '../components/OrderForm/OrderForm.js';

"use strict";

$("document").ready(()=> {

  _detectNoRainEffect();

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

  CallToAction.makeGoToOrder();

  ImpactAreas.makeHighlightAreas();

  FearsGo.makeFearsGo();

  OrderForm.makeSelectize();
  OrderForm.makeSendOrder();
});


function _detectNoRainEffect() {
  var _isIE10OrOlder = window.navigator.appVersion.indexOf('MSIE');
  _isIE10OrOlder++;

  if ((window.navigator.platform.indexOf('Mac') != -1) || !!(_isIE10OrOlder)) {
    $('body')
      .addClass('_no-rain-effect');
  }
}
