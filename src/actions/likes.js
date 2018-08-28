import { API } from 'aws-amplify';
import * as type from './actionTypes';

// Action Creators
const whoLikedSuccess = whoLiked => ({
  type: type.WHO_LIKED_SUCCESS,
  payload: whoLiked
});
const whoLikedFailure = error => ({
  type: type.WHO_LIKED_FAILURE,
  payload: error
});
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

// Async Action Creator
export function whoLiked(thisPost, currentUserId) {
  return async function action(dispatch) {
    dispatch({ type: type.WHO_LIKED });
    if (!thisPost.whoLiked.includes(currentUserId)) {
      console.log(thisPost.whoLiked);
      // eslint-disable-next-line
      const newArr = thisPost.whoLiked.push(currentUserId);
      try {
        const request = await API.put(
          'HitchedagramAPI',
          `/post/${thisPost.postId}`,
          {
            body: {
              userId: thisPost.userId.userId,
              whoLiked: thisPost.whoLiked,
              likes: thisPost.whoLiked.length
            }
          }
        );
        console.log('whoLiked in actions/likes.js', request);
        dispatch(whoLikedSuccess(currentUserId));
        dispatch(toggleLike(thisPost));
      } catch (e) {
        alert(e);
        dispatch(whoLikedFailure(e));
      }
    }
  };
}

export default (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_LIKE':
      return {
        ...state,
        hasBeenLiked: action.payload
      };
    case 'WHO_LIKED_SUCCESS': {
      return {
        ...state,
        whoLiked: action.payload
      };
    }
    case 'WHO_LIKED_FAILURE': {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};
