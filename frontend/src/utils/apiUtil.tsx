import { saveUserToLocalStorage, loadUserFromLocalStorage } from './userUtil';

export const likeRequest = () => {};

export const unLikeRequest = () => {};

export const loginRequest = () => {};

export const registerRequest = () => {};

export const postCommentRequest = async (drinkId: number, userId: number, text: string) => {
  try {
    const req = await fetch(`http://localhost:3000/comment/${drinkId}/${userId}/${text}`, {
      method: 'post',
    });
    const { message } = await req.json();
    return message;
  } catch (e) {
    throw e;
  }
};

export const getCommentsRequest = async (drinkId: number) => {
  try {
    const req = await fetch(`http://localhost:3000/comments/${drinkId}`, {
      method: 'get',
    });
    const { data } = await req.json();
    return data;
  } catch (e) {
    throw e;
  }
};
