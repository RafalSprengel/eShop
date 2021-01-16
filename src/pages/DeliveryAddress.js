import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflow: 'auto',
        maxHeight: 300,
    },
    listItem: {
        backgroundColor: 'whitesmoke',
        border: '2px solid white',
        cursor: 'pointer'
    }
}));

const DeliveryAddress = () => {
    const [address1Val, setAddress1Val] = useState('')
    const [address2Val, setAddress2Val] = useState('')
    const [cityVal, setCityVal] = useState('')
    const [postcodeVal, setPostcodeVal] = useState('')
    const [addressListTab, setAddressListTab] = useState('')
    const [chosenAddress, setChosenAddress] = useState(false)
    const [addressManually, setAddressManually] = useState(false)
    const [errorsObj, setErrorsObj] = useState('')
    const classes = useStyles();

    const getAddress = () => {
        console.log('wykonuje get address')
        if (postcodeVal.length < 4) return () => null
        const URL = "https://api.addressian.co.uk/v2/autocomplete/" + postcodeVal;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'x-api-key': 'yBdiABu5565T4HMJUVLiKaTa3HyV6Xsp7CVBzjeA'
            },

        }
        fetch(URL, options)
            .then((response) => {
                if (response.ok) return response;
                else throw Error(response.statusText);
            })
            .then((response) => response.json())
            .then((response) => {
                let sorted = response.sort((a, b) => a.buildingnumber - b.buildingnumber);
                setAddressListTab(sorted)
            })
            .catch((errors) => console.log(errors));
    }

    const validateAddress1 = () => {
        const patt = /^[\w ]{2,}$/
        if (!patt.test(address1Val)) {
            setErrorsObj((prev) => ({
                ...prev,
                address1Val: "Invalid address format or field emty!"
            }))
            return false
        } else {
            setErrorsObj((prev) => ({ ...prev, address1Val: '' }))
            return true
        }
    }

    const validateAddress2 = () => {
        const patt = /^[\w ]{2,}$/
        if (!patt.test(address2Val)) {
            setErrorsObj((prev) => ({
                ...prev,
                address2Val: "Invalid address format or field emty!"
            }))
            return false
        } else {
            setErrorsObj((prev) => ({ ...prev, address2Val: '' }))
            return true
        }
    }

    /*  const handleSubmit = (e) => {
         e.preventDefault()
         if (valdateName(firstNameVal, 'first_name') && valdateName(surnameVal, 'surname') && validateEmail() && validateMobilePhone())
             history.push({ pathname: '/checkout/delivery-address' })
         else return
 
     } */

    useEffect(() => {
        if (address1Val || address2Val || cityVal || postcodeVal) {
            const deliveryAddressDetails = { address1Val, address2Val, cityVal, postcodeVal }
            localStorage.setItem("deliveryAddressDetails", JSON.stringify(deliveryAddressDetails))
        }
    }, [address1Val, address2Val, cityVal, postcodeVal])

    useEffect(() => {
        const deliveryAddressDetails = JSON.parse(localStorage.getItem("deliveryAddressDetails"))
        if (deliveryAddressDetails) {
            setAddress1Val(deliveryAddressDetails.address1Val)
            setAddress2Val(deliveryAddressDetails.address2Val)
            setCityVal(deliveryAddressDetails.postcodeVal)
            setPostcodeVal(deliveryAddressDetails.postcodeVal)
        }
    }, [])

    return (
        <>
            <form className='checkout__addressForm'>
                <legend className='checkout__addressForm__title'>Delivery Address:</legend>
                {!chosenAddress && !addressManually &&
                    <>
                        <p className='fieldRequired'> Field Required</p>
                        <div>
                            <legend className='checkout__addressForm__findAddressText'>Find Address by Postcode</legend>

                            <TextField
                                autoComplete='off'
                                onChange={(e) => setPostcodeVal(e.target.value)}
                                //onBlur={handleFieldOnBlur}
                                helperText={null}
                                error={null}
                                value={postcodeVal}
                                name='postcode'
                                type='text'
                                label="Postcode"
                                variant="outlined"
                                color='secondary'
                                fullWidth
                                margin='dense'
                                required />

                            <div className='checkout__addressForm__findPostcodeButton'>
                                <Button
                                    onClick={getAddress}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                >Find Address
                                </Button>
                            </div>
                            {addressListTab && //addressListTab
                                <List className={classes.root}>
                                    {addressListTab.map((el, index) => (
                                        <ListItem
                                            key={index}
                                            onClick={() => {
                                                setChosenAddress(el)
                                                localStorage.setItem("chosenAddress", JSON.stringify(el));
                                            }}
                                            className={classes.listItem}>
                                            {el.postcode}, {el.address.join(', ')}
                                        </ListItem>))}
                                </List>
                            }
                            <div className='link-style' onClick={() => setAddressManually(true)}>Edit address manually</div>
                        </div>
                    </>
                }
                {chosenAddress && !addressManually &&
                    <>
                        <div>
                            <div>{chosenAddress.address.map((el, index) => <p key={index}>{el}</p>)}</div>
                            <div>{chosenAddress.city}</div>
                            <div>{chosenAddress.postcode}</div>
                        </div>
                        <p className='checkout__addressForm__changeAddress' onClick={() => { setChosenAddress(null); localStorage.removeItem("chosenAddress") }}>Remove Address</p>
                    </>
                }
                {addressManually &&
                    <>
                        <TextField
                            value={address1Val}
                            onChange={(e) => setAddress1Val(e.target.value)}
                            onBlur={validateAddress1}
                            error={Boolean(errorsObj.address1Val)}
                            helperText={errorsObj.address1Val}
                            name='address1'
                            type='text'
                            label="Address Line 1"
                            variant="outlined"
                            color='secondary'
                            fullWidth
                            margin='dense'
                            required />
                        <TextField
                            value={address2Val}
                            onChange={(e) => setAddress2Val(e.target.value)}
                            error={Boolean(errorsObj.address2Val)}
                            helperText={errorsObj.address2Val}
                            name='address2'
                            type='text'
                            label="Address Line 2"
                            variant="outlined"
                            color='secondary'
                            fullWidth
                            margin='dense'
                            required />
                        <TextField
                            value={cityVal}
                            onChange={(e) => setCityVal(e.target.value)}
                            name='city'
                            type='text'
                            label="Town/City"
                            variant="outlined"
                            color='secondary'
                            fullWidth
                            margin='dense' />
                        <TextField
                            value={postcodeVal}
                            onChange={(e) => setPostcodeVal(e.target.value)}
                            name='postcode'
                            type='text'
                            label="Postcode"
                            variant="outlined"
                            color='secondary'
                            fullWidth
                            margin='dense' />
                        <div className='link-style' onClick={() => setAddressManually(false)}>Use address Finder</div>
                    </>
                }

                <div >
                    <Link to='/checkout/payment' >
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                        >Continue
                            </Button>
                    </Link>
                </div>
            </form>
        </>
    )
}

export default DeliveryAddress