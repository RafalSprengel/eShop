import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import SwitchBut from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from "@material-ui/core/Button";

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('');
    const [showPass, setShowPass] = useState(false)

    const toggleShowPass = () => {
        setShowPass(!showPass)
    }
    useEffect(() => {
        const sessionEmailObj = sessionStorage.getItem("userEmailObj")
        sessionEmailObj && setEmail(sessionStorage.getItem("userEmailObj"))
    }, [])

    useEffect(() => {
        email && sessionStorage.setItem("userEmailObj", email)
    }, [email])

    return (
        <>
            <form className='checkout__loginForm'>
                <div className='checkout__loginForm__input' >
                    <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" color='secondary' fullWidth margin='dense' required size='small' />
                </div>
                <div className='checkout__loginForm__input' >
                    <TextField value={pass} onChange={(e) => setPass(e.target.value)} type={showPass ? 'text' : 'password'} label="Password" variant="outlined" color='secondary' fullWidth margin='dense' required />
                </div>
                <span className='fieldRequired'>Field Required</span>
                <div className='checkout__loginForm__switchBut'>
                    <FormControlLabel
                        control={<SwitchBut checked={showPass} onChange={toggleShowPass} />}
                        label="Show password"
                    />
                </div>

                <div className='checkout__loginForm__buttonContinue'>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => alert('Feature available soon... :)')}
                    >Continue
                    </Button>
                </div>
            </form>

        </>
    )
}

export default LoginForm