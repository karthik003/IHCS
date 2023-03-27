import { SIDEBAR_ACTIVE, SETTINGS_ACTIVE, PROFILE_ACTIVE, THEME, NOTIFICATION_ACTIVE } from "../types/styles";

export const toggleSidebar = () => async (dispatch, getState) => {
  dispatch({ type: SIDEBAR_ACTIVE, payload: !getState().styles.sidebarActive });
};

export const toggleSettings = () => async (dispatch, getState) => {
  dispatch({
    type: SETTINGS_ACTIVE,
    payload: !getState().styles.settingsActive,
  });
};

export const toggleProfile = () => async (dispatch, getState) => {
  dispatch({
    type: PROFILE_ACTIVE,
    payload: !getState().styles.profileActive,
  });
};

export const setTheme = (isDarkTheme) => async (dispatch) => {
  dispatch({ type: THEME, payload: isDarkTheme });
};

export const setNotificationActive = (data) => async (dispatch) => {
  dispatch({ type: NOTIFICATION_ACTIVE, payload: { ...data, isActive: true } });

  setTimeout(() => {
    dispatch({ type: NOTIFICATION_ACTIVE, payload: { ...data, isActive: false } });
  }, 3000);
};
