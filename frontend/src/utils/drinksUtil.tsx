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

  const results = getDrinkSimilarityRating(unqiueIngredientsList, unlikedDrinks);

  return results;
};

const getUnqiueIngredients = (allDrinks: Drink[]): string[] => {
  let ingredients: string[] = [];

  for (const drink of allDrinks) {
    for (const value of drink.ingredients) {
      if (typeof value === 'string') {
        ingredients.push(value);
      }
    }
  }

  return [...new Set(ingredients)];
};

export const getDrinksByID = (likes: number[], allDrinks: Drink[]): Drink[] => {
  const tempLikeArray = [];

  for (const id of likes) {
    for (const drink of allDrinks) {
      if (drink.id === id) {
        tempLikeArray.push(drink);
      }
    }
  }

  return tempLikeArray;
};

const getUsersUnLikedDrinks = (likes: number[], allDrinks: Drink[]): Drink[] => {
  const tempLikeArray: Drink[] = [];

  allDrinks.forEach((drink) => {
    if (!likes.includes(drink.id)) {
      tempLikeArray.push(drink);
    }
  });

  return tempLikeArray;
};

type DrinkWithRating = {
  drink: Drink;
  score: number;
};

const getDrinkSimilarityRating = (unqiueIngredientsList: string[], unlikedDrinks: Drink[]): Drink[] => {
  let sortedDrinksByRating: DrinkWithRating[] = [];

  for (const drink of unlikedDrinks) {
    let score = 0;
    for (const value of drink.ingredients) {
      if (typeof value !== 'string') continue;
      //Check if drink has any similar ingredients to unqiueIngredientsList
      if (unqiueIngredientsList.includes(value)) score++;
    }

    //If there is nothing in common then dont add drink
    if (score === 0) continue;
    //Sort Drinks by rating as they are Added
    if (sortedDrinksByRating.length === 0) {
      sortedDrinksByRating.push({ drink, score });
      continue;
    }

    let wasAdded = false;
    for (let i = 1; i < sortedDrinksByRating.length; i++) {
      if (sortedDrinksByRating[i].score > score) {
        sortedDrinksByRating.splice(i - 1, 0, { drink, score });
        wasAdded = true;
        break;
      }
    }
    if (!wasAdded) sortedDrinksByRating.push({ drink, score });
  }

  return sortedDrinksByRating.reverse().map((DWR) => DWR.drink);
};
