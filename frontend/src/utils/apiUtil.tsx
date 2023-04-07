import { saveUserToLocalStorage, loadUserFromLocalStorage } from './userUtil';

export const updateLikesRequest = async (
  userLikes: number[],
  drinkId: number,
  userId: number,
  addToLikes: boolean
): Promise<[Response, any]> => {
  let newLikesJSON;

  if (addToLikes) {
    newLikesJSON = JSON.stringify([...userLikes, drinkId]);
  } else {
    userLikes.splice(userLikes.indexOf(drinkId), 1);
    newLikesJSON = JSON.stringify(userLikes);
  }

  try {
    const req = await fetch(`http://localhost:3000/like/${userId}/${newLikesJSON}`, {
      method: 'post',
    });

    const { newLikesArray } = await req.json();
    return [req, newLikesArray];
  } catch (e) {
    throw e;
  }
};

export const loginRequest = () => {};

export const registerRequest = () => {};

export const postCommentRequest = async (drinkId: number, userId: number, text: string): Promise<[Response, any]> => {
  try {
    const req = await fetch(`http://localhost:3000/comment/${drinkId}/${userId}/${text}`, {
      method: 'post',
    });
    const jsonRes = await req.json();
    return [req, jsonRes];
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
