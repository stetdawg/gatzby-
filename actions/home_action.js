import { CAMERA_TOGLE } from './types';


export const cameraTogle = (text) => {
    return {
        type: CAMERA_TOGLE,
        payload: (text === "on")
    };
};
