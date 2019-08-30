import { call, put, takeEvery } from "redux-saga/effects";

//Actions
import * as ACTIONS from "./../../src/Actions/actionConstants";

//DB Functions
import { getAppointment, getAppointments, submitAppointment } from "./../../src/DB/fsdb";

import { push } from "react-router-redux";

function* handleAppointments(action) {
  switch (action.aspect) {
    case "getAppointment": {
      yield put({
        type: ACTIONS.UPDATE_APPOINTMENTS_ASPECT,
        aspect: "fetchingAppointment",
        payload: true
      });

      const appointment = yield call(getAppointment, action.payload);
      console.log(appointment)
      if (appointment) {
        yield put({
          type: ACTIONS.UPDATE_FETCHED_APPOINTMENTS,
          payload: appointment
        });

        yield put({
          type: ACTIONS.UPDATE_APPOINTMENTS_ASPECT,
          aspect: "thisAppointment",
          payload: appointment
        });
      }

      yield put({
        type: ACTIONS.UPDATE_APPOINTMENTS_ASPECT,
        aspect: "fetchingAppointment",
        payload: false
      });
      break;
    }

    case "getAppointments": {
      yield put({
        type: ACTIONS.UPDATE_APPOINTMENTS_ASPECT,
        aspect: "fetching",
        payload: true
      });
      try {
        const appointments = yield call(getAppointments);
        yield put({
          type: ACTIONS.UPDATE_APPOINTMENTS_ASPECT,
          aspect: "fetchedAppointments",
          payload: appointments
        });
      } catch (error) {
        yield put({
          type: ACTIONS.UPDATE_APPOINTMENTS_ASPECT,
          aspect: "fetchAppointmentsError",
          payload: error
        });
      }
      yield put({
        type: ACTIONS.UPDATE_APPOINTMENTS_ASPECT,
        aspect: "fetching",
        payload: false
      });
      break;
    }

    case "submitAppointment": {
      try {
        const id = yield call(submitAppointment, action.payload);
        yield put({
          type: ACTIONS.UPDATE_APPOINTMENTS_ASPECT,
          aspect: "activeAppointment",
          payload: id
        });
        yield put(push(`/appointments/${id}`));
      } catch (error) {
        yield put({
          type: ACTIONS.UPDATE_APPOINTMENTS_ASPECT,
          aspect: "submitAppointmentError",
          payload: error
        });
      }
      break;
    }

    default: {
      yield;
    }
  }
}

export default function* appointmentsSaga() {
  yield takeEvery(ACTIONS.APPOINTMENTS_SAGA, handleAppointments);
}
