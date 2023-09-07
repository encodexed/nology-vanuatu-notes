# Modules

## What is a (Javascript) Module?

- A group of related things to use later in the code
- A way to group things in separate files
- We will be using the ES6 module syntax
  - Introduced 2015, but took a while to get full browser support
- Historically, we needed some kind of Javascript bundler and built step
  - eg. Grunt, Gulp, Rollup, Webpack
- We can use ES6 modules in the browser by default now
  - <ins>**BUT**</ins> they are currently _not supported in Node_
  - You may have to use CommonJS

### Why?

- To split our code up, making it easier to read, maintain and test

### How?

- We use the keywords `export` and `import` in their relative places
- Using `default` creates a <ins>named import</ins> and changes up the syntax a little and helps prevent name clashes
  - It is also useful for exporting large objects or arrays
  - Typically used when importing from a library someone else wrote
- Make sure to add the `type="module"` to your script in HTML to prevent errors:

```html
<script type="module" src="./script.js" defer></script>
```

### Some example code

```js
// exporting as non-default
export const rectangleArea = (length, width) => length * width;

// exporting as default
const rectanglePerimeter = (length, width) => 2 * (length + width);
export default rectanglePerimeter;
```

```js
// importing non-default exports
import { rectangleArea } from "./js/rectangle.js";

// importing default (named) exports
import RectanglePerimeter from "./js/rectangle.js";
```
