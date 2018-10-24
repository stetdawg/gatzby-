import { LIGHT_TOGLE } from "../actions/types";

const INITIAL_STATE = { 
light: "OFF"
};

export default (state = INITIAL_STATE, action) => {
switch (action.type) {
case LIGHT_TOGLE:
console.log(action.payload);
return { ...state, ligth: action.payload };
default:
return state;
}
};
