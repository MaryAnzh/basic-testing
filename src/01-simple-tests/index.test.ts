import { simpleCalculator, Action } from './index';

const a = 8;
const b = 4;

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Add });
    expect(result).toBe(a + b);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Subtract });
    expect(result).toBe(a - b);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Multiply });
    expect(result).toBe(a * b);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Divide });
    expect(result).toBe(a / b);
  });

  const result = simpleCalculator({ a, b, action: Action.Exponentiate });
  expect(result).toBe(a ** b);
});

test('should return null for invalid action', () => {
  const result = simpleCalculator({ a, b, action: 1 });
  expect(result).toBeNull();
});

test('should return null for invalid arguments', () => {
  const result = simpleCalculator({ a: true, b, action: Action.Divide });
  expect(result).toBeNull();
});
