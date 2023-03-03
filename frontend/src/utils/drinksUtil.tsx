// Any functionality related to drinks that can be abstracted here

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
