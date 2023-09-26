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

## Why use firestore?

- It's similar to what we know already: document database with a JSON like structure
- Popular choice to use with React
- Well suited towards live data, provides a very easy subscription API
  - Allows real time updates, good for things like chat apps

## Setting up a firestore

1. Create a project with a unique name
2. Go to Cloud Firestore and create a database
3. Start a database in Test mode as an easier start, but your data is more public and it will stop working after 30 days
4. Go to Project Settings and select your app dowwn the bottom
5. Create an app and register it
6. Follow the instructions to install firebase

- BE VERY CAUTIOUS WITH API KEYS

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

```js
import { db } from "../config/firestore";
import { collection, getDocs } from "firebase/firestore";

export const testDatabase = async () => {
	const collectionRef = collection(db, "test-collection"); // config file ref to the database, then name of collection on firestore
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

	return <div>Firebase / Firestore</div>;
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

- Using the validated data, we can create a service that takes the data and creates an object in firestore with our new document

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
