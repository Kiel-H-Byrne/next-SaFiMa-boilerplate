import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Card, Typography } from '@material-ui/core';

import OrderItem from "./../Checkout/OrderItem";

const AppointmentCard = ({_id, date, giftItems, memberId, appointment}) => {
    // state
    const [refData, setRefData] = useState([{}])

    //selectors
    //state.appointments.fetchedAppointments = []
    //fill this array with MyAppointments. fetchedAppointments[23pjf2f3] = {}
    //dispatches
    //get the one appointment using ID, 
    //get each reference called from appointment and add it to the appointment store
    const dispatch = useDispatch()
    const getAppointment = (auid) => dispatch({
        action: ACTIONS.APPOINTMENTS_SAGA,
        aspect: 'getAppointment'
    })
    
    return (
        <Card>
            <Typography>{Date(date)}</Typography>
            {/* 
            appointment.cartItems.map((item, idx) => {
                return (
                <OrderItem
                    key={`${item._id}-${idx}`}
                    service={item}
                />
                );
            }) 
            */}
        </Card>
    )
}

export default AppointmentCard
