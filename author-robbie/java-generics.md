# Generics

- Because java is a typed language, it can be hard to have a more generic class, for example, of `FavouriteThings`
- Allow us to create a class that works with any non-primative data-type
- The `E` or `T` in the java documentation refers to this
- The An `ArrayList<>` is one example we've used before, and we use the angled brackets to indicate we are working with the `any` type
- You still cannot add two different data types to an array

```java
  public class FavouriteThings<T> {

    T[] listOfFavourites;

    public FavouriteThings(T[] listOfFavourites) {
      this.listOfFavourites = listOfFavourites;
    }
  }
```

```java
public static void main(String[] args) {

  FavouriteThings<Integer> favNums = new FavouriteThings<>(new Integer[] { 1, 2, 3 });
  FavouriteThings<String> favWords = new FavouriteThings<>(new String[] { "holidays", "food", "money" });
}
```

## Using generics in methods

```java
public class ArrayHelper {

  public static <T> void printArray(T[] anyArr) {
    for(T thing: anyArr) {
      System.out.println(thing);
    }
  }
}
```

## Bounded Generics

- You can retain some control over what gets put into a generic method/array
- For example, you can make sure your generic only accepts data types that implement a certain interface

```java
public class Coordinates<T extends Number> {

  // We want to only accept numerical types, because it wouldn't make sense to make our coords strings or booleans or Persons
  T x;
  T y;

  public Coordinates(T x, T y) {
    this.x = x;
    this.y = y;
  }

  public void printCoordinates() {
    System.out.println("The coordinates are (" + this.x + ", " + this.y + ")");
  }
}
```
