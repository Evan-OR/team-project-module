import { UserInfo, UserInfoUnParsed } from '../types/UserTypes';

export const parseUserInfo = (userInfo: UserInfoUnParsed): UserInfo => {
  const { userID, username, likes } = userInfo;
  const user: UserInfo = {
    userID: userID,
    username: username,
    likes: JSON.parse(likes),
  };
  return user;
};

export const saveUserToLocalStorage = (user: UserInfo) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const loadUserFromLocalStorage = (): null | UserInfo => {
  const userStorage = localStorage.getItem('user');
  if (userStorage === null) return null;

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
    return parseUserInfo(res.userInfo);
  } catch (err) {
    console.error(`Error Getting User By ID:${userId} (userUtils.tsx)`);
    return null;
  }
};
