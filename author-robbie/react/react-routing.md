# Routing

- A path to a destination
  - Traditionally a destination was a html page
- Traditionally using `<a href>`
- The route is displayed in the browser URL section

## Routing in React

- There is still only one index.html
- "Pages" are React components
- React will selectively render components based on the URL, with some help

## React Router

- Very similar to using context, we create a component with
- We use something called BrowserRouter, and everything wrapped inside it has access to it
  - We also get access to a component called Routes
  - It's useful to exclude things outside Routes' scope that will stay the same, like a footer or a navbar
- Then, we also have Route which is a literal route, with a path and an element
  - The path is like URL string, where the element is the component or JSX to be rendered going there
    - Setting the path to "/" is just the root
  - We will keep our route endpoints/components in a folder called "pages"

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* navbar */}
        <Routes>
          <Route path='/' element={<LandingPage />}>
          <Route path='/about' element={<About />}>
        </Routes>
      </BrowserRouter>
    </>
  )
}
```

```jsx
const LandingPage = () => {
	return (
		<>
			<h1>Landing Page</h1>
			<h2>Welcome to my page!</h2>
		</>
	);
};
```

- If the users somehow navigate to a page that we have not created a route for, React has a way of handling this

```jsx
<Route path="*" element={<NotFoundPage />}>
```

## Escaping default browser behaviour

- Typically, changing the URL we're on, we will have to reload the page, which means re-rendering - a quick flash of painting, as well as loss of any state we're tracking
- Anchor tags will use default browser behaviour, so you should use React's Links instead
- NavLinks should be used for internal links of your application
- Links should be used for external links to outside your application, like Google
  - They act basically the same as anchor tags but are more "history-aware" which helps with going back and forth
- React links will also give your links some extra goodies like `active` class and aria information

```jsx
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<nav>
			<NavLink to='/'>Home</NavLink>
			<NavLink to='/about'>About</NavLink>
		</nav>
	);
};
```

- React Links are also interesting in that the `className` prop can take a function that determines which class should be passed in

```jsx
const linkStyles = ({ isActive }) => {
	return isActive ? `${styles.link} ${styles.active_link}` : styles.link;
};
```

```jsx
const NavBar = () => {
	return (
		<nav>
			<NavLink className={linkStyles} to='/'>
				Home
			</NavLink>
			<NavLink className={linkStyles} to='/about'>
				About
			</NavLink>
		</nav>
	);
};
```

## Dynamic routing

- The great thing about React Router is the ability to write dynamic paths, just like using the catchall `*`
- React router dom has access to a hook called `useParams` which gives us access to one of the dynamic paths we have created
  - Because params returns an object, it can be destructured

```jsx
<Route path="/projects/:id" element={<ProjectPageLoader />}>
```

```jsx
const params = useParams();
console.log(params);
// output: { id: ___ } where ___ is the actual URL path
const { id } = useParams(); // destructuring alternative
```

- Now you can use this:
- Remember that `to` takes a string

```jsx
// ProjectCard.jsx
<Link to={`${project.id}`}>See more...</Link>
```

- Here is the full component

```jsx
const ProjectPageLoader = () => {
	const { id } = useParams();
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		getProjectById(id)
			.then((project) => setProject(project))
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	}, [id]);

	return (
		<>
			{loading && <p>Loading...</p>}
			{!loading && error && <p>Could not find project with id: {id}</p>}
			{!loading && project && (
				<h1>
					<ProjectPage />
				</h1>
			)}
		</>
	);
};
```

## JSON server package

- Great for faking a back-end API, which is nice for working on your front-end before the back-end is ready
- Runs on Express, not that that matters much
- You should create this with a separate package, meaning a separate package.json, and probably put it outside src in its own folder, at the root level.

1. Create a separate folder eg. `fake-backend`
2. Navigate to that folder
3. Initialise project with `npm init --y`
4. Install JSON server with `npm i json-server`
5. Create a `db.json` file at the root level of this new folder
6. Inside `db.json`, populate with some data:

```json
{
	"id": 1,
	"title": "Some title"
}
```

7. In `package.json`, add a script:

```js
"scripts": {
  "start": "json-server --watch db.json"
}
```

8. Run `npm start`
9. Done!

Now:

```jsx
//project-services.js
export const getAllProjects = async () => {
	const response = await fetch("https://localhost:3000/projects");
	if (!response.ok) throw new Error("Failed to fetch Projects");
	const data = await response.json();
	return data;
};

export const getProjectById = async (id) => {
	const response = await fetch(`http://localhost:3000/projects/${id}`);
	if (!response.ok) throw new Error(`Failed to find project with id: ${id}`);
	const data = await response.json();
	return data;
};
```
