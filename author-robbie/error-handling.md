# Error Handling

## What happens when Javscript encounters and error?

-

## How do we handle errors and exceptions?

- We can use `try`/`catch`:
  - Use the `catch` block to handle the error
  - If we are providing error information to the user we should to it <ins>_**gracefully**_</ins> and meaningfully
    - Things like styling the input fields with a red border, or

```js
try {
	// a block of code that might throw an error
} catch (error) {
	// a block of code that will catch any errors from the 'try'
} finally {
	// an optional block of code that ALWAYS runs, whether an error happens or not
}
```

### Useful things to do in the `catch` block, with the `error` parameter

```js
// Just the error without the stack trace
console.log(error.message);
console.warn(error.message); // same but in yellow
console.error(error.message); // same but in red
```

## Throwing our own errors

```js
const myError = new Error("oh no");
throw myError;
```

```js
const divide = (a, b) => {
	// if B is zero
	if (b === 0) {
		throw new Error("Cannot divide by zero");
	}
	return a / b;
};
```

- It's nice to categorise our errors because we can deal with them in different ways

```js
// make it a module perhaps? file: errors.js
export class ZeroDivisionError extends Error {
	constructor(message) {
		super(message);
		// take the message argument and parse it into our regular Error
		// super refers to the parent class: Error (child: ZeroDivisionError)
	}
}
```

```js
try {
	// something
} catch (e) {
	if (e instanceof ZeroDivisionError) {
		// instaceof looks at the constructor function
		console.warn(e.message);
	} else {
		console.error(e.message);
	}
}
```
