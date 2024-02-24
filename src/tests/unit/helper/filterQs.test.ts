// FILEPATH: /Users/mangtri/Web/gx-lead/src/tests/unit/helper/filterQs.test.ts
import { describe, expect, test } from 'vitest';
import filterQs from '../../../helper/filterQs';

describe('filterQs', () => {
  test('filters out properties with undefined values', () => {
    const query = {
      a: '1',
      b: undefined,
      c: '3',
    };
    const result = filterQs(query);
    expect(result).toEqual({ a: '1', c: '3' });
  });

  test('filters out properties with empty string values', () => {
    const query = {
      a: '1',
      b: '',
      c: '3',
    };
    const result = filterQs(query);
    expect(result).toEqual({ a: '1', c: '3' });
  });

  test('retains properties with non-empty string values', () => {
    const query = {
      a: '1',
      b: '2',
      c: '3',
    };
    const result = filterQs(query);
    expect(result).toEqual(query);
  });

  test('returns an empty object when all properties have undefined or empty string values', () => {
    const query = {
      a: undefined,
      b: '',
      c: undefined,
    };
    const result = filterQs(query);
    expect(result).toEqual({});
  });
});