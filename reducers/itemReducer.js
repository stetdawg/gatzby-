import { 
    ITEM_FETCH_SUCCESS,
    WALMART,
    SHOULD_RELOAD,
    AMAZON,
    ITEM_INFO } from "../actions/types";

const INITIAL_STATE = {
     savedItems: {},
     walResponseData: {
        items: [ 
            {
            name: "No Item found",
            salePrice: '$1.00',
            upc: "0000000000",
            shortDescription: 'This is a very short description.',
            thumbnailImage: '',
            msrp: "$9999999999.99"
            }
        ]
     },
     amResponseData: {},
     itemInfo:  
        {
        name: "No Item found",
        salePrice: '',
        codeData: "",
        codeType: '',
        shortDescription: 'This is a very short description.',
        thumbnailImage: '',
        }   
};

export default (state = INITIAL_STATE, action) => {
switch (action.type) {
case ITEM_FETCH_SUCCESS:
{
 //   console.log(`${action.payload}`);
return { ...state, savedItems: action.payload };
}
case WALMART: {  
    //console.log(`${action.payload} in reducer`);
    return { ...state, walResponseData: action.payload };
}
case AMAZON: {
    return { ...state, amResponseData: action.payload.data };
}
case ITEM_INFO: {
    return { ...state, itemInfo: action.payload };
}
case SHOULD_RELOAD: {
    return { ...state, reload: action.payload };
}
default:
return state;
}
};
