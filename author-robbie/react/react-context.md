# Context

- In general: The environment, circumstances, additional information
- In react: A way to pass relevant data to components, even if they are heavily nested
  - An alternative to using props to pass state down the component tree

## `useContext`

To wrap our components in some parent component, that ALL children, no matter how deeply nested, will then have access to the value set on that provider

```jsx
import { createContext } from "react";
export const SearchContext = createContext(null);

const App = () => {
	<SearchContext.Provider value='test value'>
		<SearchBar />
		<NameList />
	</SearchContext.Provider>;
};

export default App;
```

In the above example, both `SearchBar` and `NameList` have access to the value property on the provider

```jsx
// inside either SearchBar or NameList
import { useContext } from "react";
import { SearchContext } from "../../App";

const receivedValue = useContext(SearchContext);
console.log(receivedValue);
```

The power of this is when you combine this with state:

```jsx
const [searchTerm, setSearchTerm] = useState(null);

const App = () => {
	<SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
		<SearchBar />
		<NameList />
	</SearchContext.Provider>;
};
```

```jsx
// inside NameList
const { searchTerm } = useContext(SearchContext);
```

```jsx
// inside SearchBar
const { setSearchTerm } = useContext(SearchContext);
const inputRef = useRef(null);

const onSubmit = (e) => {
  e.preventDefault();
  setSearchTerm(inputRef.current.value);
  e.target.reset();
}

return (
  <form onSubmit={onSubmit}>
    <input type="text" ref={inputRef}>
  </form>
)
```

## Creating a Context component

- Handling a bunch of different states and exporting in the imports section can clutter up your code
- Thankfully, you can just create a component to handle this kind of work

```jsx
// SearchContextProvider.jsx
import { createContext, useState } from "react";

export const SearchContext = createContext(null);

const SearchContextProvider = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState(null);

	return (
		<SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
			{children}
		</SearchContext.Provider>
	);
};
```
