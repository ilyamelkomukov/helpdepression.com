let WhatProblemSlide = {
  animateProblemSlides() {

    _changeSigns();
  }
};

function _holdSign() {

  TweenLite
    .to(_signs.eq(_holdIndex), 1.5, {
      opacity: 1,
      onComplete: _changeSigns
    });

  _disappearIndex = _holdIndex;
  console.log(`_disappearIndex: ${_disappearIndex}`);
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

    console.log(`holdIndex: ${_holdIndex}, _appearIndex: ${_appearIndex}`);
}

var _signs = $('.problem'),
  _appearIndex = 0,
  _disappearIndex = _signs.length -1,
  _holdIndex = 0;

export default WhatProblemSlide;
