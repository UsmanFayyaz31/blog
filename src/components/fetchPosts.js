import { fetchPostsPending, fetchPostsSuccess, fetchCategoriesSuccess, fetchPagesSuccess, fetchPostsError } from './action.js';

export function fetchPosts(url) {
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

export function fetchPages(url) {
  return dispatch => {
    dispatch(fetchPostsPending());
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw (res.error);
        }
        dispatch(fetchPagesSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchPostsError(error));
      })
  }
}

export function fetchCategories(url) {
  return dispatch => {
    dispatch(fetchPostsPending());
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw (res.error);
        }
        dispatch(fetchCategoriesSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchPostsError(error));
      })
  }
}