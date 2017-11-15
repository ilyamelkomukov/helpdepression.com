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


          var target = e.target;

          $(target).addClass('_segment_hover');

          if (_impactClarifications.is(function () {
            return $(this).data('showing') == 'in-process'
          })) {
            return
          }

          _impactClarifications
            .filter(function(index, elem) {

              return target.getAttribute('id').endsWith($(this).data('segment-number'));
            })
              .data('showing', 'in-process')
              .css({
                display: 'block',
              })
              .animate({
                opacity: 1
              }, 300, function () {
                $(this)
                  .data('showing', 'static');

                  console.log();
              });
        },
        function(e) {

          var target = e.target;

          $(e.target).removeClass('_segment_hover');

          _impactClarifications
            .animate({
              opacity: 0
            }, 300);
        });
  }
};

export default ImpactAreas;
