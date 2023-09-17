# Async / Await

- `async` ... `await` is _syntactic sugar_ for Promises
- Introduced in ES7 - 2017

## Why was it introduced/preferred?

- It's easier to read, and easier to <ins>reason about</ins>
- It saves us from Promise Hell
- More readable, modern syntax
- Error handling is a bit more versatile

## What are the issues?

- It's easy to wait longer for things than you need to

## The `async` keyword

- Turns any function into a function that returns a promise

```js
const randomNumber = async () => {
	const random = Math.floor(Math.random() * 10);
	if (random < 5) {
		throw new Error("Too small");
	} else {
		return random;
	}
};

randomNumber()
	.then((number) => console.log("The number was " + number))
	.catch((e) => console.warn(e.message));
```

```js
const greet = async (input) => {
	console.log("Hello there" + name);
};
```

## The `await` keyword

<!-- Will fix these notes soon! -->

- Helps us write our code like its synchronous!
- Helps to also chain together `.then`

```js
const smallTalk = async (input) => {
  const name = await rememberName(input).catch(() => 'friend');
  const location = await rememberLocation(name).catch(() => undefined);
  !location ? console.log(`...`) : console.log(`...`);
```

### Errors

```js
const greet = async (input) => {
	const name = await rememberName(input).catch(() => "friend");
	// await is like putting .then
	// .catch still catches any errors, in this case provides default value
	console.log("Hello there" + name);
};
```

- You can also use `try`/`catch`
