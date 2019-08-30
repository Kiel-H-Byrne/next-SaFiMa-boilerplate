import React from 'react'
import { Form, Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'

import {Container, Button, TextField, Typography} from '@material-ui/core';
import purple from "@material-ui/core/colors/blue";
import { withStyles } from "@material-ui/core/styles";

import * as ACTIONS from "./../../Actions/actionConstants";
import ErrorWithDelay from './../HOCs/FormError'
import SMSVerifyForm from './../Login/SMSVerifyForm'

//LOGINFORM DOES WHAT?
//GET REFERRAL #
//LOGIN WITH FIREBASE SMS METHOD
//CREATE USER OBJECT ON NEW AUTH
//PASS REFERRAL # AND OTHER DATA TO NEW USER OBJECT
//REROUTE TO SCHEDULING

//extra: validate mobile# fields, prepend a +1 before sending reCaptcha 

//Styles
const styles = theme => ({
  avatar: {
    backgroundColor: purple[100],
    color: purple[600]
  },
  signInItem: {
    display: "flex",
    justifyContent: "center"
  },
  iconContainer: {
    height: "2em",
    width: "2em"
  },
  itemContainerStyle: {
    width: "100%",
    textAlign: "center"
  },
  itemTextStyles: {
    textAlign: "center",
    paddingRight: "0",
    fontVariant: "small-caps"
  }
});

const MEMBER_NUMBERS = ['2022975503', '1111111111', ];
const ERRORS = {
  INVALID_MEMBER: 'Member not recognized',
  REQUIRED: 'Required',
  INVALID_LENGTH: 'Must be 10 digits',
}


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const normalizePhone = value => {
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, "");
  if (onlyNums.length <= 3) return onlyNums;
  if (onlyNums.length <= 7)
    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 7)}`;
  return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(
    6,
    10
  )}`;
};

const verifyReferral = async values => {
  await sleep(400)
  if (
    !~MEMBER_NUMBERS.indexOf(
      values.referralNum.match(/\d/g).join('')
    )
  ) {
    return { referralNum: ERRORS.INVALID_MEMBER }
  } else {

  }
}

//Event Handlers
const handleClose = () => {
  onClose(selectedValue);
}

const signInFacebook = () => {
  // handleClose()
  dispatch({
    type: ACTIONS.AUTH_SAGA,
    filter: ACTIONS.SIGN_IN_FACEBOOK
  })
}

const signInGoogle = () => {
  // handleClose()
  dispatch({
    type: ACTIONS.AUTH_SAGA,
    filter: ACTIONS.SIGN_IN_GOOGLE
  })
}
// const signInPhone = () => {
//   // handleClose()
//   dispatch({
//     type: ACTIONS.AUTH_SAGA,
//     filter: ACTIONS.SIGN_IN_PHONE,
//     payload: tel
//   })
// }

const TextFieldAdapter = ({ input, meta, ...rest }) => (
  <TextField
    {...input}
    {...rest}
    error={meta.invalid}
  />
)

const LoginForm = props => {
  const dispatch = useDispatch()
  const { classes, open, onClose, selectedValue } = props;
  const captchaConfirm = useSelector( (state) => state.session.captchaConfirm)
  // console.log(captchaConfirm)
  const onSubmit = async values => {
    // dispatch action? 
    // async function?
    // saga?
    //dispatch signin 
    await sleep(300);
    dispatch({
      type: ACTIONS.AUTH_SAGA,
      filter: ACTIONS.VERIFY_SMS,
      payload: values
    })
  }
  const validate = values => {
    const errors = {}
  
      if (!values.referralNum) {
        errors.referralNum = ERRORS.REQUIRED
    } else if (values.referralNum.length < 14) {
        errors.referralNum = ERRORS.INVALID_LENGTH
      }
  
      if (!values.phoneNum) {
        errors.phoneNum = ERRORS.REQUIRED
      } else if (values.phoneNum.length < 14) {
        errors.phoneNum = ERRORS.INVALID_LENGTH
      }
      
      if (Object.keys(errors).length === 0) {
        // if no errors, set store state.forms with values. 
        //dispatch _Update forms with fields as object.
        dispatch({
          type: ACTIONS.UPDATE_FORMS_REDUCER,
          payload: values
        })
      }
      return Object.keys(errors).length ? errors : verifyReferral(values)
  }

    return (
      <div>
      <Container maxWidth="xs">
        <Typography align="center">
          SIGN IN
        </Typography>
        <Form 
        onSubmit={onSubmit}
        validate={validate}
        render={({handleSubmit, pristine, invalid, values,form, submitting, validating}) => (
                <form onSubmit={handleSubmit}>
                    {validating && <span>Spinner...</span>}
                        <Field fullWidth name="referralNum" type="tel" component={TextFieldAdapter} label="Referral #" parse={normalizePhone} placeholder="(999) 999-9999"/>
                        <br />
                        <ErrorWithDelay name="referralNum" delay={1000}>
                          {error => <span>{error}</span>}
                        </ErrorWithDelay>
                        <Field fullWidth name="phoneNum" type="tel" component={TextFieldAdapter} label="Phone"  parse={normalizePhone} placeholder="(999) 999-9999"/>
                        <br />
                        <ErrorWithDelay name="phoneNum" delay={1000}>
                          {error => <span>{error}</span>}
                        </ErrorWithDelay>
                        <br />
                        <Button type="submit" variant="outlined" disabled={pristine|| submitting || invalid } fullWidth >
                            Submit
                        </Button>
                     
                     {/*
                      <List>
                        <ListItem button onClick={() => signInFacebook()}>
                          <ListItemIcon>
                              <img src="/static/img/PNG/facebook.png" alt="facebook" style={{height:"30px"}} />
                          </ListItemIcon>

                          <ListItemText primary="facebook" style={styles.itemTextStyles} />
                        </ListItem>
                        <ListItem button onClick={() => signInGoogle()}>
                          <ListItemIcon className={classes.iconContainer}>
                            <img src="/static/img/PNG/google.png" alt="google" style={{ height: "30px" }} />
                          </ListItemIcon>
                          <ListItemText primary="google" style={styles.itemTextStyles} />
                        </ListItem>
                        </List>
                         */}
                      <div id="recaptcha-container" style={{ height: "30px" }} />
                </form>
        )}
        >
        </Form>
      </Container>
      { captchaConfirm && <SMSVerifyForm /> }
      </div>
    )
}

export default withStyles(styles)(LoginForm)



