//Actions
import * as ACTIONS from "./../Actions/actionConstants";

// eslint-disable-next-line
const INITIAL_STATE = {
  phoneNum: "",
  referralNum: ""
};


function FormsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    //Generic Updates
    case ACTIONS.UPDATE_FORMS_ASPECT: {
      return { ...state, [`${action.aspect}`]: action.payload };
    }

    case ACTIONS.UPDATE_FORMS_REDUCER: {
      return { ...state, ...action.payload };
    }

    case ACTIONS.RESET_FORMS: {
      return { ...state, ...INITIAL_STATE };
    }

    default:
      return state;
  }
}

export default FormsReducer;
