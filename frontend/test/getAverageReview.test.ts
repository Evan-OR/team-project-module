import { DrinkComment } from '../src/Types/types';
import { getAverageFromReviews } from '../src/utils/utils';
import { describe, expect, it } from 'vitest';

describe('getAverageFromReviews()', () => {
  const review1: DrinkComment = { id: 1, username: '', userId: 1, text: '', rating: 4, datePosted: '' };
  const review2: DrinkComment = { ...review1, rating: 2 };
  const review3: DrinkComment = { ...review1, rating: 5 };
  const review4: DrinkComment = { ...review1, rating: 1 };

  it('Should return 3 from review ratings of 4 2, 5, 1', () => {
    expect(getAverageFromReviews([review1, review2, review3, review4])).toBe(3);
  });

  it('Should return 0 when passed an empty array', () => {
    expect(getAverageFromReviews([])).toBe(0);
  });
});
