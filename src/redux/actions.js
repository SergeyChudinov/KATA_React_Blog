import {
  ADD_BLOGS_STARTED,
  ADD_BLOGS_SUCCESS,
  ADD_BLOGS_FAILURE,
  ADD_BLOG_STARTED,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_FAILURE,
  LOG_IN_STARTED,
  LOG_IN_SUCCSESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  EDIT,
} from './types'

export const addBlogsStrarted = () => {
  return {
    type: ADD_BLOGS_STARTED,
  }
}

export const addBlogsSuccsess = (blogs) => {
  return {
    type: ADD_BLOGS_SUCCESS,
    payload: blogs,
  }
}

export const addBlogsFailure = (e) => {
  return {
    type: ADD_BLOGS_FAILURE,
    payload: e,
  }
}

export const addBlogStrarted = () => {
  return {
    type: ADD_BLOG_STARTED,
  }
}

export const addBlogSuccsess = (blog) => {
  return {
    type: ADD_BLOG_SUCCESS,
    payload: blog,
  }
}

export const addBlogFailure = (e) => {
  return {
    type: ADD_BLOG_FAILURE,
    payload: e,
  }
}

export const logInStrarted = () => {
  return {
    type: LOG_IN_STARTED,
  }
}

export const logInSuccsess = (user) => {
  return {
    type: LOG_IN_SUCCSESS,
    payload: user,
  }
}

export const logInFailure = (e) => {
  return {
    type: LOG_IN_FAILURE,
    payload: e,
  }
}

export const logOut = () => {
  return {
    type: LOG_OUT,
  }
}

export const edit = (user) => {
  return {
    type: EDIT,
    payload: user,
  }
}