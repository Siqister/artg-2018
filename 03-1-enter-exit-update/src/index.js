import * as d3 from 'd3';
import './style.css';

//Observe the import syntax
import {parse} from './utils';

console.log('Week 3');

//Set up 
const margin = {t:20, r:200, b:20, l:200};
const w = d3.select('#plot').node().clientWidth;
const h = d3.select('#plot').node().clientHeight;
const width = w - margin.l - margin.r;
const height = h - margin.t - margin.b;

const plot = d3.select('#plot').append('svg')
	.attr('width',w)
	.attr('height',h)
	.append('g')
	.attr('transform',`translate(${margin.l},${margin.t})`);

//Scales
const scaleRadius = d3.scaleSqrt().domain([0,100]).range([0,150]);

//Import and parse data
d3.csv('./data/olympic_medal_count.csv', parse, function(err,data){

	console.log(data);

	//Buttons
	d3.select('.container').append('button').html('1900').on('click',function(){
		const medalsCount1900 = data.map(function(d){
			return {
				country:d.country,
				count:d.count_1900
			}
		});

		redraw(medalsCount1900);
	});

	d3.select('.container').append('button').html('1960').on('click',function(){
		const medalsCount1960 = data.map(function(d){
			return {
				country:d.country,
				count:d.count_1960
			}
		});

		redraw(medalsCount1960);
	});

	d3.select('.container').append('button').html('2012').on('click', () => {
		//Using arrow functions, much more concise
		redraw(data.map(d => ({country:d.country, count:d.count_2012})));
	});


});

function redraw(count){

	const top5 = count.sort(function(a,b){return b.count - a.count}).slice(0,5);

	console.log(top5);

	//Update selection
	const countryNodeUpdate = plot
		.selectAll('.country')
		.data(top5, function(d){ return d.country; });

	const countryNodeEnter = countryNodeUpdate.enter()
		.append('g')
		.attr('class','country') //what happens if we miss this line?
	countryNodeEnter
		.append('circle')
		.attr('r', 0)
		.style('fill','blue')
		.style('stroke','black')
		.style('stroke-width','2px');
	countryNodeEnter.append('text').attr('text-anchor','middle').text(function(d){return d.country});

	countryNodeEnter.merge(countryNodeUpdate)
		.transition()
		.duration(1000)
		.attr('transform', function(d,i){
			return `translate(${i * width/4},${height/2})`
		})
		.select('circle')
		.attr('r', function(d){ return scaleRadius(d.count)})
		.style('fill','white');

	countryNodeUpdate.exit().remove();

}
