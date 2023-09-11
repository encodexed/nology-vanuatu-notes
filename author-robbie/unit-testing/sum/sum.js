// A function that calcs the sum of numbers

// Expected: returns sum of numbers
// it should work for different amounts of arguments - 1 or more

// sum(2)
// sum(2, 3, 4, 5) etc.

// Edge cases
// No parameters -> throw an error
// All parameters must be numbers -> throw an error

export function sum(...args) {
	if (args.length === 0) {
		throw new Error("no arguments given");
	}

	const argsAreNumbers = args.every((arg) => typeof arg === "number");
	if (!argsAreNumbers) {
		throw new Error("arguments must all be numbers");
	}

	const total = args.reduce((sum, value) => sum + value);
	return total;
}
