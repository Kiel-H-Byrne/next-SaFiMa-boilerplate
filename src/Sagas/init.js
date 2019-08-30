import { takeEvery } from "redux-saga/effects";

//Actions
import * as ACTIONS from "./../Actions/actionConstants";

//Auth
function* handleInit(action) {
  switch (action.aspect) {
    case "init": {
      //
      break;
    }
    default: {
      yield;
    }
  }
}

export default function* initSaga() {
  yield takeEvery(ACTIONS.INIT, handleInit);
}
