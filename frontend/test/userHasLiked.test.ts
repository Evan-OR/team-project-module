import { checkIfAlreadyLiked } from '../src/utils/drinksUtil';
import { describe, expect, it } from 'vitest';

describe('Checking if user has already liked a drink', () => {
  it('returns TRUE if drinkId is present in userLikes array', () => {
    expect(checkIfAlreadyLiked(1, [3, 4, 1])).toBe(true);
  });

  it('returns FALSE if drinkId is not present in userLikes array', () => {
    expect(checkIfAlreadyLiked(7, [3, 4, 1])).toBe(false);
  });

  it('returns FALSE userLikes is empty', () => {
    expect(checkIfAlreadyLiked(7, [])).toBe(false);
  });

  it('returns FALSE userLikes undefined', () => {
    expect(checkIfAlreadyLiked(7, undefined)).toBe(false);
  });
});
