import { all } from "redux-saga/effects";

//Watchers
import authSaga from "./auth";
import initSaga from "./init";
import giftsWatcherSaga from "./gifts";
import usersSaga from "./users";
import appointmentsSaga from "./appointments"
import servicesSaga from "./services"

export default function* rootSaga() {
  yield all([ giftsWatcherSaga(), authSaga(), usersSaga(), initSaga(), appointmentsSaga(), servicesSaga()  ]);
}