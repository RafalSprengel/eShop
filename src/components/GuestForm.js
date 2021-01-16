import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const GuestForm = () => {
    const history = useHistory()

    const [firstNameVal, setFirstNameVal] = useState('')
    const [surnameVal, setSurnameVal] = useState('')
    const [emailVal, setEmailVal] = useState('')
    const [mobilePhoneVal, setMobilePhoneVal] = useState('')
    const [homePhoneVal, setHomePhoneVal] = useState('')
    const [errorsObj, setErrorsObj] = useState('')

    const valdateName = (nameVal, nameType) => {
        let patt = /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/
        if (!patt.test(nameVal)) {
            setErrorsObj((prev) => ({
                ...prev,
                [nameType]: "Invalid format of " + nameType.replace('_', ' ') + " or field emty!"
            }))
            return false
        } else {
            setErrorsObj((prev) => ({ ...prev, [nameType]: '' }))
            return true
        }
    };

    const validateEmail = () => {
        const patt = new RegExp('^\\w+(\\.\\w+)*@\\w+(\\.\\w+)*$');
        if (!patt.test(emailVal)) {
            setErrorsObj((prev) => ({
                ...prev,
                email: 'Please use valid email address format i.e. (xx@xx.xx)'
            }))
            return false
        } else {
            setErrorsObj((prev) => ({ ...prev, email: '' }))
            return true
        }
    }

    const validateMobilePhone = () => {
        //const patt = /((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/
        const patt = /[0-9]+/ // <== just for testing purpose
        if (!patt.test(mobilePhoneVal)) {
            setErrorsObj((prev) => ({
                ...prev,
                mobilePhone: 'invalid mobile phone format!'
            }))
            return false
        } else {
            setErrorsObj((prev) => ({ ...prev, mobilePhone: '' }))
            return true
        }
    }

    const validateHomePhone = () => {
        //const patt = /^((\(?0\d{4}\)?\s?\d{3}\s?\d{3})|(\(?0\d{3}\)?\s?\d{3}\s?\d{4})|(\(?0\d{2}\)?\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/
        const patt = /[0-9]+/ // <== just for testing purpose
        if (!patt.test(homePhoneVal)) {
            setErrorsObj((prev) => ({
                ...prev,
                homePhone: 'invalid home phone format! please use valid format i.e 01222 555 555 | (010) 55555555 #2222 | 0122 555 5555#222'
            }))
        } else setErrorsObj((prev) => ({ ...prev, homePhone: '' }))
    }

    const handleSubmit = (e) => {

        e.preventDefault()

        if (valdateName(firstNameVal, 'first_name') && valdateName(surnameVal, 'surname') && validateEmail() && validateMobilePhone())
            history.push({ pathname: '/checkout/delivery-address' })
        else return

    }

    useEffect(() => {
        if (firstNameVal || surnameVal || emailVal || mobilePhoneVal || homePhoneVal) {
            const formGuestDetails = { firstNameVal, surnameVal, emailVal, mobilePhoneVal, homePhoneVal }
            localStorage.setItem("formGuestDetails", JSON.stringify(formGuestDetails))
        }
    }, [firstNameVal, surnameVal, emailVal, mobilePhoneVal, homePhoneVal])

    useEffect(() => {
        const formGuestDetails = JSON.parse(localStorage.getItem("formGuestDetails"))
        if (formGuestDetails) {
            setFirstNameVal(formGuestDetails.firstNameVal)
            setSurnameVal(formGuestDetails.surnameVal)
            setEmailVal(formGuestDetails.emailVal)
            setMobilePhoneVal(formGuestDetails.mobilePhoneVal)
            setHomePhoneVal(formGuestDetails.homePhoneVal)
        }
    }, [])
    return (
        <>
            <form onSubmit={handleSubmit}>
                <p className='fieldRequired'>Field required</p>
                <TextField
                    value={firstNameVal}
                    onChange={(e) => setFirstNameVal(e.target.value)}
                    onBlur={() => valdateName(firstNameVal, 'first_name')}
                    name='firstName'
                    type='text'
                    label="First name *"
                    helperText={errorsObj.first_name}
                    error={Boolean(errorsObj.first_name)}
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                />

                <TextField
                    value={surnameVal}
                    onChange={(e) => setSurnameVal(e.target.value)}
                    onBlur={() => valdateName(surnameVal, 'surname')}
                    helperText={errorsObj.surname}
                    error={Boolean(errorsObj.surname)}
                    name='surname'
                    type='text'
                    label="Surname *"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                />

                <TextField
                    value={emailVal}
                    onChange={(e) => setEmailVal(e.target.value)}
                    onBlur={validateEmail}
                    helperText={errorsObj.email}
                    error={Boolean(errorsObj.email)}
                    name='email'
                    type='text'
                    label='Your email *'
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                />

                <TextField
                    value={mobilePhoneVal}
                    onChange={(e) => setMobilePhoneVal(e.target.value)}
                    onBlur={() => validateMobilePhone()}
                    helperText={errorsObj.mobilePhone}
                    error={Boolean(errorsObj.mobilePhone)}
                    name='mobilePhone'
                    type='text'
                    label="Mobile Phone *"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                />

                <TextField
                    value={homePhoneVal}
                    onChange={(e) => setHomePhoneVal(e.target.value)}
                    onBlur={validateHomePhone}
                    helperText={errorsObj.homePhone}
                    error={Boolean(errorsObj.homePhone)}
                    name='homePhone'
                    type='text'
                    label="Home Phone"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                />

                <div className='buttContainter'>
                    <Button
                        type='submit'
                        //onClick={getAddress}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >Continue
                    </Button>
                </div>
            </form>
        </>
    )
}

export default GuestForm