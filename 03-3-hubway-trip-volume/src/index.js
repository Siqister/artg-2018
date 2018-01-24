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
	
}