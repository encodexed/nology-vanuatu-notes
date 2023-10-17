# Keys and Relationships

- Whatever is a primary key in one table could be a foreign key in another table

### Primary Key

- A unique identifier for each individual record

### Foreign Key

- A reference to a different table

## Types of Relationships

### One to One

- Probably the least common relationship
- One record in one table references only one record in the other table
- Those records cannot be repeated

```SQL
CREATE TABLE managers(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
)

INSERT INTO managers(first_name, last_name)
VALUES ('Jennifer', 'Jones'), ('Antonio', 'Black');
```

```SQL
CREATE TABLE offices(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  location VARCHAR(255)
  manager_id INT UNSIGNED NOT NULL UNIQUE,
  PRIMARY KEY(id),
  FOREIGN KEY(manager_id) REFERENCES managers(id)
)

INSERT INTO offices(location, manager_id)
VALUES ('Sydney', 1), ('London', 2);

-- This won't work now:
INSERT INTO offices(location, manager_id)
VALUES ('New York', 1);
```

### One to Many/Many to One

- Probably the most common relationship

```SQL
CREATE TABLE cohorts(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
  PRIMARY KEY(id)
);

INSERT INTO cohorts(name)
VALUES ('Japan'), ('Vanuatu'), ('Iceland'), ('Norway');
```

```SQL
CREATE TABLE students(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  cohort_id INT UNSIGNED NOT NULL,
  PRIMARY KEY(id)
  FOREIGN KEY(cohort_id) REFERENCES cohorts(id)
);

INSERT INTO cohorts(first_name, last_name, cohort_id)
VALUES ('John', 'Smith', 1), ('Kate', 'Smith', 2), ('Andy', 'Jones', 3), ('Jane', 'Black', 2);
```

### Many to Many

- Foreign keys become problematic here
- We are going to use a through table to help us

```SQL
CREATE TABLE coaches(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO coaches(name, location)
VALUES ('Alex B', 'Melbourne'), ('Cal', 'Sydney'), ('Martyna', 'Melbourne');
```

```SQL
CREATE TABLE projects(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255),
  PRIMARY KEY(id)
);

INSERT INTO projects(title)
VALUES ('AWS curriculum'), ('Spring Security');
```

```SQL
-- This helps us link the two, many to many
CREATE TABLE coaches_projects(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  coach_id INT UNSIGNED NOT NULL,
  project_id INT UNSIGNED NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(coach_id) REFERENCES coaches(id),
  FOREIGN KEY(project_id) REFERENCES projects(id)
);

INSERT INTO coaches_projects(coach_id, project_id)
VALUES (1, 1), (1, 2), (2, 1), (3, 2);
```

## Database Normalisation

Here is an <a href="https://www.lucidchart.com/pages/er-diagrams">Entity Relationship Diagram</a> article

- A database design technique to reduce data duplication
- A preference is given towards creating more small tables as opposed to big tables, and using relationships to link them

### First Normal Form

- The most basic requirement for a workable database

```
- Each table cell should contain single values
- Each record should be unique
```

### Second Normal Form

```
- Must already be in First Normal Form
- Repeated data will have a unique ID (?)
- Each non-key attribute must be dependent on the primary key
```
