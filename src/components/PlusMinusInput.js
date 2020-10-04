import React from 'react';
import "../styles/PlusMinusInput.scss";

const PlusMinusInput = ({ value, getCurrValue, variant }) => {
    const chandlePlusMinus = (number) => {
        if (value < 2 && number === -1) return null
        getCurrValue(value + number)
    }
    const chandleInput = (event) => {
        if (event.target.value === '') getCurrValue(1)
        else if (isNaN(event.target.value) || event.target.value < 0) getCurrValue(value)
        else if (event.target.value > 99) getCurrValue(parseInt(99))
        else getCurrValue(parseInt(event.target.value))
    }

    let className = (variant === 'small') ? 'plusMinusInput plusMinusInput--small' : 'plusMinusInput'
    return (
        <div className={className}>
            <div className='plusMinusInput__minus' onClick={() => chandlePlusMinus(-1)}>-</div>
            <input className='quantity' value={value} onChange={chandleInput} onFocus={(e) => e.target.value = ''} />
            <div className='plusMinusInput__plus' onClick={() => chandlePlusMinus(+1)}>+</div>
        </div>
    )
}

export default PlusMinusInput