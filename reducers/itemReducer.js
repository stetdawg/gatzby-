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
            name: "",
            salePrice: '',
            upc: "",
            shortDescription: '',
            thumbnailImage: '',
            msrp: ""
            }
        ]
     },
     amResponseData: {},
     itemInfo:  
        {
        name: "",
        salePrice: '',
        codeData: "",
        codeType: '',
        shortDescription: '',
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
    return { ...state, walResponseData: action.payload.data };
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
