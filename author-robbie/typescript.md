# TypeScript

- JavaScript with types
- It's a "superset" of JavaScript, like how SCSS is a superset of CSS
  - Means that any JavaScript is valid TypeScript
  - You can also add it to existing projects
- A compilation tool / super fancy linter
  - Right now, not much choice for running TypeScript files natively, no browser support, but Bun or Deno may be a solution in the future especially
- TypeScript files are turned into JavaScript files - if we have type errors the code won't compile

## Why use TypeScript?

- It prevents us making dumb mistakes
- Moves the discovery of mistakes from run time to compile/coding
- It helps teams communicate
  - We can communicate thing like component props, api responses (be careful), what DTOS look like

## What are the downsides?

- It's slower to write code, and we write more boilerplate code
- Can lead to over abstraction/complication
- There's no performance benefit (right now)
- Sometimes things get weird - we write weird/confusing code to satisfy TypeScript

## Our first code

```typescript
let myName: string = "Alex"; // explicit string declaration
let myName = "Alex"; // inferred string declaration

myName = 12; // Error: Type 'number' is not assignable to type 'String'
```

- Remember we cannot run this in Node or the browser
- We need to compile the file into JavaScript

```bash
tsc typeSriptFile.ts
```

- Here's a function:

```typescript
const add = (a: number, b: number) => {
	return a + b;
};
```

- This function has an _inferred_ return type of number, which is nice, but that does give up a bit of trust/usefulness of TypeScript
- You have the option of declaring the return type in the function declaration
- We _want_ TypeScript to yell at us:

```typescript
const add = (a: number, b: number): number => {
	return a + b;
};
```

## Our compiled code

- Interestingly, we lose our arrow function syntax and our let/const to vars
- We also get errors in our TS file when we compile, because we now have already declared

```bash
tsc intro.ts --target ES2018 # will let you compile with modern JS syntax

tsc --init # creates a configuration file for TypeScript
```

- Using the config file from above, we can do a lot of cool things, but one of the more useful things is declaring a source file and a output file
- Running `tsc` will then compile all `.ts` files
- We can also compile in an older JavaScript version if we want, and this is called "poly-filling" (?)

## Array Typing

```typescript
const names: string[] = ["Alice", "Bob", "Charlie"];
names.push(10); // Cannot be done

// Another syntax, like Java's ArrayLists
const numbers: Array<number> = [1, 2, 3, 4];
numbers.push("hello"); // Cannot be done
```

- TypeScript also allows for generic type parameters
- Note that this is different to combining arrays of type `any`, because all of the types must be the same (hence the `T`)

```typescript
const combineArrays = <T>(arr1: T[], arr2: T[]): T[] => {
	return [...arr1, ...arr2];
};

const combined = combineArrays(["a", "b", "c"], [1, 2, 3]); // Cannot be done
// Another syntax
const combined = combineArrays<number>(etc);
```

## Structural/Duck Typing and the `type` keyword

- "If it has that field, it must be of that type"
- "If it walks and quacks like a duck, it must be a duck"
- There are several ways of describing types in TypeScript

```javascript
const me = {
	firstName: "Alex",
	lastName: "Baulderstone",
	age: 35,
	location: "Melbourne",
};

const someone = {
	firstName: "Bob",
	lastName: "Smith",
	age: 45,
	location: "Sydney",
};

const another = {
	firstName: "Alice",
};

const greet = (person) => {
	console.log("Hello" + person.firstName);
};

greet(me);
greet(someone);
// Problematic:
greet(another); // Outputs undefined as the name
```

- In TypeScript, we can declare `types`

```typescript
type Person = {
	firstName: string;
	lastName: string;
	age: number;
};
```

## Interfaces

- We can also use interfaces
- Unlike in Java, interfaces can have properties though
- You can use them like adjectives
  - If classes are nouns and methods are verbs

```typescript
interface Greetable {
	// To satisfy the Greetable interface, you must have a method of getName() that returns string
	getName(): string;
}
```

## Classes

- Similar to classes in JavaScript but you'll need to declare the field
- You can also have `public` and `private` fields

```typescript
class Person {
	private firstName: string;
	private lastName: string;
	private age: number;

	constructor(firstName: string, lastName: string, age: int) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
	}

	// inferred return
	getFirstName() {
		return this.firstName;
	}
}

const me = new Person("Alex", "Baulderstone", 35);
```

- Here's a shorthand version:

```typescript
class Person {
	constructor(
		private firstName: string,
		private lastName: string,
		private age: number
	) {}
	// Yes! We can have an "empty" constructor
}
```

## Classes and Interfaces together

```typescript
interface Greetable {
	getName(): string;
}

class Pet implements Greetable {
	constructor(public animalType: string, public name: string) {}

	getName() {
		return this.name;
	}
}

const greet = (obj: Greetable) {
	console.log('Hello ' + obj.getName());
}
```

## Integrating with React

- You can create your Vite project with TypeScript already in the dev dependencies with `npm create vite@latest`
- `.tsx` replaces `.jsx` but all jsx is valid
- When working with props, we may use interfaces:

```tsx
export interface CardProps {
	// The question mark labels it as optional
	heading?: string;
	content: string;
}

const Card = ({ title = "heading", content }: CardProps) => {
	return (
		<>
			<h2>{heading}</h2>
			<p>{content}</p>
		</>
	);
};
```
