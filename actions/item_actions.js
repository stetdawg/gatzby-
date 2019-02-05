import * as firebase from 'firebase';
import _ from "lodash"; 
import axios from "axios";
import { Linking } from 'react-native';
import { BAR_CODE_DATA,
  ITEM_FETCH_SUCCESS,
  WALMART,
  AMAZON,
  ITEM_INFO } from './types';
import * as urls from "../services/urlbuilder"; 


export const saveCode = (itemInfo) => {
const { currentUser } = firebase.auth();
//console.log({ itemInfo });
return () => {
firebase.database().ref(`/users/${currentUser.uid}/items`)
.push({ itemInfo });  
};
};


export const deleteItem = ({ uid }) => {
  const { currentUser } = firebase.auth();
  console.log(uid);
  return () => {
   firebase.database().ref(`/users/${currentUser.uid}/items/${uid}`)
   .remove();
  };
  };

export const barCodeData = (type, codeData) => {
  console.log(`data = ${codeData}`);
  let data = String(codeData); 
  let codeType = String(type);
  if (codeType.includes('EAN_13') || 
      codeType.includes("EAN-13")) {
  data = data.substr(1);
  codeType = 'UPC';
  }
  
switch (codeType) {
  case "QR":
  Linking.once(codeData);
  break;
  case "512":
  codeType = "UPC";
  break;
  default:
  }
  return {
    type: BAR_CODE_DATA,
    payload: { data, codeType } 
    };
};

export const textData = (text) => {
  console.log(`Query = ${text}`);
};

export const savedToResults = (Item) => {
  return {
    type: ITEM_INFO,
    payload: Item
  };
};

export const walRes = (text) => async dispatch => {
  //console.log(`BarCodeType = ${text}`);
 ///const walResponsedata = text;
 try {
const waldata = await axios.get(urls.warlmartAPIUrl(text));

 return walmartdata(dispatch, waldata);
} catch (err) { 
  //console.log(err);
} 
};

export const itemsFetch = () => {
  const { currentUser } = firebase.auth();
 return (dispatch) => {
 firebase.database().ref(`/users/${currentUser.uid}/items`)
 .on('value', snapshot => {
   dispatch({ type: ITEM_FETCH_SUCCESS, payload: snapshot.val() });
 });
  };
};
export const amRes = (text) => async dispatch => {
  //console.log(`BarCodeType = ${text}`);
 ///const walResponsedata = text;
 try {
const amdata = await axios.get(urls.amazonUrl(text));

 return AmData(dispatch, amdata);
} catch (err) { 
  console.log(err);
} 
};
const AmData = (dispatch, amdata) => {
  //console.log(amdata);
  dispatch({
    type: AMAZON,
    payload: amdata
  });
};

const walmartdata = (dispatch, waldata) => {
  console.log(waldata);
  dispatch({
    type: WALMART,
    payload: waldata
  });
};
