import { BAR_CODE_DATA } from "../actions/types";

const INITIAL_STATE = { 
  BarCodeType: "",
    CodeData: "",
    walResponseData: "none"
  };

export default (state = INITIAL_STATE, action) => {
 switch (action.type) {
  case BAR_CODE_DATA:
  return { ...state, codeData: action.payload.data, codeType: action.payload.codeType };
default:
  return state;
 }
};
