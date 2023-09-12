# Promises

## The state of Javascript

- Javascript is a single threaded language, meaning it can only do one thing at a time (sort of...)
- If you block the main thread you block JS from doing anything more
  - Generally, this is bad for web applications
  - Making users wait is typically not good UX
- The browser and Node, as it turns out, are both multi-threaded, so they have the ability to do more stuff at once

## Making code asynchronous

- `setTimeout` can defer code but doesn't prevent a script from progressing
- It sends code to the queue and tells it to run when the main script/thread is available, no sooner than the optional delay parameter

## Let's talk about Promises

- In real life, an agreement that we either keep or break, and they usually have some kind of timeframe
- In JS, it's an object!
- As a junior, you won't be writing much code that produces Promises, you will rather be dealing with them

## Using Promises

```js
// this creates a promise that resolves instantly - it's like setTimeout with delay: 0
const myFirstPromise = Promise.resolve("Hello World");

// remember you cannot actually get data out of a Promise, you need to use a method for that
```

- It has three potential states:
  - Pending: we don't know the outcome yet
  - Fulfilled: it did what we expected
  - Rejected: it didn't work out
- Promises can only change their state once
  - They can change from Pending to either other state, but not from Rejected to Resolved, etc.
- It has a few methods we typically use:
  - then: a function we run when we get the value back
  - catch: a function to handle the error
  - finally: a function that runs either way

```js
// using then to get the value out, ONCE IT HAS RESOLVED
myFirstPromise.then((value) => console.log(value));
```

```js
// using catch to catch errors
const myBrokenPromise = Promise.reject(new Error("No 1:1"));
myBrokenPromise.catch((error) => console.warn(error.message));
```

- You can chain `.then` with `.catch` to handle both resolution and rejection
