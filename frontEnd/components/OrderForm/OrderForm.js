let OrderForm = {

  makeSelectize() {
    $('#select')
      .selectize({
        create: true
      });
  },

  makeSendOrder() {
    var _thanks = $('.thanks');

    $(".order-form").eq(0).submit(function() {
      var th = $(this);
        $.ajax({
          type: "POST",
          url: "mail.php",
          data: th.serialize()
        })
        .done(function() {
          _thanks
            .toggleClass("active");

          setTimeout(function() {
            // Done Functions
            th.trigger("reset");
            _thanks
              .toggleClass("active");

          }, 2800);
        });
      return false;
    });
  }
};

export default OrderForm;
