import { call, put, takeEvery } from "redux-saga/effects";
//Actions
import * as ACTIONS from "./../Actions/actionConstants";

//Firestore
import {
  addCardToDB,
  editCardInDB,
  getAppointmentsFromDB,
  removeCardFromDB,
  onceGetUser,
  watchUser
} from "../DB/rtdb";

import { getMyAppointments } from "./../DB/fsdb";

function* handleUser(action) {
  switch (action.aspect) {
    case "getUserFromCache": {
      const { payload } = action;
      yield put({
        type: ACTIONS.UPDATE_USERS_ASPECT,
        aspect: "fetchingUser",
        payload: true
      });

      const user = yield call(onceGetUser, payload);

      yield put({
        type: ACTIONS.UPDATE_USERS_REDUCER,
        payload: { ...user, didFetchUser: true, fetchingUser: false }
      });

      break;
    }

    case "watchUser": {
      const { dispatch, uid } = action.payload;

      yield put({
        type: ACTIONS.UPDATE_USERS_ASPECT,
        aspect: "fetchingUser",
        payload: true
      });

      yield put({
        type: ACTIONS.UPDATE_USERS_ASPECT,
        aspect: "isWatchingUser",
        payload: true
      });

      yield call(watchUser, { uid, dispatch });

      yield put({
        type: ACTIONS.UPDATE_USERS_ASPECT,
        aspect: "fetchingUser",
        payload: false
      });

      break;
    }

    // case "addCardToDB": {
    //   const { authUser, card } = action.payload;

    //   yield put({
    //     type: ACTIONS.UPDATE_USERS_ASPECT,
    //     aspect: "submittingCard",
    //     payload: true
    //   });

    //   yield call(addCardToDB, { uid: authUser.uid, payload: card });

    //   yield put({
    //     type: ACTIONS.UPDATE_USERS_ASPECT,
    //     aspect: "submittingCard",
    //     payload: false
    //   });
    //   break;
    // }

    // case "removeCardFromDB": {
    //   const { authUser, dbIndex, cards } = action.payload;

    //   yield put({
    //     type: ACTIONS.UPDATE_USERS_ASPECT,
    //     aspect: "removingCard",
    //     payload: true
    //   });

    //   yield call(removeCardFromDB, { uid: authUser.uid, payload: dbIndex });

    //   yield put({
    //     type: ACTIONS.UPDATE_USERS_ASPECT,
    //     aspect: "removingCard",
    //     payload: false
    //   });

    //   if (Object.keys(cards).length === 1) {
    //     if (Object.keys(cards)[0] === dbIndex) {
    //       yield put({
    //         type: ACTIONS.UPDATE_USERS_ASPECT,
    //         aspect: "cards",
    //         payload: []
    //       });
    //     }
    //     yield put({
    //       type: ACTIONS.UPDATE_USERS_ASPECT,
    //       aspect: "removingCard",
    //       payload: true
    //     });
    //   }

    //   break;
    // }

    // case "editCardInDB": {
    //   const { authUser, dbIndex, card } = action.payload;
    //   yield call(editCardInDB, { uid: authUser.uid, card, dbIndex });
    //   break;
    // }

    case "getAppointmentsFromDB": {
      try {
        const appointments = yield call(getAppointmentsFromDB, action.payload.authUser.uid);
        if (appointments) {
          yield put({
            type: ACTIONS.UPDATE_USERS_ASPECT,
            aspect: "appointments",
            payload: appointments
          });
        }
      } catch (err) {
        console.log(err);
        yield err;
      }
      break;
    }

    case "initDashboard": {
      const { authUser, myAppointmentIds, dispatch } = action.payload;
      try {
        yield call(getMyAppointments, {
          authUser,
          myAppointmentIds,
          dispatch
        });

        yield put({
          type: ACTIONS.UPDATE_USERS_ASPECT,
          aspect: "dashboardDidInit",
          payload: true
        });
      } catch (err) {
        console.log(err);
        yield err;
      }
      break;
    }

    //Experimental
    // case "updateDashboard": {
    //   const {authUser, myAppointmentIds, dispatch} = action.payload
    //   try {
    //     yield call(getMyAppointments, {
    //       authUser,
    //       myAppointmentIds,
    //       dispatch
    //     });

    //     yield put({
    //       type: ACTIONS.UPDATE_USERS_ASPECT,
    //       aspect: "dashboardDidInit",
    //       payload: true
    //     });
    //   } catch (err) {

    //   }
    // }

    case "watchMyAppointments": {
      yield put({
        type: ACTIONS.UPDATE_MY_APPOINTMENTS,
        payload: action.payload
      });
      break;
    }

    default: {
      yield;
    }
  }
}

export default function* usersSaga() {
  yield takeEvery(ACTIONS.USERS_SAGA, handleUser);
}
