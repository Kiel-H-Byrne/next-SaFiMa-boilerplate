/**
shape:
products are the items for sale in the CBD store. (stickers, merchandise, cbd product, etc...)
                

**/

//Actions
import * as ACTIONS from "./../Actions/actionConstants";

const INITIAL_STATE = {
  'status': null
};

function ProductsReducer(state = INITIAL_STATE, action) {
  const { payload, type, error } = action;
  switch (type) {
    case ACTIONS.PRODUCTS_API_REQUEST: {
      return { ...state, 'status': "FETCHING"};
    }
    case ACTIONS.PRODUCTS_API_START: {
      // console.log(payload)
      return { ...state, 'status': null };
    }
    case ACTIONS.PRODUCTS_API_RESULT: {
      // console.log(error)
      return { ...state, 
        'status': error || "SUCCESS", 
        'byId': payload 
      }
    }
    case ACTIONS.UPDATE_LIST: {
      return { ...state,
      'byId': payload
      }
    }
    default:
      return state;
  }
}

export default ProductsReducer;