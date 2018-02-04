import * as d3 from 'd3';
//Install bootstrap first, using npm install bootstrap --save
//import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import parse from './parse';
import Histogram from './Histogram';

console.log('Week 4 exercise 2');

//Create instances of this reusable module
const activityHistogramMain = Histogram(5000);
const activityHistogramMultiple = Histogram();
const durationHistogramMain = Histogram();

activityHistogramMain
	.maxVolume(3000)
	.margin({t:20,r:100,b:50,l:100});



activityHistogramMultiple
	.ticksY(2)
	.defaultColor('rgb(0,0,255)');

//Import and parse data
d3.csv('./data/hubway_trips_reduced.csv', parse, function(err,trips){

	d3.select('#activity-histogram')
		.style('background','red')
		.datum({key:'all stations', values:trips})
		.each(activityHistogramMain);

	//Nest trips by origin station
	const tripsByStation0 = d3.nest()
		.key(function(d){ return d.station0 })
		.entries(trips);

	const stationNodes = d3.select('#timeline-multiple')
		.selectAll('.station-node')
		.data(tripsByStation0);
	const stationNodesEnter = stationNodes.enter()
		.append('div')
		.attr('class','station-node')
		.style('width','300px')
		.style('height','180px')
		.style('float','left');
	stationNodes.merge(stationNodesEnter)
		.each(activityHistogramMultiple);

});