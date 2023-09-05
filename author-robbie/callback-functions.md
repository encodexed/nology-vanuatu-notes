# Functions

- Functions in Javascript are first class citizens
- Functions are values:

  - Functions can be saved to variables

  ```js
  const myFunction = () => {
  	return 10;
  };

  const myOtherFunction = function () {
  	return 10;
  };
  ```

- Functions can be the return value of other functions...
  - We can use <ins>closures</ins> to do some cool stuff
- Functions can be parameters to other functions

## Callback Functions

- A function that is passed into another function as an argument

```js
const add = (a, b) => a + b;
const subtract = (x, y) => x - y;

const calculate = (num1, num2, callback) => {
	console.log({ num1, num2, callback }); // cute little console trick
	return callback(num1, num2);
};
```

- And now passed in anonymously

```js
console.log(calculate(5, 9, (c, d) => c * d));
```

- You could use the function keyword in here instead of an arrow function but it is an old and harder way of doing things
