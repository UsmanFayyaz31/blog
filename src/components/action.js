export const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';
export const FETCH_PAGES_SUCCESS = 'FETCH_PSGES_SUCCESS';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';

export function fetchPostsPending() {
  return {
    type: FETCH_POSTS_PENDING
  }
}

export function fetchPostsSuccess(posts) {
  return {
    type: FETCH_POSTS_SUCCESS,
    posts: posts
  }
}

export function fetchPagesSuccess(pages) {
  return {
    type: FETCH_PAGES_SUCCESS,
    pages: pages
  }
}

export function fetchCategoriesSuccess(categories) {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    categories:  categories
  }
}

export function fetchPostsError(error) {
  return {
    type: FETCH_POSTS_ERROR,
    error: error
  }
}