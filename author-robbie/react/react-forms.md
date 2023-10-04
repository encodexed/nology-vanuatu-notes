# React Forms

- One of the primary mechanisms for our users to interact with our application
- A large part of the job as a web developer
- Forms seem easy at first, but get complicated very quickly
- In React there are two major (conflicting) ideas about how we should do forms
  - Controlled Forms/components
  - Using DOM refs

## Controlled Forms / Components

- A controlled component's value is determined by state
- Our application keeps track of the form's values at all times

### Pro

- We have very finely grained control of the form
  - We can render things conditionally based on the form state
- Good for complex problems and interactions

### Cons

- **Rerenders on all inputs** (can affect performance)
- Doesn't work without JavaScript
- Complex state management
- Might need to use Effects

## DOM Refs and `useRef`

- A ref is a reference to some mutable object which persists across state changes and re-renders
  - A DOM ref is when we bypass the virtual DOM and reference the DOM directly
- It will lose any value it has if it unmounts from the DOM
- When we start using a ref, we set it to null, but we then attach it to an element

```jsx
import { useRef } from 'react';
// ...
const inputRef = useRef(null);
// ...
<input type="text" placeholder="type something" ref={inputRef}>
```

- We can access the DOM element by using `inputRef.current`
- We can go further though, with input for example, by accessing the `.current.value` to retrieve the value attribute of that DOM element
- Refs are also good for referencing DOM elements that cannot be accessed through the virtual DOM, such as HTML canvas (has a special API)

### Pros

- **Way less re-renders**
- Less state management
- Less likely to have weird complexity

### Cons

- Less control
- Conditional rendering based on selected form values is harder
- Form submission can be more complex
  - We might need to use [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

<!-- Space -->

## Use a library!

- Takes the focus away from writing boilerplate code and puts it on solving business problems
- You won't need to reinvent the wheel, and common problems are likely to have already been solved
- May increase your bundle size, but often the code is super-optimised
- Helps with consistency, especially in a corporate setting, your employer may have a specific library they use
- Unfortunately, some libraries' documentation is dense, the syntax may be unfamiliar, and we may not have any idea what's happening under the hood
  - Means that fixing problems can be difficult
- Libraries may also end up not being maintained, as they are often pursuits of passion

## Form Libraries to use in 2023

- Formik used to be very popular
  - Was not being maintained for quite a while but seems to be back
  - Large package size, because it does a lot
- Redux Form
  - Requires you to use Redux
    - Extra complexity you might not need
- **React Hook Form**
  - Cool website and documentation
  - Very regularly updated, by an Australian
  - Also a large package size
  - Performance-focused
  - Uses refs
  - Excellent TS support
  - Modular, works well with other libraries, especially validation

## React Hook Form

```bash
npm i react-hook-form
# if using Yup:
npm i @hookform/resolvers yup
```

- _Insert link to documentation here_
- The basis of using this library is that there is a single custom hook

```jsx
import { useForm } from "react-hook-form";

const HookForm = ({ formSubmit }) => {
	const {
		register,
		reset,
		formState: { errors, isSubmitSuccessful },
		handleSubmit,
	} = useForm();

	// form below
};
// useForm returns lots of methods
```

## Yup and schema-based validation

- Let's you create an object that basically describes what your data should look like

```jsx
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
	// we describe everything here
	username: yup
		.string()
		.required("Please enter a username")
		.min(6, "Username must be at least 6 characters"),
	// username should be a string, it is required and min 6 length, and when not, gives message
	email: yup
		.string()
		.required("Email is required")
		.email("Email must be a valid email address"),
	password: yup
		.string()
		.required("Please enter a password")
		.min(8, "Password must be at least 8 characters"),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords must match"),
});
```

Don't forget to tell your form about this schema

```jsx
const {
	/* ... */
} = useForm({ resolver: yupResolver(schema) });
```
