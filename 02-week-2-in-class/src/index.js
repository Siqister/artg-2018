import * as d3 from 'd3';
//Install bootstrap first, using npm install bootstrap --save
//import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import parse from './parse';

console.log('Week 2 in class');

//Part 1: review d3-selection
//https://github.com/d3/d3-selection

//Select elements

//Selection vs DOMNode

//Modifying selection

//Handle events

//Control flow: .each and .call

//Data binding


//Import and parse data
d3.csv('./data/hubway_trips_reduced.csv', parse, function(err,data){

	//Data transformation, discovery, and mining


	//Represent / DOM manipulation

});