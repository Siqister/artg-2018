import {select} from 'd3';
import './style.css';

const div = select('.container')
	.append('div')
	.classed('module',true);
const w = div.node().clientWidth;
const h = div.node().clientHeight;
//The first plot renders a force layout in <svg>
const plot = div.append('svg')
	.attr('width',w)
	.attr('height',h)
	.attr('transform','translate(50,0)')

plot.append('circle')
	.attr('cx',100)
	.attr('cy',100)
	.attr('r',10)
	.attr('class','circle-1');

plot.append('g')
	.attr('class','group-1')
	.attr('transform','translate(250,50)')
	.append('rect')
	.attr('class','rect-1')
	.attr('width',300)
	.attr('height',50);

console.log(plot.select('.circle-1').node().getBoundingClientRect())
console.log(plot.select('.group-1').node().getBoundingClientRect())
console.log(plot.select('.rect-1').node().getBoundingClientRect())