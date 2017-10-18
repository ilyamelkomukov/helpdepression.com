let WhatProblemSlide = {

  animateProblemSlides() {

    _changeSigns();

    // TEst call object method in just this same object by callback
    // $('.testCallFunc')
    //   .animate({
    //     visibility: "hidden"
    //   }, 1, this.testCallFunc);
  }

  // ,testCallFunc() {
  //   console.log('in callback');
  // }
};

function _holdSign() {

  TweenLite
    .to(_signs.eq(_holdIndex), 2, {
      opacity: 1,
      onComplete: _changeSigns
    });

  _disappearIndex = _holdIndex;
}

function _changeSigns() {
  TweenLite
    .to(_signs.eq(_appearIndex), 1, {
      opacity: 1
    });
  TweenLite
    .to(_signs.eq(_disappearIndex), 1, {
      opacity: 0,
      onComplete: _holdSign
    });

    // animation take a time, cause of that we have enough
    // time to change some vars
    _holdIndex = _appearIndex;
    if (_appearIndex < _signs.length-1) {
      _appearIndex++;
    } else {
      _appearIndex = 0;
    }
}

// just simple save positions of signs in collection of signs for
// use it in our funcs
var _signs = $('.problem'),
  _appearIndex = 0,
  _disappearIndex = _signs.length -1,
  _holdIndex = 0;

export default WhatProblemSlide;
