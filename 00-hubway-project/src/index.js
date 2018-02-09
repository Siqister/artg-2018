import * as d3 from 'd3';
import './style/main.css';
import './style/stationSearch.css';

//Import utility function
import {parse, parse2} from './utils';

//Import modules
import Histogram from './components/Histogram';

//Histogram
//factory
const activityHistogram = Histogram()
	.thresholds(d3.range(0,24,.5))
	.domain([0,24])
	.value(d => d.time_of_day0);


d3.csv('./data/hubway_trips_reduced.csv', parse, (err,trips) => {

	d3.select('#time-of-the-day-main')
		.datum(trips)
		.each(activityHistogram);

});