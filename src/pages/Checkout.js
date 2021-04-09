import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import Stepper from '../components/Stepper'
import Login from '../pages/Login'
import DeliveryAddress from './DeliveryAddress'
import Payment from '../pages/Payment'
import Summary from '../pages/Summary'
import logo from '../pics/logo.png'
import Footer from '../layouts/Footer'
import '../styles/checkout.scss'
import '../styles/customRadio.scss'

const Checkout = () => {
    const [name, setName] = useState('');
    const [checkoutObj, setCheckoutData] = useState('')
    const [step, setStep] = useState(2)

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
                <div className='stepper_wrap'>
                    <Stepper />
                </div>
                <div className='checkout__content'>
                    <Switch>
                        <Route path='/checkout/login' render={() => <Login name={name} setName={setName} />} />
                        <Route path='/checkout/delivery-address' exact render={() => <DeliveryAddress />} />
                        <Route path='/checkout/payment-details' exact render={() => <Payment />} />
                        <Route path='/checkout/summary' exact render={() => <Summary />} />
                        <Route render={() => 'Page doesen`t exists(/checkout)'} />
                    </Switch>
                </div>
                <div
                    className='link-style'
                    style={{ marginLeft: '10px' }}
                    onClick={() => window.history.go(-1)}
                >&#8592; Go Back</div>
            </content>
            <Footer />
        </div>
    )
}

export default Checkout
