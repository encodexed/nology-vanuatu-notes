# React

- Was originally created by Meta/Facebook
  - Came about because of many things, but especially because of differences between Facebook on desktop vs on a phone app
  - Open source: you can contribute! No longer owned by Meta but they still have a large stake in the language
- Component-based library
- Uses JSX (JavaScript XML)
  - HTML-like syntax, but we're not actually writing HMTL
  - It is turned into Javascript through a build step
  - Used to be mostly babel and webpack
  - Newer tooling includes vite and esbuild, away from createreactapp (no longer properly maintained)
  - Watch this space! Bun is changing everything
- Designed for building user interfaces/interactions
- An abstraction for altering the DOM, that is more declarative
- Based around a Single Page Application model
  - One HTML file, and JS takes care of the rest (routing, pages, interactions etc)
  - With client-side rendering, all the work of building the DOM happens in the browser on the user's computer
  - Industry realised, cleverly,
  - Server-side rendering is however making a comeback
- Uses AJAX for partial/component updates
- Uses a "virtual dom"
  - In memory copy of the DOM
  - We don't update or interact directly with the real DOM, we are interacting with the virtual DOM
  - Then React runs a complex 'diffing' algorithm that checks the virtual DOM to spot what's new, and then goes to change the DOM itself
    - These are state updates, and can batch multiple updates together, which can result in a faster repaint
    - Be **extremely skeptical** of any statement that says virtual DOMs are inherently faster
      - The most basic React program will get built into _over 9000_ lines of javascript
      - Updating the DOM ourselves is technically usually faster, but much more work and it's easier to shoot ourselves in the foot doing it
      - React batch updates also have the potential to be faster, but React is not inherently faster

## Frontend Landscape

- React is still the king, for now
  - It has the lion's share of the job market
- NextJS
  - _We will use on the client project_
  - Basically it is React with extra stuff
  - Built in routing
  - Better server-side rendering support
- Astro
  - Static site builder
  - React like syntax
  - (Maybe) no virtual DOM
- SolidJS
  - Performance-focused
  - Incredibly similar to React
  - No virtual DOM
- Qwik
  - Super fast
  - Difficult syntax
  - May or may not take off, not widely used (yet)?
- Svelte
  - Can't run in a browser but compiles into plain JS
  - Super optimised performance
  - Vue-like syntax
  - Rich Harris, maintainer, is a very interesting guy

## Getting started (with Vite)

```bash
# To start a new Vite project
npm create vite@latest
```

- Used to use create-react-app but now we use <a href="https://vitejs.dev/guide/">Vite</a>

## Components

- Reusable chunks of code, that often return JSX
- We can break down our app into parts
- Good components should be reuseable and extensible
- Components will fall into some broad categories
  - Pages: a whole page view, made up of a lot of smaller components
  - Containers: Components with logic, data fetching, rendering other components based on state
  - Presentational: Components with little to no logic, that just render data that has been passed into them

### Our first component

```jsx
// App.jsx
import Header from "./components/Header/Header";

function App() {
	return <Header />;
}

export default App;
```

```jsx
// ./components/Header/Header.jsx
const Header = () => {
	return (
		<header>
			<h1>My first component</h1>
			<p>Learning React</p>
		</header>
	);
};

export default Header;
```

- We used to have to `import React from 'react'` everywhere, no longer necessary
- Every component must return a single element only, so no siblings
  - However, we can avoid this by wrapping our siblings in a single element like a `<div>`
  - Wrapping everything in a `<div>` will unnecessarily bloat our HTML code however
    - You can use a `<React.Fragment>` OR even just a `<>` (a _shard_ component) which is the nicest answer to this problem
- We often put our components in their own folders because then we can associate all of the CSS and other stuff we want in there
  - Using <ins>CSS modules</ins>, unique class names are made for us

### Styling components

- No real widely accepted conventions for styling React apps
- Some different ways:
  - Styled components
    - Writing CSS in your Javascript, but has to be processed
  - Frameworks like Tailwind
  - SCSS _**(will probably be what we use in the rest of the course)**_
    - But we install it as a development dependency
      - `npm i --save-dev sass`
    - Because it's a dev dependency, it never ends up in our build
    - We use modules a lot inside each component folder to keep our class names unique
    - We don't have to `watch` our SCSS either
    - We can still use BEM here
    - We can also set up a global css which we want to apply to everything by creating something at root level in the src folder
      - <a href="https://github.com/necolas/normalize.css">Normalised CSS</a>, nice for adding to your `global.scss` file, to remove ALL default styling, to make everything look exactly the same, no matter the browser
        Like starting with a blank slate
