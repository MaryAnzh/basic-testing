import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError
} from './index';
import { random } from 'lodash';

jest.mock('lodash');
const testBalance = 100;

describe('BankAccount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    const account = getBankAccount(testBalance);
    expect(account.getBalance()).toBe(testBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(testBalance / 2);
    expect(() => account.withdraw(testBalance)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const acc1 = getBankAccount(testBalance / 2);
    const acc2 = getBankAccount(0);

    expect(() => acc1.transfer(testBalance, acc2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(testBalance);
    expect(() => acc.transfer((testBalance / 5), acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(testBalance);
    acc.deposit(testBalance);
    expect(acc.getBalance()).toBe(testBalance * 2);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(testBalance);
    const testWithdraw = testBalance / 2;
    acc.withdraw(testWithdraw);
    expect(acc.getBalance()).toBe((testBalance - testWithdraw));
  });

  test('should transfer money', () => {
    const acc1 = getBankAccount(testBalance);
    const acc2 = getBankAccount(testBalance);
    const testTransfer = testBalance / 2;

    acc1.transfer(testTransfer, acc2);

    expect(acc1.getBalance()).toBe(testBalance - testTransfer);
    expect(acc2.getBalance()).toBe(testBalance + testTransfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock)
      .mockReturnValueOnce(testBalance)
      .mockReturnValueOnce(1);

    const acc = getBankAccount(0);
    const result = await acc.fetchBalance();

    expect(result).toBe(testBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = testBalance + 12;
    (random as jest.Mock)
      .mockReturnValueOnce(balance)
      .mockReturnValueOnce(1);

    const acc = getBankAccount(0);
    await acc.synchronizeBalance();

    expect(acc.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = testBalance / 4;
    (random as jest.Mock)
      .mockReturnValueOnce(balance)
      .mockReturnValueOnce(0);

    const acc = getBankAccount(0);

    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
