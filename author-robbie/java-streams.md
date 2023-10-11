# Streams

- A wrapper around our data that will give us access to JavaScript-like array iterators like `map` and `reduce`
- Under the hood, using a stream will convert your array into a string so it can be worked on
- Streams are more-readable, arguably less code to write, and less prone to bugs
- In Java, they can be much more efficient than loops, thanks to multi-threading

## Passing in functions

- One option is a lambda function: the java equivalent to the arrow function in js

```java
newStream.map((num) -> num + 1);
```

Or we can pass in a method by reference using `ClassName::methodName`

```java
afterFilter.toArray(Integer[]::new);
```

## Converting a regular array into a stream

```java
Integer[] numbers = { 1, 2, 3, 4 };

// Converting the array into a stream/string
Stream<Integer> numberStream = Stream.of(numbers);

// use map to double the numbers using a lambda function:
Stream<Integer> doubledStream = numberStream.map((value) -> value * 2);
// or use an existing function:
Stream<Integer> doubledStream = numberStream.map(MathUtils::doubleNumbers);

// terminate the stream, convert back to an array
Integer[] doubledNumbers = doubledStream.toArray((size) -> new Integer[size]);
Integer[] doubledWithMap = doubledStream.toArray(Integer[]::new);

// Printing out an array
System.out.println(Arrays.toString(doubledNumbers));
```

## Chaining methods together

- You can also chain together your stream methods if the method before it returns a stream

```java
Integer[] moreNumbers = { 3, 4, 5, 6, 7 };

// turn our data source into a Stream
Stream<Integer> newStream = Stream.of(moreNumbers);

// use any methods that exist for Streams
Stream<Integer> afterMap = newStream.map((num) -> num + 1);

// we can use another if we didn't terminate
Stream<Integer> afterFilter = afterMap.filter((num) -> num >= 5);

// we terminate here, converting the stream back to an array
// ClassName::methodName means we are passing a method by reference
Integer[] filterArr = afterFilter.toArray(Integer[]::new);

System.out.println(Arrays.toString(filterArr));
```

- This also helps us write nicer looking code, similar to JavaScript

```java
Integer afterDoingStuff = stream.of(numbers)
  .map((num) -> num + 2)
  .filter((num) -> num < 6)
  .toArray((size)) -> new Integer[size]);
```

## Streaming Lists

```java
ArrayList<String> words = new ArrayList<>(Arrays.asList("one", "two", "three" ));

// Lists have a different syntax/method for converting to and from a Stream:
List<String> upperCaseWords = words.stream()
  .map((word) -> word.toUpperCase())
  .collect(Collectors.toList());

upperCaseWords.forEach(word -> System.out.println(word));
// or:
upperCaseWords.forEach(System.out::println);
```

## Optionals

- An `Optional` is a container object that may or may not contain a non-null value
- If some value is not present, instead of breaking the application, an Optional will represent this
- `.isPresent()` and `.get()` are useful methods when working with these

```java
ArrayList<String> names = new ArrayList<>(Arrays.asList("Kate", "Jack", "Adam"));

Optional<String> nameWithK = names.stream()
  .filter(name -> name.toUpperCase().charAt(0) == 'K')
  // this returns an Optional, and consequently will end a stream:
  .findFirst();

// Returns a boolean representing if the Optional has a value or not:
if (nameWithK.isPresent()) {
  System.out.println(nameWithK.get());
}
// The alternative way of checking:
if (nameWithK.isEmpty()) {
  System.out.println("Sorry, nothing found");
}
```

- Another great method to use on Optionals is `orElse`
- Returns the value if a value is present, or returns whatever argument you pass

```java
ArrayList<String> names = new ArrayList<>(Arrays.asList("Kate", "Jack", "Adam"));

String name = names.stream()
  .filter(name -> name.toLowerCase().charAt(0) == 'k')
  .findFirst()
  .orElse("friend");
```

## `.reduce`: The Java Edition

- Similar to the JS version, we can reduce a stream to a single value
- There are three versions of `reduce` in Java:
  - With one argument, you pass the stream, and there's no initial value set, so it returns an Optional, in case the stream is empty
  - With two arguments, you pass the initial value and the stream , and it will return the initial value if the stream is empty
  - With three arguments, you pass the initial value, the stream and _**LITERALLY ANY OTHER FUNCTION (WHICH WON'T RUN)**_

```java
Array<Integer> numsToReduce = new ArrayList<>(Arrays.asList(3, 4, 5, 6, 7));
```

### Single argument version

```java
Optional<Integer> sum = numsToReduce.stream()
  .reduce((prev, curr) -> prev + curr);
  // or:
Optional<Integer> sum2 = numsToReduce.stream()
  .reduce(Integer::sum);

// Processing the Optional in the chain:
Integer backToInt = numsToReduce.stream()
  .reduce(Integer::sum).orElse(0);
```

### Double argument version

- Pass the initial value first, the opposite of JavaScript:

```java
Integer sum = numsToReduce.stream()
  .reduce(0, (prev, curr) -> prev + curr);
```

```java
ArrayList<String> greetings = newArrayList<>(Arrays.asList("hello", "hi", "good morning"));

// Lambda functions can also be multi-lined, just like JavaScript
String allGreetings = greetings.stream()
  .reduce("", (prev, curr) -> {
    if (prev.equals("")) {
      return curr;
    }

    return prev + ", " + curr;
  })
```

### Triple argument version - Returning a different data type

- Makes more sense when working with "Parallel streams"
- This version is for inputting one data type and outputting another data type

```java
Integer lengthsOfWords = greetings.stream()
  .reduce(0, (prev, curr) -> prev + curr.length, System.out.println("This doesn't run"));
```

- You could clean it up perhaps by converting it to the right data type first, perhaps using `.map`

## Different stream types

- You use `mapTo...` methods on a Stream to allow you to convert data stream types and give access to relevant methods

```java
public double totalSalary() {
  return this.consultants.stream()
    // Using a consultant object with a getSalary method that returns a double, we can convert the stream
    .mapToDouble(con -> con.getSalary())
    // A method available to DoubleStreams
    .sum();
}
```
