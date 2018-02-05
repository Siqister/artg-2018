import * as d3 from 'd3';
import './style/main.css';
import './style/stationSearch.css';

//Import utility function
import {parse, parse2} from './utils';

//Import modules
import Histogram from './components/Histogram';
import mainViz from './components/mainViz';

const activityHistogramMain = Histogram()
	.value(d => d.time_of_day0)
	.thresholds(d3.range(0,24,.25))
	.domain([0,24])
	.tickFormat(d => {
		const time = +d;
		const hour = Math.floor(time);
		let min = Math.round((time-hour)*60);
		min = String(min).length === 1? "0"+ min : min;
		return `${hour}:${min}`
	});

const timelineMain = Histogram()
	.value(d => d.t0)
	.domain([new Date(2013,0,1), new Date(2013,11,31)])
	.thresholds(d3.timeDay.range(new Date(2013,0,1), new Date(2013,11,31), 1))
	.ticksX(2)
	.ticksY(5)
	.tickFormat(d => {
		return new Date(d).toDateString();
	})
	;

//Test updating the modules
d3.select('#month-1').on('click', () => {
	d3.csv('./data/201601-hubway-tripdata.csv',parse2,dataloaded);
});
d3.select('#month-2').on('click', () => {
	d3.csv('./data/201602-hubway-tripdata.csv',parse2,dataloaded);
});

function dataloaded(err,trips){

	const timeRange = d3.extent(trips, d => d.t0);

	timelineMain
		.domain(timeRange)
		.thresholds(d3.timeDay.range(...timeRange, 1));

	d3.select('#time-of-the-day-main')
		.datum(trips)
		.each(activityHistogramMain);

	d3.select('#timeline-main')
		.datum(trips)
		.each(timelineMain);  

	d3.select('.main')
		.datum(trips)
		.each(mainViz);
}