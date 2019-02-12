import * as firebase from 'firebase'; 
import axios from "axios";
import { Linking } from 'react-native';
import { BAR_CODE_DATA,
  AMAZON,
  ITEM_INFO,
  MULTI,
  SOLO } from './types';
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
  //console.log(`data = ${codeData}`);
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
  return {
    type: BAR_CODE_DATA,
    payload: {text}
  };
};

export const savedToResults = (Item) => {
  return {
    type: ITEM_INFO,
    payload: Item
  };
};

export const multiResponce = (text) => {
return {
  type: MULTI,
  payload: text
};
};

export const singleResponce = (text) => {
  return {
    type: SOLO,
    payload: text
  };
  };

 export const itemsFetch = () => {
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

// const walmartdata = (dispatch, waldata) => {
//   console.log(waldata);
//   dispatch({
//     type: WALMART,
//     payload: waldata
//   });
// };
