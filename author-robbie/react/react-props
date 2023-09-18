# The `props` parameter

- Short for properties
- Additional information we can pass to a component
- Functional components have a built in `props` parameter

- "Just like the Australian real estate market", the only way we can pass properties into components is from the parent
- Components can access props, through function parameters

```jsx
<StudentCard name="Alice" age={14} location="Adelaide" />
<StudentCard name="Bob" age={12} location="Brisbane" />
<StudentCard name="Charlie" age={15} location="Melbourne" />
```

- Properties in the parent component are given like HTML attributes
- You may need to use `{}` to insert any dynamic data or JavaScript
- They act like a template string and allow you to type JavaScript in

```jsx
const StudentCard = (props) => {
	return (
		<article>
			<h3>{props.name}</h3>
			<p>{props.age}</p>
			<p>Location: {props.location}</p>
		</article>
	);
};
```

- You can test and manipulate the props of a component in the React dev tools, similar to manipulating elements in the HTML inspector tools

### Destructuring props

- Props are immutable within the component they appear in
- We can destructure in the function like so:

```jsx
const StudentCard = (props) => {
	const { name, age, location } = props;
	return (
		<article>
			<h3>{name}</h3>
			<p>{age}</p>
			<p>Location: {location}</p>
		</article>
	);
};
```

- Or in the parameters themselves, which is apparently <ins>_**the preferred way in the dev community**_</ins>
- The only issue is that these values are destructured to their default variable

```jsx
const StudentCard = ({ age, name, location }) => {
	return (
		<article>
			<h3>{name}</h3>
			<p>{age}</p>
			<p>Location: {location}</p>
		</article>
	);
};
```

### Default props and undefined parameters

- `undefined` and `null` get rendered as empty space, but other falsey values like `NaN` and `0` do get rendered
- we can assign a default value as soon as we destructure, in case a props argument is missing or undefined:

```js
const StudentCard = ({ age, name, location = "Sydney" }) => {};
```

## Using conditionals to determine presentation

- We are able to use truthy and falsey "short-circuit" evaluations to determine a display option, as an example.

```jsx
<StudentCard name="Alice" age={14} location="Adelaide" isLocationVisible={true}/>
<StudentCard name="Bob" age={12} location="Brisbane" isLocationVisible/> // shorthand
<StudentCard name="Charlie" age={15} />
```

```jsx
const StudentCard = ({ age, name, location = "Sydney", isLocationVisible }) => {
	return (
		<article>
			<h3>{name}</h3>
			{<p>{age}</p>}
			{isLocationVisible ? <p>Location: {location}</p> : <p>Location hidden</p>}
			{/* two different ways */}
			{isLocationVisible && <p>Location: {location}</p>}
		</article>
	);
};
```

## `props.children`

- Gets passed in by default and helps to create wrapper components
- When using a component that makes use of the `children` parameter, it needs a separate opening and closing tag around the content it is making its children
- Especially useful when building reusable components and applying conditional rendering or styling

```jsx
const Header = ({ children }) => {
	return <header>{children}</header>;
};
```

```jsx
const App = () => {
	<Header>
		<h1>Hello World</h1>
	</Header>;
};
```

## Conditional styling

```jsx
import styles from "./StudentCard.module.scss";

let cardClasses = styles.card;
if (location === "Sydney") {
	cardClasses += `${styles.card_red_outline}`;
}

const StudentCard = ({ ...args }) => {
	return (
    <article className={cardClasses}>
  )
};
```

(Probably look at FlexWrap components)

## Programmatic rendering

- React is good at dynamically rendering arrays of elements from external sources

```jsx
const StudentList = () => {
	const students = [
		{
			name: "Alice",
			age: 14,
			location: "Adelaide",
			isLocationVisible: false,
			ageHidden: true,
		},
		{
			name: "Bob",
			age: 12,
			location: "Adelaide",
			isLocationVisible: false,
			ageHidden: true,
		},
		{
			name: "Charlie",
			age: 15,
			location: "Adelaide",
			isLocationVisible: false,
			ageHidden: true,
		},
	];
};

return (
	<>
		{students.map((student, index) => (
			<StudentCard
				key={`student-${index}`} // Required to suppress warnings
				name={student.name}
				location={student.location}
				age={student.age}
				isLocationVisible={student.isLocationVisible}
				ageHidden={student.ageHidden}
			/>
		))}
	</>
);
```

- However, React will warn us that each of the components will need to have a unique `key` property, like an id
- This helps keep the re-rendering process efficient when props or state updates

### Moving away from hard-coding data

- You can import JSON in React and it gets turned into a JavaScript array _magically_ (usually through the build step)

```js
import students from "../../data/students.json";
```
