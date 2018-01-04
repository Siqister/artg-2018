# `fetch` and `Promise`

So far we've mostly been using `d3.csv` and `d3.json` to request local data resources. But what if we need to interact with data sources differently? With this assignment, we'll look at using `fetch` to request network resources, and introduce the concept of javascript `Promise`.

## `fetch` basics
As its name implies, `fetch` makes an request for and fetches some network resource (csv, json, or some other data source). The API is in fact relatively simple. To make a request:
```js
fetch(someUrl)
```
Well, nothing happens, yet. But if you assign the return value of `fetch` to a constant and log it out, you'll see in the console that `fetch` returns a `Promise`.

## Introduction to `Promise`
So `fetch` returns a `Promise`, and a `Promise`, according to its API [...], is a container of a future value.

It's ok if this doesn't make any sense yet, but think of it this way: acquiring data is an asynchronous process i.e. it takes time. When you first make a `fetch` request, it will not return the data right away, but will resolve the data sometime in the future. Think of the parallel process of importing data with `d3.csv`:
```js
d3.csv(someUrl, callback)
```
where `callback` is a function that will be invoked when the csv data has been imported and parsed. There are many parallels between `fetch` and `d3.csv`. In fact, `fetch` is a fairly recently incorporated part of core javascript that standardizes the protocol for asynchronous network requests.

### Accessing the Resolution Value of `Promise`
So if a `Promise` object contains a future value (called the "resolution value"), how do we access it? With the `Promise.prototype.then` method:
```js
somePromise
	.then(function(res){
		console.log(res);
	});
```
Try this out in part 3.1. If `fetch` returns a `Promise` object, what is its resolution value? Is it what you expected?

### `somePromise.then()` is another `Promise`
If you `return` some value "x" within the `.then` callback of a `Promise`, it becomes another `Promise` object that resolves to "x". What this means is that you can chain a number of `Promise` objects together, passing their resolution values down a pipeline and transforming it along the way.
```js
somePromise //resolves x1
	.then(function(x1){
		return x1 + 2;
	}).then(function(x2){
		return x2 * 3;
	}).then(function(x3){
		return x3 - 5;
	}).then(function(res){
		console.log(res);
	});
```
You can observe this in action with 3.2.

### Resolution value of `fetch`
