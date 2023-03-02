import { Drink, UserInfo, UserInfoUnParsed } from '../types/UserTypes';

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
  return (
    <>
      {drink.strMeasure1 !== null ? (
        <div>
          {drink.strIngredient1} {drink.strMeasure1}
        </div>
      ) : (
        <></>
      )}
      {drink.strMeasure2 !== null ? (
        <div>
          {drink.strIngredient2} {drink.strMeasure2}
        </div>
      ) : (
        <></>
      )}
      {drink.strMeasure3 !== null ? (
        <div>
          {drink.strIngredient3} {drink.strMeasure3}
        </div>
      ) : (
        <></>
      )}
      {drink.strMeasure4 !== null ? (
        <div>
          {drink.strIngredient4} {drink.strMeasure4}
        </div>
      ) : (
        <></>
      )}
      {drink.strMeasure5 !== null ? (
        <div>
          {drink.strIngredient5} {drink.strMeasure5}
        </div>
      ) : (
        <></>
      )}
      {drink.strMeasure6 !== null ? (
        <div>
          {drink.strIngredient6} {drink.strMeasure6}
        </div>
      ) : (
        <></>
      )}
      {drink.strMeasure7 !== null ? (
        <div>
          {drink.strIngredient7} {drink.strMeasure7}
        </div>
      ) : (
        <></>
      )}
      {drink.strMeasure8 !== null ? (
        <div>
          {drink.strIngredient8} {drink.strMeasure8}
        </div>
      ) : (
        <></>
      )}
      {drink.strMeasure9 !== null ? (
        <div>
          {drink.strIngredient9} {drink.strMeasure9}
        </div>
      ) : (
        <></>
      )}
      {drink.strMeasure10 !== null ? (
        <div>
          {drink.strIngredient10} {drink.strMeasure10}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
