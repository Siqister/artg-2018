import {select} from 'd3';

function SomeModule(){

	let svg;
	let circleNode;

	function exports(){
		const root = this;
		const width = this.clientWidth;
		const height = this.clientHeight;

		svg = select(root)
			.selectAll('svg')
			.data([1]);
		svg = svg
			.enter()
			.append('svg')
			.merge(svg)
			.attr('width',width)
			.attr('height',height);

		circleNode = svg
			.selectAll('circle')
			.data([1]);
		circleNode = circleNode.enter()
			.append('circle')
			.merge(circleNode)
			.attr('r',10)
			.attr('cx',0)
			.attr('cy',height/2);
	}

	exports.changeState = state => {
		circleNode.transition()
			.attr('cx', state);
	}

	return exports;

}

export default SomeModule;