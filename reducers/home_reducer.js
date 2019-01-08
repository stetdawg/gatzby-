import { CAMERA_TOGLE } from "../actions/types";

const INITIAL_STATE = { 
  cameraTogle: false,
  };

export default (state = INITIAL_STATE, action) => {
 switch (action.type) {
  case CAMERA_TOGLE:
  return { ...state, cameraTogle: action.payload.cameraTogle };
default:
  return state;
 }
};
