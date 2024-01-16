import { isChecked } from "./isChecked";
import { assertValueCanBeRendered } from "./assertValueCanBeRendered";

test("should return true when in checkedIds", () => {
  const result = isChecked([1, 2, 3], 2);
  expect(result).toBe(true);
});

test("should return false when not in checked Ids", () => {
  const result = isChecked([1, 2, 3], 4);
  expect(result).toBe(false);
});

test("should raise exception when not a string or number", () => {
  expect(() => {
    assertValueCanBeRendered(true);
  }).toThrow("value is not a string or a number");
});

test("should not raise exception when string", () => {
  expect(() => {
    assertValueCanBeRendered("something");
  }).not.toThrow();
});

test("should not raise exception when number", () => {
  expect(() => {
    assertValueCanBeRendered(9);
  }).not.toThrow();
});
