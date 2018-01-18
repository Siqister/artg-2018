# All about functions: scope, `this`, closure

These exercises are designed to (re)familiarize you with how JavaScript functions work. I suggest that you go through the readings posted in the syllabus, and then go through this code. Are all the outputs and behaviors what you expected? If not, why?

## Function scope

Really only three things to remember at this point:
* A function creates a local scope, and variables declared within the local scope is only accessible within the local scope.
* However, an inner scope can access variables from an outer scope.
* Variables declared with `const` and `let` behave differently from `var`, in that they are scoped to the block, created by `{ }`.

## `this`  context in Javascript

The `this` keyword behaves in subtle ways in Javascript. It is important to have an understanding of its behavior in different situations. 

Open up your browser console and observe the value of `this` when calling functions in various ways.

## Closure 