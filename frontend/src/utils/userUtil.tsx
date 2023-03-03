import { UserInfo } from '../types/UserTypes';

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
