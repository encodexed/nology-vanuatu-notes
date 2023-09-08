# Complex Data

- As web developers, what sources of data do we use?
  - Databases
  - APIs

## APIs

- <ins>A</ins>pplication <ins>P</ins>rogramming <ins>I</ins>nterface
- Literally something you can interact with
- In web development, we're often talking about using an API getting data over the internet
- When we get data from an API, it's often in a complex shape:

  - JSON
  - Quite often, arrays of objects

- You often want to have an `id` field, especially amongst large amounts of data, to help you track uniqueness

```js
const coaches = [
	{
		id: 1,
		name: "Alex",
		age: 35,
		location: "Melbourne",
		pets: [
			{ name: "Popcorn", type: "rat" },
			{ name: "Kin", type: "cat" },
		],
	},
	{
		id: 2,
		name: "Martyna",
		age: 28,
		location: "Melbourne",
		pets: [{ name: "Bob", type: "fish" }],
	},
	{ id: 3, name: "Calum", age: 26, location: "Sydney", pets: [] },
];
```

## Accessing items

- To figure out the path of access, you need to start from the outside and work your way inwards

```js
const alexPet2 = coaches[0].pets[1].name;
// output: 'Kin'

const martynaPetType = coaches[1].pets[0].type;
// output: 'fish'

const calumPetName = coaches[2].pets[0].name;
// output: error - cannot read properties of undefined (reading 'name')

const calumPetName = coaches[2].pets[1] && coaches[2].pets[1].name;
// output: undefined, program keeps running
// `&&` is like the safety net
// this is tedious... so we use the optional chaining operator
```

### Optional chaining operator (`?.`)

- A new addition to Javascript in recent years
- `?.` either keeps diving deeper if the data exists, or breaks out and returns `undefined` if not

```js
const calumPetName = coaches[2]?.pets[1]?.name;
// output: undefined, program keeps running
```

### Filtering complex data

- Here's an example of filtering some data

```js
const melbourneCoaches = coaches.filter(
	(coach) => coach.location === "Melbourne"
);

const coachesWithPets = coaches.filter((coach) => coach.pets);
```
