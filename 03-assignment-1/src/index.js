import * as d3 from 'd3';
import './style.css';

import parse from './parse';

console.log('Week 3 assignment 1');

//Import and parse data
d3.csv('./data/hubway_trips_reduced.csv', parse, function(err,trips){

	//YOUR CODE HERE

});