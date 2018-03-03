/*This example demonstrates the following:
- DOM event handling using selection.on
- Creating a dispatch object
- Broadcasting events using dispatch.call
- Listening to events using dispatch.on*/

import {select,path,event,dispatch} from 'd3';
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
/*circle.on('click',function(d){
	console.log(d);
	console.log(this);
	console.log(event);
});

square
	.on('mouseenter',function(d){
		console.log(this);
	})
	.on('mouseleave', d => {
		console.log(this);
	});*/

//How do we make these three elements interact among themselves?
//Create dispatch
const dispatcher = dispatch('color:highlight','color:reset');

circle.on('mouseenter', () => dispatcher.call('color:highlight',null,'rgb(255,0,0)'));
square.on('mouseenter', () => dispatcher.call('color:highlight',null,'rgb(0,255,0)'));
triangle.on('mouseenter', () => dispatcher.call('color:highlight',null,'rgb(0,0,255)'));

circle.on('mouseleave', () => dispatcher.call('color:reset',null));
square.on('mouseleave', () => dispatcher.call('color:reset',null));
triangle.on('mouseleave', () => dispatcher.call('color:reset',null));


dispatcher.on('color:highlight', color => {
	circle.transition().style('fill',color);
	square.transition().style('fill',color);
	triangle.transition().style('fill',color);
});

dispatcher.on('color:reset', () => {
	circle.transition().style('fill','black');
	square.transition().style('fill','black');
	triangle.transition().style('fill','black');
});
