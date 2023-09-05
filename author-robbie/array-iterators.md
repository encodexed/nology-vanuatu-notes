# Array methods/iterators

- An array iterator is a method on an array
- They always take a callback function as an argument
- This callback will be run on every element of the array

## Benefits of iterators

- Chainable! Since they are methods, they can be chained
- They _potentially_ are more efficient than a regular loop
- Easier to read
- Less chance of making a mistake

## The `map` iterator

- Creates a new array from the results of calling a provided function on each element of the original array
- Behind the scenes, the `map` iterator is just another variety of loop

```js
const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map((num) => num * 2);
// output: [2, 4, 6, 8, 10];
```

```js
const triple = (number) => number * 3;
const tripledNumbers = numbers.map(triple);
```

## Chains

```js
const newScores = testScores.map((x) => x + 1);
const percentages = newScores.map(
	(score) => Math.round((score / 46) * 100) + "%"
);
```

- Because we are returning arrays, we can call methods straight away on the new array

```js
const percentages = testScores
	.map((score) => score + 1)
	.map((score) => Math.round((score / 46) * 100) + "%");
```

- We can keep this dynamic by inserting another function
- We need to be very careful when dealing with more than one parameter in a function however

```js
const calcPercentage = (score, max) => {
	return Math.round((score / max) * 100) + "%";
};

const percentages = testScores
	.map((score) => score + 1)
	// .map(calcPercentage);
	// problematic without parameters added, causes unexpected consequences if more than one parameter
	.map(() => calcPercentage(score, 46));
```

## The `filter` iterator

- Takes a special kind of callback function called a predicate
  - A predicate is a fancy word for a function that returns a boolean
- Therefore, running a filter only returns values that pass the test you specify
  - The function body is a conditional in the end

```js
const testScores = [33, 20, 45, 39];
const passingScores = testScores.filter((score) => score >= 35);
// output: 45, 39;
```

## The `every` iterator

- Similar to filter, but doesn't filter out values
- Rather, it returns a boolean that tells us if _every_ predicate test returned true
- The process will end immediately if it comes across a false value - it is <ins>**fast to fail**</ins>

```js
const testScores = [33, 22, 45, 39];
console.log(testScores.every((score) => score > 25));
// output: false
```

## The `some` iterator

- The opposite of `every`, returns if ANY value passes as true
- It is <ins>**fast to pass**</ins>

```js
const testScores = [33, 22, 45, 39];
console.log(testScores.some((score) => score > 25));
// output: true
```

## The `find` iterator

- Very similar to `some` but takes a predicate and returns the <ins>first</ins> truthy value
- Also fast to pass
- Returns `undefined` if not found

```js
const firstEven = [1, 2, 3].find((num) => num % 2 === 0);
// output: 2
```

## `.reduce`

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce">Docs for `.reduce`</a>

- A powerful and difficult method to implement
- Like our multitool - we can turn our array into anything we want
  - A number, a string, an object...
- The name <ins>reduce</ins> comes from reducing an array into a single thing

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, nextValue) => accumulator + nextValue);

/* process:
 * accumulated: 1, next: 2
 * accumulated: 3, next: 3
 * accumulated: 6, next: 4
 * accumulated: 10, next: 5
 */
```

```js
const acronymGenerator = (phrase) => {
	const words = phrase.split(" ");
	return words.reduce((acronym, nextWord) => {
		const firstLetter = nextWord.charAt(0).toUpperCase();
		acronym += firstLetter;
		return acronym;
	}, "");
};

console.log(acronymGenerator("automatic teller machine"));
// output: 'ATM'
```
