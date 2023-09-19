# State

### Real-world examples

- War and peace
- H20: ice, water, steam - solid, liquid, gas
  - State is changed by an external force

### In React

- A kind of variable that exists within a component
  - Determines the behaviour or rendering of that component
  - Changed by user interactions typically

### State vs Props

- Props:

  - passed in by a parent
  - immutable - once passed in cannot be changed within the component
  - a change in props causes a re-render

- State:
  - exist within a component
  - can be changed
  - a change in state will cause a re-render of the component

## How to... `useState`

- Unlike regular variables, state variables are kept track of by React and will cause re-renders
- You can use the `{}` with an `onclick` event listener to fire off a function
  - The function can be written inline or above, inside the component

```jsx
<button onClick={(event) => console.log(event)}>+</button>
<button onClick={onMinusClick}>-</button>
```

- This function still has access to an `event` parameter, which in React is a little different, it's a SyntheticBaseEvent

- `useState` is a React _hook_ that will help us create stateful variables

```jsx
import { useState } from "react";

const Counter = () => {
	const [count, setCount] = useState(0);
	const [timesClicked, setTimesClicked] = useState(0);
	// ...
};
```

- Remember that each of these states use RAM, and big React apps can sometimes feel like they're bloating your browser

## Other practical examples of `useState`

- Combining conditional rendering with useState, we are able to toggle things to hide them or show them:

```jsx
const [contentShown, setContentShown] = useState(true);

const toggleContentShown = () => {
  setContentShown(!contentShown);
}

return (
  <div>
    <button onclick={toggleContentShown}>{contentShown ? 'Hide' : 'Show'}
    {contentShown && <p>{content}</p>}
  </div>
)

```

## Prop-drilling / Lifting state

- You can pass state down through props, but altering that state within a child component is a whole other story
- You cannot alter the state of child component from a parent above it
- You also cannot send state to a sibling, it needs to be "lifted" to a parent and then passed down to that child
- You will need to pass down a _(pointer to a)_ function as a prop that gets called in the child

```jsx
// Insert example of passing a function prop here
```

## Controlled component

- A controlled component is a component whose value is controlled by its state, for example, an input field with a value attribute being controlled by a value state
