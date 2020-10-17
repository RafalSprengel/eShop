import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../styles/checkoutLogin.scss'
import logo from '../pics/logo.png'
import { render } from 'node-sass';

const Stepper = () => {
    render(
        <>
        </>
    )
}

const CheckoutLogin = () => {

    return (
        <>
            <header className='checkoutLogin__header'>
                <Link to='/'>
                    <div className='checkoutLogin__header__logo'>
                        <img src={logo} alt='logo' className='checkoutLogin__header__logo__img' />
                    </div>
                </Link>
                <div className='checkoutLogin__header__help-line'>
                    Need help?&nbsp;
                    <span className='checkoutLogin__header__help-line__number'>0330 123 3210</span>
                </div>
            </header>

            <div className='checkoutLogin__content'>
                <div className='checkoutLogin__stepper'>
                    <div className='checkoutLogin__stepper__steps'>
                        <div className='checkoutLogin__stepper__step'>
                            <span className='checkoutLogin__stepper__step__number'>1</span>
                            <span className='checkoutLogin__stepper__step__text'>login</span>
                        </div>
                        <div className='checkoutLogin__stepper__step checkoutLogin__stepper__step--active'>
                            <span className='checkoutLogin__stepper__step__number'>2</span>
                            <span className='checkoutLogin__stepper__step__text'>Delivery Address</span>
                        </div>
                        <div className='checkoutLogin__stepper__step'>
                            <span className='checkoutLogin__stepper__step__number'>3</span>
                            <span className='checkoutLogin__stepper__step__text'>Payment Details</span>
                        </div>
                    </div>
                </div>
            </div>

            <content>
                <Switch>
                    <Route path='/basket' exact render={() => 'jesteś w basket'} />
                    <Route path='/basket/login' exact render={() => 'login'} />
                    <Route path='/basket/delivery' exact render={() => 'dostawa'} />
                    <Route path='/basket/payment' exact render={() => 'płatność'} />
                    <Route render={() => 'Page doesen`t exists (/basket)'} />
                </Switch>

            </content>

            <footer className='checkoutLogin__footer'>
                to jest footer
            </footer>

        </>
    )
}

export default CheckoutLogin
