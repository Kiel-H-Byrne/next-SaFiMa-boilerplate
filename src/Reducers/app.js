//Actions
import * as ACTIONS from "../Actions/actionConstants";

const defaultScheme = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#ffc658"];

const INITIAL_STATE = {
  didUpload: false,
  scheme: defaultScheme,
  mode: "light",
  snackbarOpen: false,
  message: "",
  variant: ""
};

function appReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    //Generic Updates
    case ACTIONS.UPDATE_APP_ASPECT: {
      return { ...state, [`${action.aspect}`]: action.payload };
    }

    case ACTIONS.UPDATE_APP_REDUCER: {
      return { ...state, ...action.payload };
    }

    //Specific Updates

    default:
      return state;
  }
}

export default appReducer;
