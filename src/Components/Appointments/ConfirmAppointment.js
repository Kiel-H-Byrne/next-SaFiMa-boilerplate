import React from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import StripeElement from './../Payment/StripeElement';
import { Typography } from '@material-ui/core';

const ConfirmAppointment = () => {
  const nextAppointmentDate = useSelector(
    state => state.users.nextAppointmentDate
  );

  return (
    <div>
      <Typography variant="h4" align="center">
        {format(nextAppointmentDate, 'MMM do, yyyy')}
      </Typography>

      <StripeElement />
    </div>
  );
};

export default ConfirmAppointment;
