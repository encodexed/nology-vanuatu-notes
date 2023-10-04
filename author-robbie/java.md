# Java

- A little different to javascript, which is used mostly for front-end applications
- Java is good for making backend applications and creating our own APIs
- Java is a _compiled_ language
  - Before running our code, we must compile it and a class file will be created, which is basically just byte-code for the computer to read
- Java is a typed language
  - When creating variables, we need to give them a type and that cannot be changed
- It is platform-independent thanks to the Java Virtual Machine (JVM)
- You will need a Java Development Kit (JDK) for your machine if you code outside of Eclipse
  - The JDK involves the Java Runtime Environment (JRE), classes library, as well as a compiler, debugger and JVM
- The classes library is basically the data which defines our classes

## Writing Java

- Remember to name your java files with a capital letter

```java
// This needs to be imported from the class library for the compiler to know what a Date is
import java.util.Date;

class Main {
  public static void main(String[] args) {
      System.out.println("Hello, World!");
      Date now = new Date();
      System.out.println(now);
      System.out.print("No new line created...");
  }
}
```

## Primitive types

- All primitive data types are lowercase named
- Only primitive data types can be compared with `==`
  - `===` does not exist here because we know what types things are already

```java
boolean someBool = true;
char someChar = 'a'; // You must use single quotes for chars
```

## Numeric data types

- There are many different numeric data types in java, and the main difference is size
  - There are 8 _bits_ in a _byte_, which gives us a maximum of 256 options on a single byte
  - A `byte` data type will use 7 of its bits for numbers, and the final bit for its negativity or positivity
- The default numeric type in java is an `int`, we will use this mostly
- You can add an `_` in place of a comma to make large numbers more readible.

These store whole numbers only:

```java
byte byte = 127; // 1 byte, range: -128 to 127
short short = 32_767; // 2 bytes, range: -32,768 to 32,767
int int = 2,147,483,647; // 4 bytes, range: -2,147,483,648 to 2,147,483,647
long long = 9,223,372,036,854,775,807l; // 8 bytes, range: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
// Remember to add an L/l at the end of this number otherwise Java treats it as int, for some reason...

```

These store fractional numbers, as well as whole numbers:

```java
float float = 12.123456f; // 4 bytes, precision: Sufficient for storing 6 to 7 decimal digits
// Remember to add an L/l at the end of this number otherwise Java treats it as int, for some reason...
double double = 1.12345678901234; // 8 bytes, precision: Sufficient for storing 15 decimal digits
```

- If you have a larger number before the decimal point, you will have less precision space after the decimal points
- You need to be very careful when working with floats

## Casting data types

- You can cast one data type into another data type, but beware of moving values into incompatible data types
  - Some smaller data types won't be big enough to store data coming from larger data types

```java
byte tooBig = (byte) 130; // This will lead to some bugs in your code
```

- When doing arithmetic, `int` will be used as the default value unless we're working with `long`
- The largest fractional numeric data type involved will be used when working with them

## Other data types

```java
String name = "Robbie"; // You must use double quotes for strings
```

## Grabbing input from users in the console

- To read input from the user, we need to use the `Scanner` class

```java
Scanner s = new Scanner(System.in); // create a new scanner object
System.out.print("Please enter an integer: "); // prompt the user
int fromUser = s.nextInt(); // waits for the next int entered by the user
System.out.println("Your input was " + fromUser);
s.close(); // close the scanner if no longer needed
```

## Control Flow / Conditionals

- Very similar to javascript, just the variables are different

```java
byte age = 17;
if (age >= 18) {
  System.out.println("You can drive a car");
} else {
  System.out.println("You are too young");
}
```

- Comparing complex data types is a bit different

```java
String country = "Aus";
if (country.equals("Aus")) {
  System.out.println("You can speak English");
}
```

- You can assign `null` to any type and sometimes you can re-arrange your code to check for that

```java
String country = null;
if ("Aus".equals(country)) {
  System.out.println("You can speak English");
}
```

### Switch statement

```java
char command = 'e';
switch(command) {
  case 'c':
    System.out.println("Continue running...");
    break;
  case 'e':
  case 'E':
  case 'q':
    System.out.println("Exit...");
    break;
  default:
    System.out.println("Invalid command");
}
```
