export type UserInfoUnParsed = {
  userID: number;
  username: string;
  password: string;
  likes: string;
};

export type LoginResponse = {
  message: string;
  userInfo: UserInfo;
};

export type UserInfo = {
  userID: number;
  username: string;
  likes: number[];
};

export type Drinkv1 = {
  idDrink: number;
  strDrink: string;
  strDrinkAlternate: string | null;
  strTags: string | null;
  strVideo: string | null;
  strCategory: string;
  strIBA: string | null;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strImageSource: string | null;
  strImageAttribution: string | null;
  strCreativeCommonsConfirmed: string;
  dateModified: string | null;
};

export type Drinkv2 = {
  id: number;
  name: string;
  imageURL: string;
  tags: string | null;
  instructions: string;
  ingredient1: string | null;
  ingredient2: string | null;
  ingredient3: string | null;
  ingredient4: string | null;
  ingredient5: string | null;
  ingredient6: string | null;
  ingredient7: string | null;
  ingredient8: string | null;
  ingredient9: string | null;
  ingredient10: string | null;
  ingredient11: string | null;
  ingredient12: string | null;
  ingredient13: string | null;
  ingredient14: string | null;
  ingredient15: string | null;
  measurement1: string | null;
  measurement2: string | null;
  measurement3: string | null;
  measurement4: string | null;
  measurement5: string | null;
  measurement6: string | null;
  measurement7: string | null;
  measurement8: string | null;
  measurement9: string | null;
  measurement10: string | null;
  measurement11: string | null;
  measurement12: string | null;
  measurement13: string | null;
  measurement14: string | null;
  measurement15: string | null;
};

export type Drink = {
  id: number;
  name: string;
  imageURL: string;
  tags: string | null;
  instructions: string;
  ingredients: (string | null)[];
  measurements: (string | null)[];
};
