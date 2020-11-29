import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from "@material-ui/core/Button";
import SwitchBut from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import '../styles/checkout.scss'
import logo from '../pics/logo.png'
import '../styles/customRadio.scss'
let c = (...l) => console.log(...l)

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

const Stepper = () => {
    return (
        <div className='checkout__stepper'>
            <div className='checkout__stepper__steps'>
                <NavLink className='checkout__stepper__step' to='/checkout/login' activeClassName='checkout__stepper__step--active' >
                    <span className='checkout__stepper__step__number'>1</span>
                    <span className='checkout__stepper__step__text'>Login</span>
                </NavLink>
                <NavLink className='checkout__stepper__step' to='/checkout/address' activeClassName='checkout__stepper__step--active' >
                    <span className='checkout__stepper__step__number'>2</span>
                    <span className='checkout__stepper__step__text'>Delivery Address</span>
                </NavLink>
                <NavLink className='checkout__stepper__step' to='/checkout/payment' activeClassName='checkout__stepper__step--active' >
                    <span className='checkout__stepper__step__number'>3</span>
                    <span className='checkout__stepper__step__text'>Payment Details</span>
                </NavLink>
            </div>
        </div >
    )
}

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('');
    const [showPass, setShowPass] = useState(false)

    const chandleEmail = (e) => {
        const email = e.target.value
        setEmail(email)
    }
    const chandlePass = (e) => {
        const email = e.target.value;
        setPass(email)
    }
    const chandleShowPass = () => {
        setShowPass(!showPass)
    }
    useEffect(()=>{
        const sessionEmailObj  =sessionStorage.getItem("userEmailObj")
            sessionEmailObj && setEmail(sessionStorage.getItem("userEmailObj"))
    },[])

    useEffect(()=>{
        email && sessionStorage.setItem("userEmailObj",email)
    },[email])
    
    return (
        <>
            <div className='checkout__loginForm'>
                <div className='checkout__loginForm__input' >
                    <TextField value={email} onChange={chandleEmail} label="Email" variant="outlined" color='secondary' fullWidth margin='dense' required size='small' />
                </div>
                <div className='checkout__loginForm__input' >
                    <TextField value={pass} onChange={chandlePass} type={showPass ? 'text' : 'password'} label="Password" variant="outlined" color='secondary' fullWidth margin='dense' required />
                </div>
                <span className='fieldRequired'>Field Required</span>
                <div className='checkout__loginForm__switchBut'>
                    <FormControlLabel
                        control={<SwitchBut checked={showPass} onChange={chandleShowPass} />}
                        label="Show password"
                    />
                </div>

                <div className='checkout__loginForm__buttonContinue'>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                    >Continue
                    </Button>
                </div>
            </div>

        </>
    )
}

