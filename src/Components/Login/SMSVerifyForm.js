import Router from 'next/router';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  InputLabel
} from '@material-ui/core';

import * as ACTIONS from './../../Actions/actionConstants';
import * as ROUTE from './../../Routes';
const SMSVerifyForm = () => {
  //Hooks
  const captchaConfirm = useSelector(state => state.session.captchaConfirm);
  const { referralNum, phoneNum } = useSelector(state => state.forms);
  let data = { referralNum, phoneNum };
  const [open, setOpen] = useState(true);
  const [code, setCode] = useState('');

  //Dispatches
  const dispatch = useDispatch();
  const setAuthUser = (captchaConfirm, code, data) =>
    dispatch({
      type: ACTIONS.AUTH_SAGA,
      filter: ACTIONS.SIGN_IN_PHONE,
      payload: { captchaConfirm, code, data },
      dispatch: dispatch
    });
  //Events
  const handleClick = () => {
    // set auth_user with code:, use dispatch
    setAuthUser(captchaConfirm, code, data);
    setOpen(false);
    Router.push(ROUTE.HOME);
  };
  return (
    <Dialog open={open}>
      <DialogTitle id="simple-dialog-title" style={{ textAlign: 'center' }}>
        Enter Code From Text Message
      </DialogTitle>
      <InputLabel required focused>
        Confirmation Code:
        <TextField
          fullWidth
          type="number"
          name="confirmationCode"
          onBlur={e => setCode(e.target.value)}
        />
      </InputLabel>
      <Button variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </Dialog>
  );
};

export default SMSVerifyForm;
