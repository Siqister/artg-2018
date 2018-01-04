console.log('Week 3 Assignment 1');

//3.1
//Make a request using fetch
const trips = fetch('./data/hubway_trips_reduced.csv');
console.log(trips);
//YOUR CODE HERE:
//Access the resolution value of the fetch call with Promise.prototype.then
trips
//	.then(/*MODIFY THIS*/);

//3.2
//Chaining Promise objects
//No need to add any code, just observe what happens
const number = Promise.resolve(5); //this is a Promise whose resolution value is 5
const number2 = number
	.then(function(x){ return x + 2})
	.then(function(x){ return x * 4})
	.then(function(x){ return x - 3})
//What is the resolution value of number2? Is it what you expected? 

//3.3
//Transforming Promise object
trips
//	.then(/*MODIFY THIS*/);

//3.4
//Converting d3.csv call to a Promise
const tripsPromise = new Promise(function(resolve, reject){

	d3.csv('./data/hubway_trips_reduced.csv',function(err,data){
		if(err){
			reject(err);
		}else{
			resolve(data);
		}
	});	

});

tripsPromise
	.then(function(res){
		console.log(res);
	});
