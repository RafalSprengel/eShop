import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

    const [formFieldsObj, setformFieldsObj] = useState('');
    const [postcodeInputValue, setPostcodeInputValue] = useState('')
    const [addressListTab, setAddressListTab] = useState('')
    const [chosenAddress, setChosenAddress] = useState(null)
    const classes = useStyles();
    /*  const handleFieldOnChange = (e) => {
         const { value, name } = e.target;
         setformFieldsObj((prev) => ({ ...prev, [name]: { 'value': value } }))
     } */


    useEffect(() => { //Reading from session Storage
        if (sessionStorage.getItem("checkoutFormData"))
            setformFieldsObj(JSON.parse(sessionStorage.getItem("checkoutFormData")))

        if (sessionStorage.getItem("chosenAddress"))
            setChosenAddress(JSON.parse(sessionStorage.getItem("chosenAddress")))
    }, [])

    useEffect(() => { //Save to sessionStorage
        if (formFieldsObj !== '' && JSON.stringify(formFieldsObj) !== sessionStorage.getItem("checkoutFormData"))
            sessionStorage.setItem("checkoutFormData", JSON.stringify(formFieldsObj));
    }, [formFieldsObj])

    const getAddress = () => {
        console.log('wykonuje get address')
        if (postcodeInputValue.length < 4) return () => null
        const URL = "https://api.addressian.co.uk/v2/autocomplete/" + postcodeInputValue;
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

    const CustomField = ({ formFieldsObj, label, regExp }) => {
        const fieldName = label.replace(' ', '_')
        const [fieldObj, setFieldObj] = useState({
            value: ''
        })

        const handleFieldOnChangeField = (e) => {
            const value = e.target.value;
            setFieldObj((prev) => ({ ...prev, value }))
        }

        const handleFieldOnBlur = (e) => {
            const value = e.target.value

            const validation = function () {
                const regEx = new RegExp(regExp);
                if (regEx.test(value))
                    setFieldObj((prev) => ({ ...prev, 'error': false }))
                else {
                    setFieldObj((prev) => ({ ...prev, 'error': true }))
                }
            }
            validation()
        }

        useEffect(() => { //Load data from sessionStorage
            const localStorageObj = JSON.parse(sessionStorage.getItem("checkoutFormData"))
            if (localStorageObj && localStorageObj[fieldName] !== undefined && localStorageObj[fieldName] !== '') {
                setFieldObj((prev) => ({ ...prev, value: localStorageObj[fieldName].value }))
            }
        }, [])

        return (
            <TextField
                value={fieldObj.value}
                onChange={handleFieldOnChangeField}
                onBlur={handleFieldOnBlur}
                error={formFieldsObj.firstName ? formFieldsObj.firstName.error : false}
                name='firstName'
                type='text'
                label="First name"
                helperText={formFieldsObj.firstName ? formFieldsObj.firstName.message : null}
                variant="outlined"
                color='secondary'
                fullWidth
                margin='dense'
                required />
        )
    }

    return (
        <>
            <form className='checkout__addressForm'>
                <legend>
                    <p className="checkout__addressForm__title">Your details:</p>
                    <p className="checkout__addressForm__desc" >Please fill in your address details below. This information will be used for your delivery and payment</p>
                </legend>
                <p className='fieldRequired'> Field Required</p>
                <CustomField
                    formFieldsObj={formFieldsObj}
                    regExp={String.raw`^[\wżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$`}
                    // handleFieldOnBlur={handleFieldOnBlur}
                    label='First Name'
                />
                {/*  <TextField
                    value={formFieldsObj.firstName.value}
                    onChange={handleFieldOnChange}
                    onBlur={handleFieldOnBlur}
                    error={formFieldsObj.firstName ? formFieldsObj.firstName.error : false}
                    name='firstName'
                    type='text'
                    label="First name"
                    helperText={formFieldsObj.firstName ? formFieldsObj.firstName.message : null}
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                    required />
                <TextField
                    value={formFieldsObj.lastName.value}
                    onChange={handleFieldOnChange}
                    onBlur={handleFieldOnBlur}
                    error={formFieldsObj.lastName ? formFieldsObj.lastName.error : false}
                    helperText={formFieldsObj.lastName ? formFieldsObj.lastName.message : null}
                    name='lastName'
                    type='text'
                    label="Last name"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                    required />
                <TextField
                    value={formFieldsObj.email.value}
                    onChange={handleFieldOnChange}
                    onBlur={handleFieldOnBlur}
                    helperText={formFieldsObj.email ? formFieldsObj.email.message : ''}
                    error={formFieldsObj.email ? formFieldsObj.email.error : false}
                    name='email'
                    type='text'
                    label="Email"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                    required />
                <TextField
                    value={formFieldsObj.tel.value}
                    onChange={handleFieldOnChange}
                    onBlur={handleFieldOnBlur}
                    helperText={formFieldsObj.tel ? formFieldsObj.tel.message : ''}
                    error={formFieldsObj.tel ? formFieldsObj.tel.error : false}
                    name='tel'
                    type='text'
                    label="Telephone"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense' />
 */}
                <legend className='checkout__addressForm__title'>Delivery Address:</legend>
                {!chosenAddress &&
                    <div>
                        <legend className='checkout__addressForm__findAddressText'>Find Address by Postcode</legend>

                        <TextField
                            autoComplete='off'
                            onChange={(e) => setPostcodeInputValue(e.target.value)}
                            //onBlur={handleFieldOnBlur}
                            helperText={formFieldsObj.postcode ? formFieldsObj.postcode.message : ''}
                            error={formFieldsObj.postcode ? formFieldsObj.postcode.error : false}
                            value={postcodeInputValue}
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
                                            sessionStorage.setItem("chosenAddress", JSON.stringify(el));
                                        }}
                                        className={classes.listItem}>
                                        {el.postcode}, {el.address.join(', ')}
                                    </ListItem>))}
                            </List>
                        }
                        <div>Edit address manually</div>
                    </div>

                }
                {chosenAddress &&
                    <>
                        <div>
                            <div>{chosenAddress.address.map((el, index) => <p key={index}>{el}</p>)}</div>
                            <div>{chosenAddress.city}</div>
                            <div>{chosenAddress.postcode}</div>
                        </div>
                        <p className='checkout__addressForm__removeAddress' onClick={() => { setChosenAddress(null); sessionStorage.removeItem("chosenAddress") }}>Remove Address</p>
                    </>

                }

                {/* <TextField
                    value={formFieldsObj.city ? formFieldsObj.city.value : ''}
                    onChange={handleFieldOnChange}
                    name='city'
                    type='text'
                    label="City"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                    required />
                <TextField
                    value={formFieldsObj.firstLineAddress ? formFieldsObj.firstLineAddress.value : ''}
                    onChange={handleFieldOnChange}
                    name='firstLineAddress'
                    type='text'
                    label="Frst line address"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                    required />
                <TextField
                    value={formFieldsObj.secLineAddress ? formFieldsObj.secLineAddress.value : ''}
                    onChange={handleFieldOnChange}
                    name='secLineAddress'
                    type='text'
                    label="Second line address"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense' />
                <TextField
                    value={formFieldsObj.thirdLineAddress ? formFieldsObj.thirdLineAddress.value : ''}
                    onChange={handleFieldOnChange}
                    name='thirdLineAddress'
                    type='text'
                    label="Third line address"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense' /> */}
            </form>
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
        </>
    )
}

export default DeliveryAddress