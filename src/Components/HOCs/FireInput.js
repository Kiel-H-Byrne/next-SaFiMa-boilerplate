import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Input } from '@material-ui/core';

import * as ACTIONS from './../../Actions/actionConstants'
import {updateUser} from './../../DB/rtdb'
    //input name field, onChange, update state with name,
    //onBlur, add email to userfield in rtdb.

const FireInput = ({aspect}) => {
    const [value, setValue] = useState("")
    const authUser = useSelector(state => state.session.authUser)

    const dispatch = useDispatch();
    const updateUserInfo = (data) => {
        dispatch({
        type: ACTIONS.UPDATE_USERS_ASPECT,
        aspect: aspect,
        payload: data
        })
        updateUser(authUser.uid, aspect, data);
    }
    return (
        <div>
            <Input placeholder="ph?" name={aspect} value={value} type="text" onChange={(e) => setValue(e.target.value)} 
            onBlur={(e)=>updateUserInfo(e.target.value)} 
            />
        </div>
    )
}

export default FireInput
