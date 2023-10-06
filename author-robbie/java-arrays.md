# Arrays

- Arrays in java are of fixed size/length
  - They are given a place in memory, resembling other programming languages that aren't javascript
- Arrays are also typed, so you cannot easily mix data types in the same array
- There are two different ways of creating arrays:

```java
String[] names = { "Wendy", "Samantha", "Peter" }; // Initialising a populated array of length 3
String[] otherNames = new String[2]; // Initialising an empty array of length 2, with default values 'null'

System.out.println(names[1]); // output: "Samantha"
System.out.println(names[3]); // does not compile - index reference out of bounds error
System.out.println(names); // prints the array's address in memory
System.out.println(Arrays.toString(names)); // prints a String representation of the array's contents

int[] numbers = { 3, 5, 7, 1 };
int[] moreNumbers = new int[2]; // defaults to zero in each index
System.out.println(Arrays.toString(numbers));
```

## Working with arrays

### Adding to an array

- Quite a lot of steps more than javascript
- You would need to create a new bigger array, loop over the old array's values and insert them, add more values and then reference the new array from the old array, but...
  - Thankfully, we have `System.arraycopy` which takes lots of arguments
    - Thankfully, we also don't do this very often

## Multi-dimensional arrays

- Creating and looping through a multi-dimensional array:

```java
int[][] empty = new int[2][2]; // turns into {{ 0, 0 }, { 0, 0 }}
int[][] multi = {{ 1, 2, 3 }, { 4, 5, 6 }};
int[][][] triMulti = new int[3][3][3]; // you can do as many dimensions as you want

System.out.println(multi[0][0]); // output: 1
System.out.println(multi[1][1]); // output: 5

for (int i = 0; i < multi.length; i++) {
  for (int j = 0; j < multi[i].length; j++) {
    System.out.println(multi[i][j]);
  }
}
```

## `ArrayList`

- A resizable-array implementation of the "List interface"
- You cannot create an ArrayList using primitive data types, but you can utilise a `wrapper class` to help you insert primitive data types

```java
import java.util.ArrayList;

ArrayList<String> stringList = new ArrayList<String>();
ArrayList<String> populatedList = new ArrayList<>(Arrays.asList("hello", "java"));
stringList.add("hello");
stringList.add("java");
System.out.println(stringList.size());
System.out.println(stringList); // will print out the array list as a string

ArrayList<int> noInts = new ArrayList<int>(); // will not work
ArrayList<Integer> ints = new ArrayList<Integer>(); // wrapper class will treat your primitive types as objects
ints.add(3); // this works now
```
