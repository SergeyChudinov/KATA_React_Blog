import {
  ADD_BLOGS_STARTED,
  ADD_BLOGS_SUCCESS,
  ADD_BLOGS_FAILURE,
  ADD_BLOG_STARTED,
  ADD_BLOG_SUCCESS,
  ADD_BLOG_FAILURE,
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
