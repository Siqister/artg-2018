import * as d3 from 'd3';
//Install bootstrap first, using npm install bootstrap --save
//import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import parse from './parse';
import Timeline from './Timeline';

console.log('Week 4 exercise 2');


//Import and parse data
d3.csv('./data/hubway_trips_reduced.csv', parse, function(err,trips){

	//Nest trips by origin station
	const tripsByStation0 = d3.nest()
		.key(function(d){ return d.station0 })
		.entries(trips);

	const stationNodes = d3.select('#timeline-multiple')
		.selectAll('.station-node')
		.data(tripsByStation0);
	const stationNodesEnter = stationNodes.enter()
		.append('div')
		.style('width','300px')
		.style('height','180px')
		.style('float','left');
	stationNodes.merge(stationNodesEnter)
		.each(timeline); 

});