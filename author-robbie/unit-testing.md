# Unit Testing

## What is unit testing?

- Unit testing refers to testing individual parts of code in isolation
- Typically, we are just testing one function
- There are different forms of testing, like end to end testing, which tests whether the entire flow of the program works

## Why do we test our code?

- Gives us confidence that the function works correctly!
- We test our code in the development phase
- Collaboration: making sure our code didn't break other parts of the code
- Automation: saves us time in our day to day operations, and ensures our tests are always the same and equal
- Documentation: writing good tests ensure we get a good context for default behaviour and edge cases of our code
- Early bug detection

## TDD

- <ins>T</ins>est <ins>D</ins>riven <ins>D</ins>evelopment
- We consider what we want from our code, for example:
  - What role does the function play?
  - What inputs will it take?
  - What outputs will it give?
- So we gather the requirements first, then we write the tests, then we write the code a piece at a time to pass each test, then we might refactor if necessary

## Advantages of TDD

- Writing code first and then writing the tests may make us biased towards just making sure our current code works
  - Writing the tests first makes sure you meet every single requirement each step of the way
- Could lead to better, more modular and reusable code
  - Promotes writing small functions that only have one role
- Promotes documentation and collaboration

### Disadvantages

- A criticism from some people of TDD is that it pushes out how long it takes to get to actually writing code

## Adding JEST to our projects

<a href="https://jestjs.io/docs/getting-started">Set up page</a><br/>
Most of the below steps can be found on the documentation page. These should work for you, hopefully...

1. Setup your node project with Jest

```bash
# if starting a new project, or your project hasn't been initiated with node yet
npm init

# installs jest - make sure to call at same level as package.json file
npm i --save-dev jest
```

2. Create a file named `.gitignore`, and add `node_modules` to it to prevent them being uploaded to github

```js
// file: .gitignore
node_modules;
```

3. Install Babel so that both old and new module imports can be read in Node

```bash
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

4. Create a `babel.config.js` file and configure it, as so:

```js
module.exports = {
	presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
```

5. Modify the `package.json` file to include Jest

```js
// file: package.json
"scripts": {
		"test": "jest"
	}
```

## Testing the... tests

6. Create a `.js` file and a `.test.js` file

```js
// sum.js
function sum(a, b) {
	return a + b;
}
module.exports = sum;
```

```js
// sum.test.js
const sum = require("./sum");

test("adds 1 + 2 to equal 3", () => {
	expect(sum(1, 2)).toBe(3);
});
```

7. Finally, we can:

```bash
npm run test
# or
npm run test sum
```

## Some example tests' syntax

```js
// sum.js
export function sum(...args) {
	if (args.length === 0) {
		throw new Error("no arguments given");
	}

	const argsAreNumbers = args.every((arg) => typeof arg === "number");
	if (!argsAreNumbers) {
		throw new Error("arguments must all be numbers");
	}

	const total = args.reduce((sum, value) => sum + value);
	return total;
}
```

```js
// sum.test.js
import { sum } from "./sum";

describe("makes sure arguments are valid", () => {
	it("throws an error when no arguments given", () => {
		expect(() => sum()).toThrow("no arguments given");
	});

	it("throws an error if not all arguments are numbers", () => {
		expect(() => sum("string", undefined)).toThrow(
			"arguments must all be numbers"
		);
		expect(() => sum(true, false)).toThrow("arguments must all be numbers");
	});
});

test("return type must be number", () => {
	expect(sum(2, 2)).toStrictEqual(4);
});

describe("makes sure basic arithmetic is intact", () => {
	it("expects the function to add two numbers together correctly", () => {
		expect(sum(2, 2)).toBe(4);
		expect(sum(20.5, 18.5)).toBe(39);
		expect(sum(-1, -2)).toBe(-3);
	});

	it("returns the sum for all arguments given", () => {
		expect(sum(2, 3)).toBe(5);
		expect(sum(2, 3, 4)).toBe(9);
		expect(sum(2, 3, 4, 5, 6, 7, 8, 9, 10)).toBe(54);
		expect(sum(-1)).toBe(-1);
	});
});
```
