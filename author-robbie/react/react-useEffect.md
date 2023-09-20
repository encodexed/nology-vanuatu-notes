# `useEffect`

- A hook for performing side effects based on changes to state

## What is a side effect?

- Any actions or behaviours that are not directly related to rendering or UI
- Anything that is outside of React's control
- For example:
  - Making HTTP requests and fetching data
  - Updating the title of the document
  - Setting intervals or timeouts
  - Subscribing to webhooks/websockets, for eg. opening a chatbox in Facebook

## Component Life cycle

- This is a common and pervasive mental model around how React components work
- A bit of a throwback to class-based components

The cycle:

1. Load - Before the component is rendered
2. Mount - The first time the component renders (when it attaches to the DOM)
3. Update - When a component re-renders because of props or state change
4. Unmount - When a component is removed from the DOM

- When a component is unmounted from the DOM, all states tracked inside will stop being tracked

## React 18 and dev mode

- There is an experimental feature in React 18, since about 2022
- It causes components to mount, unmount and re-mount, but **only** in development mode
- There's a new feature in the works to keep components in memory even if we don't see them on the screen
- It's not finished, google for solutions if you're having trouble with it
  - Removing `<React.StrictMode>` from `main.jsx` will help, but that's not desirable
- If your `useEffect` functions run twice, don't stress

## Using `useEffect`

- To run a side effect in a component, we need a hook called `useEffect`
- `useEffect` will take a function, optionally return a cleanup function, and have a second argument that is a dependencies list

```jsx
import { useEffect } from "react";
```

This `useEffect` without a dependencies argument will fire on every render and re-render

```jsx
const Card = () => {
	useEffect(() => {
		console.log("Component rendered or re-rendered");
	});
};
```

This `useEffect` without a dependencies argument will fire on first render only, due to empty dependencies argument:

```jsx
useEffect(() => {
	console.log("Component rendered for the first time");
}, []);
```

This `useEffect` with a dependency argument will fire on the first render and whenever the count state changes

```jsx
useEffect(() => {
	console.log("Component re-rendered due to an update to the count state");
}, [count]);
```

This `useEffect` will perform a cleanup when it is removed from the DOM, like an onUnmount function

```jsx
useEffect(() => {
	console.log("Component re-rendered due to an update to the count state");
	return () => {
		console.log(
			"Cleanup function, runs when component is removed from the DOM"
		);
	};
}, [count]);
```

## Other practical uses for `useEffect`

#### Clearing an interval that was set inside a `useEffect`:

```jsx
const App = () => {
	const [currentTime, setCurrentTime] = useState(new Date());
	useEffect(() => {
		const tickInterval = setInterval(() => {
			console.log("tick");
			setCurrentTime(new Date());
		}, 1000);
		return () => {
			console.log("Clean up: turn off interval");
			clearInterval(tickInterval);
		};
	}, []);

	return <span>{currentTime.toLocaleTimeString("en-US")}</span>;
};
```

#### Fetching data from an external API

- You could directly call fetch inside the useEffect and update the state there... OR...
- You could move your non-component-related logic to outside of your component and call it from within the component
- You **cannot** make your `useEffect` functions asynchronous

```jsx
import { useState, useEffect } from "react";

// Function outside component

const getRandomJoke = async () => {
	const response = await fetch("https://icanhazdadjoke.com/", {
		headers: {
			Accept: "application/json", // These header settings are specific to this API
		},
	});

	if (!response.ok) throw new Error("Failed to fetch joke");

	const data = await response.json();
	return data;
};

// Component

export const RandomJoke = () => {
	const [jokeData, setJokeData] = useState(null);

	// Function inside component

	const refreshJoke = () => {
		getRandomJoke()
			.then((data) => setJokeData(data))
			.catch((e) => console.error(e));
	};

	// useEffect here

	useEffect(() => {
		refreshJoke();
	});

	return (
		<div>
			{jokeData && <p>{jokeData.joke}</p>}
			<button onClick={refreshJoke}>Get Joke</button>
		</div>
	);
};
```

## Loading State

- We want to provide our users some feedback that our requests are being submitted, especially for users with slower internet speeds

```jsx
const JokeLoader = ({ searchTerm }) => {
	const [loading, setLoading] = useState(false);
	const [jokes, setJokes] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		if ((searchTerm = null)) return;

		setLoading(true);
		getJokesBySearchTerm(searchTerm)
			.then((jokes) => setJokes(jokes))
			.catch((e) => setError(e))
			.finally(() => setLoading(false));
	});

	return (
		<>
			{loading && <p>Loading...</p>}
			{!loading && <p>Jokes rendered here</p>}
		</>
	);
};
```
