/**
shape:
gifts are the items gifted as gratitude for patronage.

giftsReceived: 0
giftsReceivedValue: 0
selectedGiftSelection: []
giftItems: [{
  name, giftValues: [], packageSizes: [], 
}]

**/

//Actions
import * as ACTIONS from "./../Actions/actionConstants";

const INITIAL_STATE = {
  'fetchingGifts': null,
};

// state.gifts: {...,"75" = [{}, {}, {}]}, ...}
function GiftsReducer(state = INITIAL_STATE, action) {
  const { payload, type, error, aspect } = action;
  switch (type) {
    // case ACTIONS.GIFTS_API_REQUEST: {
    //   return { ...state, 'status': "FETCHING"};
    // }
    // case ACTIONS.GIFTS_API_START: {
    //   // console.log(payload)
    //   return { ...state, 'status': null };
    // }

    case ACTIONS.UPDATE_FETCHED_GIFTS: {
      //gives me an array of gifts matchingprice.... set state.gifts.byId[price] = 
      // console.log(state, payload, aspect)
        let array = state[aspect] || []
        array = array.slice()
        array.splice(0,0,payload)
        // console.log(array)
        return { ...state, 
          [aspect]: payload
        }
    }

    // case ACTIONS.GIFTS_API_RESULT: {
    //   return { ...state, 
    //     'status': error || "SUCCESS", 
    //     'byId': payload 
    //   }
    // }
    // case ACTIONS.UPDATE_LIST: {
    //   return { ...state,
    //   'byId': payload
    //   }
    // }
    default:
      return state;
  }
}

export default GiftsReducer;