import * as d3 from 'd3';
//Install bootstrap first, using npm install bootstrap --save
//import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import parse from './parse';
import timeline from './timeline';

console.log('Week 2 assignment 1');

//Import and parse data
d3.csv('./data/hubway_trips_reduced.csv', parse, function(err,trips){

	timeline(trips);

	//Nest trips by origin station
	const tripsByStation0 = d3.nest()
		.key(function(d){ return d.station0 })
		.entries(trips);

	const stationNodes = d3.select('#timeline-multiple')
		.selectAll('.station-node')
		.data(tripsByStation0);
	const stationNodesEnter = stationNodes.enter()
		.append('div')
		.style('width','200px')
		.style('height','150px')
		.style('float','left');
	stationNodes.merge(stationNodesEnter)
		.each(function(d,i){
			//How to draw an activity timeline for each stationNode?
			//YOUR CODE HERE:
		});

});