import * as d3 from 'd3';
import './style.css';

import parse from './parse';

console.log('Week 3 exercise 3');

//Import and parse data
d3.csv('./data/hubway_trips_reduced.csv', parse, function(err,trips){

	d3.select('#timeline-multiple')
		.datum(trips)
		.each(draw);

});

function draw(data){

	const rootDom = this;
	
	const w = rootDom.clientWidth,
		h = rootDom.clientHeight;
	const margin = {t:50,r:50,b:50,l:50};

	const svg = d3.select(rootDom)
		.append('svg')
		.attr('width',w)
		.attr('height',h);
	const plot = svg.append('g')
		.attr('transform',`translate(${margin.l},${margin.t})`);

	//Data discovery: date range
	const tMin = d3.min(data, function(d){return d.t0});
	const tMax = d3.max(data, function(d){return d.t0});

	//Transform incoming data
	//Bin discrete trips into weekly buckets
	const histogram = d3.histogram()
		.value(function(d){return d.t0})
		.thresholds(d3.timeWeek.range(tMin,tMax));
	const tripsPerWeek = histogram(data).map(function(d){
		return {
			t0:d.x0,
			t1:d.x1,
			tripVolume:d.length
		}
	});

	//More data discovery post-data transform: maximum and minimum weekly trip volume
	const tripVolumeExtent = d3.extent(tripsPerWeek, function(d){return d.tripVolume});

	//Set up scales
	const scaleX = d3.scaleTime().domain([tMin,tMax]).range([0, w - margin.l - margin.r]);
	const scaleY = d3.scaleLinear().domain(tripVolumeExtent).range([h - margin.t - margin.b, 0]);

	//Draw
	//Create path generator
	const line = d3.line()
		.x(function(d){ return (scaleX(d.t0) + scaleX(d.t1))/2})
		.y(function(d){ return scaleY(d.tripVolume)});
	const area = d3.area()
		.x(function(d){ return (scaleX(d.t0) + scaleX(d.t1))/2})
		.y1(function(d){ return scaleY(d.tripVolume)})
		.y0(h - margin.t - margin.b);
	const axisX = d3.axisBottom()
		.scale(scaleX);
	const axisY = d3.axisLeft()
		.scale(scaleY)
		.tickSize(- w + margin.l + margin.r);

	//Draw line and area
	plot.append('path')
		.attr('class','timeline')
		.datum(tripsPerWeek)
		.attr('d',line)
		.style('fill','none')
		.style('stroke','rgb(50,50,50)')
		.style('stroke-width','2px');
	plot.append('path')
		.attr('class','area')
		.datum(tripsPerWeek)
		.attr('d',area)
		.style('fill-opacity',.1);

	//Draw axis
	plot.append('g')
		.attr('class','axis axis-x')
		.attr('transform',`translate(0, ${h - margin.t - margin.b})`)
		.call(axisX);
	plot.append('g')
		.attr('class','axis axis-y')
		.call(axisY)
		.select('.domain')
		.style('display','none');
}