import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: (fn: any) => fn, // отключаем throttle
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });

    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });

    await throttledGetDataFromApi('/posts');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });

    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });

    await throttledGetDataFromApi('/users');

    expect(mockGet).toHaveBeenCalledWith('/users');
  });

  test('should return response data', async () => {
    const mockData = { id: 1, title: 'hello' };

    const mockGet = jest.fn().mockResolvedValue({ data: mockData });

    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(mockData);
  });
});