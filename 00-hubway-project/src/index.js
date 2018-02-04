import * as d3 from 'd3';
import './style/main.css';
import './style/stationSearch.css';

//Import utility function
import {parse} from './utils';

//Import modules
import activityHistogram from './components/Histogram';

d3.csv('./data/hubway_trips_reduced.csv', parse, (err,trips) => {

	d3.select('#time-of-the-day-main')
		.datum(trips)
		.each(activityHistogram);

});