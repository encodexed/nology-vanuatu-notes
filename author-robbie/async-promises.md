# Asynchronous code / Promises

## The state of Javascript

- Javascript is a single threaded language, meaning it can only do one thing at a time (sort of...)
- If you block the main thread you block JS from doing anything more
  - Generally, this is bad for web applications
  - Making users wait is typically not good UX
- The browser and Node, as it turns out, are both multi-threaded, so they have the ability to do more stuff at once

## Making code asynchronous

- `setTimeout` can defer code but doesn't prevent a script from progressing
- It sends code to the queue and tells it to run when the main script/thread is available, no sooner than the optional delay parameter

## Let's talk about Promises

- In real life, an agreement that we either keep or break, and they usually have some kind of timeframe
- In JS, it's an object!
- As a junior, you won't be writing much code that produces Promises, you will rather be dealing with them

## Using Promises

```js
// this creates a promise that resolves instantly - it's like setTimeout with delay: 0
const myFirstPromise = Promise.resolve("Hello World");

// remember you cannot actually get data out of a Promise, you need to use a method for that
```

- It has three potential states:
  - Pending: we don't know the outcome yet
  - Fulfilled: it did what we expected
  - Rejected: it didn't work out
- Promises can only change their state once
  - They can change from Pending to either other state, but not from Rejected to Resolved, etc.
- It has a few methods we typically use:
  - then: a function we run when we get the value back
  - catch: a function to handle the error
  - finally: a function that runs either way
- _**Promises cannot be cancelled. They must be fulfilled.**_

```js
// using then to get the value out, ONCE IT HAS RESOLVED
myFirstPromise.then((value) => console.log(value));
```

```js
// using catch to catch errors
const myBrokenPromise = Promise.reject(new Error("No 1:1"));
myBrokenPromise.catch((error) => console.warn(error.message));
```

## Chaining `.then`

- You can chain `.then` with `.catch` to handle both resolution and rejection
- Chaining `.then` is possible because all functions here return a Promise

```js
// a fake set of function for validating passwords
const validateString = (input) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (typeof input !== "string") {
				reject(new Error("Password must be a string"));
			} else {
				resolve(input);
			}
		}, 1000);
	});
};

const validateLength = (input, requiredLength) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (input.length < requiredLength) {
				reject(new Error("Password length must be at least" + requiredLength));
			} else {
				resolve(input);
			}
		}, 1000);
	});
};

const validateCapitals = (input) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (/[A-Z]/.test(input)) {
				resolve(input);
			} else {
				reject(new Error("Password must contain at least one capital"));
			}
		}, 500);
	});
};

// We can also write a function that doesn't return a promise
const validateSpecialChars = (input) => {
	const specialChars = ["!", "@", "#", "$", "%", "^", "&", "*"];
	if (specialChars.some((char) => input.includes(char))) {
		return input;
	}
	throw new Error("Password must contain at least one special character");
};

// syntax for running this code
// it reads like instructions
valdateString("hello")
	.then((value) => validateLength(value, 6))
	.then(validateCapitals) // possible with just the one parameter required
	.then(validateSpecialChars)
	.then((value) => console.log("The password is" + value))
	.catch((e) => console.log(e.message));
// this .catch will catch any errors from any of the .thens
```

## Using `.all()`

- A way to fire off many promises at once

```js
const rememberName = (input) => {
	return new Promise((resolve, reject) => {
		setTime(() => {
			if (typeof input !== "string") {
				reject(new Error("Stop it Elon, use real names"));
			} else {
				resolve(input);
			}
		}, 2000);
	});
};

// this works fine BUT its slow, 2 seconds per every new name
// we have to wait for each promise to resolve before moving on
const names = [];
rememberName("Robbie")
	.then((name) => {
		names.push(name);
		return rememberName("Sam");
	})
	.then((name) => {
		names.push(name);
		return rememberName("Pamela");
	});
```

```js
// this will happen instantaneously
// we are pushing promises into an array, sending them all off to do their thing
const namePromises = [];
namePromises.push(rememberName("Robbie"));
namePromises.push(rememberName("Robbie"));
namePromises.push(rememberName("Robbie"));
namePromises.push(rememberName("Robbie"));
namePromises.push(rememberName("Robbie"));

// Promise.all() => takes in an array of promises and resolves as a single promise: an array of the results
const namesP = Promise.all(namePromises);
namesP.then((names) => names.forEach((name) => console.log(`Hello ${name}`)));
```

- This is much faster but the downside is errors
- If you have even just one error in the `.all`, it breaks everything

## Using `.allSettled`

<!-- Will fix these notes soon! -->

## Using `.race`

- The first promise to settle is the one we use
- This includes if the first promise to settle is an error/rejection
- The other promises will continue to resolve in the background

```js
const pickNumber = (delay) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const randomNumber = Math.floor(Math.random() * 100);
			resolve(randomNumber);
		}, delay);
	});
};

const numberP = Promise.race([
	pickNumber(10000),
	pickNumber(2000),
	pickNumber(100),
]).then((value) => console.log(value));
```
