import { fetchPostsPending, fetchPostsSuccess, fetchPostsError } from './action.js';

function fetchPosts(url) {
  return dispatch => {
    dispatch(fetchPostsPending());
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw (res.error);
        }
        dispatch(fetchPostsSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchPostsError(error));
      })
  }
}

export default fetchPosts;