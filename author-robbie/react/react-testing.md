# Testing

## Why do we test code?

- To find bugs
-

## How do we test in React?

### End to End

- Cypress
- Playwright (we will use this on the client project)
- Selenium (corporate testing roles)

### Component Testing

- Sort of a cross between unit and end to end testing
- Used to be Enzyme, but it was abandoned around React 16
- Now we use _React Testing Library_

## What do we test?

- Does it render?
- Does it render the correct things?
  - When we pass it a prop, does it render the correct things based on the prop
- Does it do what it's supposed to?
- Does it respond correctly to user actions?

## Vitest Setup/Installation

An alternative to Jest that is almost exactly like Jest

1. After creating your Vite application, you will need to install Vitest as a dev dependency

```bash
npm create vite@latest
npm i vitest --save-dev
```

2. Add a testing script in `package.json`:

```js
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview",
        "test": "vitest"
    },
```

3. Add a dummy test (test files with vitest should be .jsx)

NOTE: may need to import describe, expect and, it from vitest at first.

```js
// file: src/App.test.jsx
import { describe, it, expect } from "vitest";

describe("Setup test", () => {
	it("checks true", () => {
		expect(true).toBe(true);
	});
});
```

4. Add js-dom to be able to test in DOM-like environment

```bash
npm install jsdom --save-dev
```

5. Add code to vite config

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./config/setup-test.js",
	},
});
```

6. Add react testing library - (will not work without jsdom)

```bash
npm i @testing-library/react @testing-library/jest-dom --save-dev
```

7. Setup config file, possibly as ./config/setup-test.js

```js
import { afterEach } from "vitest";
// Unmounts components from the DOM after we've used them
import { cleanup } from "@testing-library/react";
// This gives us our Jesty keywords like expects and toBe
import "@testing-library/jest-dom/vitest";
// Clean up after every test - unmount my components every time
afterEach(() => {
	cleanup();
});
```

8. Add the library that will allow us to simulate user events

```bash
npm install @testing-library/user-event --save-dev
```

9. Test that the test is working

```bash
npm run test
```

## Writing our tests

- Typically, you won't test anything super obvious
  - Something more obvious you might test would be conditional rendering
- If there is any chance for an error, it should be tested
- You should be thinking about the fragility of your tests when you decide to go about writing them: <a href="https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change">Check this post out</a>
  - Are we checking errors against the messages they return? What if we change the wording of that? Maybe we should check something different
- **Test Driven Development**: we write our test first, and then write the bare minimum code to fix it, then we write our next code
  - This can _test_ drive you crazy

<a href="https://testing-library.com/docs/">Documentation</a>

Here is some code for testing a card component:

```jsx
// file: Card.jsx
import React, { useState } from "react";

const Card = ({ heading, content }) => {
	const [contentShown, setContentShown] = useState(true);

	return (
		<div>
			<h2>{heading}</h2>
			<button onClick={() => setContentShown(!contentShown)}>
				{contentShown ? "Hide" : "Show"}
			</button>
			{contentShown && <p>{content}</p>}
		</div>
	);
};

export default Card;
```

```jsx
// file: Card.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "./Card";

