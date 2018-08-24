import { API } from 'aws-amplify';
import * as type from './actionTypes';

//Action Creator

export const increaseLikes = thisPost => {
  let likes;
  if (thisPost.hasBeenLiked === false) {
    likes = thisPost.likes++;
  } else {
    likes = thisPost.likes--;
  }
  return {
    type: type.INCREASE_LIKES,
    payload: likes
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
    default:
      return state;
  }
};
