import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, test, } from 'vitest';
import { useLocalStorage } from '../../../composables/useLocalStorage';

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('should return default value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));
    const [value] = result.current;

    expect(value).toBe('defaultValue');
  });

  test('should return value from localStorage if exists', () => {
    localStorage.setItem('testKey', JSON.stringify('storedValue'));
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));
    const [value] = result.current;

    expect(value).toBe('storedValue');
  });

  test('should set value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));
    const [, setValue] = result.current;

    act(() => {
      setValue('newValue');
    });

    expect(localStorage.getItem('testKey')).toBe('newValue');
  });

  test('should set value to localStorage when not a string', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));
    const [, setValue] = result.current;

    act(() => {
      setValue({ key: 'value' });
    });

    expect(localStorage.getItem('testKey')).toBe(JSON.stringify({ key: 'value' }));
  });
});
