import { Drink, Drinkv1, Drinkv2, UserInfo, UserInfoUnParsed } from '../types/UserTypes';
import { DrinkComment } from '../types/types';

export const checkIfUserCommented = (commnets: DrinkComment[], userId: number): boolean => {
  let hasCommented = false;
  commnets.forEach((c) => {
    if (c.userId === userId) hasCommented = true;
  });
  return hasCommented;
};

export function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !('nodeType' in e)) {
    throw new Error(`Node expected`);
  }
}

export const parseUserInfo = (mes: UserInfoUnParsed): UserInfo => {
  const user: UserInfo = {
    userID: mes.userID,
    username: mes.username,
    likes: JSON.parse(mes.likes),
  };
  return user;
};

export const dealWithStupidFuckingJson = (drink: Drink) => {
  let divs: JSX.Element[] = [];

  for (let i = 0; i < drink.ingredients.length; i++) {
    if (drink.ingredients[i] === null || drink.measurements[i] === null) continue;
    divs.push(
      <div key={i}>
        {drink.ingredients[i]} - {drink.measurements[i]}
      </div>
    );
  }

  return divs;
};

export const convertToIrishTime = (datePosted: string) => {
  const date = new Date(datePosted);
  return date.toLocaleString('en-IE', { timeZone: 'Europe/Dublin' });
};

export const convertOldInfoToV2 = (drinks: Drinkv1[]) => {
  return drinks.map((drink) => {
    return {
      id: drink.idDrink,
      name: drink.strDrink,
      imageURL: drink.strDrinkThumb,
      tags: drink.strTags,
      instructions: drink.strInstructions,
      ingredient1: drink.strIngredient1,
      ingredient2: drink.strIngredient2,
      ingredient3: drink.strIngredient3,
      ingredient4: drink.strIngredient4,
      ingredient5: drink.strIngredient5,
      ingredient6: drink.strIngredient6,
      ingredient7: drink.strIngredient7,
      ingredient8: drink.strIngredient8,
      ingredient9: drink.strIngredient9,
      ingredient10: drink.strIngredient10,
      ingredient11: drink.strIngredient11,
      ingredient12: drink.strIngredient12,
      ingredient13: drink.strIngredient13,
      ingredient14: drink.strIngredient14,
      ingredient15: drink.strIngredient15,
      measurement1: drink.strMeasure1,
      measurement2: drink.strMeasure2,
      measurement3: drink.strMeasure3,
      measurement4: drink.strMeasure4,
      measurement5: drink.strMeasure5,
      measurement6: drink.strMeasure6,
      measurement7: drink.strMeasure7,
      measurement8: drink.strMeasure8,
      measurement9: drink.strMeasure9,
      measurement10: drink.strMeasure10,
      measurement11: drink.strMeasure11,
      measurement12: drink.strMeasure12,
      measurement13: drink.strMeasure13,
      measurement14: drink.strMeasure14,
      measurement15: drink.strMeasure15,
    };
  });
};

export const convertDrinkV2ToV3 = (drinks: Drinkv2[]) => {
  return drinks.map((drink) => {
    return {
      id: drink.id,
      name: drink.name,
      imageURL: drink.imageURL,
      tags: drink.tags,
      instructions: drink.instructions,
      ingredients: [
        drink.ingredient1,
        drink.ingredient2,
        drink.ingredient3,
        drink.ingredient4,
        drink.ingredient5,
        drink.ingredient6,
        drink.ingredient7,
        drink.ingredient8,
        drink.ingredient9,
        drink.ingredient10,
        drink.ingredient11,
        drink.ingredient12,
        drink.ingredient13,
        drink.ingredient14,
        drink.ingredient15,
      ],
      measurements: [
        drink.measurement1,
        drink.measurement2,
        drink.measurement3,
        drink.measurement4,
        drink.measurement5,
        drink.measurement6,
        drink.measurement7,
        drink.measurement8,
        drink.measurement9,
        drink.measurement10,
        drink.measurement11,
        drink.measurement12,
        drink.measurement13,
        drink.measurement14,
        drink.measurement15,
      ],
    };
  });
};
