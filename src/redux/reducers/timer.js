import { LAST_UPDATED, CLEAR_LAST_UPDATED } from "../types/timer";

const initialState = {
  lastUpdated: 0,
};

const timerReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case LAST_UPDATED:
      return { ...state, lastUpdated: state.lastUpdated + 1 };
    case CLEAR_LAST_UPDATED:
      return { ...state, lastUpdated: 0 };
    default:
      return state;
  }
};

export default timerReducer;
