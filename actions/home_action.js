import { CAMERA_TOGLE } from './types';


export const cameraTogle = (text) => {
    console.log(text);

if (text) {
    return {
        type: CAMERA_TOGLE,
        payload: true
    };
    }
    return {
        type: CAMERA_TOGLE,
        payload: false
    };
    };
