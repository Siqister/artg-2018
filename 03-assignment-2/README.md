# Implementing Reusability: First Attempt

In class this week, we created an activity timeline of hubway trips across the system. This was a useful review of d3's data transformation (layout) and shape generator pipeline.

What if we wanted to implement small multiples of this activity timeline, one for each station?

## To start the project
Navigate to `/03-assignment-2` folder, then run:
```
npm install
npm start
```

## In `index.js`
There is already a `<div>` element created for each station, using the enter-exit-update pattern. Inspect each element of the data that is bound to each element. Does it make sense?

## In `timeline.js`
Here, the `timeline` function takes an array of trips data, and creates an acitivty timeline visualization. However, this function is not resuable. For one thing, it will only create this visualization on the `<div id="timeline-multiple">` element. Also, it will not update the visualization if called again with a different array of trips data.

Your job is to refractor the `timeline` function to make it reusable, so that 1) you can use it create small multiples of activity timelines for each station, and 2) it can be used to update these timelines on data change.

Accomplishing 2) will require some nuanced thinking. Remember that to update the visualization, we will be calling `timeline` over and over again. Take a look, for example, at lines 10 and 14. How many `<svg>` and `<g>` elements will we end up appending? How can we fix this? Take a crack at the problem and we'll discuss solutions to this in class.