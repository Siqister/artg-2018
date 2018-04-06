# Week 4 assignment 1: reusable timeline

In this assignment, you are going to apply what we learned in class in terms of implementing a reusable module. You will construct a `Timeline` module that visualizes trip volume across time.

Under the hood, this visualization also relies on a histogram, since trips need to be binned at regular time intervals (hour, day, week, or month). We then use `d3.line` and/or `d3.area` to generate the appropriate `<path>` element to represent this data.

Think about what we would potentially like to customize in a module like this. These could include:
- `timeInterval`: the interval at which we bin the trips
- `timeRange`: we are only interested in trips taking place between `[t0, t1]`
- `maxVolume`: we'd like to be able to set the y-scale of this module to an arbitrary number determined by `maxVolume`

Most of the actual logic for this module is already in the (non-reusable) `_timeline` function. Your job is to refactor this code so that it conforms to the pattern we learned in class.