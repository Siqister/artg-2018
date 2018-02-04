import * as d3 from 'd3';
import '../style/histogram.css';

function histogram(data,i){

	const root = this;

	const width = root.clientWidth; 
	const height = root.clientHeight;
	const margin = {t:20,r:20,b:20,l:30};
	const w = width - margin.l - margin.r;
	const h = height - margin.t - margin.b;

	const svg = d3.select(root)
		.classed('histogram',true)
		.selectAll('svg')
		.data([1]); //What's going on here?
	const svgEnter = svg.enter().append('svg')
		.attr('width',width)
		.attr('height',height);
	svgEnter.append('g').attr('class','plot')

	const plot = svg.merge(svgEnter)
		.select('.plot')
		.attr('transform',`translate(${margin.l},${margin.t})`);

	//Transform data
	//Group trips into discrete 15 minute bins, using the d3.histogram layout
	const histogram = d3.histogram()
		.value(d => d.time_of_day0)
		.thresholds(d3.range(0,24,.25));
	const tripsByQuarterHour = histogram(data)
		.map(d => {
			return {
				x0:d.x0, //left bound of the bin; 18.25 => 18:15
				x1:d.x1,
				volume:d.length
			}
		});

	//Set up scales in the x and y direction
	const scaleX = d3.scaleLinear().domain([0,24]).range([0,w]);
	const maxVolume = d3.max(tripsByQuarterHour, d => d.volume);
	const scaleY = d3.scaleLinear().domain([0,maxVolume]).range([h,0]);

	//Set up axis generator
	const axisY = d3.axisLeft()
		.scale(scaleY)
		.tickSize(-w)
		.ticks(5);

	const axisX = d3.axisBottom()
		.scale(scaleX)
		.ticks(6)
		.tickFormat(d => {
			const time = +d;
			const hour = Math.floor(time);
			let min = Math.round((time-hour)*60);
			min = String(min).length === 1? "0"+ min : min;
			return `${hour}:${min}`
		});

	//Draw
	//Bars
	//Update
	const binsUpdate = plot
		.selectAll('.bin')
		.data(tripsByQuarterHour);

	//Enter
	const binsEnter = binsUpdate.enter()
		.append('rect')
		.attr('class','bin') //If you forget this, what will happen if we re-run this the activityHistogram function?
		.attr('x', d => scaleX(d.x0))
		.attr('width', d => (scaleX(d.x1) - scaleX(d.x0)))
		.attr('y', d => h)
		.attr('height', 0);

	//Enter + update
	binsEnter.merge(binsUpdate)
		.transition()
		.duration(500)
		.attr('x', d => scaleX(d.x0))
		.attr('width', d => (scaleX(d.x1) - scaleX(d.x0)))
		.attr('y', d => scaleY(d.volume))
		.attr('height', d => (h - scaleY(d.volume)))
		.style('fill','rgba(0,0,0,.1)');

	//Exit
	binsUpdate.exit().remove();

	//Axis
	const axisXNode = plot
		.selectAll('.axis-x')
		.data([1]);
	const axisXNodeEnter = axisXNode.enter()
		.append('g')
		.attr('class','axis axis-x');
	axisXNode.merge(axisXNodeEnter)
		.attr('transform',`translate(0,${h})`)
		.call(axisX);

	const axisYNode = plot
		.selectAll('.axis-y')
		.data([1]);
	const axisYNodeEnter = axisYNode.enter()
		.append('g')
		.attr('class','axis axis-y');
	axisYNode.merge(axisYNodeEnter)
		.call(axisY);

}

export default histogram;