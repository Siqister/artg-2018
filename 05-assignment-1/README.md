# Week 5 Assignment 1: Introduction to `Promise`

In this assignment, you'll be introduced to a powerful feature of ES6, `Promise`, which we will use to manage asynchronous processes in our project. Much of this assignment requires you to simply observe and make sense of existing code.

## Before attempting this assignment
Take a look at this "Promises for dummies" [link](https://scotch.io/tutorials/javascript-promises-for-dummies) before attempting the assignment. For those of you who are more ambitious, I recommend this [Google Developers article](https://developers.google.com/web/fundamentals/primers/promises). It's ok if not everything makes sense. Please write down your question and we'll take them up in class.

## Basic motivation
Because Javascript is "single-threaded" (in that it can only do one thing at a time), we need to deal with asynchronous processes i.e. those take some unspecified amount of time, such as requesting a file from a server. Otherwise, the whole program hangs up while we are waiting for the process to finish.

Traditionally, this is dealt with with the "callback function" pattern. Observe
```js
d3.csv('somefile.csv', parse, dataloaded)
```
`dataloaded` is a **"callback"** function, in that it will execute **only after** the csv file has been imported and parsed. 

However, this is not ideal in some situations. For one, the result of the `d3.csv` operation is accessible only within the callback function. The two are coupled, and you can't simply "request csv file now and use it later". Another situation is when we need to manage two or more asynchronous processes.

Let's say we need the result of 3 .csv files: `somefile.csv`, `someotherfile.csv`, `yetanotherfile.csv`, we would have to do it like this:
```js
d3.csv('somefile.csv', parse, (err, data1) => {
		d3.csv('someotherfile.csv', parse, (err, data2) => {
				d3.csv('yetanotherfile.csv', parse, (err, data3) => {
						console.log(data1);
						console.log(data2);
						console.log(data3);
						//do something with data1, data2, data3
					})
			})
	})
```

## Starting the assignment
Run the following
```
git fetch upstream
git checkout remotes/upstream/master 05-assignment-1
```

Then follow the instructions in `src/index.js`. Look out for `/*** Your code here ***/`.


