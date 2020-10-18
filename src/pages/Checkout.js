import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'
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
                <NavLink className='checkout__stepper__step' to='/checkout/delivery' activeClassName='checkout__stepper__step--active' >
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

const Login = () => {
    const [active, setActive] = useState(1);
    return (
        <>
            <div className='checkout__radios'>
                <NavLink onClick={() => setActive(1)} to='/checkout/login'>
                    <label className="customRadio__container" >I have an account
                    <input className='customRadio__container__input' type="radio" name="radio" checked={(active === 1)} />
                        <span className='customRadio__container__checkmark'></span>
                    </label>
                </NavLink>

                <NavLink onClick={() => setActive(2)} to='/checkout/login/guest'>
                    <label className="customRadio__container">Continue as a guest
                    <input className='customRadio__container__input' type="radio" name="radio" checked={(active === 2)} />
                        <span className='customRadio__container__checkmark'></span>
                    </label>
                </NavLink>
            </div>
            <Switch>
                <Route path='/checkout/login' exact render={() => 'formularz logowania'} />
                <Route path='/checkout/login/guest' exact render={() => 'formularz dla gościa'} />
            </Switch>

        </>
    )
}

const Checkout = () => {

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
                    <Route path='/checkout/login' render={() => <Login />} />
                    <Route path='/checkout/delivery' exact render={() => 'dostawa'} />
                    <Route path='/checkout/payment' exact render={() => 'płatność'} />
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
