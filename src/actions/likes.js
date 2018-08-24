import { API } from 'aws-amplify';
import * as type from './actionTypes';

//Action Creator

export const increaseLikes = (userId, thisPost) => {
  const likes = thisPost.likes++;
  return {
    type: type.INCREASE_LIKES,
    payload: likes
  };
};
export const toggleLike = (userId, thisPost) => {
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

export default (state = {}, action) => {
  switch (action.type) {
    case 'INCREASE_LIKE':
      return { ...state, likes: action.payload };
    case 'TOGGLE_LIKE':
      console.log(state);
      return {
        ...state,
        hasBeenLiked: action.payload
      };
    default:
      return state;
  }
};
