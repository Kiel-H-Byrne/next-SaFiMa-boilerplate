import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {TextField, Typography, Divider} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';

import * as ACTIONS from "../../Actions/actionConstants";
import ErrorWithDelay from '../HOCs/FormError'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const TextFieldAdapter = ({ input, meta, ...rest }) => (
  <div><TextField
    {...input}
    {...rest}
    error={meta.invalid}
  />
  <br />
  <ErrorWithDelay name="phoneNum" delay={1000}>
  {error => <span>{error}</span>}
</ErrorWithDelay></div>
)

//appointment form/data will contain cart items + date, appoinmentId, memberId, services, giftItems
//cart items = N number of (service + free gift)
//if not the date, don't offer to buy yet.
//if appointmentDate = Today, checkout.

const AppointmentForm = () => {
  const nextAppointmentDate = useSelector(state => state.users.nextAppointmentDate)
 
  let cart = useSelector(state =>state.users.cart)
  const dispatch = useDispatch()

  const updateUser = date => {
    //get id of service, add this gift object to service object, add full object to cart.
    dispatch({
      type: ACTIONS.UPDATE_USERS_ASPECT,
      aspect: "nextAppointmentDate",
      payload: date
    });
  };

  const handleDateChange = async date => {
    await sleep(300)
    updateUser(date)
    // updatecart with new appointment date one date for all items
    
  }
    return (
        <div>
          {/* <Summation cart={cart}/> */}
            <Typography variant="h4" align="center" gutterBottom>
            Schedule Appointment
            </Typography>
            <Divider variant="fullWidth"/>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                animateYearScrolling
                disablePast
                orientation="landscape"
                margin="normal"
                variant="static"
                label="Select Date"
                value={nextAppointmentDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                style={{margin:"auto"}}
              />
            </MuiPickersUtilsProvider>
        </div>
    )
}

export default AppointmentForm
