# Week 3 Assignment 2 - Implementing Reusability: First Attempt

In Assignment 1, we tried to capture all of the logic for creating an activity histogram into a function. In this assignment, that function, `activityHistogram`, has been moved into its own module in `/src/activityHistogram.js`.

With this reusable module/function, we are able to easily create "small multiples" of the activity histogram, one for each station.

While mostly similar to what we tried to do in Assignment 1, this `activityHistogram` module differs in several regards. **The code for it is complete; your job is to carefully parse through this code and make sure you understand how it works.** Please bring your questions to class on Friday.

## To start the project
Navigate to `/03-assignment-2` folder, then run:
```
npm start
```

## In `index.js`
To create small multiples, we first have to create 1) the correct data structure and 2) `<div>` containers. Lines 12-30 does that, using `nest` and the enter-exit-update pattern.

**What is passed into `activityHistogram` function as arguments?**

## In `activityHistogram.js`

### Building DOM scaffolding
Because we can't append `:svg` elements directly to `<div>`, we first have to create the right DOM scaffolding i.e. an `<svg>` element. Lines 6-22 does that. Two questions you should clarify to yourself: what is `this` in the context of this function? And also, what's the point of lines 12-14?

```js
const svg = d3.select(this)
	.selectAll('svg')
	.data([1]); //particularly this line?
```

