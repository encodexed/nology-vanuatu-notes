// A function that calcs the sum of numbers

// Expected: returns sum of numbers
// it should work for different amounts of arguments - 1 or more

// sum(2)
// sum(2, 3, 4, 5) etc.

// Edge cases
// No parameters -> throw an error
// All parameters must be numbers -> throw an error

// Bonus -> check return type
import { sum } from "./sum";

describe("makes sure arguments are valid", () => {
	it("throws an error when no arguments given", () => {
		expect(() => sum()).toThrow("no arguments given");
	});

	it("throws an error if not all arguments are numbers", () => {
		expect(() => sum("string", undefined)).toThrow(
			"arguments must all be numbers"
		);
		expect(() => sum(true, false)).toThrow("arguments must all be numbers");
	});
});

test("return type must be number", () => {
	expect(sum(2, 2)).toStrictEqual(4);
});

describe("makes sure basic arithmetic is intact", () => {
	it("expects the function to add two numbers together correctly", () => {
		expect(sum(2, 2)).toBe(4);
		expect(sum(20.5, 18.5)).toBe(39);
		expect(sum(-1, -2)).toBe(-3);
	});

	it("returns the sum for all arguments given", () => {
		expect(sum(2, 3)).toBe(5);
		expect(sum(2, 3, 4)).toBe(9);
		expect(sum(2, 3, 4, 5, 6, 7, 8, 9, 10)).toBe(54);
		expect(sum(-1)).toBe(-1);
	});
});
