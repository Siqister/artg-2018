import * as d3 from 'd3';

function Timeline(_){

	function exports(data,i){

	}

	exports.width = function(_){

	}

	exports.height = function(_){

	}

	exports.margin = function(_){

	}

	exports.timeRange = function(_){

	}

	exports.timeInterval = function(_){

	}

	exports.maxVolume = function(_){

	}

	return exports;

}

//export default Timeline;

export default function _timeline(data,i){

	const width = this.clientWidth;
	const height = this.clientHeight;
	const margin = {t:15,r:20,b:15,l:20};
	const w = width - margin.l - margin.r;
	const h = height - margin.t - margin.b;

	//Data transformation
	//Bin the trips by week
	const timeInterval = d3.timeWeek;
	const timeRange = [new Date(2012,0,1), new Date(2012,11,31)];
	const thresholds = timeInterval.range(timeRange[0], timeRange[1], 1);

	const histogram = d3.histogram()
		.value(d => d.t0)
		//.value(function(d){return d.t0})
		.thresholds(thresholds)
		.domain(timeRange);

	const tripsByInterval = histogram(data.values)
		.map(d => {
			return {
				week:d.x0,
				volume:d.length
			}
		});

	//Mine the data and set up scales
	const scaleX = d3.scaleTime().domain(timeRange).range([0,w]);
	const maxVolume = d3.max(tripsByInterval, d => d.volume);
	const scaleY = d3.scaleLinear().domain([0, maxVolume]).range([h,0]);

	//Shape generator
	const areaGenerator = d3.area()
		.x(d => scaleX(d.week))
		.y0(h)
		.y1(d => scaleY(d.volume));

	//Build DOM
	//First, build <svg> scaffolding
	const svg = d3.select(this)
		.selectAll('svg')
		.data([1]);
	const svgEnter = svg.enter().append('svg')
		.attr('width',w)
		.attr('height',h)
	svgEnter.append('g');

	const plot = svg.merge(svgEnter)
		.select('g')
		.attr('transform',`translate(${margin.l},${margin.t})`);

	const areaNode = plot
		.selectAll('.area')
		.data([tripsByInterval]);
	const areaNodeEnter = areaNode.enter()
		.append('path')
		.attr('class','area');
	areaNodeEnter.merge(areaNode)
		.attr('d',areaGenerator);

}