import { combineReducers } from "redux";
import apReducer from "./ap";
import authReducer from "./auth";
import freightReducer from "./freight";
import iframeReducer from "./iframe";
import stylesReducer from "./styles";
import tableReducer from "./table";
import timerReducer from "./timer";

const rootReducer = combineReducers({
  auth: authReducer,
  styles: stylesReducer,
  table: tableReducer,
  iframe: iframeReducer,
  timer: timerReducer,
  ap: apReducer,
  freight: freightReducer,
});

export default rootReducer;
