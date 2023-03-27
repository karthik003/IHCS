import { INITIAL_LOGIN, LOGIN, LOGOUT, USER_LOADING } from "../types/auth";

const initialState = {
  user: null,
  isAuthenticated: false,
  userLoading: true,
  userMessage: null,
  initialUserLoading: true,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return { ...state, user: payload, isAuthenticated: true, userLoading: false };
    case LOGOUT:
      return { ...state, user: null, isAuthenticated: false, userLoading: false, initialUserLoading: false };
    case INITIAL_LOGIN:
      return { ...state, user: payload, isAuthenticated: true, userLoading: false, initialUserLoading: false };
    case USER_LOADING:
      return { ...state, userLoading: payload };
    default:
      return state;
  }
};

export default authReducer;
