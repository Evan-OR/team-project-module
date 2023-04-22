import { UserInfoUnParsed } from '../src/types/UserTypes';
import { parseUserInfo } from '../src/utils/utils';
import { describe, expect, it } from 'vitest';

describe('parseUserInfo()', () => {
  const testUser1: UserInfoUnParsed = {
    userID: 1,
    username: 'Evan',
    password: 'kkdjfhgk',
    likes: '[1,2,3]',
  };
  const testUser2: UserInfoUnParsed = {
    userID: 1,
    username: 'Evan',
    password: 'kkdjfhgk',
    likes: '[]',
  };

  it('Should parse the string "[1,2,3]" into an array of numbers', () => {
    expect(parseUserInfo(testUser1).likes).toStrictEqual(JSON.parse('[1,2,3]'));
  });

  it('Should parse the string "[]" into an empty array', () => {
    expect(parseUserInfo(testUser2).likes).toStrictEqual([]);
  });
});
