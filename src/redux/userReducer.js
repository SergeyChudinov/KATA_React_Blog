import { LOG_IN_STARTED, LOG_IN_SUCCSESS, LOG_IN_FAILURE, LOG_OUT, EDIT } from './types'

const initialBlogsState = {
  userName: null,
  email: null,
  token: null,
  image: null,
  error: null,
  loading: false,
}

export const userReducer = (state = initialBlogsState, action) => {
  switch (action.type) {
    case LOG_IN_STARTED:
      return {
        ...state,
        loading: true,
      }
    case LOG_IN_SUCCSESS:
      return {
        ...state,
        userName: action.payload.username,
        email: action.payload.email,
        token: action.payload.token,
        image: action.payload.image,
      }
    case LOG_IN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case LOG_OUT:
      return {
        userName: null,
        email: null,
        token: null,
        image: null,
        error: null,
        loading: false,
      }
    case EDIT:
      return {
        userName: action.payload.username,
        email: action.payload.email,
        token: action.payload.token,
        image: action.payload.image,
      }
    default:
      return state
  }
}
