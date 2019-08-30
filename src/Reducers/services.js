/**


services:[{
    idfasdf-sdf: {name, price, giftVaue, description, }
}],
servicesReceived: 0,
servicesReceivedValue: 0,
selectedService:


**/

//Actions
import * as ACTIONS from "./../Actions/actionConstants";

const INITIAL_STATE = {
    error: null,
    fetching: false,
    savedLocations: [],
    submitting: false,
    success: null,
    services: []
  };
  
  function ServicesReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      //Generic Updates
      case ACTIONS.UPDATE_SERVICES_ASPECT: {
        return { ...state, [`${action.aspect}`]: action.payload };
      }
  
      case ACTIONS.UPDATE_SERVICES_REDUCER: {
        return { ...state, ...action.payload };
      }
  
      //Specific Updates
  
      default:
        return state;
    }
  }
  
  export default ServicesReducer;
   