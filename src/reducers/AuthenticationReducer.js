import { userConstants } from '../constants'

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user ? { isLogin: true, user } : {}

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return {
        isLogin: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}