import { CLEAR_LAST_UPDATED, LAST_UPDATED } from "../types/timer";

let lastUpdatedTimer = null;

export const setLastUpdated = () => async (dispatch) => {
  clearInterval(lastUpdatedTimer);
  dispatch({ type: CLEAR_LAST_UPDATED });
  lastUpdatedTimer = setInterval(() => dispatch({ type: LAST_UPDATED }), 60000);
};
