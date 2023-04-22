import { DrinkComment } from '../src/Types/types';
import { checkIfUserCommented } from '../src/utils/utils';
import { describe, expect, it } from 'vitest';

describe('checkIfUserCommented()', () => {
  const review1: DrinkComment = { id: 1, username: '', userId: 1, text: '', rating: 4, datePosted: '' };
  const review2: DrinkComment = { ...review1, userId: 2 };
  const review3: DrinkComment = { ...review1, userId: 3 };
  const review4: DrinkComment = { ...review1, userId: 4 };

  it('Should return TRUE if userId is present in a review', () => {
    expect(checkIfUserCommented([review1, review2, review3, review4], 1)).toBe(true);
  });

  it('Should return FALSE if userId is not present in a review', () => {
    expect(checkIfUserCommented([review2, review3, review4], 1)).toBe(false);
  });

  it('Should return FALSE when passed an empty array', () => {
    expect(checkIfUserCommented([], 1)).toBe(false);
  });
});
