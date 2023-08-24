# HTML Conventions

## Why is it important to follow conventions when coding?

- Working in a team:
  - Most importantly, it prevents merge conflicts
  - Easier for everyone to read and follow
  - Not just as simple as having the same settings on Prettier
- Looking neat and organised:
  - "Code smell": Nothing's quite wrong but something feels a little bit off
  - Potential employers or contributors looking at your code for the first time will have a better time

## Good HTML conventions

- Semantic HTML
- Consistent nesting of elements
- Consistent indentation
- Separation of concerns (content, style, function):
  - Avoid using inline-styling in most cases
- Commenting code (where appropriate)
- Unique IDs
- Add metadata (wherever appropriate)
- Only use one **\<h1>** tag
- Code is valid (<a href="https://validator.w3.org/">W3C Validation Service</a>)
- Designed for accessibility (<a href="https://a11yproject.com">A11y Project</a>)

## Naming conventions

### IDs

- must be unique
- camelCase naming
- IDs are used mostly in javascript interactions, and often not used for styling purposes

```html
<p id="myParagraph"></p>
```

### Classes

- kebab-case naming
- several classes can be applied to a single element, and are separated by a space

```html
<p class="my-class another-class"></p>
```
