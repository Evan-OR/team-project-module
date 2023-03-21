import { UserInfo, UserInfoUnParsed } from '../types/UserTypes';

export const parseUserInfo = (response: UserInfoUnParsed): UserInfo => {
  const { userID, username, stringifiedLikes } = response;
  const user: UserInfo = {
    userID: userID,
    username: username,
    likes: JSON.parse(stringifiedLikes),
  };
  return user;
};

export const saveUserToLocalStorage = (user: UserInfo) => {
  console.log('saving user : ', user);
  localStorage.setItem('user', JSON.stringify(user));
};

export const loadUserFromLocalStorage = (): null | UserInfo => {
  const userStorage = localStorage.getItem('user');
  if (userStorage === null) return null;
  console.log(JSON.parse(userStorage));

  return { ...JSON.parse(userStorage) };
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUserFromDatabaseByID = async (userId: number): Promise<UserInfo | null> => {
  try {
    const req = await fetch(`http://localhost:3000/getUserById/${userId}`, {
      method: 'get',
    });
    const res = await req.json();
    return parseUserInfo(res);
  } catch (err) {
    console.error('Error Getting User (userUtils.tsx)');
    return null;
  }
};
