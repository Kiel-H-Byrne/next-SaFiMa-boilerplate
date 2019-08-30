//Actions
import * as ACTIONS from "./../Actions/actionConstants";
import { createReducer } from "redux-starter-kit";
import * as MODELS from './../DB/models'
const colorBlindnessVariants = [
  {
    type: "protan",
    label: `Protan is a type of red-green color blindness.
    A deficiency in the long photoreceptor cells ('L' Cones) is responsible for a decreased sensitivity towards the color red.
    Protanomaly is classified as a mild decreased sensitivity to red, while Protanopia is the inability to perceive the color red altogether.
    Reds tend to appear less saturated and darker, while oranges, yellows, and greens may be perceived as similar. 
    `,
    color: "#F57B6C"
  },
  {
    type: "deutan",
    label: `Deutan, like Protan, is a type of red-green color blindness affecting medium photoreceptor cells ('M' Cones).
    A person with Deuteranomaly or Deuteranopia has a similar difficulty interpreting the color green.
    This reduced sensitivity to green may make reds, oranges, and yellows appear similar.
    `,
    color: "#5FC395"
  },
  {
    type: "tritan",
    label: `Tritan is a type of autosomal blue-yellow color blindness. 
  People with Tritonomaly and Tritanopia have a deficiency in the short photoreceptor cells ('S' Cones), and have difficulty differentiating the colors blue and green.
  While blue and yellow tend not to be mixed, the color violet may appear similar to yellow. 
  `,
    color: "#5B88C3"
  },
  {
    type: "achroma",
    label: `Achromatopsia is an autosomal deficiency that results in total color blindness and decreased visual acuity.
  In addition to the hue of a color being difficult to interpret, people with achromatopsia may have increased light sensitivity.
  `,
    color: "#707A7C"
  }
];

const themes = [
  { label: "darkPurple", color: "#8884d8" },
  { label: "lightPurple", color: "#83a6ed" },
  { label: "lightBlue", color: "#8dd1e1" },
  { label: "darkGreen", color: "#82ca9d" },
  { label: "lightGreen", color: "#a4de6c" },
  { label: "orange", color: "#ffc658" }
];
// APPOINTMENTS COLLECTION 
// PURCHASES COLLECTION 

// eslint-disable-next-line
const INITIAL_STATE = {
  appointmentsScheduled: 0,
  socialAvatar: "", 
  birthdate: null,
  nextAppointmentDate: new Date(),
  appointmentTotal: 0,
  cart: {
    // "empty": true
  //   "randoString": {
  //   giftValue: "30",
  //   serviceDescription: "Learn about CBD and the pros/cons of it's effects and usages. Free gift with purchase.",
  //   serviceDuration: "45",
  //   serviceImageUrl: "https://picsum.photos/100",
  //   serviceName: "Information Session",
  //   servicePrice: "30",
  //   _id: "2o1JOTIEksZoXkPDzdV9",
  // }
},
  fetchingUser: false,
  didFetchUser: false,
  email: "",
  fetchUserError: "",
  schedulingAppointment: false,
  fullname: "",
  isVIP: false,
  isBanned: false,
  membership: "basic",
  lastPurchase: {},
  lastAppointment: {},
  mode: "light",
  phoneNumber: "",
  referallNumber: "",
  profileData: { birthdate: null, displayName: "", contactEmail: "", avatar: "" },
  favoriteGifts: [], 
  favoriteServices: [],
  status: "",
  tags: [],
  theme: { label: "default", color: "#ffffff" },
  uid: ""
};

const UsersReducer = createReducer(INITIAL_STATE, {
  [ACTIONS.UPDATE_USERS_ASPECT]: (state, action) => {
    state[`${action.aspect}`] = action.payload;
  },

  [ACTIONS.UPDATE_USERS_REDUCER]: (state, action) => {
    return { ...state, ...action.payload };
  },

  [ACTIONS.UPDATE_CART]: (state, action) => {
    state.cart = action.payload
  },

  [ACTIONS.UPDATE_MY_APPOINTMENTS]: (state, action) => {
    state.appointments.myAppointments[action.payload.appointmentId].meta = { ...action.payload };
  }
});

export default UsersReducer;
