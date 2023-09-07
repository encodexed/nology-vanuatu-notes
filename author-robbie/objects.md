# Objects

- What is an object?
  - Key-value pairs
  - A data-type
  - Objects can have <ins>methods</ins>
  - "Everything" in JS is an object
  - Prototypes & prototypical inheritance
    - The latter of which will come up often in junior interviews, despite it coming up in everyday work not a lot

## Creating an object

- Object literal syntax: `{}`

```js
const me = {
	name: "John",
	location: "Melbourne",
	age: 27,
	married: false,
	devices: ["iPhone", "MacBook"],
	pets: {
		name: "Stanley",
		breed: "Labrador",
	},
	// methods:
	sayHello() {
		console.log("hello");
	},
	haveBirthday() {
		this.age++;
	},
	getFirstPet() {
		return this.pets[0];
	},
};
```

## Accessing object properties

- Two different ways, using `.` or `[]` notation
  - If using `[]`, the index should be a string

```js
console.log(me.age);
console.log(me["location"]);
```

- `[]` is mostly useful for passing in variables

```js
const key = "age";
console.log(me[key]);
```

## Looping over with `for...in`

```js
for (let prop in me) {
	const value = me[prop];
	console.log(`prop: ${value}`);
}
```

## The complicated existence of... `this`

- `this` is tricky, it is entirely contextual and refers to the object that the property is being used on
- `this` is _like_ a placeholder for the name of the object

## Prototypes

- You will have noticed that some other data types are objects
- When you create a new array, it is constructed using a prototype object which have methods pre-written
- Therefore, all new arrays automatically are given methods like `.toString()` on them
- We can create our own prototypes!

```js
// Prototype methods:
const personPrototype = {
  greet() {
    console.log(`Hello ${this.name}`);
  }
}

// Creating an object:
const me = {
  name: "Robbie";
}

// Declaring that object as a prototype of something:
Object.setPrototypeOf(me, personPrototype);

// Now we can do this:
console.log(me.greet());
// output: "Hello Robbie"
```

## Destructuring objects into variables

- Destructuring is _"syntactic sugar"_ for assigning variables from objects, especially multiple at a time
- With arrays, it's positional, but with objects, you can grab the values by their keys which is much nicer

```js
// Destructuring an array
const names = ["Alice", "Bob", "Charlie"];
const [firstName, secondName, ...restOfNames] = names;
console.log("hello " + secondName);
// output: "hello Bob"

// Destructuring an object
const me = {
	name: "Robbie",
	age: "33",
	location: "Sydney",
};
const { name, age, location } = me;
console.log(`Hi I'm ${name}, I'm ${age} years old and live in ${location}`);
// output: "Hi I'm Robbie, I'm 33 years old and live in Sydney"
```

### Changing the variable name

```js
const { city: location } = me;
console.log(city);
```

## Setting default values for objects

- If you try to access an undefined property, you will get `undefined` returned, unless you specify a default

```js
// Regularly
const favouriteFood = me.favouriteFood || "pizza";

// When destructuring
const { favouriteFood = "pizza" } = me;
```
