import * as d3 from 'd3';
const crossfilter = require('crossfilter');

function Animation(_){

	//Module internal state and utilities
	let _w;
	let _h;
	let _t = new Date();

	let tripsData;
	let stationData;
	let locationLookup;

	//Projection related
	//Projection
	const projection = d3.geoMercator()
		.scale(250000)
		.center([-71.081543, 42.348560]);
	//Scale
	const scaleSize = d3.scaleSqrt()
		.domain([0,3000])
		.range([3,20]);

	//Crossfilter related
	let cf;
	let dimension_t0;
	let dimension_t1;

	//Canvas animation related
	let ctx;

	function exports(trips, stations){

		//Recompute internal state
		_w = _.clientWidth;
		_h = _.clientHeight;
		projection.translate([_w/2, _h/2]);

		tripsData = trips;

		//Departure and arrival trip volume by station
		const arrivalsByStation = d3.nest()
			.key(d => d.station0)
			.rollup(xs => xs.length)
			.map(tripsData);
		const departuresByStation = d3.nest()
			.key(d => d.station1)
			.rollup(xs => xs.length)
			.map(tripsData);

		//Augment per station data
		stationData = stations.map((station,i) => {
			const [x,y] = projection([station.lng,station.lat]);
			const departureVolume = departuresByStation.get(station.id_short)?departuresByStation.get(station.id_short):0;
			const arrivalVolume = arrivalsByStation.get(station.id_short)?arrivalsByStation.get(station.id_short):0;
			const r1 = scaleSize(departureVolume);
			const r0 = scaleSize(arrivalVolume);
			return {
				...station,
				departureVolume,
				arrivalVolume,
				r0,
				r1,
				x,
				y
			}
		});

		//Set up location lookup
		locationLookup = d3.map(stationData, d => d.id_short);

		//Re-initialize crossfilter
		cf = crossfilter(trips);
		dimension_t0 = cf.dimension(d => d.t0);
		dimension_t1 = cf.dimension(d => d.t1);
		_t = d3.min(trips, d => d.t0);

		redraw();

	}

	function redraw(){

		//Create the right DOM structure
		const root = d3.select(_);

		let svgLayer = root.selectAll('.animation-svg-layer')
			.data([1]);
		svgLayer = svgLayer.enter()
			.append('svg')
			.attr('class','animation-svg-layer')
			.merge(svgLayer)
			.attr('width',_w)
			.attr('height',_h)
			.style('position','absolute')
			.style('top',0)
			.style('left',0);

		let canvasLayer = root.selectAll('.animation-canvas-layer')
			.data([1]);
		canvasLayer = canvasLayer.enter()
			.append('canvas')
			.attr('class','animation-canvas-layer')
			.merge(canvasLayer)
			.attr('width',_w)
			.attr('height',_h)
			.style('position','absolute')
			.style('top',0)
			.style('left',0);
		ctx = canvasLayer.node().getContext('2d');

		//Draw the svg elements
		const stations = svgLayer.selectAll('.station')
			.data(stationData, d => d.id_short);
		const stationsEnter = stations.enter()
			.append('g')
			.attr('class','station');
		stationsEnter.append('circle');
		stationsEnter.append('text')
			.text(d => d.id_short)
			.attr('text-anchor','middle')
			.style('fill','rgb(100,100,255)')
			.style('font-size','8px');
		stationsEnter.merge(stations)
			.attr('transform', d => `translate(${d.x},${d.y})`)
			.select('circle')
			.attr('r', d => d.r0)
			.style('fill','none')
			.style('stroke','rgb(0,0,200)');

		renderAnimationFrame();
	}

	function renderAnimationFrame(){

		dimension_t0.filter([-Infinity,_t]);
		dimension_t1.filter([_t,Infinity]);
		const tripsInProgress = dimension_t1.bottom(Infinity);

		//Draw each tripInProgress
		ctx.clearRect(0,0,_w,_h);
		
		const bikePath2d = new Path2D();
		const linePath2d = new Path2D();
		
		tripsInProgress.forEach(trip => {

			const {station0, station1, t0, t1, bike} = trip;
			if(!locationLookup.get(station0) || !locationLookup.get(station1)) return;

			const s0 = locationLookup.get(station0);
			const x0 = s0.x, y0 = s0.y;
			const s1 = locationLookup.get(station1);
			const x1 = s1.x, y1 = s1.y;
			const pct = (_t.valueOf() - t0.valueOf())/(t1.valueOf() - t0.valueOf());

			const x = (1-pct)*x0 + pct*x1;
			const y = (1-pct)*y0 + pct*y1;

			bikePath2d.moveTo(x+3,y);
			bikePath2d.arc(x,y,3,0,Math.PI*2);

			linePath2d.moveTo(x0,y0);
			linePath2d.lineTo(x1,y1);

		});

		ctx.fillStyle = 'rgb(255,255,0)';
		ctx.strokeStyle = 'rgb(255,255,0)';
		ctx.fill(bikePath2d);
		ctx.stroke(linePath2d);

		_t = new Date(_t.valueOf() + 18000);
		requestAnimationFrame(renderAnimationFrame);

	}

	return exports;

}

export default Animation;
