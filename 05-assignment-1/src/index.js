import * as d3 from 'd3';

console.log('Week 5 Assignment 1: Introduction to Promises');

/***
	5.1 Basic terminology
***/
//Just observe this part

//A Promise object is literally a "promise" of a future value. When created, a Promise object is "pending", 
//but once the future value is available, the Promise object is "resolved"
//otherwise, if there is some error, the Promise object is "rejected"

//5.1.1 To create a Promise that "promises" a future value of 5
const somePromise = new Promise(function(resolve, reject){

	//Note that:
	//the Promise constructor function take in a function as argument
	//That function itself takes two functions, resolve and reject

	//Code here will run immediately
	//How do we change the "resolved" value?
	/*** YOUR CODE HERE ***/
	resolve(5);
	/*** YOUR CODE HERE ***/

}); //Note that this Promise will resolve a value of 5, and will never reject
console.log(somePromise);

//5.1.2 To access the Promised, "resolved" value, use Promise.then()
somePromise.then(function(res){
	console.log('The resolution value is ' + res);
}); 

/***
	5.2 Construct your own Promise
***/
//Construct a Promise object that immediate resolves a string "Hello world"

/*** YOUR CODE HERE ***/



/*** YOUR CODE HERE ***/

//There is shortcut to creating Promises that resolve and reject *immediately*
//Just observe this
const resolveHelloWorld = Promise.resolve('Hello world');
const rejectHelloWorld = Promise.reject(new Error("Hello world"));

/***
	5.3 Access resolve and reject values
***/
//How do you access the resolved "Hello world" and rejected error from above? Please console.log them out

/*** YOUR CODE HERE ***/



/*** YOUR CODE HERE ***/

/***
	5.4 Promises don't have to resolve or reject immediately
	In fact, the main use case of Promises is to use them to manage asynchronous processes, like requesting files
***/
//Just observe the following
const dataPromise = new Promise((resolve, reject) => {

	//this will run immediately
	d3.csv('./data/hubway_stations.csv', d => d, (err, stations) => {

		if(err){
			reject(err);
		}else{
			resolve(stations);
		}

	});

});

//What are the resolved value and rejection error of "dataPromise"?

/***
	Next we'll look at some of the features of Promises that makes them more powerful, like chaining and managing multiple async processes
***/









