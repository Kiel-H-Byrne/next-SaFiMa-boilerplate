import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import GiftsReducer from "./gifts";
import SessionReducer from "./session";
import UsersReducer from "./users";
import FormsReducer from "./forms";
import ProductsReducer from "./products";
import AppointmentsReducer from "./appointments";
import ServicesReducer from "./services";
import AppReducer from "./app"
// import MapReducer from "./maps"


export default (history) => combineReducers({
  router: connectRouter(history),
  app: AppReducer,
  gifts: GiftsReducer,
  products: ProductsReducer,
  session: SessionReducer,
  users: UsersReducer,
  forms: FormsReducer,
  appointments: AppointmentsReducer,
  services: ServicesReducer
});