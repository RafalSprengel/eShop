import React, { useState } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import GuestForm from '../components/GuestForm'

const Login = ({ name, setName, location }) => {
    let [checkedRadio, setCheckedRadio] = useState(1);
    (window.location.href.indexOf('/guest')) > 0 ? checkedRadio = 2 : checkedRadio = 1;

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
                <Route path='/checkout/login/guest' render={() => <GuestForm />} exact />
            </Switch>

        </>
    )
}

export default Login