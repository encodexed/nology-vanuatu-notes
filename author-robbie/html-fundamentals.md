# HTML Fundamentals

## What is HTML?

- <ins>H</ins>yper <ins>T</ins>ext <ins>M</ins>arkup <ins>L</ins>anguage
- Provides a way of structuring information on a page
- Instructions for the browser to display content

## Why do we use HTML?

- It is parsed by the browser/adaptive technologies, and helps with metadata and accessibility
- HTML is human-readable
- HTML is standardised, proven technology

## HTML layout

```html
<!-- Doctype tells the browser about what kind of document this is -->
<!DOCTYPE html>
<html lang="en">
	<!-- Head is a "child" element of the the "parent" element html -->
	<!-- Head should contain additional information or settings, including metadata -->
	<head>
		<!-- meta tags are self closing -->
		<meta charset="UTF-8" />
		<!-- Sets information about the usable content of the window -->
		<meta name="viewport" content="width=device, initial-scale=1.0" />
		<!-- Tab title in the browser -->
		<title>Example</title>
	</head>
	<!-- Actual content of the page goes in body -->
	<body></body>
</html>
```

## HTML elements

### Element attributes

- Attributes provide additional information about HTML elements
- They typically take strings as their value

```html
<input type="text" class="input-class" name="address" />
<!-- type, class and name are all attributes -->
```

### Block-level Elements

- Block-level elements take up the full width of their parent element
- By default, they stack vertically on top of each other and start new lines
- Examples: **\<div>**, **\<p>**, **\<section>**, **\<main>**

### Inline-level Elements

- Inline-level elements take up as much space as their content
- They can sit on their own or be nested inside paragraphs, and do not start a new line
- Flow within the content of their parent
- Examples: **\<span>**, **\<img>**, **\<a>**, **\<input>**

## Semantic HTML

- Semantic HTML is using meaningful elements that reflect the purpose of the content within
- Examples: **\<header>**, **\<footer>**, **\<main>**, **\<nav>**
- Using semantic HTML is highly recommended to boost accessibility for screen-readers and navigation
- Also useful for code maintenance, code navigation and search engine optimisation (SEO)

## HTML Lists

- Unordered lists **\<ul>** and ordered lists **\<ol>** both take children that are list items **\<li>**
- Unordered lists are, by default, represented with bullet points, whereas ordered lists are represented with numbers

#### Why use a list?

- Accessibility (possibly)
- Semantics
- Programmatically/dynamically displaying data:
  - When outputting data, you can use javascript to attach list items to a list, for as much data as there is to list

## HTML Tables

- **\<table>** is used as a wrapper for the table
- **\<thead>** is used for the header section, with **\<tbody>** following afterwards
- **\<tr>** denotes a table row
- **\<th>** denotes a table header cell
- **\<td>** denotes table data
