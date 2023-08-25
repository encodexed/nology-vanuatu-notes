# Basic CSS

### Handy Links

<a href="https://color.adobe.com/create/color-wheel">Adobe Colour Wheel</a> - A great place for designing colour palettes

<a href="https://fonts.google.com">Google Fonts</a> - Remember to select your font styles and copy paste the stylesheet links

<a href="https://developer.mozilla.org/en-US/">MDN</a> - A great place for looking up CSS definitions

## What is CSS?

- <ins>C</ins>ascading <ins>S</ins>tyle <ins>S</ins>heet
- Simple language that allows us to modify the looks of our web page
- Very important for the users to know exactly how the website works from the looks of it
- Need to strike a balance between making things usable vs making things pretty
- Remember to give some consideration to where you place your rules in the CSS
  - An example might be to place your navbar styles up the top, and the footer styles down the bottom

## Ways to use CSS

### Inline CSS:

- Add a style attribute to an element and write some basic CSS in:

```html
<h1 style="color: red">Red Heading</h1>
```

- Inline-styling is the most specific/overriding form of CSS. Styles written on the element itself will override all other styles given to the element.
- Not recommended because:
  - hard to read
  - hard to maintain
  - the styles are not shared amongst similar elements

### Style element:

- Add styles within a \<style> element.

```html
<style>
	h1 {
		color: red;
	}
</style>
```

- Better than inline styles, because you can share styles amongst similar elements.
- Still cannot share styles amongst other html pages.

### Separate CSS file:

- Need to add a link tag to have it implemented

```html
<link rel="stylesheet" href="./styles.css" />
<link rel="stylesheet" href="../css-basics/styles.css" />
```

- Perfect for providing styles to multiple pages
- Also, keeps CSS styling separated away from HTML and other concerns

## Selectors

### Universal selector

- Selects everything on the page
- Useful for setting baseline styles or removing default styles

```css
* {
	font-family: Arial, Helvetica, sans-serif;
}
```

### Using IDs

- Must be unique
- Only used on one element, not typically used for CSS purposes anymore
- Remember to use camelCase

```css
#uniqueElement {
	margin: 0 50px 10px 2px;
}
```

### Using classes

- The standardised way of sharing the same styles amongst many different elements
- Use a meaningful name
- Remember to use kebab-case
- Selecting a class in CSS:

```css
.paragraph-classes {
	text-align: center;
}
```

## Combinators

- Combinators can be stacked with each other to be super-specific

```css
div.container {
}
/* targets divs with the class of container */
```

```css
header p {
}
/* descendent selector: targets ANY/ALL descendent paragraphs of the parent header */
/* doesn't matter how deeply nested they are */
```

```css
header > p {
}
/* child selector: targets only child paragraphs of the parent header */
```

```css
div + p {
}
/* adjacent sibling selector: targets the first sibling paragraph of the parent div */
```

```css
div ~ p {
}
/* general sibling selector: targets ALL sibling paragraphs of the parent div */
```

## Specificity

<a href="https://www.w3schools.com/css/css_specificity.asp">W3C Specificity</a>

<a href="https://specifishity.com/">SpeciFISHity</a>

- Rules that determine what styling is the one that we visually see.
- Styles that are more specific will override other:
  1. !important (score: 10000)
  2. inline-styles (score: 1000)
  3. id (score: 100)
  4. class (score: 10)
  5. element (score: 1)
  6. universal selector (score: 0)
- The "cascading" part of CSS means that CSS stylesheets render from top to bottom
  - Similar elements of equal specificity get rendered according to their position in the stylesheet
- Specificity is given a score that determines how specific something is, which is useful for when combining different selectors.

```css
p {
	color: red;
}

/* The above selector is overriden by the text colour in the below selector due to its positioning in the file */

p {
	color: green;
}
```

## Box Model

- All elements on the page have their own space, which use a box model. They have properties that define:
  - Content
  - Padding
  - Border
  - Margin
- Developer tools in the browser will show you the box model
- Margins overlap:
  - Two elements next to each other will share margin, their margins will not be added together

## CSS Pseudo Classes

### What are pseudo classes?

