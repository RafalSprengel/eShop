import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom'

const GuestForm = () => {
    const [emailObj, setEmailObj] = useState({
        value: '',
        errorFlag: false,
        errorMessage: 'Please use valid email address format i.e. (xx@xx.xx)'
    })

    const handleOnchangeEmail = (e) => {
        const value = e.target.value
        setEmailObj((prev) => ({
            ...prev,
            value
        }))
    }

    const validateEmail = (e) => {
        const regExp = new RegExp('^\\w+(\\.\\w+)*@\\w+(\\.\\w+)*$');
        if (regExp.test(e.target.value)) {
            setEmailObj((prev) => ({
                ...prev,
                errorFlag: false
            }))
        }
        else {
            setEmailObj((prev) => ({
                ...prev,
                errorFlag: true
            }))
        }
    }

    useEffect(() => {
        const sessionEmailObj = JSON.parse(sessionStorage.getItem("guestEmailObj"))
        if (sessionEmailObj && sessionEmailObj.value !== '')
            setEmailObj(JSON.parse(sessionStorage.getItem("guestEmailObj")))
    }, [])

    useEffect(() => {
        if (emailObj.value !== '')
            sessionStorage.setItem("guestEmailObj", JSON.stringify(emailObj))
    }, [emailObj])

    return (
        <>{/* <p>nasz przesłany parametr to : {location.state.naszParametr}</p> */}
            <p className='fieldRequired'>Field required</p>
            <TextField
                value={emailObj.value}
                onChange={handleOnchangeEmail}
                onBlur={validateEmail}
                error={(emailObj.errorFlag ? true : false)}
                helperText={emailObj.errorFlag ? emailObj.errorMessage : null}
                name='email'
                type='text'
                label='* your email'
                variant="outlined"
                color='secondary'
                fullWidth
                margin='dense'
            /*  required={required ? true : false} */
            />

            <Link to='/checkout/delivery-address' >
                <div className='buttContainter'>
                    <Button
                        //onClick={getAddress}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >Continue
                            </Button>
                </div>
            </Link>
        </>
    )
}

export default GuestForm