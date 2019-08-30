import React from "react";

//Routes
import { Route, Switch } from "react-router-dom";

//Code Splitting
// import { asyncComponent } from "../hocs/asyncComponent";

//Components
// import ReadMePage from "./../components/pages/Readme";
// import AppMap from "./../components/pages/Landing";

//Auth
export const LANDING = "/";
export const LOGIN = "/login";
export const HOME = "/home";
export const ADMIN = "/adminz";
export const ABOUT = "/about";
export const MY_PROFILE = "/profile/";
export const CONFIRMATION = "/confirmation";
export const CHECKOUT = "/checkout";
export const PRODUCTS = "/products";
export const SERVICES = "/services";
export const APPOINTMENTS = "/appointments";
export const CREATE_APPOINTMENT = "/create_appointment";

export const GIFTS = "/gifts";
export const MEMBERS = "/members";
export const SINGLE_APPOINTMENT = "/appointments/:id";
export const SINGLE_SERVICE = "/services/:id";
export const SINGLE_GIFT = "/gifts/:id";
export const SINGLE_PRODUCT = "/products/:id";
export const SINGLE_PROFILE = "/profile/:id";


//Routes Object
const routes = (
  <div>
    <Switch>
      <Route name="SingleAppointment" path={SINGLE_APPOINTMENT} component={null} />
    </Switch>
  </div>
);

export default routes;
