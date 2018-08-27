import { API } from 'aws-amplify';
import * as type from './actionTypes';

// Initial State
// const initialState = {
//   whoLiked: ''
// };

// Action Creators
const whoLikedSuccess = whoLiked => ({
  type: type.WHO_LIKED_SUCCESS,
  payload: whoLiked
});
const whoLikedFailure = error => ({
  type: type.WHO_LIKED_FAILURE,
  payload: error
});
export const increaseLikes = thisPost => {
  console.log(thisPost.wholiked);
  let likes = 0;
  if (thisPost.wholiked !== [] && thisPost.wholiked.length) {
    likes = thisPost.wholiked.length;
    return likes;
  }
  console.log('increase likes', likes);
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

// Async Action Creator
export function whoLiked(thisPost, currentUserId) {
  return async function action(dispatch) {
    dispatch({ type: type.WHO_LIKED });
    // const whoLiked = thisPost.whoLiked.push(currentUserId);
    try {
      // let whoLiked;
      // if (!thisPost.whoLiked.includes(currentUserId)) {
      //   thisPost.whoLiked.push(currentUserId);
      //   whoLiked = thisPost.whoLiked;
      //   console.log(whoLiked);
      //   return thisPost.whoLiked;
      // } else if (thisPost.whoLiked.includes(currentUserId)) {
      //   thisPost.whoLiked.pop(currentUserId);
      //   whoLiked = thisPost.whoLiked;
      //   console.log(whoLiked);
      //   return thisPost.whoLiked;
      // }
      console.log('running put request', thisPost.postId);
      const request = await API.put(
        'HitchedagramAPI',
        `/post/${thisPost.postId}`,
        {
          body: { whoLiked: currentUserId }
        }
      );
      console.log('whoLiked in actions/likes.js', request);
      dispatch(whoLikedSuccess(request));
      dispatch(increaseLikes(thisPost));
      dispatch(toggleLike(thisPost));
    } catch (e) {
      alert(e);
      dispatch(whoLikedFailure(e));
    }
  };
}

//Action Creator
// export const whoLiked = (thisPost, currentUserId) => {
//   let whoLiked;
//   if (!thisPost.whoLiked.includes(currentUserId)) {
//     thisPost.whoLiked.push(currentUserId);
//     whoLiked = thisPost.whoLiked;
//     console.log(whoLiked);
//     return thisPost.whoLiked;
//   } else if (thisPost.whoLiked.includes(currentUserId)) {
//     thisPost.whoLiked.pop(currentUserId);
//     whoLiked = thisPost.whoLiked;
//     console.log(whoLiked);
//     return thisPost.whoLiked;
//   }
//   return {
//     type: type.WHO_LIKED,
//     payload: {}
//   };
// };

export default (state = {}, action) => {
  switch (action.type) {
    case 'INCREASE_LIKES':
      console.log(state);
      return { ...state, likes: state.likes + 1 };
    case 'TOGGLE_LIKE':
      return {
        ...state,
        hasBeenLiked: action.payload
      };
    case 'WHO_LIKED_SUCCESS': {
      return state;
    }
    case 'WHO_LIKED_FAILURE': {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};
