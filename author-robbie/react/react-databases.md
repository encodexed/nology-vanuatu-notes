# Firestore

## Databases

- We need databases for storing and retrieving data and information
- CRUD operations
- Persistant application state

## SQL

- <ins>S</ins>tructured <ins>Q</ins>uery <ins>L</ins>anguage
- Data is stored in tables
- Tables have relationships with each other
- Enforced structure, (when done properly) little to no duplication of data
- Complex relationships and complex queries

## Document

- Very similar toJSON
- No enforced structure
- Duplicated/denormalised data
- Less likely to have relationships with other document
- Benefit is very fast lookup

## Why use Firestore?

- It's similar to what we know already: document database with a JSON like structure
- Popular choice to use with React
- Well suited towards live data, provides a very easy subscription API
  - Allows real time updates, good for things like chat apps

## Setting up a Firestore

A note about documentation: it is... not good. You should be looking for Web modular API documentation in the docs.
<a href="https://firebase.google.com/docs/Firestore/manage-data/delete-data">Here is an example</a>

1. Create a project with a unique name
2. Go to Cloud Firestore and create a database
3. Start a database in Test mode as an easier start, but your data is more public and it will stop working after 30 days
4. Go to Project Settings and select your app dowwn the bottom
5. Create an app and register it
6. Follow the instructions to install firebase

_**BE VERY CAUTIOUS WITH API KEYS, IF YOU ONLY HAVE A FRONT END, IT WILL BE EXPOSED IN THE SOURCE CODE**_

7. Create a config folder in src with a config file `firestore.js`

```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const apiKey = import.meta.env.VITE_FIRESTORE_API;

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "...",
	authDomain: "...",
	projectId: "...",
	storageBucket: "...",
	messagingSenderId: "...",
	appId: "...",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
```

8. Add the config details there, but maybe move the API Key to .env and add that file to .gitignore

## QuerySnapshot

- Working with Firestore, you will gain access to pieces of data called `QuerySnapshot` or `DocumentSnapshot`
- Typically we get these snapshots and then turn them into objects that we can work with

```js
import { db } from "../config/firestore";
import { collection, getDocs } from "firebase/firestore";

export const testDatabase = async () => {
	const collectionRef = collection(db, "test-collection"); // config file ref to the database, then name of collection on Firestore
	const snapshot = await getDocs(collectionRef);
	// Takes in a query/collection ref that returns a promise of a query snapshot
	console.log(snapshot);
	snapshot.docs.forEach((doc) => console.log(doc.id, doc.data()));
	// Should log a QuerySnapshot with your data plus metadata
	const documents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	console.log(documents);
	// This will give us an array that is useful to us to be worked with
	return documents;
};
```

Using this will get our logs:

```jsx
import { useEffect } from "react";
import { testDatabase } from "./services/test-database-service";

function App() {
	useEffect(() => {
		testDatabase();
		// using it:
		getAllMovies()
			.then((movies) => setMovies(movies))
			.catch((err) => console.log(err));
	}, []);

	return <div>Firebase / firestore</div>;
}

export default App;
```

## Getting a single reference (READ)

```js
import { db } from "../config/firestore";
import { doc, getDoc } from "firebase/firestore";

export const getMovieById = async (id) => {
	const docRef = doc(db, "movies", id);
	// doc gets a single collection reference
	const snapshot = await getDoc(docRef);
	// returns a promise of a document snapshot
	if (!snapshot.exists()) {
		throw new Error("Document not found");
	}
	return { id: snapshot.id, ...snapshot.data() };
};
```

- This will return a DocumentSnapshot instead of a QuerySnapshot
- There is a chance that this document doesn't exist, and there is a function on this document called `exists`

## Creating a document programmatically (CREATE)

- Using react-hook-form with Yup is nice because it allows for schema-based validation which ensures that all of our document objects are the same
- Here is some of the code:

```jsx
// file: schema.js
import * as yup from "yup";

export const schema = yup.object({
	title: yup.string().required("Please enter a title"),
	year: yup.number().required("Please enter a year").min(1895).max(2025),
	director: yup.string().required("Please enter a director"),
	genre: yup.string().required("Please enter a genre"),
	imageLink: yup
		.string()
		.required("Please add image link")
		.url("Image link must be a URL"),
});
```

- Using the validated data, we can create a service that takes the data and creates an object in Firestore with our new document

