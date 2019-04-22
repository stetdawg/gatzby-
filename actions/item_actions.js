import * as firebase from 'firebase'; 
import axios from "axios";
import { Linking } from 'react-native';
import _ from "lodash";
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
  console.log(Item);
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

export const singleResponce = (text) => async dispatch => {
 let temp = await firebase.database().ref(`/Items/${text.upc}/text`)
 .once('value');
 temp = JSON.parse(JSON.stringify(temp));
  //console.log(temp.history);
  //console.log(temp);

  let priceDate = new Date();
  const price = text.salePrice;
  priceDate = priceDate.toDateString();
 // console.log(priceDate);
  if (temp === null) {
    text.history = [{priceDate: priceDate, price: price}];
    firebase.database().ref(`/Items/${text.upc}/`).set({ text });
      return singData(dispatch, text);
  }
  const latestPrice = _.toArray(temp.history);
  let lastDate = latestPrice[latestPrice.length-1].priceDate;
  lastDate = new Date(lastDate);
  console.log(lastDate);
  const delta = new Date() - lastDate;
  console.log(delta);
  if (delta > 86400000) {
    latestPrice[latestPrice.length] = { priceDate: priceDate, price: price};
    console.log(latestPrice);
    temp.history = latestPrice;
  }
  firebase.database().ref(`/Items/${temp.upc}/`)
.set({ text: temp });
return singData(dispatch, temp);  
  };

 export const itemsFetch = () => async dispatch => {
  const { currentUser } = firebase.auth();
  //console.log(uid);
   const items = firebase.database().ref(`/users/${currentUser.uid}/items/`)
   .get();
 };

export const amRes = (text) => async dispatch => {
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

const singData = (dispatch, data) => {
  //console.log(amdata);
  dispatch({
    type: SOLO,
    payload: data
  });
};
// const walmartdata = (dispatch, waldata) => {
//   console.log(waldata);
//   dispatch({
//     type: WALMART,
//     payload: waldata
//   });
// };
