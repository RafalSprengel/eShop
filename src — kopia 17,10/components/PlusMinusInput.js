import React from 'react';
import "../styles/PlusMinusInput.scss";

const PlusMinusInput = ({ value, setQuantity, variant }) => {
    const chandlePlusMinus = (number) => {
        if (value < 2 && number === -1) return null
        setQuantity(value + number)
    }
    const chandleInput = (event) => {
        if (event.target.value === '') setQuantity(1)
        else if (isNaN(event.target.value) || event.target.value < 0) setQuantity(value)
        else if (event.target.value > 99) setQuantity(parseInt(99))
        else setQuantity(parseInt(event.target.value))
    }
    return (
        <div className={'plusMinusInput ' + (variant && 'plusMinusInput--small')}>
            <div
                className={'plusMinusInput__minus ' + ((value < 2) ? ' plusMinusInput--disabled' : null)}
                onClick={() => chandlePlusMinus(-1)}>-
            </div>
            <input
                className={'plusMinusInput__input ' + (variant && 'plusMinusInput__input--small')}
                value={value}
                onChange={chandleInput}
                onFocus={(e) => e.target.value = ''}
            />
            <div
                className='plusMinusInput__plus'
                onClick={() => chandlePlusMinus(+1)}>+
            </div>
        </div>
    )
}

export default PlusMinusInput