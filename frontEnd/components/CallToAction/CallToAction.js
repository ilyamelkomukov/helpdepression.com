let CallToAction = {
  makeGoToOrder() {
    $('#go-order')
      .click(function() {
        $.mPageScroll2id("scrollTo", "#order");
      });
  }
};

export default CallToAction;
