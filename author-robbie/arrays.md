# Arrays

- An array is:
  - an object
  - a data structure
  - an ordered collection of values
- An array will typically hold values that are related
- Allows us to store multiple values under a single variable name
- Each value of an array has an index/position, beginning at 0 for the very first value
- You can have multi-dimensional arrays by adding an array as a value within an array

```javascript
const emptyArr = [];
const animals = ["dolphin", "tiger", "eagle"];

console.log(animals[0]); // output: 'dolphin'

// Arrays have a length property, accessible like this:
console.log(animals.length);
```

- There is also another option for constructing an array ; the array constructor

```javascript
// multiple values enters elements
const anotherArr = new Array(1, 2, 3);

// single value enters length of array
const anotherArr = new Array(10);
// anotherArr.length = 10;
```

## Some very common methods for arrays

#### All of the following methods will mutate/modify our original array, not create new ones

`.push` adds something to the end of an array

```javascript
const arr = [];
arr.push(1);
// output: [1]
arr.push(3);
// output: [1, 3]
```

`.pop` removes something from the end of an array, and it also returns the value removed

```javascript
const arr = [1, 2, 3];
arr.pop();
// output: [1, 2] returns 3;
```

`.unshift` adds something to the beginning of an array

```javascript
const arr = [1, 2, 3];
arr.unshift(0);
// output: [0, 1, 2, 3];
```

`.shift` removes something from the beginning of an array

```javascript
const arr = [1, 2, 3];
arr.unshift();
// output: [2, 3];
```

## Spread (...) operator, arrays as reference types, mutable vs immutable

- Arrays are reference types and therefore we need to be careful how we interact with them
- Copying arrays will not act as expected and if we only copy the reference, then we will always be just mutating the original
- The spread syntax (`...`) is especially useful when cloning arrays, and will spread the contents of an <ins>iterable</ins> into another <ins>iterable</ins>
  - Iterable refers to something that can be iterated over, such as an array or a string
- Using spread also prevents original arrays being accidently mutated, which is elaborated on below

#### Without spread:

```javascript
const numbers = [1, 2, 3, 4, 5];
const numbersToo = numbers;
numbersToo.push(6);
console.log(numbers);
// output: [1, 2, 3, 4, 5, 6]
```

#### With spread:

```javascript
const numbers = [1, 2, 3, 4, 5];
const numbersToo = [...numbers];
numbersToo.push(6);
console.log(numbers);
// output: [1, 2, 3, 4, 5]
console.log(numbersToo);
// output: [1, 2, 3, 4, 5, 6]
```
