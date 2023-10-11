# Interfaces

- An interface is a data plan/safety feature that ensures that classes that implement the interface have an implementation of the classes declared in the interface
  - It's a way of ensuring that
- A bit like a class (it gathers some requirements about what objects should do)
- We don't create instances of interfaces (it is not possible)
- With an interface, we list methods we want our classes to have but we don't implement them
- It is the task of a class to `implement` the interface
- They allow us to use polymorphism (we can treat an interface as a type)
- They allow us to ensure that classes that might not seem related have the same methods
- Unlike parent-child classes, a single class can gain "inheritance" from many interfaces, not just one

## Creating an Interface

- Naming your interfaces can follow one of two conventions:
  - A verb-like: `DoesSomething`
  - Prefixed with I: `ISomething`

```java
public interface MakesSound {

  // Abstract method - does not provide implementation - no method body
  public String sound();
}
```

```java
public class Cat implements MakesSound {

  @Override // annotation
  public String sound() {
    return "Meow";
  }

}
```

```java
Cat cat = new Cat();
Dog dog = new Dog();

System.out.println(cat.sound());
System.out.println(dog.sound());

// Polymorphism - we can treat interfaces as types
MakesSound[] animals = { cat, dog };

for (int i = 0; i < animals.length; i++) {
  System.out.println(animals[i].sound());
}
```

## Multiple Interfaces

```java
public class MultipleInterfaces implements OneInterface, AnotherInterface {
}
```

## Super Interfaces

```java
public interface FirstInterface {
  public void firstInterfaceMethod();
}
```

```java
public interface SecondInterface extends FirstInterface {
  public void secondInterfaceMethod();
}
```

```java
public class WithSuperInterfaces implements SecondInterface {
  // will need both methods implemented
}
```
