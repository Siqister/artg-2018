import {select,path,event,mouse,dispatch,
	forceSimulation,
	forceManyBody,
	forceCenter,
	forceCollide,
	forceX,
	forceY
} from 'd3';
import './style.css';

const div = select('.container')
	.append('div')
	.classed('module',true);
const w = div.node().clientWidth;
const h = div.node().clientHeight;
//The first plot renders a force layout in <svg>
const plot = div.append('svg')
	.attr('width',w)
	.attr('height',h);
//The second plot renders a force layout in <canvas>
const plot2 = select('.container')
	.append('div')
	.classed('module',true)
	.attr('width',w)
	.attr('height',h)
	.append('canvas')
	.attr('width',w)
	.attr('height',h);

//Create an array of node elements
const nodes = Array.from({length:1000})
	.map(v => {
		return {
			value:Math.random()
		}
	});
console.log(nodes);

//Visual representation of these nodes
let elements = plot
	.selectAll('.element')
	.data(nodes);
elements = elements.enter()
	.append('rect')
	.classed('element',true)
	.merge(elements)
	.attr('x',-5)
	.attr('y',-5)
	.attr('width',10)
	.attr('height',10);

//Create a force layout
const simulation = forceSimulation();
//Force simulation can be customized by the addition of different forces
const center = forceCenter(w/2,h/2);
const xPos = forceX();
const yPos = forceY();
const charge = forceManyBody().strength(.1);
const collide = forceCollide().radius(d => d.value*10);
//Now customize the force layout
simulation
	.force('charge',charge)
	.force('collide',collide)
	//.force('xPos',xPos)
	//.force('yPos',yPos)
	.force('center',center)
	.nodes(nodes)
	.on('tick', () => {
		//YOUR CODE HERE
	});

