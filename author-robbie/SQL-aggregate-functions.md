# Aggregate Functions

### Count

```SQL
SELECT COUNT(*) from cities WHERE countries_code = 'CAN';
-- Returns 49, the number of Canadian cities
```

### Distinct (unique)

```SQL
SELECT COUNT(countries_code) FROM cities;
-- Returns 4,079, the number of records

SELECT COUNT(DISTINCT countries_code) FROM cities;
-- Returns 232, the number of unique records
```

### Min/Max

```SQL
SELECT MIN(population) FROM cities;
-- Returns '42', the population of the least populated city

SELECT MAX(population) FROM cities;
-- Returns '10,500,000', the population of the most populated city

SELECT * FROM cities WHERE population = (SELECT MAX(population) FROM cities);
-- Returns city data for this 10.5mil city
-- This 2nd part is a "sub-query"
```

### Average, Sum

```SQL
SELECT SUM(population) FROM cities;
-- Returns 1.429b, the overall population of all cities
SELECT AVG(population) FROM cities;
-- Returns 350,468, the average population of all cities
```

### Group by

- When there are many records with a similar field, you can group together your aggregate functions logic

```SQL
SELECT countries_code, SUM(population) AS total_population
FROM cities
GROUP BY countries_code;
-- Returns a list giving an insight into the total population of each country's cities
```

```SQL
SELECT countries_code, AVG(population) AS average_population
FROM cities
GROUP BY countries_code
ORDER BY average_population DESC;
```
