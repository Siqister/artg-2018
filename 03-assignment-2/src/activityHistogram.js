import * as d3 from 'd3';

export default function activityHistogram(data){

	//Need to append a the proper DOM scaffolding
	const width = this.clientWidth;
	const height = this.clientHeight;
	const margin = {t:15,r:25,b:25,l:25};
	const w = width - margin.l - margin.r;
	const h = height - margin.t - margin.b;

	const svg = d3.select(this)
		.selectAll('svg')
		.data([1]);
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
	const tripsByQuarterHour = histogram(data.values)
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
		.tickSize(-w);

	const axisX = d3.axisBottom()
		.scale(scaleX)
		.tickFormat(d => {
			const time = +d;
			const hour = Math.floor(time);
			let min = Math.round((time-hour)*60);
			min = String(min).length === 1? "0"+ min : min;
			return `${hour}:${min}`
		});

	//Draw
	//YOUR CODE HERE

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
		.style('fill','rgb(180,180,180)');

	//Exit
	binsUpdate.exit().remove();

	//Axis
	const axisXNode = plot
		.selectAll('.axis-x')
		.data([1]);
	const axisXNodeEnter = axisXNode.enter()
		.append('g')
		.attr('class','axis-x');
	axisXNode.merge(axisXNodeEnter)
		.attr('transform',`translate(0,${h})`)
		.call(axisX);

	const axisYNode = plot
		.selectAll('.axis-y')
		.data([1]);
	const axisYNodeEnter = axisYNode.enter()
		.append('g')
		.attr('class','axis-y');
	axisYNode.merge(axisYNodeEnter)
		.call(axisY);

	axisYNodeEnter.select('.domain').style('display','none');
	axisYNodeEnter.selectAll('line')
		.style('stroke','rgb(80,80,80)')
		.style('stroke-dasharray','2px 2px');

}