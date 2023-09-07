# Forms

## Why do we need forms?

- Primary mechanism for interaction from users
- Perform most actions in an application:
  - Registration
  - Login
  - Create Data
  - Update Data
  - Search/filter

## Some types of inputs:

- text
- select/dropdown
- textarea
- radio button/checkbox
- number
- password
- email
- phone number (tel)
- date/time

## Input layouts

```html
<form action="/target_page.html">
	<div>
		<label for="username">Username</label>
		<input id="username" type="text" name="username" required />
	</div>
	<div>
		<label for="password">Password</label>
		<input id="password" type="password" name="password" required />
	</div>
	<div>
		<label for="email">Email</label>
		<input id="email" type="email" name="email" required />
	</div>
	<div>
		<label for="role">Role</label>
		<select id="role" type="select" name="role">
			<option value="buy">Buyer</option>
			<option value="sell">Seller</option>
		</select>
	</div>
	<div>
		<button type="submit">Register</button>
	</div>
</form>
```

## Working with event listeners to get form data

```js
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
	e.preventDefault(); // prevent default form submission
	// FormData API for getting values from forms
	const data = new FormData(form);
	console.log(data.get("age"));
	// .get takes in the name field

	// The quick way to get one value
	const inputValue = document.querySelector("input").value;
});
```

### Extra notes

- The "for" attribute on the label must match the "id" attribute of the input field
  - Helps with accessibility and selecting the field
- Selecting the correct type for each input field will help with auto-completion and validation
- If a button is inside a form, it is automatically given the role of "submit"
- Dropdown menus vs Radio buttons:
  - comes down to UI design, preference, and typically how many options there are
- The "action" attribute on forms are where our HTTP requests are sent upon submission of the form
- The "name" attribute on inputs is very important for grabbing the information that was entered
  - Naturally, all fields are sent as strings, even if the input type is number
  - Without it, data is lost
  - By default, data submitted can be found in the URL (queries)
- On radio inputs, and sometimes also dropdown options, a "value" attribute may be needed to properly send a representation of the data
- Validation on the front-end with the use of the "required" attribute is more about the user experience, compared with making sure the data is entered properly
  - There are ways to submit forms using a HTTP request tool that subverts any restrictions written in the front-end
