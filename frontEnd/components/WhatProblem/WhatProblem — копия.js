import 'core-js';
import RainRenderer from "./rain-renderer";
import Raindrops from "./raindrops";
import loadImages from "./image-loader";
import createCanvas from "./create-canvas";
import times from './times';
import {random,chance} from './random';


let WhatProblemSlide = {

  animateProblemSlides() {

    _changeSigns();

    // TEst call object method in just this same object by callback
    // $('.testCallFunc')
    //   .animate({
    //     visibility: "hidden"
    //   }, 1, this.testCallFunc);
  },

  // ,testCallFunc() {
  //   console.log('in callback');
  // }

  letItRain() {

    let textureRainFg, textureRainBg,
      dropColor, dropAlpha;

    let textureFg,
      textureFgCtx,
      textureBg,
      textureBgCtx;

    let textureBgSize={
      width:384,
      height:256
    }
    let textureFgSize={
      width:96,
      height:64
    }

    let raindrops,
      renderer,
      canvas;

    let parallax={x:0,y:0};

    let weatherData=null;
    let curWeatherData=null;
    let blend={v:0};

    function loadTextures(){
      loadImages([
        {name:"dropAlpha",src:"imgs/drop-alpha.png"},
        {name:"dropColor",src:"imgs/drop-color.png"},

        {name:"textureRainFg",src:"imgs/texture-rain-fg.png"},
        {name:"textureRainBg",src:"imgs/texture-rain-bg.png"}

      ]).then((images)=>{
        textureRainFg = images.textureRainFg.img;
        textureRainBg = images.textureRainBg.img;

        dropColor = images.dropColor.img;
        dropAlpha = images.dropAlpha.img;

        init();
      });
    }
    loadTextures();

    function init(){
      canvas=document.querySelector('#container');

      let dpi=window.devicePixelRatio;
      canvas.width=window.innerWidth*dpi;
      canvas.height=window.innerHeight*dpi;
      canvas.style.width=window.innerWidth+"px";
      canvas.style.height=window.innerHeight+"px";

      raindrops=new Raindrops(
        canvas.width,
        canvas.height,
        dpi,
        dropAlpha,
        dropColor,{
          trailRate:1,
          trailScaleRange:[0.2,0.45],
          collisionRadius : 0.45,
          dropletsCleaningRadiusMultiplier : 0.28,
        }
      );

      textureFg = createCanvas(textureFgSize.width,textureFgSize.height);
      textureFgCtx = textureFg.getContext('2d');
      textureBg = createCanvas(textureBgSize.width,textureBgSize.height);
      textureBgCtx = textureBg.getContext('2d');

      generateTextures(textureRainFg,textureRainBg);

      renderer = new RainRenderer(canvas, raindrops.canvas, textureFg, textureBg, null,{
        brightness:1.04,
        alphaMultiply:6,
        alphaSubtract:3,
        // minRefraction:256,
        // maxRefraction:512
      });

      setupEvents();
    }


    function setupEvents(){

      setupParallax();
      setupWeather();
      setupFlash();
    }

    function setupEvents(){

      setupParallax();
      setupWeather();
      setupFlash();
    }


    function setupParallax(){
      document.addEventListener('mousemove',(event)=>{
        let x=event.pageX;
        let y=event.pageY;

        TweenLite.to(parallax,1,{
          x:((x/canvas.width)*2)-1,
          y:((y/canvas.height)*2)-1,
          ease:Quint.easeOut,
          onUpdate:()=>{
            renderer.parallaxX=parallax.x;
            renderer.parallaxY=parallax.y;
          }
        })
      });
    }



    function setupWeather(){
      setupWeatherData();
    }


    function setupWeatherData(){
      let defaultWeather={
        raining:true,
        minR:20,
        maxR:50,
        rainChance:0.35,
        rainLimit:6,
        dropletsRate:50,
        dropletsSize:[3,5.5],
        trailRate:1,
        trailScaleRange:[0.25,0.35],
        fg:textureRainFg,
        bg:textureRainBg,
        flashFg:null,
        flashBg:null,
        flashChance:0,
        collisionRadiusIncrease:0.0002
      };

      function weather(data){
        return Object.assign({},defaultWeather,data);
      }

      weatherData={
        rain:weather({
          rainChance:0.35,
          dropletsRate:50,
          raining:true,
          // trailRate:2.5,
          fg:textureRainFg,
          bg:textureRainBg
        })
      };
    }


    function generateTextures(fg,bg,alpha=1){
      textureFgCtx.globalAlpha=alpha;
      textureFgCtx.drawImage(fg,0,0,textureFgSize.width,textureFgSize.height);

      textureBgCtx.globalAlpha=alpha;
      textureBgCtx.drawImage(bg,0,0,textureBgSize.width,textureBgSize.height);
    }


  }
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
