import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Route, Switch, Link, NavLink } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const Login = ({ name, setName, location }) => {
    let [checkedRadio, setCheckedRadio] = useState(1);
    (window.location.href.indexOf('/guest')) > 0 ? checkedRadio = 2 : checkedRadio = 1;

    const GuestEmail = () => {
        const [emailObj, setEmailObj] = useState({
            value: '',
            errorFlag: false,
            errorMessage: 'Please use valid email address format i.e. (xx@xx.xx)'
        })

        const handleOnchangeEmail = (e) => {
            const value = e.target.value
            setEmailObj((prev) => ({
                ...prev,
                value
            }))
        }

        const validateEmail = (e) => {
            const regExp = new RegExp('^\\w+(\\.\\w+)*@\\w+(\\.\\w+)*$');
            if (regExp.test(e.target.value)) {
                setEmailObj((prev) => ({
                    ...prev,
                    errorFlag: false
                }))
            }
            else {
                setEmailObj((prev) => ({
                    ...prev,
                    errorFlag: true
                }))
            }
        }

        useEffect(() => {
            const sessionEmailObj = JSON.parse(sessionStorage.getItem("guestEmailObj"))
            if (sessionEmailObj && sessionEmailObj.value !== '')
                setEmailObj(JSON.parse(sessionStorage.getItem("guestEmailObj")))
        }, [])

        useEffect(() => {
            if (emailObj.value !== '')
                sessionStorage.setItem("guestEmailObj", JSON.stringify(emailObj))
        }, [emailObj])

        return (
            <>{/* <p>nasz przesłany parametr to : {location.state.naszParametr}</p> */}
                <p className='fieldRequired'>Field required</p>
                <TextField
                    value={emailObj.value}
                    onChange={handleOnchangeEmail}
                    onBlur={validateEmail}
                    error={(emailObj.errorFlag ? true : false)}
                    helperText={emailObj.errorFlag ? emailObj.errorMessage : null}
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
                <Route path='/checkout/login/guest' render={() => <GuestEmail />} exact />
            </Switch>

        </>
    )
}

export default Login