# Classes

- We use classes to create objects
  - A class is a blueprint for an object
  - It defines what properties the object should have and what methods the object can perform
- Our applications will be built around objects that interact with each other, not functions

## Writing Classes

- Every class needs a separate file
- You can create a basic/default student like this:

```java
public class Student {
  String firstName = "John";
  String lastName = "Smith";
  String cohort = "Iceland";
  int age = 21;
  boolean isEmployed = false;
}
```

- To create a new object of type Student

```java
Student john = new Student();
// Data-type, variable name, new keyword, constructor
```

- To view those properties, you can do this:

```java
System.out.println(john.age);
System.out.println(john.cohort);
System.out.println(john.lastName);
System.out.println(john); // This will print the memory address of the object instead of the object itself
```

## Creating dynamic objects using a `constructor`

- Creating John was cool, but we need more than just clones of John
- A constructor is a method to create objects of the class, and must be called the same thing as the class
  - It can be given parameters and called with arguments
- You can have different constructors named the same if they take different parameters
- Java will add a basic constructor for you by default if you haven't written any constructors yet

```java
public class Student {
  String firstName;
  String lastName;
  String cohort;
  int age;
  boolean isEmployed = false;
  // Constructor:
  public Student(String firstName, String lastName, int age, boolean isEmployed) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.isEmployed = isEmployed;
    // boolean isEmployed = false; <-- comes from earlier declared variable
  }
}
```

## Access modifiers

<a href="https://www.w3schools.com/java/java_modifiers.asp">W3Schools Java Modifiers</a>

- The `public` and `private` keywords (amongst others) have different effects on classes and variables, depending on the context
- A `private` variable is only accessible inside its class
- If you are using `public` classes from within the same package, you have access to them without importation, otherwise you may need to import them if they are in a separate package

## Getters and setters

- To avoid exposing properties from a class or object, you can use getter and setter methods
- You will typically make your properties `private` and your getter and setter methods `public`
- In Eclipse, you can auto-generate getters and setters by right-clicking in the code, then selecting Source
- Having setter methods gives us greater control/error handling over our operations

### Getter method:

```java

private String firstName = "John";
private boolean isEmployed = false;

// Returns the firstName string
public String getFirstName() {
  return this.firstName;
}

public boolean isEmployed() {
  return this.isEmployed;
}
```

### Setter method:

```java
// Returns void/nothing, updates the value of firstName;
public void setFirstName(String firstName) {
  this.firstName = firstName;
}


public void setAge(int age) {
  if (age <= 0) {
    this.age = 10;
  } else {
    this.age = age;
  }
}
```

## Other methods

- You can make up your own methods for each class that each instance of that class will have access to:

```java
// Cannot be called from Main
private String getFullName() {
  return (this.firstName + " " + this.lastName);
}

// Can be called from Main
public void printFullName() {
  System.out.println(this.getFullName());
}
```

## Static method

- You can call these methods from the class name directly
- You do not need to make an instance of the object to be able to use a `static` method
- Helpers and utilities classes will have a lot of these

```java
// file: Calculations.java
public static int add(int x, int y) {
  return x + y;
}

// file: Main.java
int x = 2;
int y = 7;
int sum = Calculations.add(x, y);
```

## Method overloading

- `Overloading` is when you have multiple methods with the same name, but with different parameters
  - You could have more/less parameters, or a different type of parameters (ie. `int` or `byte`)
- We have already seen this with constructors

```java
// file: Calculations.java
public static int add(int x, int y) {
  return x + y;
}

public static int add(int x, int y, int z) {
  return x + y + z;
}

// file: Main.java
int x = 2;
int y = 7;
int z = 4;
int sum2= Calculations.add(x, y); // returns 9
int sum3 = Calculations.add(x, y, z); // returns 13
```
