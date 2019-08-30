/* 
what do i want in this store? 
authUser details/status

*/

import * as ACTIONS from "./../Actions/actionConstants";

const INITIAL_STATE = {
  authUser: {},
  captchaConfirm: null,
};

const applySetAuthUser = (state = INITIAL_STATE, action) => ({
  ...state,
  authUser: action.authUser
});

function SessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    //GET Confirmation Code
    case ACTIONS.GET_PHONE_CONFIRMATION: {
      return {...state, captchaConfirm: action.payload}
    }
    //Generic Updates
    case ACTIONS.UPDATE_SESSION_ASPECT: {
      return { ...state, [`${action.aspect}`]: action.payload };
    }

    case ACTIONS.UPDATE_SESSION_REDUCER: {
      return { ...state, ...action.payload };
    }

    //Specific Updates
    case ACTIONS.AUTH_USER_SET: {
      return applySetAuthUser(state, action);
    }

    default:
      return state;
  }
}

export default SessionReducer;

