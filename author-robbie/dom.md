# DOM

## What is the DOM?

- Document Object Model
- _In memory_ - JS representation of the web site's structure
- The DOM is **not** the HTML, but there is a close relationship
- The DOM is also not built into Javascript
- The DOM is what our browser renders

## Why deal with a DOM?

- Javascript was made for user interactivity
- It allows us to create dynamic content
- We use `event listeners` to set up interactions and dynamic behaviour

## Accessing elements in the DOM

- We have access to a global variable (object): `document`! It's our whole page.
- The `document` has a lot of methods available on it.
- <ins>**Remember that you need to `defer` your script if it's linked in the head**</ins>

## Finding elements

Here are some different ways to find this:

```html
<h1 class="heading" id="mainHeading">Greetings</h1>
```

### `querySelector`

- more modern than getElement...
- returns an "element"
- Returns the first instance of something, so less useful when trying to find an element or class
- `querySelectorAll` will grab all of the matched elements
  - this returns a "NodeList", which is sort of like an array and we have access to some array methods, like `forEach()`

```js
const mainHeading = document.querySelector("#mainHeading");

const subHeadings = document.querySelectorAll(".sub-heading");
```

### `getElementById`

- returns a "HTML element"

```js
const mainHeading = document.getElementById("mainHeading");
```

### `getElementsByClassName`

- returns a "HTML collection"
- a HTML collection is more of a _live_ collection, whereas NodeList is _static_ and the variable would need to be re-declared to get an updated list
- beware that a HTML collection will have different access to array methods
  - apparently, NodeList is a little more versatile with

```js
const subheadings = document.getElementsByClassName("sub-heading");
```

### `getElementsByName`

- Select the actual elements themselves

```js
const articles = document.getElementsByName("h1");
```

## Manipulating elements in the DOM

- Gain access to the element by first assigning a variable to its element (via `querySelector` for example)
- Then you are able to modify many properties on the element
- Some examples:

### Inline-styling:

```js
mainHeading.style.color = "green";
mainHeading.style.fontStyle = "italic";
```

### Classes:

```js
document.querySelector("p").classList.add("underlined");
heading.classList.remove("heading");
```

### Text:

mainHeading.textContent = 'Changed';

## Creating elements in the DOM

- We can use Javascript to also create new elements programmatically if we like
- Created elements can be appended to a parent element
- **Be very careful to not allow your users to add their own HTML**
  - This can lead to a cross-site scripting (XSS) attack

```js
const newPara = document.createElement("p");
const textNode = document.createTextNode("Hello World");
newPara.appendChild(textNode);
document.body.appendChild(newPara);
```

```js
const names = ["Alice", "Bob", "Charlie"];
names.forEach((name) => {
	const li = document.createElement("li");
	const text = document.createTextNode(name);
	li.appendChild(text);
	document.querySelector("ul").appendChild(li);
});
```

## Event Listeners

- Our main way of adding interactivity for the user
- Event listeners _expect_ an event to happen, and therefore an event parameter is expected

```js
const button = document.querySelector("button");
button.addEventListener("click", (event) => {
	console.log(event);
	// Shows us a lot of information about our click
	const para = document.querySelector("p");
	para.classList.toggle("hidden");
	// toggles hiding and showing the first paragraph
	if (para.classList.contains("hidden")) {
		button.textContent = "Show";
	} else {
		button.textContent = "Hide";
	}
	// changes the text on the button dependent on state
});
```

- Event Listeners can be predefined/passed in by name

```js
const alertIfClicked = (e) => {
	alert(`You clicked ${e.target.id}`);
};

mainHeading.addEventListener("click", alertIfClicked);
```

- We can add event listeners in bulk too
- Provides a great use for `forEach`

```js
subHeadings.forEach((subHeading) => {
	subHeading.addEventListener("click", alertIfClicked);
});
```

## Working with forms

```js
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
	e.preventDefault(); // prevent default form submission
	// FormData API for getting values from forms
	const data = new FormData(form);
	console.log(data.get("age"));
	// .get takes in the name field

	// The quick way to get one value
	const inputValue = document.querySelector("input").value;
});
```

## Other code snippets

#### Generic append

```js
const appendElementWithText = (elementType, text, parent) => {
	const newElement = document.createElement(elementType);
	const textNode = document.createTextNode(text);
	newElement.appendChild(textNode);
	parent.appendChild(newElement);
};
```

#### Dark Mode

- You can use BEM and SCSS to good effect here

```scss
.body {
	background-color: ghostwhite;

	&--dark-mode {
		background-color: #222;
	}
}
```

```js
// grab the button which changes the mode
const darkBtn = document.querySelector("#darkModeBtn");
// listen to it
darkBtn.addEventListener("click", (e) => {
	// get the body element
	const body = document.querySelector("body");
	// toggle class on the body
	body.classList.toggle("body--dark-mode");
});
```
