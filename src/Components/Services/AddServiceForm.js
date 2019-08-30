import React from 'react'
import { Form, Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'

import {Container, Button, TextField, Typography, LinearProgress} from '@material-ui/core';
import * as ACTIONS from "../../Actions/actionConstants";
import ErrorWithDelay from '../HOCs/FormError'

const ERRORS = {
    INVALID_MEMBER: 'Member not recognized',
    REQUIRED: 'Required',
    INVALID_LENGTH: 'Must be 10 digits',
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const validate = () => {}

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

const AddServiceForm = () => {
    const dispatch = useDispatch()
    const onSubmit = async values => {
      await sleep(300)
      console.log(values)
      dispatch({
        type: ACTIONS.SERVICES_SAGA,
        aspect: "submitService",
        payload: values
      })
    }
    return (
        <div>
            <Typography variant="h4">
            Create Service
            </Typography>
            <Form 
                onSubmit={onSubmit}
                validate={validate}
                render={({handleSubmit, pristine, invalid, values,form, submitting, validating}) => (
                <form onSubmit={handleSubmit}>
                    {validating && <LinearProgress />}

                        <Field fullWidth name="serviceName" type="text" component={TextFieldAdapter} label="Name" />
                        <Field fullWidth name="serviceDescription" type="text" component={TextFieldAdapter} label="Description" />
                        <Field fullWidth name="serviceDuration" type="num" component={TextFieldAdapter} label="Duration" />
                        <Field fullWidth name="giftValue" type="num" component={TextFieldAdapter} label="Gift Value" />
                        <Field fullWidth name="servicePrice" type="num" component={TextFieldAdapter} label="Price" />
                        <Button type="submit" variant="outlined" disabled={submitting || invalid } fullWidth >
                            Submit
                        </Button>
                </form>
        )}
        />
        </div>
    )
}

export default AddServiceForm
