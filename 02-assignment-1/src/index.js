import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import parse from './parse';

console.log('Week 2 assignment 1');

//Global variables
//What is the scope of these variables? Why do we make these globally scoped?
const margin = {t:25,r:150,b:25,l:150};
let w, h;
let scaleX = d3.scaleLinear();

//Import and parse data
d3.csv('./data/hubway_trips_reduced.csv', parse, function(err,data){

	console.log(data);

	//Data transformation, discovery, and mining
	//We need to transform trip level data into station level data
	const tripsByStation0 = d3.nest().key(d => {
			//This is an arrow function
			return d.station0;
		})
		.entries(data)
		.map(function(d){
			//This is NOT an arrow function
			return {
				key:d.key,
				trips:d.values.length
			}
		});

	//Max and min?
	const min = d3.min(tripsByStation0, d => {return d.trips}); //Arrow function again
	const max = d3.max(tripsByStation0, function(d){return d.trips}); //not an arrow function, please compare with previous line

	//Prepare to draw by updating width, height, and scale
	w = d3.select('#ranking-bar-chart').node().clientWidth - margin.l - margin.r;
	h = d3.select('#ranking-bar-chart').node().clientHeight - margin.t - margin.b;
	scaleX.domain([0,max]).range([0,w]);

	//Append <svg> and <g>
	const plot = d3.select('#ranking-bar-chart')
		.append('svg')
		.attr('width',w)
		.attr('height',h)
		.append('g')
		.attr('class','plot-area')
		.attr('transform',`translate(${margin.l},${margin.t})`);

	//Represent / DOM manipulation
	redraw(tripsByStation0.sort(function(a,b){return b.trips - a.trips}).slice(0,50), plot);

	//Interaction
	//Depending on button clicked, show top departure vs arrival stations
	d3.select('#top').on('click', function(){
		d3.event.preventDefault();

		redraw(tripsByStation0.sort(function(a,b){return b.trips - a.trips}).slice(0,80), plot);
	});

	d3.select('#bottom').on('click', function(){
		d3.event.preventDefault();

		redraw(tripsByStation0.sort(function(a,b){return a.trips - b.trips}).slice(0,80), plot);
	});

});

function redraw(data, plot){

	console.log(data);

	//This currently doesn't update properly
	//Refractor this code to make it conformant with enter/exit/update pattern
	//YOUR CODE HERE:
	const bars = plot		
		.selectAll('.bar')
		.data(data)
		.enter()
		.append('g')
		.attr('class','bar')
		.attr('transform', (d,i) => {
			return `translate(0,${i*10})`
		});
	bars.append('rect')
		.attr('width',function(d){
			return scaleX(d.trips);
		})
		.attr('height', 9)
		.style('opacity',.3);
	bars.append('text')
		.attr('text-anchor','end')
		.style('font-size','8px')
		.attr('x',-5)
		.attr('dy',4)
		.text(d => {return d.key});

}