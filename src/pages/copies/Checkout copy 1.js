import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import SwitchBut from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import '../styles/checkout.scss'
import logo from '../pics/logo.png'
import '../styles/customRadio.scss'
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
        const email = e.target.value;
        setEmail(email)
    }
    const chandlePass = (e) => {
        const email = e.target.value;
        setPass(email)
    }
    const chandleShowPass = () => {
        setShowPass(!showPass)
    }
    return (
        <>
            <div className='checkout__loginForm'>
                <div className='checkout__loginForm__input' >
                    <TextField value={email} onChange={chandleEmail} label="Email" variant="outlined" color='secondary' fullWidth margin='dense' required size='small' />
                </div>
                <div className='checkout__loginForm__input' >
                    <TextField value={pass} onChange={chandlePass} type={showPass ? 'text' : 'password'} label="Password" variant="outlined" color='secondary' fullWidth margin='dense' required />
                </div>
                <span className='checkout__loginForm__fieldRequired'>* Field Required</span>
                <div className='checkout__loginForm__switchBut'>
                    <FormControlLabel
                        control={<SwitchBut checked={showPass} onChange={chandleShowPass} />}
                        label="Show password"
                    />
                </div>

                <div className='checkout__loginForm__button-continue'>
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

    const [formFields, setFormFields] = useState('');

    const handleField = (e) => {
        const { value, name } = e.target;
        setFormFields((prev) => ({ ...prev, [name]: value }))
    }

    useEffect( //Reading from session Storage
        () => {
            if (formFields === '' && sessionStorage.getItem("checkoutFormData"))
                setFormFields(JSON.parse(sessionStorage.getItem("checkoutFormData")))
        }, [])

    useEffect(() => { //Save to sessionStorage
        if (formFields !== '' && JSON.stringify(formFields) !== sessionStorage.getItem("checkoutFormData"))
            sessionStorage.setItem("checkoutFormData", JSON.stringify(formFields));
    }, [formFields])

    const SingleInput = ({ val, onChangeF, name, label, required }) => {
        return (
            <TextField
                value={val}
                onChange={onChangeF}
                name={name}
                type='text'
                label={label}
                variant="outlined"
                color='secondary'
                fullWidth
                margin='dense'
                required={required ? true : false}
            />
        )
    }

    useEffect(() => console.log('renderuje'))
    const [test, setTest] = useState('')

    const Test = () => {
        const handleTest = (e) => {
            console.log('hhh');
            setTest(e.target.value)
        }
        return (
            <>
                <input key='random1' placeholder='wyrenderowany test' onChange={handleTest} value={test}></input>
            </>
        )
    }
    const [test2, setTest2] = useState('')
    const Test2 = ({ val, setTest2 }) => {
        return (
            <> <input key='raz' placeholder='Test2 z komponentu ' alue={val} onChange={(e) => setTest2(e.target.value)} /> </>
        )
    }
    return (
        <> <p><Test2 val={test2} setTest2={setTest2} /></p>
            <Test key='random1' />
            <form className='checkout__addressForm'>
                {[
                    {
                        label: 'First name',
                        name: 'firstName',
                        val: formFields.firstName ? formFields.firstName : '',
                        onChangeF: handleField,
                        required: true
                    }

                ].map((el, i) => <SingleInput key={`ren${i + 1}`} val={el.val} onChangeF={el.onChangeF} name={el.name} label={el.label} required={el.required} kay={el.key} />)
                }
                <TextField
                    value={formFields.firstName ? formFields.firstName : ''}
                    onChange={handleField}
                    name='firstName'
                    type='text'
                    label="First name"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                    required />
                <TextField
                    value={formFields.lastName ? formFields.lastName : ''}
                    onChange={handleField}
                    name='lastName'
                    type='text'
                    label="Last name"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                    required />
                <TextField
                    value={formFields.email ? formFields.email : ''}
                    onChange={handleField}
                    name='email'
                    type='text'
                    label="Email"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                    required />
                <TextField
                    value={formFields.tel ? formFields.tel : ''}
                    onChange={handleField}
                    name='tel'
                    type='text'
                    label="Telephone"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense' />
                <TextField
                    value={formFields.postcode ? formFields.postcode : ''}
                    onChange={handleField}
                    name='postcode'
                    type='text'
                    label="Postcode"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                    required />
                <TextField
                    value={formFields.city ? formFields.city : ''}
                    onChange={handleField}
                    name='city'
                    type='text'
                    label="City"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                    required />
                <TextField
                    value={formFields.firstLineAddress ? formFields.firstLineAddress : ''}
                    onChange={handleField}
                    name='firstLineAddress'
                    type='text'
                    label="Frst line address"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense'
                    required />
                <TextField
                    value={formFields.secLineAddress ? formFields.secLineAddress : ''}
                    onChange={handleField}
                    name='secLineAddress'
                    type='text'
                    label="Second line address"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense' />
                <TextField
                    value={formFields.thirdLineAddress ? formFields.thirdLineAddress : ''}
                    onChange={handleField}
                    name='thirdLineAddress'
                    type='text'
                    label="Third line address"
                    variant="outlined"
                    color='secondary'
                    fullWidth
                    margin='dense' />
                <span>* Field Required</span>
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
    let [checked, setChecked] = useState(1);
    (window.location.href.indexOf('/guest')) > 0 ? checked = 2 : checked = 1;
    return (
        <>
            <div className='checkout__radios'>
                <NavLink onClick={() => setChecked(1)} to='/checkout/login'>
                    <label className="customRadio__container" >I have an account
                    <input className='customRadio__container__input' type="radio" name="radio" checked={(checked === 1)} onChange={() => null} />
                        <span className='customRadio__container__checkmark'></span>
                    </label>
                </NavLink>

                <NavLink onClick={() => setChecked(2)} to='/checkout/login/guest'>
                    <label className="customRadio__container">Continue as a guest
                    <input className='customRadio__container__input' type="radio" name="radio" checked={(checked === 2)} onChange={() => null} />
                        <span className='customRadio__container__checkmark'></span>
                    </label>
                </NavLink>
            </div>
            <Switch>
                <Route path='/checkout/login' exact render={() => <LoginForm />} />
                <Route path='/checkout/login/guest' exact render={() =>
                    <><input type='text' placeholder='your email'></input>
                        <p>
                            <Link to='/checkout/address' >
                                <button>Continue</button>
                            </Link>
                        </p>
                    </>} />
            </Switch>

        </>
    )
}

const Checkout = () => {
    const [name, setName] = useState('');

    return (
        <>
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

            <Stepper />

            <content>
                <Switch>
                    <Route path='/checkout/login' render={() => <Login name={name} setName={setName} />} />
                    <Route path='/checkout/address' exact render={() => <AddressForm />} />
                    <Route path='/checkout/payment' exact render={() => <Payment />} />
                    <Route render={() => 'Page doesen`t exists (/checkout)'} />
                </Switch>

            </content>

            <footer className='checkout__footer'>
                to jest footer
            </footer>

        </>
    )
}

export default Checkout
