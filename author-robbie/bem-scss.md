# BEM and Sass/SCSS

### What is BEM?

- <ins>B</ins>lock <ins>E</ins>lement <ins>M</ins>odifier

```css
/* block__element--modifier */

.gallery__card {
	background-color: gold;
}

.gallery__card__title {
	font-size: 18px;
	color: blue;
}

.gallery__card__title--featured {
	text-decoration: underline;
	font-style: italic;
}

.gallery__card__image {
	width: 120px;
}
```

- BEM is a naming convention that helps us name our CSS classes
- There are a few different approaches, but you do not really have to fill out the block part with the entire HTML hierarchy/nesting

## What is SCSS?

<ins>File extension: .scss</ins>

- <ins>S</ins>yntactically <ins>A</ins>wesome <ins>S</ins>tyle <ins>S</ins>heet
- It's a "superset" of CSS that includes all of the regular CSS features, plus some extra features that improve on CSS.
- A pre-processor language:
  - A pre-processor language is syntactical version of writing, that will get compiled/processed into CSS that the browser can understand
  - Browsers do not understand Sass/Scss, which is why it needs be translated back to CSS
- Any valid CSS is valid in Sass

## Features of SCSS

- Ability to use variables:
  - For example, to store the hex number of a color we want to keep reusing
- Partials/modules:
  - You can create partial Sass files that contain little snippets of CSS that you can include in other Sass files
- Mixins:
  - Lets you make groups of CSS declarations that you want to reuse throughout your site
- Nesting:
  - No more ugly BEM worries

## Compiling SCSS

For a single file:

```bash
sass --watch styles.scss styles.css
# sass --watch (input) -> (output)
```

For a directory of files:

```bash
sass --watch app/styles:public/stylesheets
# this command will watch all scss files in a directory
```

- The terminal should then start automatically compiling your SCSS into CSS every time you save
- Remember, it is better not to write any plain CSS into the watched CSS file
- Also remember to keep your terminal process running or else it will not compile from SCSS to CSS

## Some SCSS examples

Here is some SCSS:

```scss
.card {
	background-color: yellow;

	&__title {
		font-size: 26px;

		&--underlined {
			text-decoration: underline;
		}
	}
}
```

Here is the CSS it compiles into:

```css
.card {
	background-color: yellow;
}
.card__title {
	font-size: 26px;
}
.card__title--underlined {
	text-decoration: underline;
}
```

## SCSS Variables

- Reuse and configure your styles with ease
- Useful for when you change styles and you don't want to update the CSS with your changes all throughout the file
- Use the $ to create a variable to reuse:

```scss
$brand-colour: crimson;
$secondaryFontFamily: "Courier New";
$margin-sm: 8px;
$margin-md: 10px;
$margin-lg: 12px;
$margin-xl: 14px;
```

- Can be written using kebab-case or camelCase, but it is the preference of the company you work at, or you if solo

## SCSS Partials

- You may want to keep your reusable CSS code to be imported in each file that requires it
- This prevents unnecessary code duplication
- It also helps to separate out the CSS into different areas, as needed

```scss
// file: _margins.scss
$margin-sm: 8px;
$margin-md: 10px;
$margin-lg: 12px;
$margin-xl: 14px;

// file: _palette.scss
$brand-colour: crimson;
$h2-colour: crimson;

// file: _typography.scss
$brand-font-family: "Georgia";

// file: main_stylesheet.scss
@use "./_margins.scss";
@use "./_palette.scss";
@use "./_typography.scss";

h2 {
	color: palette.$h2-colour;
	font-family: typography.$brand-font-family;
}
```

- Always name your partials with an \_ at the beginning, so it isn't compiled if you were compiling a whole directory
  - The code within the partials will be compiled in the regular SCSS files they are imported into
- Make sure to import your partials at the top of your file
- Use @use to import partials (using @import is deprecated)
