import * as type from './actionTypes';

//Action Creator
export const whoLiked = (thisPost, currentUserId) => {
  let whoLiked;
  if (!thisPost.whoLiked.includes(currentUserId)) {
    return (whoLiked = thisPost.whoLiked.push(currentUserId));
  }
  console.log(thisPost.whoLiked);
  return {
    type: type.WHO_LIKED,
    payload: whoLiked
  };
};
export const toggleLike = thisPost => {
  let toggleLike;
  if (thisPost.hasBeenLiked === false) {
    toggleLike = thisPost.hasBeenLiked = true;
  } else {
    toggleLike = thisPost.hasBeenLiked = false;
  }
  return {
    type: type.TOGGLE_LIKE,
    payload: toggleLike
  };
};
export const increaseLikes = (thisPost, currentUserId) => {
  let likes;
  if (!thisPost.whoLiked.includes(currentUserId)) {
    likes = thisPost.likes++;
  }
  return {
    type: type.INCREASE_LIKES,
    payload: likes
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case 'INCREASE_LIKES':
      console.log(state);
      return { ...state, likes: action.payload };
    case 'TOGGLE_LIKE':
      return {
        ...state,
        hasBeenLiked: action.payload
      };
    case 'WHO_LIKED':
      return {
        ...state,
        whoLiked: action.payload
      };
    default:
      return state;
  }
};
