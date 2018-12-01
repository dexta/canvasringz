const GAMECANVAS = document.getElementById("gameCanvas");
const CTX = GAMECANVAS.getContext("2d");

let HEIGHT = GAMECANVAS.height;
let WIDTH = GAMECANVAS.width;

let START = true;
let SHOWDEBUG = false;

let FPS = 0;
let MAXFPS = 1;
let MINFPS = 9999999;
let LASTTIME = 0;
let NORMTIME = 0;

let MASTERRING = {};
let STATICPOS = {WIDTH:423,HEIGHT:232,RADIUS:32};
// let movingRings = [];

const init = () => {
  calcCanvas();
  MASTERRING = new staticRing(STATICPOS.WIDTH,STATICPOS.HEIGHT,STATICPOS.RADIUS);
  MASTERRING.setAngle = toRadians(90);
  draw();
};

const draw = () => {
  CTX.clearRect(0, 0, WIDTH, HEIGHT);
  MASTERRING.draw(SHOWDEBUG);

  if(START) window.requestAnimationFrame(draw);
  // if(START) setTimeout(draw,1000/30);
};

const calcCanvas = () => {
  GAMECANVAS.height = Math.floor( window.innerHeight / 100 )*100;
  GAMECANVAS.width = Math.floor( window.innerWidth / 100 )*100;  
  HEIGHT = GAMECANVAS.height;
  WIDTH = GAMECANVAS.width;
  STATICPOS = {
    WIDTH: WIDTH/2,
    HEIGHT: HEIGHT/2.6,
    RADIUS: HEIGHT/8
  }
};

const calcFPS = () => {
  let diffr = (performance.now() - LASTTIME)/1000;
  LASTTIME = performance.now();
  FPS = Math.floor(1/diffr);
  if(performance.now()-NORMTIME > 1000 * 10) {
    MAXFPS=0;MINFPS=999999;
    NORMTIME=performance.now();
  }
  if(FPS>MAXFPS) MAXFPS = FPS;
  if(FPS<MINFPS) MINFPS = FPS;
};

// Converts from degrees to radians.
const toRadians = (degrees) => {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
const toDegrees = (radians) => {
  return radians * 180 / Math.PI;
};