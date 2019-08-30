// eslint-disable-next-line
import { fsdb } from "./../DB/firebase";

import * as ACTIONS from "./../Actions/actionConstants";
//UID
// import uuidv4 from "uuid/v4";


const appointmentsCollection = fsdb.collection('APPOINTMENTS');
const servicesCollection = fsdb.collection('SERVICES');
const giftsCollection = fsdb.collection('GIFTS');
const productsCollection = fsdb.collection('PRODUCTS');

const watchCollection = function(collection, ...filters) {
  
  switch(collection) {
    case "HOSTS": { collection = hostsCollection; break }
    default: return
  }
  collection
  // .where(filters[0], == filters[1])
  .onSnapshot(function(querySnapshot) {
    //update state with this data...
    console.log("i'm Watching")
    querySnapshot
    .docChanges()
    .forEach(change => {
      if (change.type === "added") {
        let data = change.doc.data();
        console.log("New appointment", change.doc.data())
        let doc = {}
        doc[change.doc.id] = data;
        dispatch({type: ACTIONS.APPOINTMENTS_API_RESULT, payload: doc})
      }
      if (change.type === "modified") {
        console.log("Modified appointment", change.doc.data())
        let data = change.doc.data();

        //update state (state.appointments.byId & state.appointments.allIds)
        // console.log(state.appointments.byId)
        console.log(data)
        // dispatch({type: ACTIONS.APPOINTMENTS_API_RESULT, payload: {...state.appointments.byId, data}})
      }
      if (change.type === "removed") {
        let data = change.doc.data();
        console.log("Deleted appointment", change.doc.data()._id)
        // dispatch({type: ACTIONS.APPOINTMENTS_API_RESULT, payload: data})
        //remove appointmentID from users, services
      }
    });
  });
};

const unWatchCollection = function(filter){
  fsdb.collection(filter)
    .onSnapshot(function () {});
}

const watchDocument = function(collection, id) {
  console.log("i'm Watching")
  switch(collection) {
    case "APPOINTMENTS": { collection = appointmentsCollection; break }
    case "SERVICES": { collection = servicesCollection; break }
    case "GIFTS": { collection = giftsCollection; break }
    default: return
  }
  collection
  .doc(id)
  // .where(filters[0], == filters[1])
  .onSnapshot({
    includeMetadataChanges: true
  },function(docSnapshot) {
    let doc = {}
    //update state with this data...
    doc[docSnapshot.id] = docSnapshot.data();
    console.log(doc)
    dispatch({type: ACTIONS.APPOINTMENTS_API_RESULT, payload: doc})
  });
};

const unWatchDocument = function(filter, id){
  fsdb.collection(filter)
    .doc(id)
    .onSnapshot(function () {});
}


// == APPOINTMENTS == //
const appointmentsCreate = function(data) {
  console.log("submitting to db...", data)
  let ref = appointmentsCollection.doc()
  return (
    ref.set({...data,
    _id: ref.id
    }, function(error) {
      if (error) {
        return error
      } else {
        return ref.id
      }
    })
    .then(() => ref.id)
    .catch( error => error)
  )
};
// const appointmentsCreate2 = function(data) {
//   // console.log("submitting to db...", data)
//   return (
//     appointmentsCollection
//     .add(data)
//     .then( docRef => {
//       //RETURN THE NEW DOCUMENT'S ID FOR REFERENCE
//       // console.log(docRef)
//       return docRef.id
//     })
//     .catch( error => {
//       console.log(error)
//       return error
//     })
//   )
// };
const appointmentsFetchAll = function() {
  //return {"appointmentId": {appointmentData}}
  return (
    appointmentsCollection
      .get()
      .then(querySnapshot => {
        let docs = {};
        querySnapshot.forEach(doc => {
          docs[doc.id] = doc.data()
        });
        return docs;
      })
      .catch(error => {
        console.log(error);
        return error;
      })
  );
}; 

const appointmentsFetchOne = function(uid) {
  let doc = {}
  return (
    uid ? appointmentsCollection.doc(uid)
    .get()
    .then( docSnapshot => {
      doc[docSnapshot.id] = docSnapshot.data();
      return doc
    }).catch( error => {
      console.log(error)
      return error;
    }) : null
  );
};
const fetchAppointmentWhere = function(param, query) {
  const queryRef = appointmentsCollection.where( param,"==", query );
  return queryRef.get().docs().forEach(doc => {
    console.log(doc)
  });
};

const appointmentsUpdate = function(uid, data) {}
const appointmentsDelete = function(uid) {}

// == SERVICES == //
const servicesCreate = function(data) {
  // console.log("submitting to db...", data)
  let ref = servicesCollection.doc()
  ref.set({...data,
    _id: ref.id
  }, function(error) {
    if (error) {
      console.log(error)
    } else {
      console.log("Yay")
      return ref.id
    }
  })
  return ref.id;
};

