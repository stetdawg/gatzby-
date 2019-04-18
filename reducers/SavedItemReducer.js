import { ITEM_SAVED, ITEM_REMOVED } from '../actions/types.js';

const INITIAL_STATE = {
    savedItems: {},
       items: [ 
           {
           name: 'item name',
            MSRP: 'item price',
            codeData: 'UPC',
            salePrice: 'sale price',
            shortDescription: 'desc',
            largeImage: 'thumbnail',
           }
       ]
   
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ITEM_SAVED: {
            return {...state, ITEM_SAVED: action.payload };
        }
        case ITEM_REMOVED: {
            return {...state, ITEM_REMOVED: action.payload };
        }
        default:
        return state;
    }
};

