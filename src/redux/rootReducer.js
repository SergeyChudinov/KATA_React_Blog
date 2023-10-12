import { combineReducers } from 'redux'

import { blogsReducer, blogReducer } from './blogsReducer'

export const rootReducer = combineReducers({
  blogs: blogsReducer,
  blog: blogReducer,
})
