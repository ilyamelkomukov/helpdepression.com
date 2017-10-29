let FearsGo = {

  makeFearsGo() {

    var svgElement = document.querySelector('svg.bedrooms'),
      maskedElement = document.querySelector('#mask-hypnotoad'),
      circleFeedback = document.querySelector('#hypnotoad-shadow'),
      svgPoint = svgElement.createSVGPoint();

    function cursorPoint(e, svg) {
      svgPoint.x = e.clientX;
      svgPoint.y = e.clientY;
      return svgPoint.matrixTransform(svg.getScreenCTM().inverse());
    }

    function update(svgCoords) {
      maskedElement.setAttribute('transform', `translate(${svgCoords.x} ${svgCoords.y})` );
      circleFeedback.setAttribute('transform', `translate(${svgCoords.x} ${svgCoords.y})` );
    }

    window.addEventListener('mousemove', function(e) {
      update(cursorPoint(e, svgElement));
    }, false);

    document.addEventListener('touchmove', function(e) {
      // e.preventDefault();
      var touch = e.targetTouches[0];
      if (touch) {
        update(cursorPoint(touch, svgElement));
      }
    }, false);
  }
};

export default FearsGo;
