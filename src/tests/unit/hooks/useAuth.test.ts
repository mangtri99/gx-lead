/* eslint-disable @typescript-eslint/no-explicit-any */
// FILEPATH: /Users/mangtri/Web/gx-lead/src/tests/unit/composables/useFetch.test.ts
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi} from 'vitest';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';
import useFetch from '../../../composables/useFetch';

vi.mock('axios');

describe('useFetch hook', () => {
  let mockAxios: any;

  beforeEach(() => {
    // Mock axios.create
    mockAxios = {
      create: vi.fn().mockReturnValue({
        baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL as string,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    };
    (axios as any) = mockAxios;
  });

  test('should return axios instance with correct configuration', () => {
    const { result } = renderHook(() => useFetch());
    const { $fetch } = result.current;

    expect(mockAxios.create).toHaveBeenCalledWith({
      baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL as string,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    expect($fetch).toBeDefined();
  });
});