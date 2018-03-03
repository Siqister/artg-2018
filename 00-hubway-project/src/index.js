'use strict'

import * as d3 from 'd3';
import './style/main.css';
import './style/stationSearch.css';

//Import utility function
import {parse, parse2, parseStation, fetchCsv} from './utils';

//Import modules
import Histogram, {timeline, activityHistogram} from './components/Histogram'; //both default and named export
import MainViz from './components/mainViz';
import Animation from './components/Animation';
import Model from './components/Model';

//Create modules
const mainViz = MainViz();
const animation = Animation( document.querySelector('.main') );
//Note that these modules are created in and exported from  './components/Histogram.js'
//--activityHistogram
//--timeline

//Import data using the Promise interface
Promise.all([
		fetchCsv('./data/hubway_trips_reduced.csv', parse),
		fetchCsv('./data/hubway_stations.csv', parseStation)
	]).then(([trips, stations]) => {

		//Perform some basic data discovery
		//What is the time range of the data set?
		const t0 = d3.min(trips, d => d.t0);
		const t1 = d3.max(trips, d => d.t1);

		//With this information, reconfigure timeline module
		timeline
			.domain([t0, t1])
			.thresholds(d3.timeMonth.range(t0,t1,1));

		d3.select('#time-of-the-day-main')
			.datum(trips)
			.each(activityHistogram);

		d3.select('#timeline-main')
			.datum(trips)
			.each(timeline);

		animation(trips, stations);

	});
