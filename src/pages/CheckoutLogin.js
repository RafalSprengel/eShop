import React from 'react';
import '../styles/checkoutLogin.scss'
import logo from '../pics/logo.png'

const CheckoutLogin = () => {

    return (
        <>
            <header className='checkoutLogin__header'>
                <div className='checkoutLogin__header__logo'>
                    <img src={logo} alt='logo' className='checkoutLogin__header__logo__img' />
                </div>
                <div className='checkoutLogin__header__help-line'>
                    Need help?&nbsp;
                    <span className='checkoutLogin__header__help-line__number'>0330 123 3210</span>
                </div>
            </header>

            <content className='checkoutLogin__content'>
                <div className='checkoutLogin__stepper'>
                    <div className='checkoutLogin__stepper__steps'>
                        <div classname='checkoutLogin__stepper__step'>
                            <span className='checkoutLogin__stepper__step__number'>1</span>
                            <span className='checkoutLogin__stepper__step__text'>login</span>
                        </div>
                        <div className='checkoutLogin__stepper__step checkoutLogin__stepper__step--active'>
                            <span className='checkoutLogin__stepper__step__number'>2</span>
                            <span className='checkoutLogin__stepper__step__text'>Delivery Address</span>
                        </div>
                        <div classname='checkoutLogin__stepper__step'>
                            <span className='checkoutLogin__stepper__step__number'>3</span>
                            <span className='checkoutLogin__stepper__step__text'>Payment Details</span>
                        </div>
                    </div>
                </div>
            </content>

            <footer className='checkoutLogin__footer'>
                to jest footer
            </footer>

        </>
    )
}

export default CheckoutLogin
