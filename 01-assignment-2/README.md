# Data Import, Parse, and Basic Discovery Tasks with the Hubway Dataset

## Motivation
In this assignment, you will review and practice two basic sets of capabilities related to the acquisition, cleanup, transformation, and discovery of the data.
* Importing .csv data with `d3.csv`
* Data transformation with the `filter`, `sort`, `map`, and `slice` array methods, as well as `d3.nest`
The second part is especially important. Being able to work effectively with basic data structures like arrays is foundational to more advanced data visualization work (I cannot emphasize this enough!) Please take your time to work through the exercises, consult online documentation, and only feel free to compare your work with my posted solutions after you've made your own attempt. I will take up any questions in class.

## Importing data with `d3.csv`
This is a relatively simple task. The only slight complication is converting a date string to a javascript `Date` object. Fortunately, since the date string is properly formatted, we only need to run `new Date(dateString)` to make the conversion.

## Data transformation (tasks 2 through 5)
You will make liberal use of the `filter`, `sort`, `map`, and `slice` array methods throughout the class. One important note is that certain array methods return entirely new arrays without disturbing the existing array, while other methods (notably `sort` and `splice`) modifies, or "mutates", the existing array in place.

Mutating existing arrays is a source of many subtle bugs, and should be used carefully.

Because it returns a new array, one interesting (and very useful) property of `Array.prototype.slice` is that it can be used to duplicate an array:
```js
const duplicate = existingArray.slice();
console.log(duplicate === existingArray); //false
```

