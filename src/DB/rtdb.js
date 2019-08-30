import { rtdb } from "./firebase";

import * as ACTIONS from "../Actions/actionConstants";
import { display } from "@material-ui/system";

//Get
export const onceGetUser = uid => {
  return rtdb
    .ref(`users/${uid}`)
    .once("value")
    .then(res => res.val());
};

export const getAppointmentsFromDB = uid => {
  return rtdb
    .ref(`users/${uid}/appointments`)
    .once("value")
    .then(res => res.val())
    .catch(err => {
      console.log(err);
      return err;
    });
};

//Update
export const updateUser = (uid, aspect, data) => {
  console.log(uid, {[aspect]: data})
  return rtdb
    .ref(`users/${uid}`)
    .update({
      [aspect]: data
    })
    .then(res => res)
    .catch(err => {
      console.log(err);
      return err;
    });
};

// export const setDefaultCard = ({ uid, payload }) => {
//   return rtdb
//     .ref(`users/${uid}/cards`)
//     .set({ defaultCard: payload })
//     .then(res => res)
//     .catch(err => {
//       console.log(err);
//       return err;
//     });
// };

// export const addCardToDB = ({ uid, payload }) => {
//   return rtdb
//     .ref(`users/${uid}/cards`)
//     .push({ ...payload })
//     .then(res => res)
//     .catch(err => {
//       console.log(err);
//       return err;
//     });
// };

// export const editCardInDB = ({ uid, dbIndex, card }) => {
//   return rtdb
//     .ref(`users/${uid}/cards`)
//     .set({ [`${dbIndex}`]: card })
//     .then(res => res)
//     .catch(err => {
//       console.log(err);
//       return err;
//     });
// };

// export const removeCardFromDB = ({ uid, payload }) => {
//   return rtdb
//     .ref(`users/${uid}/cards/${payload}`)
//     .remove()
//     .then(res => res)
//     .catch(err => {
//       console.log(err);
//       return err;
//     });
// };
export const addAppointmentIdToDB = ({ uid, eventId, payload }) => {
  return rtdb
    .ref(`users/${uid}/appointments/myAppointmentIds/${eventId}`)
    .set(payload)
    .then(res => res)
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const addAppointmentToDB = ({ uid, event }) => {
  return rtdb
    .ref(`users/${uid}/appointments/myAppointments/${event.eventId}`)
    .set(event)
    .then(res => res)
    .catch(err => {
      console.log(err);
      return err;
    });
};

//Set
export const uploadAvatar = ({ uid, avatar }) => {
  return rtdb
    .ref(`users/${uid}`)
    .update({
      avatar
    })
    .then(res => res)
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const removeAvatar = ({ uid }) => {
  return rtdb
    .ref(`users/${uid}`)
    .update({
      avatar: ""
    })
    .then(res => res)
    .catch(err => {
      console.log(err);
      return err;
    });
};

//For FIRST TIME SIGN UP ONLY
export const uploadUser = ({ data, dispatch }) => {
  const ref = rtdb.ref(`users/${data.uid}`);

  return ref
    .set({
      ...data
    })
    .then(() => {
      dispatch({
        type: ACTIONS.UPDATE_USERS_REDUCER,
        payload: { ...data, didFetchUser: true }
      });

      return data;
    });
};

//Watch
export const watchMyAppointments = ({ uid, dispatch, eventId }) => {
  return rtdb.ref(`users/${uid}/appointments/myEvents/${eventId}/meta`).on("value", snapshot => {
    dispatch({
      type: ACTIONS.USERS_SAGA,
      aspect: "watchMyAppointments",
      payload: { ...snapshot.val() }
    });

    return snapshot.val();
  });
};

export const watchUser = ({ dispatch, uid }) => {
  return rtdb.ref(`users/${uid}`).on("value", snapshot => {
    dispatch({
      type: ACTIONS.UPDATE_USERS_REDUCER,
      payload: { ...snapshot.val() }
    });

    return snapshot.val();
  });
};

export const updateProfile = (profile, {displayName,photoURL}) => {
  profile = {...profile, ...{displayName,photoURL}}
  auth.currentUser.updateProfile(profile)
}