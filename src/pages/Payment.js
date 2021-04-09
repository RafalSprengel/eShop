import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

const Payment = () => {

    const [firstNameCardVal, setFirstNameCardVal] = useState('')
    const [lastNameCardVal, setLastNameCardVal] = useState('')
    const [addressLine1CardVal, setAddressLine1CardVal] = useState('')
    const [addressLine2CardVal, setAddressLine2CardVal] = useState('')
    const [errorsObj, setErrorsObj] = useState('')
    const history = useHistory('')

    const valdateNameCard = (nameVal, nameType) => {
        let patt = /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/
        if (!patt.test(nameVal)) {
            setErrorsObj((prev) => ({
                ...prev,
                [nameType]: "Invalid format of " + nameType.split("_", " ") + " or field emty!"
            }))
            return false
        } else {
            setErrorsObj((prev) => ({ ...prev, [nameType]: '' }))
            return true
        }
    };
    const validateAddressLine1CardVal = () => {
        const patt = /^[\w -]{2,}$/
        if (!patt.test(addressLine1CardVal)) {
            setErrorsObj((prev) => ({
                ...prev,
                address1: "Invalid address format or field emty!"
            }))
            return false
        } else {
            setErrorsObj((prev) => ({ ...prev, address1: '' }))
            return true
        }
    }
    const validateAddressLine2CardVal = () => {
        const patt = /^[\w -]*$/
        if (!patt.test(addressLine2CardVal)) {
            setErrorsObj((prev) => ({
                ...prev,
                address2: "Invalid address format!"
            }))
            return false
        } else {
            setErrorsObj((prev) => ({ ...prev, address2: '' }))
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (valdateNameCard(firstNameCardVal, "First_Name") && valdateNameCard(lastNameCardVal, "Last_Name") && validateAddressLine1CardVal() && validateAddressLine2CardVal())
            history.push({ pathname: '/checkout/summary' })
        else return
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='checkout__payment'>
                <TextField
                    value={firstNameCardVal}
                    onChange={(e) => setFirstNameCardVal(e.target.value)}
                    onBlur={() => valdateNameCard(firstNameCardVal, "First_Name")}
                    error={Boolean(errorsObj.First_Name)}
                    helperText={errorsObj.First_Name}
                    name='First_Name'
                    type='text'
                    label="First Name"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                />
                <TextField
                    value={lastNameCardVal}
                    onChange={(e) => setLastNameCardVal(e.target.value)}
                    onBlur={() => valdateNameCard(lastNameCardVal, "Last_Name")}
                    error={Boolean(errorsObj.Last_Name)}
                    helperText={errorsObj.Last_Name}
                    name='Last_Name'
                    type='text'
                    label="Last Name"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                />
                <TextField
                    value={'XXXX XXXX XXXX XXXX'}
                    type='text'
                    label="Card Number"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                    disabled
                />
                <TextField
                    value={'XX'}
                    type='text'
                    label="Expiry Month"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                    disabled
                />
                <TextField
                    value={'XX'}
                    type='text'
                    label="Expiry Year"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                    disabled
                />
                <TextField
                    value={'XXX'}
                    type='text'
                    label="CVV"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                    disabled
                />
                <TextField
                    value={addressLine1CardVal}
                    onChange={(e) => setAddressLine1CardVal(e.target.value)}
                    onBlur={validateAddressLine1CardVal}
                    error={Boolean(errorsObj.address1)}
                    helperText={errorsObj.address1}
                    name='AddressLine1'
                    type='text'
                    label="Address Line 1"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                />
                <TextField
                    value={addressLine2CardVal}
                    onChange={(e) => setAddressLine2CardVal(e.target.value)}
                    onBlur={validateAddressLine2CardVal}
                    error={Boolean(errorsObj.address2)}
                    helperText={errorsObj.address2}
                    name='AddressLine2'
                    type='text'
                    label="Address Line 2"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                />
                <Button
                    type='submit'
                    variant="contained"
                    color="primary"
                    fullWidth
                >Pay Now
                            </Button>

            </form>
        </>
    )
}

export default Payment