# SQL / MySQL

- <ins>S</ins>tructured <ins>Q</ins>uery <ins>L</ins>anguage
- A relational database, in which, everything is a table
  - With document databases, you have to plan your data out a bit more to know how to represent something
- In SQL, each entity gets a table, and we use columns to represent a field or property, like name, age, location of a student
- Then there might be some sort of id that helps us link tables together

## Connecting

- Check that you have MySQL

## Writing our first queries

### Setting up our first database

```SQL
-- Shows all of your databases
SHOW DATABASES;
-- Creates a new database
CREATE DATABASE pet_store;
-- Make sure you then "use"/enter the database
USE pet_store;
-- If you want to delete it, delete it like this
DROP DATABASE pet_store;
```

### Reading data

```SQL
-- Shows all of the tables inside our database
SHOW TABLES;
-- Show the entire 'cities' table
SELECT * FROM cities;
-- A more specific query: will only show two columns 'name' and 'population'
SELECT name, population FROM cities;
```

### Filtering data

```SQL
-- Select every city with country code 'AUS'
SELECT * FROM cities WHERE countries_code = 'AUS';
-- Select every city where the population is over 10,000
SELECT * FROM cities WHERE population > 10000;
-- % is a placeholder for however many letters afterwards
-- Selects cities such as 'New York', 'New Orleans'
SELECT * FROM cities WHERE name LIKE 'new %';
-- _ is a placeholder for one letter
-- Select cities of any length with 2nd letter 'o'
SELECT * FROM cities WHERE name LIKE '_o%';
-- Select cities with 3 letters, 2nd letter 'o'
SELECT * FROM cities WHERE name LIKE '_o_';
```

### Multiple conditions

```SQL
-- Select cities starting with B with over 200k population
SELECT * FROM cities WHERE name LIKE 'b%' AND population > 200000;
-- Select cities starting with Z or cities under 1k population
SELECT * FROM cities WHERE name LIKE 'z%' OR population < 1000;
-- Select cities with population between 100k and 200k, INCLUSIVE
SELECT * FROM cities WHERE population BETWEEN 100000 AND 200000;
-- Select cities from Australia or the Netherlands
SELECT * FROM cities WHERE countries_code IN ('AUS', 'NLD');
```

### Limiting our data

```SQL
-- Get the first 10 records only
SELECT * FROM cities LIMIT 10;
-- Get 10 records, but with an offset of 1
-- The results start at the 2nd record
SELECT * FROM cities LIMIT 1, 10;
SELECT * FROM cities LIMIT 10 OFFSET 1;
```

### Sorting our data

```SQL
-- Sort your results alphabetically (ASC)
SELECT * FROM cities ORDER BY name;
-- Sort your results, but descending
SELECT * FROM cities ORDER BY population DESC;
-- Sort by 'name' first, and then 'population' for duplicate name records
SELECT * FROM cities ORDER BY name, population;
```

## Creating our data

- When creating a table, use a plural word for the name

```SQL
CREATE TABLE cohorts(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
  PRIMARY KEY(id)
);
```
