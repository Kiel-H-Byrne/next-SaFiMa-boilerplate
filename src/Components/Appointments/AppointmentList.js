import React from 'react';
import { useSelector } from 'react-redux';

import { Typography, LinearProgress } from '@material-ui/core';
import Router from "next/router";

import * as ACTIONS from './../../Actions/actionConstants'
import AppointmentCard from '../Appointments/AppointmentCard.js'

const style = {
    headline: {margin: 'auto'}
}
const AppointmentList = ({appointments}) => {
    //selectors
    const authUser = useSelector(state => state.session.authUser);
    appointments = Object.values(appointments)
    return (
        <div>
        <Typography variant="h2" style={style.headline}>
            List of Appointments
        </Typography> 
        {
            appointments.map((item, idx) => (
            <AppointmentCard {...item}  key={item._id}/>
        ))
        }

        </div>
    )
}

export default AppointmentList
