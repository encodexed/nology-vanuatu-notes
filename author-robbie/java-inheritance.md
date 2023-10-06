# Inheritance

- Inheritance refers traits and properties we gain from our parents, in real life and in java
- In java, we can use it to reduce repetition in our code
- We can create a parent class and child classes
  - Child classes `extend` the parent class
- They inherit all the methods and properties from the parent, but they can also have their own
- One of the pillars of OOP (Object-Oriented Program), as well as:
  - encapsulation
  - polymorphism
  - abstraction
- A parent can have multiple children, but a child can only extend one parent

## Creating and using a child class

- You can call the parent class's constructor inside the child class, but you can give it extra properties
- Using the `super` keyword refers to the parent, and calling `super()` in your child's constructor instructs java to construct from the parent

```java
// file: Person.java
public class Person {

  private String name;
  // Cannot be read by child, must be retrieved in child using getter method

  public Person(String name) {
    this.name = name;
  }

  public void sayName() {
    System.out.println(String.format("Hi, I'm %s", this.name));
  }

  public String getName() {
    return this.name;
  }
}

```

```java
// file: Student.java
public class Student extends Person {

  private String cohort;

  public Student(String name, String cohort) {
    super(name);
    this.cohort = cohort;
  }

  public void sayName() {
    System.out.println(String.format("Hi, I'm %s and I am in the cohort %s", this.getName(), this.cohort));
  }
}
```

```java
// file: Teacher.java
public class Teacher extends Person {

  public Teacher(String name) {
    super(name);
  }

  public void callMeeting(Person personObj) {
    String personName = personObj.getName();
    System.out.println(String.format("A meeting is to be held between %s and %s", this.getName(), personName));
  }

}
```

- Now we will probably want to construct and use them inside our Main thread

```java
// file: Main.java
public class Main {
    public static void main(String[] args) throws Exception {

        Teacher aidan = new Teacher("Aidan");
        Teacher calum = new Teacher("Calum");
        Student robbie = new Student("Robbie", "Vanuatu");
        Student max = new Student("Max", "Vanuatu");
        Student meshak = new Student("Meshak", "Vanuatu");

        Person[] people = { aidan, calum, robbie, max, meshak };
        for (int i = 0; i < people.length; i++) {
            people[i].sayName();
        }

        calum.callMeeting(aidan);
        calum.callMeeting(meshak);
        aidan.callMeeting(max);
    }
}
```

## Method Overriding

- When a method is declared on the parent, and the child does not have a method by the same name, calling it on the child will invoke the parent's method
- When a method is declared on both the parent and child, calling it on the child will invoke its own method
  - _NEED TO DOUBLE CHECK THAT_

## Polymorphism

- When we talk about data types, an object can take many forms, it can be treated as either a child of the parent or the child itself, but a parent cannot be treated as a child
- Whatever the common data type is, you can group them together
- You can more clearly see this below:

```java

Person[] people = { somePerson, someTeacher, someStudent };

```
