import { combineReducers } from "redux";
import messages from "./messages";
import channels from "./channels";

export default combineReducers({
  messages,
  channels
});
