// Any functionality related to drinks that can be abstracted here

import { Drink } from '../types/UserTypes';

export const checkIfAlreadyLiked = (drinkId: number, userLikes: number[] | undefined): boolean => {
  if (userLikes === undefined || null) return false;

  let userHasLiked = false;
  for (const userLikeId of userLikes) {
    if (drinkId === userLikeId) {
      userHasLiked = true;
      break;
    }
  }

  return userHasLiked;
};

export const getDrinkRecommendations = (allDrinks: Drink[], likedDrinks: number[]): Drink[] => {
  const likedUserDrinks = getDrinksByID(likedDrinks, allDrinks);
  const unqiueIngredientsList = getUnqiueIngredients(likedUserDrinks);

  const unlikedDrinks = getUsersUnLikedDrinks(likedDrinks, allDrinks);

  console.table(getDrinkSimilarityRating(unqiueIngredientsList, unlikedDrinks));
  return [];
};

const getUnqiueIngredients = (allDrinks: Drink[]): string[] => {
  let ingredients: string[] = [];

  // BOIS I AM A FUCKING GENIUS FOR THIS ONE!!!!!!!!!!!!!!!!!!!!!!!
  for (const drink of allDrinks) {
    //Shout out https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b for explaining why 'as keyof Drink' needs to be used when dynamically referencing object keys in Typescript :)
    for (let i = 1; i < 15; i++) {
      const valueAtKey = drink[('strIngredient' + i) as keyof Drink];
      if (typeof valueAtKey === 'string') {
        ingredients.push(valueAtKey);
      }
      i++;
    }
  }

  return [...new Set(ingredients)];
};

export const getDrinksByID = (likes: number[], allDrinks: Drink[]): Drink[] => {
  const tempLikeArray = [];

  for (const drink of allDrinks) {
    for (const id of likes) {
      if (drink.idDrink === id) {
        tempLikeArray.push(drink);
      }
    }
  }

  return tempLikeArray;
};

const getUsersUnLikedDrinks = (likes: number[], allDrinks: Drink[]): Drink[] => {
  const tempLikeArray = [];

  for (const drink of allDrinks) {
    let userLikedDrink = false;
    for (const id of likes) {
      if (drink.idDrink === id) {
        userLikedDrink = true;
        break;
      }
    }

    if (!userLikedDrink) tempLikeArray.push(drink);
  }

  return tempLikeArray;
};

type DrinkRating = {
  drinkName: string;
  similarityRating: number;
};

const getDrinkSimilarityRating = (unqiueIngredientsList: string[], unlikedDrinks: Drink[]): DrinkRating[] => {
  let similarityRatings: DrinkRating[] = [];

  for (const drink of unlikedDrinks) {
    let score = 0;
    for (let i = 1; i < 15; i++) {
      const valueAtKey = drink[('strIngredient' + i) as keyof Drink];
      if (typeof valueAtKey !== 'string') continue;
      //Check if drink has any similar ingredients to unqiueIngredientsList
      if (unqiueIngredientsList.includes(valueAtKey)) score++;
      i++;
    }

    similarityRatings.push({ drinkName: drink.strDrink, similarityRating: score });
  }

  return similarityRatings;
};
