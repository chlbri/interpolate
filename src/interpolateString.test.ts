import { expect, test } from 'vitest';
import { createInterpolateString } from './interpolateString';

const interpolate = createInterpolateString(
  [1, 6, 3, 8, 19],
  ['alpha', 'beta', 'common', 'data', 'exchange'],
);

test('Function exists', () => {
  expect(createInterpolateString).toBeInstanceOf(Function);
});

test('It shows error when one array is empty', () => {
  const actual = () => createInterpolateString([], ['a', 'b', 'c']);
  console.log(actual);
  expect(actual).toThrowError('One of these arrays is empty');
});

test('It shows error when lengths are not the same', () => {
  const actual = () =>
    createInterpolateString([1, 2, 3, 4, 5], ['a', 'b', 'c']);
  expect(actual).toThrowError('The lengths are differents');
});

test('It creates a function', () => {
  const actual = createInterpolateString(
    [4, 2, 3, 1],
    ['a', 'b', 'c', 'd'],
  );
  expect(actual).toBeTypeOf('function');
});

test('Out of range from the beginning returns first value', () => {
  const actual1 = interpolate(0);
  const actual2 = interpolate(1);
  const expected = 'alpha';
  expect(actual1).toBe(expected);
  expect(actual2).toBe(expected);
});

test('Out of range from the ending returns last value', () => {
  const actual1 = interpolate(19);
  const actual2 = interpolate(20);
  const expected = 'exchange';
  expect(actual1).toBe(expected);
  expect(actual2).toBe(expected);
});

test('3 => "beta"', () => {
  expect(interpolate(3)).toBe('beta');
});

test('13 => "data"', () => {
  expect(interpolate(13)).toBe('data');
});

test('2 + 1/2 -> "beta"', () => {
  expect(interpolate(2 + 1 / 3)).toBe('beta');
});

test('14 ~> "exchange"', () => {
  expect(interpolate(14)).toBe('exchange');
});

test('4.5 -> "common"', () => {
  expect(interpolate(4 + 1 / 2)).toBe('common');
});
