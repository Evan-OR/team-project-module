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
  let divs: JSX.Element[] = [];

  for (let i = 1; i < 15; i++) {
    const ingredientKey = drink[('ingredient' + i) as keyof Drink];
    const measureKey = drink[('measurement' + i) as keyof Drink];
    if (typeof ingredientKey !== 'string' || typeof measureKey !== 'string') continue;
    divs.push(
      <div key={ingredientKey + measureKey}>
        {ingredientKey} - {measureKey}
      </div>
    );
  }

  return divs;
};
