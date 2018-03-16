import {select,path,event,mouse,dispatch} from 'd3';
import './style.css';

const div = select('.container')
	.append('div')
	.classed('module',true);
const w = div.node().clientWidth;
const h = div.node().clientHeight;
const plot = div.append('svg')
	.attr('width',w)
	.attr('height',h);

//Draw shapes
const circle = plot.append('g')
	.attr('transform',`translate(${w/4},${h/2})`)
	.append('circle')
	.attr('r',w/16);
const square = plot.append('g')
	.attr('transform',`translate(${w/4*2},${h/2})`)
	.append('rect')
	.attr('x',-w/16)
	.attr('y',-w/16)
	.attr('width',w/8)
	.attr('height',w/8);
const triangle = plot.append('g')
	.attr('transform',`translate(${w/4*3},${h/2})`)
	.append('path');
const pathData = path();
pathData.moveTo(0,-w/16);
pathData.lineTo(w/16,w/16);
pathData.lineTo(-w/16,w/16);
pathData.lineTo(0,-w/16);
triangle.attr('d',pathData.toString());

//Basic d3 event API
//selection.on(eventType, callback)
/*circle.on('click', function(d,i){
	console.log(d);
	console.log(this); //this ==> undefined
	console.log(event);
});

document.querySelector('circle').addEventListener('click', function(e){
	console.log(e);
})


square
	.on('mouseenter',function(d){
		console.log(this);
	})
	.on('mouseleave', d => {
		console.log(this);
	});

//On mouseenter
//Turn circle red
circle
	.on('mouseenter',function(){
		select(this).transition().style('fill','red');
		square.transition().style('fill','red');
		triangle.transition().style('fill','red');
	})
	.on('mouseleave',function(){
		select(this).transition().style('fill','black');
		square.transition().style('fill','black');
		triangle.transition().style('fill','black');
	});

//Turn square green
square
	.on('mouseenter.foo',function(){
		select(this).transition().style('fill','green');
	})
	.on('mouseleave',function(){
		select(this).transition().style('fill','black');
	});

//Turn triangle blue
triangle
	.on('mouseenter',function(){
		select(this).transition().style('fill','blue');
	})
	.on('mouseleave',function(){
		select(this).transition().style('fill','black');
	})*/

//dispatch //factory
//dispatcher //instance 

const dispatcher = dispatch(
	'element:changeColor', 
	//
	);

//How do we make these three elements interact among themselves?
circle
	.on('mouseenter', function(){ 
		dispatcher.call('element:changeColor',this,'red'); 
	})
	.on('mouseleave', () => { dispatcher.call('element:changeColor',null, 'black'); })
square
	.on('mouseenter', function(){ 
		dispatcher.call('element:changeColor',this,'green'); 
	})
	.on('mouseleave', () => { dispatcher.call('element:changeColor',null, 'black'); })
triangle
	.on('mouseenter', () => { dispatcher.call('element:changeColor',null,'blue'); })
	.on('mouseleave', () => { dispatcher.call('element:changeColor',null, 'black'); })

dispatcher.on('element:changeColor', function(arg){
	console.log(this);

	triangle.transition().style('fill', arg);
	square.transition().style('fill', arg);
	circle.transition().style('fill', arg);
});

//dispatch broadcasts event back out to all the subscribers


