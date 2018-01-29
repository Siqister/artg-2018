# Week 3 Assignment 1 - Trip Activity by Time of the Day

With this assignment, you will build a visualization of Hubway activity levels by time of the day, using the `d3.histogram` layout module. First, if you don't know what is a histogram, please read up on it [here](https://en.wikipedia.org/wiki/Histogram). 

![Histogram](./trip-activities.jpg?raw=true "trip activities")

You are only asked to complete a small part of this task. However, **it is important that you understand what the rest of the code is trying to do.**

## To start the project
As a reminder, to fetch this project from the main coure repo, do this in console:
```
git fetch upstream //upstream should refer to https://github.com/Siqister/artg-2018.git
git checkout remotes/upstream/master 03-assignment-1
```

Navigate to `/03-assignment-1` folder, then run:
```
npm start
```

## In `parse.js`
Note that this function now produces two additional data attributes per trip: `time_of_day_0` and `time_of_day_1`. Without even knowing the syntax of how `Date` objects work, you should be able to guess that these two attributes represent, in decimals, what time of the day this trip took place. For example, 23.5 == 11:30PM.

## In `index.js`
We are now trying to gather up all the logic of drawing the activity histogram into the `activityHistogram` function, and these include:
- data transformation
- Mining for maximum and minimum, and setting up scales
- Creating axis generators
- Building DOM

Then, lines 26-28 calls the function. Note the use of `selection.datum()` instead of `selection.data()`. The former binds one element of datum to the selection (one to one), while the latter binds n elements of an array (many to many);
```js
plot
	.datum(trips) //note: .datum(), not .data()
	.each(activityHistogram);
```

### Data transformation with `d3.histogram`
Can you look at this block of code and figure out what it is doing?
```
const histogram = d3.histogram()
	.value(d => d.time_of_day0)
	.thresholds(d3.range(0,24,.25));
const tripsByQuarterHour = histogram(data)
	.map(d => {
		return {
			x0:d.x0, //left bound of the bin; 18.25 => 18:15
			x1:d.x1,
			volume:d.length
		}
	});
```

### Building DOM with enter-exit-update **Your code here**
Lines 70-77 is your main task. Here, build out the histogram with `<rect>` elements.

### Using the `d3.axis` generators
Can you look up lines 80-102 and figure out what's happening?