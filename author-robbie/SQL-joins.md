# Joins

- Key to the "relational" part of relational databases

## Inner-Joins

- Using an ID column or another column that is common in both tables, you can join the two tables together
- Will only return records that have a match by that column

```SQL
SELECT name, language, percentage, population FROM country_languages
INNER JOIN cities
ON cities.countries_code = country_languages.countries_code
WHERE language LIKE 'English'
AND percentage > 50
ORDER BY language, name;
```

## Left-Joins and Right-Joins

- Overall, has the potential to return more data than an inner join
- The table

### Left:

- Similar to an inner join, but everything from the left table will return with their corresponding right table data

### Right:

- Similar to an inner join, but everything from the right table will return with their corresponding left table data

## Outer-Joins (FULL)

- Returns all of the data available
- If the common identifying columns match, they will be joined on one record

## Aliases

- Aliases will become very useful here as table names can be long and repeating them over and can get messy
- More importantly, if there are column names in common

```SQL
SELECT c.name AS city_name, ctr.name AS country_name FROM cities AS c,
INNER JOIN countries as ctr
ON c.countries_code = ctr.code;
```

| Hello | Goodbye       |
| ----- | ------------- |
| Yes?  | Oh... okay... |
