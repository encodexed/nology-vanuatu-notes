# Spring

## API Architecture

...

## Spring Architecture

- In Spring, we have a three-layer architecture
- Every layer is just a class with a specific duty
- Works with payloads of data, or a DTO (Data Transfer Object)
  - A DTO is a class that specifies what fields should be in the request body, and some rules for those fields (like 'required')

1. Controller Layer:

- Extracts data from the request/DTO
- Validates the data, making sure everything is there and valid
- Forwards the data once everything is marked okay

2. Service Layer:

- The "business logic" layer, where you modify the incoming data to be an object/Entity you'll save into the database
- You can clean up the data too, like removing uppercase letters or adding some fields
- What comes out is referred to as an Entity, a class that represents the final product, and we then send that to the next layer

3. Repository Layer:

- This is where the entity will be placed into the database and finally really uses the Spring framework, transforming the entity into a DAO (Data Access Object)(?)
- We can implement our CRUD here with the help of Spring
- This layer directly interacts with the database and deals with the returned response of that action

## Creating a Spring Project

<a href="https://start.spring.io/">Spring Initializr</a>

- We'll start by using Maven, which is like an equivalent of NPM
- Group refers to the domain of your company/site
- Dependencies:

  - Spring Web
  - Spring Boot DevTools (recom. not req.) (works like nodemon)
  - Lombok (recom. not req.) which helps with boilerplate code annotations
  - Validation adds annotations that help with validation
  - MySQL driver
  - Spring Data JPA has methods that talk to the database

- Generate the file, unzip it and import it to Eclipse, import an existing maven project under File
- The pom.xml file is like package.json, and Maven Dependencies is like the node_modules
- Add to `src/main/resources/application.properties`:

  ```
  spring.datasource.url=jdbc:mysql://localhost:3306/(DATABASE_NAME)`
  spring.datasource.username=root
  spring.datasource.password=(YOUR_PASSWORD)
  spring.jpa.hibernate.ddl-auto=update
  ```

- You can run this now
- You should pause Spring if you want to restart Spring manually, otherwise it will try to reconnect on the same port

## Different approaches to writing your Spring app

- 1st approach: divide packages by layers
  - Works better for small projects but gets messy quickly with larger projects
- 2nd approach: divide packages by domains/tables
  - Easier to find things and works better in the end

## Our first GET

- Create a new package
- Create a controller layer

```java
package alakaslam.io.robbieTest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/greeting")
public class GreetingController {

	// This annotation means that we any GET request coming here should return this:
	@GetMapping
	public String helloWorld() {
		return "Hello World";
	}

	@GetMapping("/goodbye")
	public String goodBye() {
		return "Goodbye World";
	}

	@GetMapping("/{name}")
	public String helloWithName(@PathVariable String name) {

		return String.format("Hello %s", name);
	}
}


```
