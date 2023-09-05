# Loops

- A way to run the same code multiple times
- Useful to check over or perform functions on arrays and other data structures
- Need to be careful that your loop has a break point or a limit, and doesn't end up being an <ins>**infinite loop**</ins>, which can cause some big issues...

## `for` loops

- A `for` loop requires a variable to keep track of how many times the loop has run and how much it should run

```javascript
for (
  let i = 0; // initiate the variable
  i < 10; // set a limit of iterations
  i++; // increment variable each run
)

for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```

## Using `break`

- If not all iterations of a loop are required, you can use `break` to break out of the loop early
- Using `return` in a function will also break out of a loop, but also the entire function

```javascript
const numbers = [10, 4, 6, 9, 2, 7, 13];

for (let i = 0; i < numbers.length; i++) {
	if (numbers[i] / 3 === 3) {
		console.log("condition met!");
		break; // break out!
	}
}
```

## Using `continue`

- Like using `break`, but it will not break out of loop
- Use `continue` to stop the code block, and move to the next iteration

```javascript
let word = "respirator";
let wordWithoutR = "";

for (let i = 0; i < word.length; i++) {
	if ((word[i] = "r")) {
		continue; // move to next iteration
	}
	wordWithoutR += word[i];
}
```

## `while` loops

- A `while` loop also requires a break condition based on a variable to prevent it from running forever
- It typically has the same outcome as a `for` loop but is gives a little more freedom, but is a little less safe to use
- This type of loop is better for when you're unsure how many times to run the code

```javascript
while (true) {
	counter++;
	if (counter >= 20) {
		break;
	}
}
```

```javascript
let input = prompt("please say 'hi'");

while (input !== "hi") {
	input = prompt("please say 'hi'");
}
```
