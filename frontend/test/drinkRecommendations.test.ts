import { getDrinkRecommendations } from '../src/utils/drinksUtil';
import { getDrinksByID } from '../src/utils/drinksUtil';
import { describe, expect, it } from 'vitest';
import DRINKS from '../src/dataset/drinks.json';

const firstTestExpectedResult = getDrinksByID([14, 13, 6, 4], DRINKS);
const thirdTestExpectedResult = getDrinksByID([24, 11, 4, 1, 28, 25, 22, 20, 19, 18, 17, 16, 15, 14, 13, 9, 8], DRINKS);

describe('getDrinkRecommendations()', () => {
  it('If user likes has only liked a Margarita(id:1) then it should return array with Long Island Tea, Moscow Mule,Strawberry Daiquiri and Mai Tai', () => {
    expect(getDrinkRecommendations(DRINKS, [1])).toStrictEqual(firstTestExpectedResult);
  });

  it('Should return an empty array if passed an empty array', () => {
    expect(getDrinkRecommendations(DRINKS, [])).toStrictEqual([]);
  });

  it('If user likes has liked a Daiquiri(id:5), Strawberry Daiquiri(id:6), Negroni(id:7) then it should return array with Rum Milk Punch, Mojito, Long Island Tea, Margarita, Old Pal, Flying Dutchman, 501 Blue, Dry Martini, Martini, Pina Colada, Tom Collins, Manhattan, Bloody Mary, Mai Tai, Moscow Mule, Gin Tonic, Whiskey Sour', () => {
    expect(getDrinkRecommendations(DRINKS, [5, 6, 7])).toStrictEqual(thirdTestExpectedResult);
  });
});
