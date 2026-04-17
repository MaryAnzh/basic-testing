import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';
const { res, testM } = { res: 123, testM: 'Test message' }

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue(res)).resolves.toBe(res);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(testM)).toThrow(testM);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toBeInstanceOf(MyAwesomeError);
  });
});
