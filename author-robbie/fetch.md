# Fetch

- Another webAPI similar to DOM

## HTTP Requests

- A way of communicating with a server
  - To retrieve or send information over the internet
- You can view HTTP Requests in the Network tab of your browser's developer tools
- You can send/receive HTML, CSS, JS over the internet as part of your normal webpage loading experience
- More importantly, we can send/receive JSON
- A request is made of a `verb`, `url`, `body` and `headers`
- A response is made up of a `body`, `cookies` (optional), `headers` and `status code`

## AJAX

- The idea of partial page updates surfaced around 1999
- <ins>A</ins>synchronous <ins>J</ins>avaScript <ins>a</ins>nd <ins>X</ins>ML
- XMLHttpRequest was a way to make HTTP request in JavaScript
  - We would use the resulting XML to update our DOM
- JSON was standardised much later in 2013

## Fetch

- Introduced in ES6
- A much nicer way of doing HTTP requests
- Most APIs now use JSON
- Returns a Promise
- Downside of fetch: we don't get an error automatically with a bad request (without a library like Axios)
  - You can get some pretty unintuitive error messages if trying to do complicated things with data that doesn't even make it past the first step

## Using fetch

- Using `then`

```js
const url = "https://pokeapi.co/api/v2/pokemon/charizard";
fetch(url)
	// We get back a response object with a method .json which, if the body is json, converts into a JS object
	.then((response) => response.json())

	.then((data) => console.log(data));
```

- Using an `async` function

```js
const getRandomUser = async () => {
	const response = await fetch("https://randomuser.me/api");
	// wait for the response

	if (!response.ok) throw new Error("Oops");
	// anticipate errors

	const data = await response.json();
	// turn response into data
};
```

## Request options

- You can make extra requests of your response with headers
- This is well-documented on MDN

```js
const fetchJoke = async () => {
	const response = await fetch("https://icanhazdadjoke.com", {
		headers: {
			Accept: "application/json",
		},
	});
};
```