const AddressForm = () => {

    const [formFieldsObj, setformFieldsObj] = useState({
        firstName: {
            value: ''
        },
        lastName: {
            value: ''
        },
        tel: {
            value: ''
        },
        email: {
            value: ''
        }
    });
    const [postcodeInputValue, setPostcodeInputValue] = useState('')
    const [addressListTab, setAddressListTab] = useState('')
    const [chosenAddress, setChosenAddress] = useState(null)
    const classes = useStyles();
    const handleFieldOnChange = (e) => {
        const { value, name } = e.target;
        setformFieldsObj((prev) => ({ ...prev, [name]: { 'value': value } }))
    }

    const handleFieldOnBlur = (e) => {
        const { value, name } = e.target;
        const fieldsOptions = [{
            'fieldName': 'firstName',
            'regExp': String.raw`^[\wżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$`,
            'message': 'Please use only a-z, 0-1 and _.'
        },
        {
            'fieldName': 'lastName',
            'regExp': String.raw`^[\wżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$`,
            'message': 'Please use only a-z, 0-1 and _.'
        },
        {
            'fieldName': 'email',
            'regExp': String.raw`^\w+(\.\w+)*@\w+(\.\w+)*$`,
            'message': 'Please use valid email address format i.e. (xx@xx.xx)'
        },
        {
            'fieldName': 'tel',
            'regExp': String.raw`^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$`,
            'message': 'Please use valid telephone number format, you can use digits, "(", ")", + and #'
        },
        {
            'fieldName': 'postcode',
            'regExp': String.raw`^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})$`,
            'message': 'Please use valid postcode format'
        }]
        const validation = function () {
            fieldsOptions.forEach((el) => {

                if (el.fieldName === name) {
                    const regExp = new RegExp(el.regExp);

                    if (regExp.test(value)) 
                        setformFieldsObj((prev) => ({ ...prev, [name]: { ...prev[name], 'error': false } }))
                    else {
                        setformFieldsObj((prev) =>
                            ({
                                ...prev,
                                [name]: {
                                    ...prev[name],
                                    'error': true,
                                    'message': el.message
                                }
                            })
                        )
                    }
                }
            })
        }
        validation()
    }
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
    
    return (
        <>
            <form className='checkout__addressForm'>
                <legend>
                    <p className="checkout__addressForm__title">Your details:</p>
                    <p className="checkout__addressForm__desc" >Please fill in your address details below. This information will be used for your delivery and payment</p>
                </legend>
                <p className='fieldRequired'> Field Required</p>
                <TextField
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

                <legend className='checkout__addressForm__title'>Delivery Address:</legend>
                {!chosenAddress &&
                    <div>
                        <legend className='checkout__addressForm__findAddressText'>Find Address by Postcode</legend>

                        <TextField
                            autoComplete='off'
                            onChange={(e) => setPostcodeInputValue(e.target.value)}
                            onBlur={handleFieldOnBlur}
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
                    </div>

                }
                {chosenAddress &&
                    <>
                        <div>
                            <div>{chosenAddress.address.map((el,index) => <p key={index}>{el}</p>)}</div>
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

const Payment = () => {
    return (
        <>
            <div className='checkout__payment'>
                Płatność
            </div>
        </>
    )
}

const Login = ({ name, setName }) => {
    let [checkedRadio, setCheckedRadio] = useState(1);
    (window.location.href.indexOf('/guest')) > 0 ? checkedRadio = 2 : checkedRadio = 1;

    const GuestEmail = ()=>{
        const [emailObj, setEmailObj] =useState({
            value:'',
            errorFlag: false,
            errorMessage: 'Please use valid email address format i.e. (xx@xx.xx)'
        })
        
        const handleOnchangeEmail=(e)=>{
            const value= e.target.value
            setEmailObj((prev)=>({
                ...prev,
                value
        }))
        }

        const validateEmail=(e)=>{
            const regExp = new RegExp('^\\w+(\\.\\w+)*@\\w+(\\.\\w+)*$');
            if(regExp.test(e.target.value)){
                setEmailObj((prev)=>({
                    ...prev,
                    errorFlag: false
                }))
            }
            else {
                setEmailObj((prev)=>({
                    ...prev,
                    errorFlag: true
                }))
            }
        }

        useEffect(()=>{
            const sessionEmailObj  =JSON.parse(sessionStorage.getItem("guestEmailObj"))
            if(sessionEmailObj && sessionEmailObj.value !== '')
                setEmailObj(JSON.parse(sessionStorage.getItem("guestEmailObj")))
        },[])

       /*  useEffect(()=>{
            c('===== to co w use effect ==============')
            console.table(emailObj)
            c('===== koniec tego co w use effect =====')
        }) */

        useEffect(()=>{
            if(emailObj.value!=='')
            sessionStorage.setItem("guestEmailObj", JSON.stringify(emailObj))
        },[emailObj])

        const CustField = (props)=>{
            const [val, setVal]= useState('')
            return(
                <>
                    <TextField
                    type='text'
                    label={props.nazwa}
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    variant="outlined"
                            color='secondary'
                            fullWidth
                            margin='dense'
                    ></TextField>
                </>
            )
        }


        return(
            <>
                        <p className='fieldRequired'>Field required</p>
                        <TextField
                            value={emailObj.value}
                            onChange = {handleOnchangeEmail}
                            onBlur={validateEmail}
                            error={(emailObj.errorFlag ? true : false)}
                            helperText={emailObj.errorFlag ? emailObj.errorMessage: null}
                            name='email'
                            type='text'
                            label='* your email'
                            variant="outlined"
                            color='secondary'
                            fullWidth
                            margin='dense'
                        /*  required={required ? true : false} */
                        />

                            <Link to='/checkout/address' >
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
    return (
        <>
            <div className='checkout__radios'>
                <NavLink onClick={() => setCheckedRadio(1)} to='/checkout/login'>
                    <label className="customRadio__container" >I have an account
                    <input className='customRadio__container__input' type="radio" name="radio" checked={(checkedRadio === 1)} onChange={() => null} />
                        <span className='customRadio__container__checkmark'></span>
                    </label>
                </NavLink>

                <NavLink onClick={() => setCheckedRadio(2)} to='/checkout/login/guest'>
                    <label className="customRadio__container">Continue as a guest
                    <input className='customRadio__container__input' type="radio" name="radio" checked={(checkedRadio === 2)} onChange={() => null} />
                        <span className='customRadio__container__checkmark'></span>
                    </label>
                </NavLink>
            </div>
            <Switch>
                <Route path='/checkout/login' exact render={() => <LoginForm />} />
                <Route path='/checkout/login/guest' render={()=><GuestEmail/>}exact  />
            </Switch>

        </>
    )
}

const Checkout = () => {
    const [name, setName] = useState('');

    return (
        <div className='checkout'>
            <header className='checkout__header'>
                <Link to='/'>
                    <div className='checkout__header__logo'>
                        <img src={logo} alt='logo' className='checkout__header__logo__img' />
                    </div>
                </Link>
                <div className='checkout__header__help-line'>
                    Need help?&nbsp;
                    <span className='checkout__header__help-line__number'>0330 123 3210</span>
                </div>
            </header>
<content>
            <Stepper />

            <div className='checkout__content'>
                <Switch>
                    <Route path='/checkout/login' render={() => <Login name={name} setName={setName} />} />
                    <Route path='/checkout/address' exact render={() => <AddressForm />} />
                    <Route path='/checkout/payment' exact render={() => <Payment />} />
                    <Route render={() => 'Page doesen`t exists(/checkout)'} />
                </Switch>

            </div>
            </content>
            <footer className='checkout__footer'>
                to jest footer
                
            </footer>
        </div>
    )
}

export default Checkout
