import { FETCH_POSTS_PENDING, FETCH_POSTS_SUCCESS, FETCH_CATEGORIES_SUCCESS, FETCH_PAGES_SUCCESS, FETCH_POSTS_ERROR } from '../components/action.js';

export const initialState = {
  pending: true,
  posts: [],
  pages: [],
  error: null
}

export function postsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        pending: false,
        posts: action.posts
      }
    case FETCH_PAGES_SUCCESS:
      return {
        ...state,
        pending: false,
        pages: action.pages
      }
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        pending: false,
        categories: action.categories
      }
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state;
  }
}

export const getPosts = state => state.posts;
export const getPages = state => state.pages;
export const getCategories = state => state.categories;
export const getPostsPending = state => state.pending;
export const getPostsError = state => state.error;
