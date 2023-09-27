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
