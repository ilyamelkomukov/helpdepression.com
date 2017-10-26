let ImpactAreas = {
  makeHighlightAreas() {

    var _impactClarifications = $('.impact-clarification'),
      _maxHeightClarification = _impactClarifications.eq(0).outerHeight();
    _impactClarifications.css({
      display: 'none',
      opacity: 0
    });

    _impactClarifications
      .each(function(index, elem) {

        if (_maxHeightClarification < $(this).outerHeight()) {
          _maxHeightClarification = $(this).outerHeight();
        }
      });

    $('#impact-clarifications')
      .height(_maxHeightClarification);


    $(".segment")
      .hover(
        function(e) {

          var target = e.target,
            segmentId = target.getAttribute('id');

          $(target).addClass('_segment_hover');

          _impactClarifications
            .filter(function(index, elem) {

              return Number(segmentId[segmentId.length - 1]) ==
                Number($(this)
                          .data('segment-number'));
            })
              .css({
                display: 'block',
              })
              .animate({
                opacity: 1
              }, 300);
        },
        function(e) {

          var target = e.target,
            segmentId = target.getAttribute('id');

          $(e.target).removeClass('_segment_hover');

          _impactClarifications
            .animate({
              opacity: 0
            }, 300);
        });
  }
};

export default ImpactAreas;
