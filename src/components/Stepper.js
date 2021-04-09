import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/stepper.scss'

const Step = ({ index, el }) => {
    return (
        <NavLink
            onClick={(e) => e.preventDefault()}
            className='stepper__step' to={`/checkout/${el.toLowerCase().replace(' ', '-')}`}
            activeClassName='stepper__step--active'
        >
            <span className='stepper__step__number'>{(index + 1)}</span>
            <span className='stepper__step__text'>{el}</span>
        </NavLink>
    )
}

const Stepper = () => {

    return (
        <div className='stepper'>
            <div className='stepper__steps'>
                {['Login', 'Delivery Address', 'Payment Details'].map((el, index) => <Step key={index} index={index} el={el} />)}
            </div>
        </div >
    )
}

export default Stepper