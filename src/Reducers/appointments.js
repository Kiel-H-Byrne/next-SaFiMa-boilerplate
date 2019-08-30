//Actions
import * as ACTIONS from "./../Actions/actionConstants";
// eslint-disable-next-line
const INITIAL_STATE = {
  fetchedAppointments: [],
  fetching: false,
  fetchingAppointment: false,
  myAppointmentIds: {}, 
  myAppointments: {},
  thisAppointment: {},
  error: null
}

function AppointmentsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    //Generic Updates
    case ACTIONS.UPDATE_APPOINTMENTS_ASPECT: {
      return { ...state, [`${action.aspect}`]: action.payload };
    }

    case ACTIONS.UPDATE_APPOINTMENTS_REDUCER: {
      return { ...state, ...action.payload };
    }

    //Specific Updates
    case ACTIONS.UPDATE_FETCHED_APPOINTMENTS: {
      return {
        ...state,
        fetchedAppointments: [...state.fetchedAppointments, action.payload]
      };
    }

    default:
      return state;
  }
}

export default AppointmentsReducer;