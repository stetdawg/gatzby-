import { LIGHT_TOGLE } from './types';


export const lightSwitch = (text) => {
    console.log(text);
if (text === "OFF") {
return {
    type: LIGHT_TOGLE,
    payload: "ON"
};
}
return {
    type: LIGHT_TOGLE,
    payload: "OFF"
};
};