- A pseudo class is used to define a special state of an element.
- Examples of some pseudo classes:

```css
button:hover {
}
/* targets the styles of the button when a pointer is hovering over it */
```

```css
a:visited {
}
/* targets links that have already been visited */
/* (some styles might not work due to a privacy policy within the browser) */
```

```css
input:required {
}
/* targets only input fields that are given the attribute 'required' */
```

```css
li:nth-child(2) {
}
/* targets the 2nd list item in a list */
```

## CSS Flexbox

### What is flexbox?

- A layout system that allows us to place elements on the page
- Super useful for making our websites responsive (ie. looks good on phone/tablet/desktop without rewriting any code)
- Important flexbox keywords: flex <ins>container</ins> and flex <ins>element</ins>
  - To adjust the positioning of flex elements, you should make sure the flex container (parent) is given "display: flex;"

### Some flex examples

```html
<section>
	<div></div>
	<div></div>
	<div></div>
</section>
```

In this case, section will become the flex container, with the divs inside becoming the flex elements.

```css
section {
	flex: display;
	/* turns the parent into a flex container */
	justify-content: space-between;
	/* inserts responsive space between flex elements within */
	align-items: flex-end;
	/* places flex elements at the end of the flex axis */
}
```

We can also treat the flex elements as containers if we change their flex display too.

```html
<section>
	<div>
		<h2>1</h2>
	</div>
	<div>
		<h2>2</h2>
	</div>
	<div>
		<h2>3</h2>
	</div>
</section>
```

```css
div {
	display: flex;
	align-items: center;
	justify-content: center;
}
```

### Treating inline elements as block elements

- Giving a parent "display: flex;" will make block elements behave like inline elements.
- To do it the other way around, we use flex-direction:

```css
form {
	display: flex;
	flex-direction: column;
}
```

- Justify-content and align-items will behave differently when this rule is applied

## CSS Grid

- An alternative to flexbox that helps with certain layouts
- Isn't as natively responsive as flexbox, but has some neat features

```css
.gallery {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	/* creates grid with three columns of same size */
	grid-template-columns: repeat(3, 1fr);
	/* will achieve the same result */
	grid-template-columns: 1fr;
	/* an example of a more useful layout for small screens */
}
```

## Media Queries

- Media queries let you apply specific rules to when certain conditions are present
  - This is primarily used for redesigning your site for different size screens

```css
.heading {
	font-size: 40px;

	@media screen and (max-width: 576px) {
		font-size: 24px;
	}

	@media screen and (min-width: 577px) and (max-width: 768px) {
		font-size: 32px;
	}
}
```

- You may choose to include your media queries in a separate section of the stylesheet, or more specifically where the element appears

```css
/* within the element */
.heading {
	font-size: 40px;

	@media screen and (max-width: 576px) {
		font-size: 24px;
	}
}

/* separate section */
@media screen and (max-width: 576px) {
	.heading {
		font-size: 24px;
	}
}
```

You can also use SCSS tools with your media queries:

```scss
@use "breakpoints.scss";

@mixin phone {
	@media only screen and (max-width: breakpoints.$sm);
}

@mixin tablet {
	@media only screen and (min-width: (breakpoints.$sm + 1px)) and (max-width: breakpoints.$md);
}
```

This code can be used like so:

```scss
.heading {
	color: red;
	font-size: 40px;

	@include mixins.phone {
		color: green;
		font-size: 24px;
	}

	@include mixins.tablet {
		color: orange;
		font-size: 32px;
	}
}
```

### Breakpoints

- Breakpoints are defined sizes at which your site will typically switch from one design to another design
- They are measured in pixels and usually replicate different device screen sizes

## CSS Frameworks

- CSS frameworks are like a library of pre-defined classes with certain styles
- Developers/designers may use them as a starting point for new projects before specific design specifications are decided
- Frameworks are also useful for those who don't like to write CSS or deal with CSS files
- Some great frameworks to use include:
  - <a href="">Bootstrap</a>
  - <a href="">Tailwind</a>
  - <a href="">Piko</a>

### Sample framework code

```html
<body>
	<h1>Heading</h1>
</body>
```
