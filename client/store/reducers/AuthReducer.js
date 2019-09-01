import {
  CLEAR_ERROR,
  SET_STATUS,
  SIGN_OUT,
  getUserAction,
  signInAction,
  changeAvatarAction,
  createUserAction
} from "../actions/AuthActions";

const initialState = {
  loggedIn: false,
  loading: false,
  user: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case createUserAction.start().type:
    case changeAvatarAction.start().type:
    case signInAction.start().type:
      return { ...state, loading: true };
    case createUserAction.success().type:
      return { ...state, loggedIn: false, loading: false, error: null };
    case createUserAction.failure().type:
    case signInAction.failure().type:
    case getUserAction.failure().type:
      return {
        ...state,
        loggedIn: false,
        loading: false,
        error: action.payload.message
      };
    case signInAction.success().type:
    case changeAvatarAction.success().type:
      return { ...state, loading: false, loggedIn: true, error: null };
    case changeAvatarAction.failure().type:
      return { ...state, loading: false, error: action.payload.message };
    case SET_STATUS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        loggedIn: true,
        error: null
      };
    case SIGN_OUT:
      return {
        ...state,
        user: null,
        loggedIn: false
      };
    default:
      return state;
  }
};

export default authReducer;