const servicesFetchAll = function() {
  return servicesCollection.get().then(querySnapshot => {
    let docs = {};
    querySnapshot.forEach(doc => {
      docs[doc.id] = doc.data();
    });
    return docs;
  });
};

const servicesFetchFew = function(servicesObj) {
  console.log(servicesObj);
  let promises = [];
  Object.keys(servicesObj).forEach( id => {
    console.log(id);
    return servicesCollection.doc(id)
    .get()
    .then( doc => promises.push(doc.data()) )
    .catch( error => error);
  })
  console.log(promises)
}

const servicesFetchOne = function(serviceId) {
    return servicesCollection.doc(serviceId)
    .get()
    .then(doc => doc.data())
    .catch( error => error); //Needs Service
};
const servicesUpdate = function(uid, data) {}
const servicesDelete = function(uid) {
  return (
    servicesCollection
    .doc(uid)
    .delete()
    .then( () => {
      console.log(`Document ${uid} deleted successfully.`)
    }).catch( (error) => {
      console.warn(error)
    })
  );
};


// == GIFTS == //
const giftsCreate = function(data) {
  return giftsCollection
    .add(data)
    .then(docRef => {
      // console.log(docRef);
      return docRef.id;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
}

const giftsFetchAll = function(uid) {}
const giftsFetchOne = function(uid) {}
const giftsUpdate = function(uid, data) {}
const giftsDelete = function(uid) {}

const fetchGiftsWhere = (param) => {
  return giftsCollection.where( "giftValues","array-contains", param )
  .get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('no matching documents')
      return
    }
    let objects = []
    snapshot.forEach(doc => {
      let obj = {"guid":doc.id,...doc.data()}
      objects = [...objects, obj]
    })
    // console.log(objects)
    return objects
  })
  .catch(err => {
    console.log('Error', err)

  })
};

//EVENTS
export const getAppointment = appointmentId => {
  const ref = fsdb.collection('APPOINTMENTS').doc(appointmentId);
  return ref
    .get()
    .then(doc => doc.data())
    .catch(error => {
      console.log(error);
      return error;
    });
};

export const getAppointments = () => {
  const collection = fsdb.collection('APPOINTMENTS');
  return collection
    .get()
    .then(snapshot => {
      let docs = {};
      snapshot.forEach(doc => {
        docs[doc.id] = doc.data();
      });
      return docs;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

export const getServices = () => {
  const collection = fsdb.collection('SERVICES');
  //want object of {id: {}}
  return collection
    .get()
    .then(snapshot => {
      let docs = {};
      snapshot.forEach(doc => {
        docs[doc.id] = doc.data()
      });
      return docs;
    })
    .catch(error => {
      console.log(error);
      return error;
    });

};
/*

  SET

*/

//EVENTS
export const uploadAppointment = (aspect, payload) => {
  let ref;

  //Create meta document
  if (aspect === "meta") {
    ref = fsdb
      .collection('APPOINTMENTS')
      .doc(`${payload.appointmentId}`)
      .set({ ...payload })
      .then(() => true)
      .catch(err => err);
  } else {
    ref = fsdb
      .collection('APPOINTMENTS')
      .doc(`${payload.appointmentId}`)
      .collection(`${aspect}`)
      .doc();
    ref = ref
      .set({ ...payload })
      .then(() => true)
      .catch(err => err);
  }
  return ref;
};

export const submitAppointment = function(data) {
  const collection = fsdb.collection('APPOINTMENTS');
  return collection
    .add(data)
    .then(docRef => {
      return docRef.id;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

export const getMyAppointments = ({ authUser, myAppointmentIds, dispatch }) => {
  // eslint-disable-next-line
  let appointmentsRef;

  return Object.keys(myAppointmentIds).forEach(appointmentId => {
    return (appointmentsRef = fsdb
      .collection('APPOINTMENTS')
      .doc(`${appointmentId}`)
      .get()
      .then(doc => {
        dispatch({
          type: UPDATE_MY_APPOINTMENTS,
          payload: doc.data()
        });

        //Watching dappointments
        watchMyAppointments({ uid: authUser.uid, dispatch, appointmentId });
      }));
  });
};

/* 

  UPDATE

*/

export { watchDocument, unWatchDocument, servicesFetchFew,
  unWatchCollection, watchCollection, appointmentsFetchOne, 
  appointmentsFetchAll, fetchAppointmentWhere, appointmentsCreate, 
  appointmentsDelete, appointmentsUpdate, servicesCreate, 
  servicesFetchOne, servicesFetchAll, servicesUpdate, 
  servicesDelete, giftsCreate, giftsFetchAll, fetchGiftsWhere, 
  giftsFetchOne, giftsUpdate, giftsDelete };
