# Javascript

## What is Javascript?

- A language that allows us to make web pages interactive
- We can update the web pages as a result of some user actions
- Not only for front-end, we can also use it to create back-end applications (APIs)
- Javascript is often described as:
  - Have dynamic types:
    - Variables in Javascript are not directly associated with any particular value type, and any variable can be assigned and re-assigned any type:
    ```javascript
    let x = 10; // x is a number
    x = "10"; // x is now a string
    x = "true"; // x is not a boolean
    ```
  - Weakly typed:
    - This means it allows implicit type conversion when an operation involves mismatched types, instead of throwing type errors:
    ```javascript
    const num = 42;
    const txt = "1";
    const result = num + txt; // "421"
    // JavaScript casts num to a string, so it can be concatenated with txt
    ```

## Using Javascript in the browser

- Link via script tag in the header
  - Affected by load order as well, good to add defer to make sure it loads last so that all DOM elements that are manipulated by JS have been loaded

```html
<script src="./script.js" defer></script>
```

- Or you could use a script tag in the body

```html
<script>
	console.log("hello world");
</script>
```

## Data Types

- Data types are different ways in which data can be represented
- More importantly, they take up different amounts of memory, and can be stored in memory in different ways
- To check the data type of a value:

```javascript
console.log(typeof 21);
console.log(typeof "21");
console.log(typeof myVariable);
```

### Primitive Data Types

- A data type that can't be broken down any further, and is not made out of other data types
- They are a fundamental building block of a programming language
- Some primitive data types:

#### String

- A representation of textual data

#### Number

- A data type that you can natively apply arithmetic to

#### Boolean

- Simply, a 'true' or 'false' situation
- True is treated as 1, and false as 0, when in an arithmetic context

#### undefined

- A lack of value, more commonly seen as an accident/error

#### null

- A lack of value, more commonly seen with intent

#### Symbol

- An extremely rarely used data-type

## Variables

- There are two commonly used variable types in Javascript:
  - const: short for constant, you can assign a value to it but you can never re-assign or update it
  - let: you can assign it a value and re-assign it a new value later
    - you can also declare 'let' variables without a value:
    ```javascript
    let num;
    // later:
    num = 42;
    ```
- There is also a 'var' variable but it is deprecated and should not be used in modern Javascript

## String Concatenation:

- There are two ways to concatenate variables
  - Regular concatentation:
  ```javascript
  const name = "John" + " " + "Townsend";
  const date = day + ", " + month + ", " + year;
  ```
  - Template literals/strings
    - Use backticks to create a template literal, and ${} to refer to a variable:
  ```javascript
  const first = "John";
  const last = "Townsend";
  const greet = `Hello there, ${first} ${last}!`;
  ```

## Arithmetic Operators

- The basics:

```javascript
3 + 2; // 5
3 - 2; // 1
3 / 2; // 1.5
3 * 2; // 6
```

- Increment/decrement:

```javascript
n++; // n + 1
n--; // n - 1
// You can console.log n++ and ++n and get different outputs, but the end result will still be the same
```

- Modulus/remainder

```javascript
console.log(4 % 2); // 0
console.log(5 % 2); // 1
console.log(13 % 5); // 3
```

- Combinations

```javascript
n += 2; // n = n + 2;
n -= 3; // n = n - 3;
n /= 4; // n = n / 4;
n *= 5; // n = n * 5;
```

## Comparison Operators

- Non-strict comparison (==)
  - Checks for values that are the same, after any necessary typecasting

```javascript
"John" == "John"; // true
42 == "42"; // true
```

- Strict comparison (===)
  - Checks both the values and the types

```javascript
42 === "42"; // false
```

- Not equal to (!= and !==)

```javascript
42 != 42; // false
42 != "42"; // false

42 !== 42; // false
42 !== "42"; // true
```

- Greater/Less than

```javascript
1 < 2; // true
1 > 2; // false
2 >= 2; // true
2 <= 2; // true
```

- And (&&)

```javascript
true && false; // false
true && true; // true
false && false; // false
```

- Or (||)

```javascript
true || false; // true
true || true; // true
false || false; // false
```

## Truthy and Falsey

- When a data type that's not a boolean is contextually treated as a boolean

```javascript
const num = 1; // true
const name = "Robbie"; // true

const empty = ""; // false
const zero = 0; // false
undefined; // false
null; // false
NaN; // false
```

## Control-Flow / Conditional Decision-Making

- Control-flow refers to making decisions based on certain conditions
- Determines which code will run, read from top to bottom
- Remember that as soon as javascript encounters a true condition, the code will run and then <ins>**exit the block**</ins>

### Samples of code

#### If:

```javascript
let bool = true;

if (bool) {
	console.log("This code runs if bool is true/truthy");
	// Code in this block will not run if bool is false/falsey
}
```

#### If/else:

```javascript
let age = 24;

if (age >= 18) {
	console.log("You can buy alcohol");
} else {
	console.log("Come back when you're 18");
}
```

#### If/else if/else:

```javascript
let score = 98;

if (score >= 90) {
	console.log("A grade");
} else if (score >= 80 && score < 90) {
	console.log("B grade");
} else if (score >= 70 && score < 80) {
	console.log("C grade");
} else {
	console.log("Fail");
}
```

#### Multiple conditions in the same check:

```javascript
let country = "Australia";
let age = 19;

if (age >= 21) {
	console.log("You are old enough to drink anywhere");
} else if (country !== "USA" && age >= 18) {
	console.log("You can have a drink outside the US");
} else {
	console.log("You are not old enough to drink anywhere");
}
```

#### Nested conditions:

```javascript
let location = "shops";
let money = 5.5;

if (location === "shops") {
	if (money > 4) {
		console.log("Buy coffee");
	} else if (money < 0.5) {
		console.log("Go home");
	} else {
		console.log("Buy something cheap");
	}
} else {
	console.log("Grab some money and go shopping");
}
```

## Ternary operator

- An alternative to writing an entire if/else block
- Dramatically reduces code length

```javascript
let x = 2;
let y = 2;

x + y === x * y ? console.log("very cool!") : console.log("not so cool...");
// (condition) ? (if true) : (if false);
```

## Switch statement

- An alternative to length if/else if/else blocks
- Works well with one variable being checked
- Doesn't work as well with multiple conditions being checked
- The `break` keyword makes sure that the code doesn't run everything beneath it

```javascript
switch (fruit) {
	case "apple":
		console.log("Make an apple pie");
		break;
	case "banana":
		console.log("Make banana bread");
		break;
	case "orange":
	case "pineapple":
	case "grapefruit":
		// for OR (||) cases
		console.log("Make some juice");
		break;
	default:
		console.log("I don't know what to make");
}
```
