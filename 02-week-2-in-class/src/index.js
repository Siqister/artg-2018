import * as d3 from 'd3';
//Install bootstrap first, using npm install bootstrap --save
//import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import parse from './parse';

console.log('Week 2 in class');

//Import and parse data
d3.csv('./data/hubway_trips_reduced.csv', parse, function(err,data){

	console.log(data);

});