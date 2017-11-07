import Nav from '../components/Nav/Nav.js';
import WhatProblemSlide from '../components/WhatProblem/WhatProblem.js';
import Hero from '../components/Hero/Hero.js';
import ImpactAreas from '../components/ImpactAreas/ImpactAreas.js';
import FearsGo from '../components/FearsGo/FearsGo.js';
import CallToAction from '../components/CallToAction/CallToAction.js';
import OrderForm from '../components/OrderForm/OrderForm.js';

"use strict";

let mainObj = {

  noRainEffect: false,

  webpCompatible: false,

  detectNoRainEffect() {
    var _isIE10OrOlder = window.navigator.appVersion.indexOf('MSIE');
    _isIE10OrOlder++;

    if ((window.navigator.platform.indexOf('Mac') != -1) || !!(_isIE10OrOlder)) {
      this.noRainEffect = true;
      $('body').addClass('_no-rain-effect');
    }
  },

  detectWebp() {

    var TEstWebp = new Image();

    TEstWebp.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
    TEstWebp.onload = TEstWebp.onerror = ()=> {
      if (TEstWebp.height != 0) {
        this.webpCompatible = true;
        $('body').addClass('webp');
      }

      this.init();
    };
  },

  replaceFromWebpToImg() {
    if (!this.webpCompatible || $(window).outerWidth() > 1366) {

      $('.toJpg, .toPng')
        .attr('xlink:href', function () {
          let srcAttr = $(this).attr('xlink:href');
          switch (true) {
            case $(this).is('.toPng'):
              return srcAttr.replace('.webp', '.png');
              break;
            case $(this).is('.toJpg'):
              return srcAttr.replace('.webp', '.jpg');
              break;
            default:
              return;
          }
        });
    }
  },

  init() {

    $("document").ready(()=> {

      this.detectNoRainEffect();
      // this.detectWebp();
      this.replaceFromWebpToImg();

      Nav.changeNavIfPageAlreadyScrolled();
      Nav.showHideNav();
      Nav.makeHamburgerToggleable();
      Nav.makeNavScrollable();

      // start carousel
      $(".owl-carousel").owlCarousel({
        items: 1,
        autoplay: true,
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

    $(window).resize(()=> {
      this.replaceFromWebpToImg();
    });
  }
};

// mainObj.init();
mainObj.detectWebp();
export default mainObj;
