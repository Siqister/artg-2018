# Week 3 Assignment 1 - Trip Activity by Time of the Day

With minimal modifications, the code we produced for in-class activity 3 can be used to display a histogram of time activity by time of the day. 

## To start the project
Navigate to `/03-assignment-2` folder, then run:
```
npm start
```

## In `parse.js`
Note that this function now produces two additional data attributes per trip: `time_of_day_0` and `time_of_day_1`. Using a histogram layout, you can bin the array of trips based on either one of these attributes.

## In `index.js`
Please follow best practice with the enter - exit - update pattern when appending DOM elements.
