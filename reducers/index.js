import { combineReducers } from "redux";
import auth from "./auth_reducer";
import places from "./places_reducer";
import code from "./codeReducer";
import item from "./itemReducer";
import cam from "./camera_reducer";
////////////////////////////////////////////////////////////////////////
// Combines reducers and assigns reducer names
export default combineReducers({
  places,
  auth,
  code,
  item,
  cam
});
