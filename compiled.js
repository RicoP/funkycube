



 function __error(message, file, line) {
  throw new Error(message + "(" + file + ":" + line + ")");
 }
do { if(!(64 === 16 * 4)) { __error("assertion failed: " + "CUBE_WIDTH === FACE_WIDTH * 4" + " = " + (64 === 16 * 4), "src/funkycube.js", 8); } } while(false);

var Funkycube;

!function() {
"use strict";
 function Point(x,y) {
  this.x = x;
  this.y = y;
  this.toString = function() {
   return "[" + x + ", " + y + "]";
  };
 }
 Funkycube = function() {
  var canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  var ctx = canvas.getContext("2d");
  function getCanvasCoordinate(face, x, y) {
   do { if(!(face >= 0 && face <= 5)) { __error("assertion failed: " + "face >= 0 && face <= 5" + " = " + (face >= 0 && face <= 5), "src/funkycube.js", 52); } } while(false);
   if(x < 0) {
    switch(face) {
     case 0:
     return getCanvasCoordinate(1, y, -x-1);
     case 1:
     return getCanvasCoordinate(5, -x-1, 16 - 1 - y);
     case 2:
     return getCanvasCoordinate(1, x + 16, y);
     case 3:
     return getCanvasCoordinate(2, x + 16, y);
     case 4:
     return getCanvasCoordinate(1, 16 - 1 - y, 16 + x);
     case 5:
     return getCanvasCoordinate(1, -x-1 ,16 - 1 - y);
     default: throw new RangeError();
    }
   }
   if(y < 0) {
    switch(face) {
     case 0:
     return getCanvasCoordinate(5, x, 16 + y);
     case 1:
     return getCanvasCoordinate(0, -y-1 ,x);
     case 2:
     return getCanvasCoordinate(0, x, 16 + y);
     case 3:
     return getCanvasCoordinate(0, 16 + y, 16 - 1 - x);
     case 4:
     return getCanvasCoordinate(2, x, 16 + y);
     case 5:
     return getCanvasCoordinate(4, x, 16 + y);
     default: throw new RangeError();
    }
   }
   if(x >= 16) {
    switch(face) {
     case 0:
     return getCanvasCoordinate(3, 16 - 1 - y, x - 16);
     case 1:
     return getCanvasCoordinate(2, x - 16, y);
     case 2:
     return getCanvasCoordinate(3, x - 16, y);
     case 3:
     return getCanvasCoordinate(5, 2*16 -1 - x, 16 - 1 - y);
     case 4:
     return getCanvasCoordinate(3, y, 2*16 -1 - x);
     case 5:
     return getCanvasCoordinate(3, 2*16 -1 - x, 16 - 1 - y);
     default: throw new RangeError();
    }
   }
   if(y >= 16) {
    switch(face) {
     case 0:
     return getCanvasCoordinate(2, x, y - 16);
     case 1:
     return getCanvasCoordinate(4, y - 16, 16 - 1 - x);
     case 2:
     return getCanvasCoordinate(4, x, y - 16);
     case 3:
     return getCanvasCoordinate(4, 2*16 -1 - y ,x);
     case 4:
     return getCanvasCoordinate(5, x, y - 16);
     case 5:
     return getCanvasCoordinate(0, x, y - 16);
     default: throw new RangeError();
    }
   }
   switch(face) {
    case 0: return new Point(x + 16 , y);
    case 1: return new Point(x , y + 16);
    case 2: return new Point(x + 16 , y + 16);
    case 3: return new Point(x + 16*2, y + 16);
    case 4: return new Point(x + 16 , y + 16*2);
    case 5: return new Point(x + 16 , y + 16*3);
    default: throw new RangeError();
   }
  }
  this.getCanvasCoordinate = getCanvasCoordinate;
  this.canvas = canvas;
  this.ctx = ctx;
 };
}();
var canvas = document.createElement("canvas");
canvas.width =1024;
canvas.height = 480;
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
var cube = new Funkycube();
cube.ctx.beginPath();
cube.ctx.rect(0,0,64,64);
cube.ctx.fillStyle = '#000000';
cube.ctx.fill();
ctx.beginPath();
ctx.rect(0,0,1024,480);
ctx.fillStyle = '#008000';
ctx.fill();
var MAX = 20;
var x = new Int32Array(MAX);
var y = new Int32Array(MAX);
var c = ['#FF0000', '#00FF00', '#0000FF'];
for(var i = 0; i !== MAX; i++) {
 x[i] = (Math.random() * 64) | 0;
 y[i] = (Math.random() * 64) | 0;
}
function update() {
 cube.ctx.beginPath();
 cube.ctx.fillStyle = '#000000'
 cube.ctx.globalAlpha = 0.2;
 cube.ctx.rect(0,0,64,64);
 cube.ctx.fill();
 cube.ctx.globalAlpha = 1;
 for(var i = 0; i !== MAX; i++) {
  var coords = cube.getCanvasCoordinate(i % 6, y[i], x[i]);
  cube.ctx.beginPath();
  cube.ctx.fillStyle = c[i % 3];
  cube.ctx.rect(coords.x,coords.y, 1, 1);
  cube.ctx.fill();
  x[i]++;
  y[i]++;
 }
}
function draw() {
 var coords = [
  [16, 0, 16, 16,0*128, 99, 64, 64],
  [ 0, 16, 16, 16,1*128, 99, 64, 64],
  [16, 16, 16, 16,2*128, 99, 64, 64],
  [32, 16, 16, 16,3*128, 99, 64, 64],
  [16, 32, 16, 16,4*128, 99, 64, 64],
  [16, 48, 16, 16,5*128, 99, 64, 64]
 ];
 for(var i = 0; i !== 6; i++) {
  var c = coords[i];
  var j=0;
  ctx.drawImage(cube.canvas, c[j++], c[j++], c[j++], c[j++], c[j++], c[j++], c[j++], c[j++]);
 }
}
var TIME = 50;
setTimeout(function gameloop() {
 update();
 draw();
 setTimeout(gameloop, TIME);
}, TIME);
