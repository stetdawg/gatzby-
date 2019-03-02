import { combineReducers } from "redux";
import code from "./codeReducer";
import item from "./itemReducer";
import cam from "./camera_reducer";
import auth from "./AuthReducer";
////////////////////////////////////////////////////////////////////////
// Combines reducers and assigns reducer names
export default combineReducers({
  code,
  item,
  cam,
  auth
});
