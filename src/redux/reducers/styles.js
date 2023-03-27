import { NOTIFICATION_ACTIVE, PROFILE_ACTIVE, SETTINGS_ACTIVE, SIDEBAR_ACTIVE, THEME } from "../types/styles";

const initialState = {
  sidebarActive: false,
  settingsActive: false,
  profileActive: false,
  darkTheme: false,
  notificationActive: {
    isVisible: false,
    text: "",
    icon: "",
    backgroundColor: "",
    color: "",
  },
};

const stylesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIDEBAR_ACTIVE:
      return { ...state, sidebarActive: payload };
    case SETTINGS_ACTIVE:
      return { ...state, settingsActive: payload };
    case PROFILE_ACTIVE:
      return { ...state, profileActive: payload };
    case THEME:
      return { ...state, darkTheme: payload };
    case NOTIFICATION_ACTIVE:
      return { ...state, notificationActive: payload };
    default:
      return state;
  }
};

export default stylesReducer;
