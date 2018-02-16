import * as d3 from 'd3';

/***
  Week 6: Basics of canvas API
	https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
***/

//6.1 Create canvas element
//Remember to set width and height explicitly
const canvas = d3.select('.container')
	.append('canvas')
	.attr('width',1000)
	.attr('height',500)
	//.style('width','2000px') //independent of actual pixel dimension
	.node();
console.log(canvas);
const ctx = canvas.getContext('2d');

//6.2 Customize fill, stroke, lineWidth
ctx.fillStyle = 'rgb(255,0,0)';

//6.3 Draw
//Primitive shapes: rectangle
// ctx.fillRect(0,0,500,250);
// ctx.fillStyle = 'rgb(0,255,0)';
// ctx.strokeStyle = 'rgb(0,0,255)';
// ctx.strokeRect(100,100,500,250);

//Primitive shapes: text
//ctx.fillText('Hello world', 500,250);

//Path : line
ctx.strokeStyle = 'rgba(0,0,0,.3)';
ctx.beginPath();
//...issue commands
ctx.moveTo(0,250);
ctx.lineTo(1000,250);
ctx.closePath();
ctx.fill();
ctx.stroke();

//Grid at 50px intervals
//Draw the horizontal gridlines
ctx.beginPath();
for(let y = 0; y <= 500; y += 50){
	ctx.moveTo(0,y);
	ctx.lineTo(1000,y);
}
for(let x = 0; x <= 1000; x += 50){
	ctx.moveTo(x,0);
	ctx.lineTo(x,500);
}
ctx.closePath();
ctx.stroke();

//Path : arc
ctx.strokeStyle = 'rgb(0,0,255)';

ctx.beginPath();
ctx.arc(500,250,100,0,Math.PI/2,true);
ctx.moveTo(800,250);
ctx.arc(800,250,100,0,Math.PI*2);
ctx.closePath();
ctx.stroke();

//Path : circle


//Path : curves
ctx.beginPath();
ctx.moveTo(0,500);
ctx.quadraticCurveTo(500, 0, 1000,500);
ctx.closePath();
ctx.stroke();

//Canvas transform


//6.4 Drawing multiple path with Path2D
const path1 = new Path2D();
const path2 = new Path2D();
const path3 = d3.path(); //

for(let i = 0; i<2000; i++){
	const x = Math.random()*1000;
	const y = Math.random()*500;
	path1.moveTo(x+5,y);
	path1.arc(x,y,5,0,Math.PI*2);
	path2.moveTo(x+5,y);
	path2.arc(x,y,5,0,Math.PI*2);

	path3.moveTo(x+10,y);
	path3.arc(x,y,10,0,Math.PI*2);
}
ctx.fillStyle = 'rgb(0,0,255)';
ctx.strokeStyle = 'rgb(0,0,0)';
ctx.fill(path1);
ctx.stroke(path2);

d3.select('.container')
	.append('svg')
	.attr('width',1000)
	.attr('height',500)
	// .append('path')
	// .attr('d', path3.toString())
	.append('circle')
	.attr('cx',0)
	.attr('cy',0)
	.attr('r',3)
	.transition()
	.duration(100000)
	.attr('cx',1000)
	.attr('cy',500)
	.attr('r',20);


//6.5 <canvas> to <svg> using d3.path


//6.6 Basic canvas animations
const canvas2 = d3.select('.container')
	.append('canvas')
	.attr('width',1000)
	.attr('height',500)
	.node();
const ctx2 = canvas2.getContext('2d');

function makePoint(w,h){
	return {
		x: Math.random()*w,
		y: Math.random()*h,
		speedX: (Math.random())*10,
		speedY: (Math.random() - .5)*5,
		update:function(){
			this.x = this.x + this.speedX;
			if(this.x > w || this.x < 0){
				this.speedX = -1 * this.speedX;
			}
			this.y = this.y + this.speedY;
			if(this.y > h || this.y < 0){
				this.speedY = -1 * this.speedY;
			}
		}
	}
}

ctx2.fillStyle = 'rgba(0,0,0,.4)';

const points = [];
for(let i = 0; i < 5000; i++){
	points.push(makePoint(1000,500));
}

function redraw(){
	//Refresh the canvas
	ctx2.clearRect(0,0,1000,500);

	ctx2.beginPath();
	
	points.forEach(function(point){
		ctx2.moveTo(point.x, point.y);
		ctx2.arc(point.x, point.y, 2, 0, Math.PI*2);

		point.update();
	});

	ctx2.closePath();
	ctx2.fill();


	requestAnimationFrame(redraw);
}

redraw();
