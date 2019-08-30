import { call, put, takeEvery } from "redux-saga/effects";

//Actions
import * as ACTIONS from "./../../src/Actions/actionConstants";

//DB Functions
import { fetchGiftsWhere } from "./../../src/DB/fsdb";

import { push } from "react-router-redux";

function* handleGifts(action) {
  const {type, aspect, payload} = action
  switch (aspect) {
    case "getGiftsWhere": {
      yield put({
        type: ACTIONS.UPDATE_GIFTS_ASPECT,
        aspect: "fetchingGifts",
        payload: true
      });

      const gifts = yield call(fetchGiftsWhere, payload);
      // console.log(gifts) //array of gifts by price,price not passed, assembled into Price object in next steps
      if (gifts) {
        yield put({
          type: ACTIONS.UPDATE_FETCHED_GIFTS,
          aspect: payload,
          payload: gifts
        });

        // yield put({
        //   type: ACTIONS.UPDATE_SERVICES_ASPECT,
        //   aspect: "thisService",
        //   payload: gifts
        // });
      }

      yield put({
        type: ACTIONS.UPDATE_GIFTS_ASPECT,
        aspect: "fetchingGifts",
        payload: false
      });
      break;
    }

    case "getGifts": {
      yield put({
        type: ACTIONS.UPDATE_GIFTS_ASPECT,
        aspect: "fetching",
        payload: true
      });
      try {
        const gifts = yield call(getGifts);
        yield put({
          type: ACTIONS.UPDATE_GIFTS_ASPECT,
          aspect: "fetchedGifts",
          payload: gifts
        });
      } catch (error) {
        yield put({
          type: ACTIONS.UPDATE_GIFTS_ASPECT,
          aspect: "fetchGiftsError",
          payload: error
        });
      }
      yield put({
        type: ACTIONS.UPDATE_GIFTS_ASPECT,
        aspect: "fetching",
        payload: false
      });
      break;
    }

    case "submitGift": {
      try {
        const id = yield call(submitGift, payload);
        yield put({
          type: ACTIONS.UPDATE_GIFTS_ASPECT,
          aspect: "activeGift",
          payload: id
        });
        yield put(push(`/gifts/${id}`));
      } catch (error) {
        yield put({
          type: ACTIONS.UPDATE_GIFTS_ASPECT,
          aspect: "submitGiftError",
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

export default function* giftsSaga() {
  yield takeEvery(ACTIONS.GIFTS_SAGA, handleGifts);
}
