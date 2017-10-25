let Hero = {
  morphScroll() {

    var stage1 = KUTE.to('#scroll-body', {path: "#scroll-body-2", morphPrecision: 1, morphIndex: 0, complete: function() {

      stage2 = KUTE.to('#scroll-body-2', {path: "#scroll-body-3", morphPrecision: 1, morphIndex: 51});
    }});

    // stage1.chain(stage2);
    // stage2.chain(stage1);
    stage1.start();


    // var stage1 = KUTE.to('#scroll-body', {path: "#scroll-body-2", morphPrecision: 1, morphIndex: 97, reverseFirstPath: true}),
    //   stage2 = KUTE.to('#scroll-body-2', {path: "#scroll-body-3", morphPrecision: 1, morphIndex: 49, reverseFirstPath: true}),
    //   stage3 = KUTE.to('#scroll-body-3', {path: "#scroll-body-4", morphPrecision: 1, morphIndex: 29, reverseFirstPath: true}),
    //   stage4 = KUTE.to('#scroll-body-4', {path: "#scroll-body-3", morphPrecision: 1, morphIndex: 0, reverseFirstPath: true}),
    //   stage5 = KUTE.to('#scroll-body-3', {path: "#scroll-body-2", morphPrecision: 1, morphIndex: 20, reverseFirstPath: true}),
    //   stage6 = KUTE.to('#scroll-body-2', {path: "#scroll-body", morphPrecision: 1, morphIndex: 8, reverseFirstPath: true});

    // stage1.chain(stage2);
    // stage2.chain(stage3);
    // stage3.chain(stage4);
    // stage4.chain(stage5);
    // stage5.chain(stage6);
    // stage6.chain(stage1);
  }
};

export default Hero;
