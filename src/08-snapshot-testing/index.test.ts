import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList([1, 2, 3]);

    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    expect(result).toStrictEqual(expected);
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(['a', 'b', 'c']);
    expect(result).toMatchSnapshot();
  });
});
