#include "funkycube.js" 

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
	//   sx  sy  sw  sh  dx  dy  dw  dh
		[16,  0, 16, 16,0*128, 99, 64, 64],
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
