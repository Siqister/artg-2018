console.log('Week 2 Assignment 2');

//2.1
function foo(){
	console.log(this); //window object
}
foo();

//2.2
const someObj = {
	prop1: 'some value',
	foo: function(){
		console.log(this);
	}
}
someObj.foo();

//2.3
//A slight twist on 2.2
const bar = someObj.foo;
bar();

//2.4
//We can use function.prototype.bind to copy an existing function and arbitrarily assign its "this" context
const baz = someObj.foo.bind('I am some arbitrary string');
baz();

//2.5
//One frequent use of "this" in relation to d3 is when we use the selection.each function
d3.select(document.querySelector('body'))
	.selectAll('span')
	.data(['a','b','c','d','e'])
	.enter()
	.append('span')
	.each(function(d,i){
		console.log(this);
		console.log(d);
		console.log(i);
	});