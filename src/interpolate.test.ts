import { expect, test } from 'vitest';
import { createInterpolate } from './interpolate';

const interpolate = createInterpolate([1, 2, 3], [4, 7, 16]);

test('Function exists', () => {
  expect(createInterpolate).toBeInstanceOf(Function);
});

test('It shows error when one array is empty', () => {
  const actual = () => createInterpolate([], [20, 3, 5, 6]);
  console.log(actual);
  expect(actual).toThrowError('One of these arrays is empty');
});

test('It shows error when lengths are not the same', () => {
  const actual = () => createInterpolate([1, 2, 3, 4, 5], [20, 3, 5, 6]);
  expect(actual).toThrowError('The lengths are differents');
});

test('It creates a function', () => {
  const actual = createInterpolate([4, 2, 3, 1], [20, 3, 5, 6]);
  expect(actual).toBeTypeOf('function');
});

test('Out of range from the beginning returns first value', () => {
  const actual1 = interpolate(0);
  const actual2 = interpolate(1);
  const expected = 4;
  expect(actual1).toBe(expected);
  expect(actual2).toBe(expected);
});

test('Out of range from the ending returns last value', () => {
  const actual1 = interpolate(3);
  const actual2 = interpolate(4);
  const expected = 16;
  expect(actual1).toBe(expected);
  expect(actual2).toBe(expected);
});

test('2 => 7', () => {
  expect(interpolate(2)).toBe(7);
});

test('1.5 => 5.5', () => {
  expect(interpolate(1.5)).toBe(5.5);
});

test('2 + 1/3 ~> 10', () => {
  expect(Math.round(interpolate(2 + 1 / 3))).toBe(10);
});

test('2 + 2/3 ~> 13', () => {
  expect(Math.round(interpolate(2 + 2 / 3))).toBe(13);
});

test('1 + 1/3 ~> 5', () => {
  expect(Math.round(interpolate(1 + 1 / 3))).toBe(5);
});
