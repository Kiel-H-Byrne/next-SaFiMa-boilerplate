import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

//Actions
import * as ACTIONS from "./../Actions/actionConstants";
//Route
import * as ROUTE from "./../Routes";
import { push } from "react-router-redux";

//Firebase Auth
import firebase from "firebase/app";
import { auth } from "./../DB/firebase";
import { onceGetUser, uploadUser } from "./../DB/rtdb";

const normalizeNumber = number => `+1${number.match(/\d/g).join('')}`;

function* facebookSignIn() {
  console.log("signing in with facebook")
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const res = yield auth
    .signInWithPopup(fbProvider)
    .then(result => {
      return result;
    })
    .catch(err => {
      console.log(err);
      return err;
    });

  if (res.user) {
    yield put(push(ROUTE.LANDING));
  }

  return res;
}

function* googleSignIn() {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const res = yield auth
    .signInWithPopup(googleProvider)
    .then(result => {
      return result;
    })
    .catch(err => {
      console.log(err);
      return err;
    });

  if (res.user) {
    yield put(push(ROUTE.LANDING));
  }

  return res;
}

function* phoneSignIn({captchaConfirm, code}) {
  //i have code, sign in user and set authuser to state.
  const res = yield captchaConfirm.confirm(code).then(result => result)
    .catch(function (error) {
      console.error(error)
      // ...
    })
  return res;
}

function* phoneVerify({phoneNum}) {
  console.log("running...")
  //use recaptcha to send sms to phone, wait for code to signin 
  let appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible', //invisible/normal
    'callback': function(response) {
      console.log('Captcha Solved...')
    }
  })
  
  phoneNum = normalizeNumber(phoneNum)
  const confirmationResult = yield auth
    .signInWithPhoneNumber(phoneNum, appVerifier)
    .then(confirmationResult => confirmationResult)
    .catch(error => error)

    if(confirmationResult.verificationId) {
      yield put({
        type: ACTIONS.GET_PHONE_CONFIRMATION,
        payload: confirmationResult
      })
      //need to get confirmation code from user, pass code and confirmationResult to signInWithCredential or call confirm() on confirmationResult
    }
    return
}

let result;
function* signInHandler(route, payload) {
  if (route === "facebook") {
    result = yield call(facebookSignIn);
  } else if (route === "google") {
    result = yield call(googleSignIn);
  } else if (route === "phone") {
    result = yield call(phoneSignIn, payload) //signs in user with captchaCode and SMS code
  }
  return result;
}

//Saga Handler
function* handleAuth(action) {
  // console.log("handling auth...")
  const { dispatch, filter, payload } = action;

  let result;
  if (filter === ACTIONS.SIGN_IN_FACEBOOK) {
    //Trigger sign in
    result = yield call(signInHandler, "facebook");
  }

  if (filter === ACTIONS.SIGN_IN_GOOGLE) {
    result = yield call(signInHandler, "google");
  }

  if (filter === ACTIONS.VERIFY_SMS) {
    result = yield call(phoneVerify, payload); //part one of phone login
  }

  if (filter === ACTIONS.SIGN_IN_PHONE) {
    result = yield call(signInHandler, "phone", payload); //part two of phone login
  }

  let data;
  if (result && result.additionalUserInfo.isNewUser) {
    const { displayName, email, phoneNumber, photoURL, uid, creationDate } = result.user;
    const { profile, providerId } = result.additionalUserInfo;
    console.log(`Provider ID is ${providerId}`)

    let profileData;
    if (providerId === "facebook.com") {
      profileData = {
        family_name: profile.last_name ? profile.last_name : "",
        given_name: profile.first_name ? profile.first_name : "",
        name: profile.name ? profile.name : "",
        picture: profile.picture ? profile.picture.data.url : ""
      };
    } else if (providerId === "google.com") {
      profileData = {
        family_name: profile.family_name ? profile.family_name : "",
        given_name: profile.given_name ? profile.given_name : "",
        name: profile.name ? profile.name : "",
        picture: profile.picture ? profile.picture : ""
      }
    } else if (providerId === "phone") {
      profileData = {
        
      }
    }
    data = {
      displayName,
      email,
      phoneNumber: phoneNumber ? phoneNumber : "",
      referralNumber: normalizeNumber(payload.data.referralNum),
      uid,
      profileData
    };
    yield call(uploadUser, { data, dispatch });
  } else if (result && !result.additionalUserInfo.isNewUser) {
    const { uid } = result.user;
    const user = yield call(onceGetUser, uid);
    if (user) {
      yield put({ type: ACTIONS.UPDATE_USERS_REDUCER, payload: { ...user, didFetchUser: true } });
    }
  }
}

export default function* authSaga() {
  yield takeEvery(ACTIONS.AUTH_SAGA, handleAuth);
}


// get number
// call signInWithPhoneNumber with phoneNum and reCaptchaVerifier
// -> will send SMS
// prompt for verification code
// call confirm with verification code
// if success, user is logged in; if error, reset reCaptcha
