import { call, put, takeEvery } from "redux-saga/effects";

//Actions
import * as ACTIONS from "./../../src/Actions/actionConstants";
// eslint-disable-next-line
import { getServices, servicesCreate } from "./../../src/DB/fsdb";

function* handleServices(action) {
  switch (action.aspect) {
    case "getServices": {
      yield put({
        type: ACTIONS.UPDATE_SERVICES_ASPECT,
        aspect: "fetching",
        payload: true
      });
      try {
        const services = yield call(getServices);
        yield put({
          type: ACTIONS.UPDATE_SERVICES_ASPECT,
          aspect: "services",
          payload: services
        });
      } catch (error) {
        yield put({
          type: ACTIONS.UPDATE_SERVICES_ASPECT,
          aspect: "getServicesError",
          error: error
        });
      }
      yield put({
        type: ACTIONS.UPDATE_SERVICES_ASPECT,
        aspect: "fetching",
        payload: false
      });
      break;
    }
    case "submitService": {
      yield put({
        type: ACTIONS.CREATE_SERVICES_REDUCER,
        aspect: "submitting",
        payload: true
      });
      try {
        const suid = yield call(servicesCreate, action.payload)
        console.log(suid)
      } catch (error) {
        console.log(error)
      }
      yield put({
        type: ACTIONS.CREATE_SERVICES_REDUCER,
        aspect: "submitting",
        payload: false
      });
    }
    default: {
      yield;
    }
  }
}

export default function* servicesSaga() {
  yield takeEvery(ACTIONS.SERVICES_SAGA, handleServices);
}
