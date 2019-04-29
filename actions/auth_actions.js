
import { Facebook, SecureStore } from 'expo';
import { FACEBOOK_API_KEY } from '../assets/constants/api_keys';
import axios from "axios"
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  LOGIN_EMAIL_CHANGED,
  LOGIN_PASSWORD_CHANGED,
  LOGIN_PASSWORD_RETYPE_CHANGED,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAIL,
  AUTH_USER_ATTEMPT,
  RESET_SIGNUP_LOGIN_PAGES
} from './types.js';

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
/////////////////EMAIL/PASSWORD LOGIN METHODS///////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
export const emailChanged = (text) => ({
  type: LOGIN_EMAIL_CHANGED,
  payload: text
});

////////////////////////////////////////////////////////////////
// Called when password is updated
export const passwordChanged = (text) => ({
  type: LOGIN_PASSWORD_CHANGED,
  payload: text
});

////////////////////////////////////////////////////////////////
// Called when password retype is updated
export const passwordRetypeChanged = text => ({
  type: LOGIN_PASSWORD_RETYPE_CHANGED,
  payload: text
});

////////////////////////////////////////////////////////////////
// Called when password retype is updated
export const resetSignupLoginPages = () => ({
  type: RESET_SIGNUP_LOGIN_PAGES
});

////////////////////////////////////////////////////////////////
// Call appropriate method to login
export const loginUser = (email, password) =>  async dispatch =>{
  try {
    console.log("hi")
    let res = await axios({
        method: "post",
        url:`http://127.0.0.1:5000/userSignIn`, 
        body:{
          user:email,
          password
        } 
      });
      console.log(res.data);
    
    authUserSuccess(dispatch, "saldk;fjlaksd");
  } catch (err) {
    console.error(err);
    loginUserFail(dispatch, 'Authentication Failed');
  }
};
////////////////////////////////////////////////////////////////
// Helper method for successful email/password login
const authUserSuccess = (dispatch, user) => {
  dispatch({
    type: AUTH_USER_SUCCESS,
    payload: user
  });
};

////////////////////////////////////////////////////////////////
// Helper method for failed email/password login
const loginUserFail = (dispatch) => {
  dispatch({
    type: AUTH_USER_FAIL,
  });
};



////////////////////////////////////////////////////////////////
// Call appropriate method to signup user
export const signupUser = (email, password) => async dispatch => {
    try {
      const {data } = await axios.get("127.0.0.1:5000/userSignIn",{
          
            user:email,
            password:password
       }
      );
        console.log(data);
      
      authUserSuccess(dispatch, "saldk;fjlaksd");
    } catch (err) {
      console.error(err);
      loginUserFail(dispatch, 'Authentication Failed');
    }
  };
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////FACEBOOK LOGIN METHODS///////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// Checks to see if we already have a facebook token; if so, pass
// it to the reducer; if not, attempt to login.
export const facebookLogin = () => async dispatch => {
  try {
    // Dispatch event to trigger loading spinner
    dispatch({ type: AUTH_USER_ATTEMPT });

    // Get item out of device storage; it will take time, so wait
    // for it to complete; after we receive, assign to variable token
    //const token = await AsyncStorage.getItem('fb_token');
    const token = await SecureStore.getItemAsync('fb_token');

    // Can now pretend it was synchronous call
    if (token) {
      console.log(`FB Token exists: ${token}`);
      await loginWithFacebookToken(token, dispatch);

      // Dispatch an action saying FB login is done
      dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
      // Start up FB login process
      doFacebookLogin(dispatch);
    }
  } catch (err) {
    console.error(err);
  }
};

////////////////////////////////////////////////////////////////
// Helper function (not an action creator) -
const doFacebookLogin = async dispatch => {
  try {
    // This line will popup a modal where user can login to FB
    // Result contains type property (status) and token property - so destructure b/c
    // that's all we care about
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_API_KEY, {
      permissions: ['public_profile', 'email'] // Asking for FB permissions
    });

    if (type === 'cancel') {
      return dispatch({
        type: FACEBOOK_LOGIN_FAIL,
        payload: 'Facebook login cancelled/failed'
      });
    }

    await loginWithFacebookToken(token, dispatch);
  } catch (err) {
    console.error(err);
  }
};