# Javascript - Functions

- A set of instructions/recipe/blueprint of what we want to do with some data
- Allows us to write reusable code that can be re-called whenever we need
- Allows us to break our code down into smaller bites
  - Can be given semantic names to help know what they do
- Helps make code more readable
- Functions without explicit return values will return `undefined` by default
- Functions can be declared anywhere because they are "hoisted" to the top
  - This means you can call a function that has been declared below the call in the code
- A <ins>pure function</ins> is a function that relies solely on its own parameters and variables, and not any global variables.
  - It also doesn't have a side effect - doesn't modify anything of global scope, or call console.log(), for example
  - This is a common interview question

## Some code samples

#### A function with no parameters

```javascript
function sayHello() {
	console.log("Hello!");
}
```

#### A function with a parameter and an explicit return value

```javascript
function introduceYourself(studentName) {
	return "Hi, my name is " + studentName;
}

// to use it:
console.log(introduceYourself("Kate"));
```

## Arrow and Anonymous Functions

- An alternative way of writing functions

```javascript
const sum = (x, y) => {
	return x + y;
};
```

- If the code is short enough inside your function body, you can do this:

```javascript
const sum = (x, y) => x + y;
// skips curly braces and return keyword
```

- Only one parameter? Shorten it even further without parentheses!

```javascript
const addOne = (x) => x + 1;
```

## Scope

- Refers to the accessibility of a variable
  - Local, nested and global scope

#### Local scope

```javascript
if (5 > 4) {
	const x = true;
	console.log(x);
}
// this variable is inaccessible
console.log(x);
```

#### Global scope

- Declared at the highest level and accessible to anywhere below it

#### Nested scope

- The most nested functions will always have access to variables declared in parent functions and global variables, but ancestor functions will not have access to variables declared further into the nest

```javascript
const global = "availableToAll";

const parent = (parentParam) => {
	const parentVar = "availableToChild";

	const child = (childParam) => {
		const childVar = "unavailableToParent";
	};
};
```
