import { 
    ITEM_FETCH_SUCCESS,
    MULTI,
    SHOULD_RELOAD,
    AMAZON,
    ITEM_INFO,
SOLO } from "../actions/types";

const INITIAL_STATE = {
     savedItems: {},
     multiResponseData: {
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
        itemID: '',
        shortDescription: 'This is a very short description.',
        thumbnailImage: '',
        },

        SingleResponseData:  
        {
        name: "No Item found",
        salePrice: '',
        itemID: "",
        CodeData: "",
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
case MULTI: {  
    //console.log(`${action.payload} in reducer`);
    return { ...state, multiResponseData: action.payload };
}
case SOLO: {  
    return { ...state, SingleResponseData: action.payload };
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