describe("Card Component", () => {
	it("should render a heading based on props", () => {
		render(<Card heading='Hello world' content='test' />);
		const heading = screen.getByText(/hello world/i);
		expect(heading).toBeInTheDocument();
	});

	it("should show content by default", () => {
		render(<Card heading='Hello world' content='test content' />);
		const content = screen.getByText(/test content/i);
		expect(content).toBeInTheDocument();
	});

	it("should render a button", () => {
		render(<Card heading='Hello world' content='test' />);
		const btn = screen.getByRole("button");
		expect(btn).toBeInTheDocument();
	});

	it('should render a "Hide" button when the content is shown', () => {
		render(<Card heading='Hello world' content='test' />);
		const btn = screen.getByRole("button");
		expect(btn).toBeInTheDocument();
		expect(btn).toHaveTextContent(/hide/i);
	});

	it("should toggle the content on button click", async () => {
		render(<Card heading='Hello world' content='test content' />);
		const btn = screen.getByRole("button");
		const user = userEvent.setup();
		// console.log('Before clicking');
		// screen.debug();
		const content = screen.getByText(/test content/i);
		expect(content).toBeInTheDocument();
		await user.click(btn);
		// console.log('After click');
		// screen.debug();
		expect(content).not.toBeInTheDocument();
	});

	it("should toggle the button text on button click", async () => {
		render(<Card heading='Hello world' content='test content' />);
		const btn = screen.getByRole("button");
		const user = userEvent.setup();
		expect(btn).toHaveTextContent(/hide/i);
		await user.click(btn);
		expect(btn).toHaveTextContent(/show/i);
		await user.click(btn);
		expect(btn).toHaveTextContent(/hide/i);
	});
});
```

## Mocking functions

- Mock functions are also known as "spies", because they let you spy on the behavior of a function that is called indirectly by some other code, rather than only testing the output
- Here is an example of using `mock`:

```jsx
describe("SearchBar", () => {
	it("should call the submit function that is passed in when submit is clicked", async () => {
		// create a mock function
		const myMock = vi.fn(() => console.log("Search happens"));
		render(<SearchBar formSubmit={myMock} />);
		const searchBtn = screen.getByRole("button");
		const user = userEvent.setup();
		await user.click(searchBtn);
		expect(myMock).toHaveBeenCalled();
	});

	it("should call the submit function with the value typed into the search bar", async () => {
		const myMock = vi.fn((value) => console.log("Searched for: " + value));
		render(<SearchBar formSubmit={myMock} />);
		const searchBtn = screen.getByRole("button");
		const input = screen.getByPlaceholderText(/search/i);
		const user = userEvent.setup();
		await user.type(input, "hello");
		await user.click(searchBtn);
		expect(myMock).toHaveBeenCalledOnce();
		expect(myMock.mock.calls[0][0]).toBe("hello");
	});

	it("should clear the search bar after form is submitted", async () => {
		const myMock = vi.fn((value) => console.log("Searched for: " + value));
		render(<SearchBar formSubmit={myMock} />);
		const searchBtn = screen.getByRole("button");
		const input = screen.getByPlaceholderText(/search/i);
		const user = userEvent.setup();
		await user.type(input, "hello");
		expect(input).toHaveValue("hello");
		await user.click(searchBtn);
		expect(input).toHaveValue("");
	});

	it("should call the submit function with the right value, multiple times", async () => {
		const myMock = vi.fn((value) => console.log("Searched for: " + value));
		render(<SearchBar formSubmit={myMock} />);
		const searchBtn = screen.getByRole("button");
		const input = screen.getByPlaceholderText(/search/i);
		const user = userEvent.setup();
		await user.type(input, "hello");
		await user.click(searchBtn);
		await user.type(input, "goodbye");
		await user.click(searchBtn);
		expect(myMock).toHaveBeenCalledTimes(2);
		console.log(myMock.mock.calls);
		expect(myMock.mock.calls[0][0]).toBe("hello");
		expect(myMock.mock.calls[1][0]).toBe("goodbye");
	});
});
```

## `spyOn`

- You cannot spy on a function directly with this
  - You would want to unit test the function being called rather, if you wanted to test that
  - You use the arguments: `(object, methodName)`
- You can get this syntax with some import magic

```jsx
import * as jokeServices from "../../services/joke-services";
// This is an object with methods on it
```

- Here is more test code samples:

```jsx
import { render, screen, waitFor } from "@testing-library/react";
import { SearchContext } from "../../context/SearchContextProvider";
import JokeLoader from "./JokeLoader";
import { describe, expect, vi } from "vitest";
import * as jokeServices from "../../services/joke-services";

describe("JokeLoader", () => {
	it("should display loading text based on context search value", () => {
		render(
			<SearchContext.Provider value={{ searchValue: "apple" }}>
				<JokeLoader />
			</SearchContext.Provider>
		);

		const loadingText = screen.getByText("Searching for jokes about apple");
		expect(loadingText).toBeInTheDocument();
	});

	it("Should call the getJokesBySearchFunction with the value provided by context", async () => {
		const mockedJokeFetch = vi.spyOn(jokeServices, "getJokesBySearch");
		render(
			<SearchContext.Provider value={{ searchValue: "apple" }}>
				<JokeLoader />
			</SearchContext.Provider>
		);

		await waitFor(() => {
			expect(mockedJokeFetch.mock.calls[0][0]).toBe("apple");
		});
	});

	it("should render a JokeList if getJokesBySearch returns jokes for a search value", async () => {
		const mockedJokeFetch = vi.spyOn(jokeServices, "getJokesBySearch");
		mockedJokeFetch.mockResolvedValue([{ id: 1, joke: "Apples are funny" }]);
		render(
			<SearchContext.Provider value={{ searchValue: "apple" }}>
				<JokeLoader />
			</SearchContext.Provider>
		);

		const loadingText = screen.getByText("Searching for jokes about apple");
		expect(loadingText).toBeInTheDocument();

		await waitFor(() => {
			// check that my loading text goes away
			expect(loadingText).not.toBeInTheDocument();
			const jokesHeading = screen.getByTitle("joke-heading");
			screen.debug();
			expect(jokesHeading).toBeInTheDocument();
			const joke = screen.getByText("Apples are funny");
			expect(joke).toBeInTheDocument();
		});
	});

	it("should render an error message if getJokesBySearch resolves to an error", async () => {
		const mockedJokeFetch = vi.spyOn(jokeServices, "getJokesBySearch");
		mockedJokeFetch.mockRejectedValue(
			new Error("Oh no my fetch returned an error")
		);
		render(
			<SearchContext.Provider value={{ searchValue: "apple" }}>
				<JokeLoader />
			</SearchContext.Provider>
		);

		await waitFor(() => {
			const errorPara = screen.getByText("Oh no my fetch returned an error");

			screen.debug();
			expect(errorPara).toBeInTheDocument();
		});
	});
});
```
