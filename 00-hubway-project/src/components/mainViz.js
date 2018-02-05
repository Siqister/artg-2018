import * as d3 from 'd3';
import Histogram from './Histogram';

function MainViz(_){

	let _width;
	let _height;
	const activityHistogramMultiple = Histogram()
		.value(d => d.time_of_day0)
		.thresholds(d3.range(0,24,.25))
		.domain([0,24])
		.tickFormat(d => {
			const time = +d;
			const hour = Math.floor(time);
			let min = Math.round((time-hour)*60);
			min = String(min).length === 1? "0"+ min : min;
			return `${hour}:${min}`
		})
		.margin({t:30,r:20,b:30,l:35})
		.ticksX(3)
		.ticksY(2)
		.maxY(40);

	function exports(d,i){

		const root = this;
		_width = this.clientWidth;
		_height = this.clientHeight;

		//Transform data
		const tripsByStation = d3.nest()
			.key(d => d.station0)
			.entries(d)
			.map(d => d.values);

		//Build DOM
		const stationNodes = d3.select(root)
			.selectAll('.station-node')
			.data(tripsByStation);
		const stationNodesEnter = stationNodes.enter()
			.append('div')
			.attr('class','station-node');
		stationNodes.merge(stationNodesEnter)
			.style('width','200px')
			.style('height','120px')
			.style('float','left')
			.each(activityHistogramMultiple);

	}

	return exports;
}

export default MainViz();