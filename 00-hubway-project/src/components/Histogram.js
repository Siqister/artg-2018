import * as d3 from 'd3';
import '../style/histogram.css';

function Histogram(_){

	let _width;
	let _height;
	let _margin = {t:20,r:20,b:20,l:30};
	let _value = () => {};
	let _thresholds;
	let _domain;
	let _ticksX = 6;
	let _ticksY = 5;
	let _tickFormat = d => d;
	let _maxY;

	function exports(data,i){
		const root = this;

		const width = _width || root.clientWidth; 
		const height = _height || root.clientHeight;
		const w = width - _margin.l - _margin.r;
		const h = height - _margin.t - _margin.b;

		const svg = d3.select(root)
			.classed('histogram',true)
			.selectAll('svg')
			.data([1]); //What's going on here?
		const svgEnter = svg.enter().append('svg')
			.attr('width',width)
			.attr('height',height);
		svgEnter.append('g').attr('class','plot')

		const plot = svg.merge(svgEnter)
			.select('.plot')
			.attr('transform',`translate(${_margin.l},${_margin.t})`);

		//Transform data
		//Group trips into discrete 15 minute bins, using the d3.histogram layout
		const histogram = d3.histogram()
			.value(_value)
			.thresholds(_thresholds)
			.domain(_domain);
		const binsData = histogram(data)
			.map(d => {
				return {
					x0:d.x0, 
					x1:d.x1,
					y:d.length
				}
			});

		//Set up scales in the x and y direction
		const scaleX = d3.scaleLinear().domain(_domain).range([0,w]);
		const maxY = _maxY || d3.max(binsData, d => d.y);
		const scaleY = d3.scaleLinear().domain([0,maxY]).range([h,0]);

		//Set up axis generator
		const axisY = d3.axisLeft()
			.scale(scaleY)
			.tickSize(-w)
			.ticks(_ticksY);

		const axisX = d3.axisBottom()
			.scale(scaleX)
			.ticks(_ticksX)
			.tickFormat(_tickFormat);

		//Draw
		//Bars
		//Update
		const binsUpdate = plot
			.selectAll('.bin')
			.data(binsData);

		//Enter
		const binsEnter = binsUpdate.enter()
			.append('rect')
			.attr('class','bin') //If you forget this, what will happen if we re-run this the activityHistogram function?
			.attr('x', d => scaleX(d.x0))
			.attr('width', d => (scaleX(d.x1) - scaleX(d.x0)))
			.attr('y', d => h)
			.attr('height', 0);

		//Enter + update
		binsEnter.merge(binsUpdate)
			.transition()
			.duration(500)
			.attr('x', d => scaleX(d.x0))
			.attr('width', d => (scaleX(d.x1) - scaleX(d.x0)))
			.attr('y', d => scaleY(d.y))
			.attr('height', d => (h - scaleY(d.y)))
			.style('fill','rgba(0,0,0,.1)');

		//Exit
		binsUpdate.exit().remove();

		//Axis
		const axisXNode = plot
			.selectAll('.axis-x')
			.data([1]);
		const axisXNodeEnter = axisXNode.enter()
			.append('g')
			.attr('class','axis axis-x');
		axisXNode.merge(axisXNodeEnter)
			.attr('transform',`translate(0,${h})`)
			.call(axisX);

		const axisYNode = plot
			.selectAll('.axis-y')
			.data([1]);
		const axisYNodeEnter = axisYNode.enter()
			.append('g')
			.attr('class','axis axis-y');
		axisYNode.merge(axisYNodeEnter)
			.call(axisY);
	}

	exports.width = function(_){
		if(typeof _ === 'undefined') return _width;
		_width = _;
		return this;
	}
	exports.height = function(_){
		if(typeof _ === 'undefined') return _height;
		_height = _;
		return this;
	}
	exports.margin = function(_){
		if(typeof _ === 'undefined') return _margin;
		_margin = _;
		return this;
	}
	exports.value = function(fn){
		if(typeof fn === 'undefined') return _value;
		_value = fn;
		return this;
	}
	exports.thresholds = function(_){
		if(typeof _ === 'undefined') return _thresholds;
		_thresholds = _;
		return this;
	}
	exports.domain = function(_){
		if(typeof _ === 'undefined') return _domain;
		_domain = _;
		return this;
	}
	exports.ticksX = function(_){
		if(typeof _ === 'undefined') return _ticksX;
		_ticksX = _;
		return this;
	}
	exports.ticksY = function(_){
		if(typeof _ === 'undefined') return _ticksY;
		_ticksY = _;
		return this;
	}
	exports.tickFormat = function(fn){
		if(typeof fn === 'undefined') return _tickFormat;
		_tickFormat = fn;
		return this;
	}
	exports.maxY = function(_){
		if(typeof _ === 'undefined') return _maxY;
		_maxY = _;
		return this;
	}


	return exports;

}

export default Histogram;