```js
// file: movie-services.js
import { collection, addDoc } from "firebase/firestore";

export const createMovie = async (data) => {
	try {
		const collectionRef = collection(db, "movies");
		const newMovieRef = await addDoc(collectionRef, data);
		return newMovieRef;
	} catch (e) {
		console.log(e);
		throw e;
	}
};
```

## Redirecting your users

- You can `useNavigate` to redirect users after they submit a form, for example

```js
import { useNavigate } from 'react-router-dom';

const CreateMoviePage = () => {
  const navigator = useNavigate();
  const submitFunc = (data) => {
    console.log(data);
    createMovie(data)
      .then((movie) => {
        console.log(movie);
        navigator('/movies');
      })
      .catch((e) => console.warn(e));
  };
```

## The trade-off

- In web development, there is always a trade-off
- Here, we have to strike a balance between making more/less API calls with having more/less up-to-date data on the page

## Using returned objects to update client-state

- When you create some piece of data, you will often have an object returned to you via HTTP
- This means you can work with the data you just created
- This means you can update a state/context with it, for example

```js
export const createMovie = async (data) => {
	try {
		const newMovie = { ...data, watchCount: 0 };
		const collectionRef = collection(db, "movies", newMovie);
		const newMovieRef = await addDoc(collectionRef, data);
		// return the created Movie
		return { id: newMovieRef.id, ...data };
	} catch (e) {
		// if i need to I can log etc here
		console.log(e);
		throw e;
	}
};
```

```jsx
const CreateMoviePage = () => {
	const navigator = useNavigate();
	const { addToMovies } = useContext(MoviesContext);
	const submitFunc = (data) => {
		createMovie(data)
			.then((movie) => {
				addToMovies(movie);
				navigator("/movies");
			})
			.catch((e) => console.warn(e));
	};

	return {
		/* ... */
	};
};
```

## Removing documents programmatically (DELETE)

- Don't forget that it's often nice to put in a confirmation. Here's just one quick way to do this:
- We also need to have some sort of navigation away from something that's been deleted or you are going to end up on a page that doesn't exist

```js
const onDeleteButtonClick = (e) => {
	const confirmed = confirm("Are you sure you want to delete this movie?");
	if (confirmed) {
		deleteMovieById(id)
			.then((deletedId) => removeMovieById(deletedId))
			.then(() => navigator("/movies"))
			.catch((e) => console.warn(e));
	}
};
```

- You will need the ID of the document you are deleting, and you can get that from the Doc/Query snapshot
- The return from deleting a document is `void`/nothing so you won't be able to use the return value to confirm what has been deleted, and if it has been deleted
- You may need to write your own code to update the state/context of the app to remove the document, if that is your method of keeping track of changes

```js
export const deleteMovieById = async (id) => {
	try {
		const docRef = doc(db, "movies", id);
		await deleteDoc(docRef);
		return id;
	} catch (e) {
		console.log(e);
		throw e;
	}
};
```

## Updating documents programmatically (UPDATE)

- You can add fields to data programmatically using something called `.set` but that might need to be looked up in the docs
- To update a document, we use `updateDoc` which we pass an object into
- To increment a value using `increment()` inside it
- Unfortunately, `updateDoc` also returns `void`

```js
export const incrementWatchCountById = async (id) => {
	try {
		const docRef = doc(db, "movies", id);
		await updateDoc(docRef, {
			watchCount: increment(1),
		});
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
};
```

## Live Updates (Firestore)

- The best feature of Firestore
- As opposed to working with state to keeping our changes up to date, we can subscribe to live updates from Firestore
- Live Updates are great for times when you need consistently up to date data, such as a chat app, but for times where data is slower, perhaps a blog or something similar, you can definitely set up state management, or even polling where you automatically send a GET request to update your data every minute, for example
- You can listen to a document with the `onSnapshot()` method
  - Takes two arguments: the referemce to the document, then a function with a parameter `snapshot` that runs every time the data changes
- It gets a bit weird though, as this method returns a function that unsubscribes
  - So you typically create your listener with something like `const unsubscribe = () => {}` and then you call this function when you want to stop listening

```js
export const subscribeToMovies = (callback) => {
	const collectionRef = collection(db, "movies");
	const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
		const movieData = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		callback(movieData);
	});

	return unsubscribe;
};
```

```jsx
const LiveMoviesPage = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const unsub = subscribeToMovies(setMovies);
		return () => unsub();
	}, []);

	return {
		/* ... */
	};
};
```
