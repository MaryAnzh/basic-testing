import { simpleCalculator, Action } from './index';

describe('simpleCalculator – table tests', () => {
  const validCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 10, b: 4, action: Action.Subtract, expected: 6 },
    { a: 6, b: 7, action: Action.Multiply, expected: 42 },
    { a: 20, b: 5, action: Action.Divide, expected: 4 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  ];

  test.each(validCases)(
    'should correctly calculate: $a $action $b = $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );

  const invalidCases = [
    { a: 'hello', b: 2, action: Action.Add },
    { a: 1, b: null, action: Action.Subtract },
    { a: 1, b: 2, action: '%' },
    { a: undefined, b: 2, action: Action.Multiply },
  ];

  test.each(invalidCases)(
    'should return null for invalid input: %o',
    (input) => {
      const result = simpleCalculator(input as any);
      expect(result).toBeNull();
    },
  );
});
