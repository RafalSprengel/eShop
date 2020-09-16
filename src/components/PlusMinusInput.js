import React from 'react';

const PlusMinusInput = ({ value, getCurrValue }) => {
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

    return (
        <div className='basket-quantity'>
            <div className='minus' onClick={() => chandlePlusMinus(-1)}>-</div>
            <input className='quantity' value={value} onChange={chandleInput} onFocus={(e) => e.target.value = ''} />
            <div className='plus' onClick={() => chandlePlusMinus(+1)}>+</div>
        </div>
    )
}

export default PlusMinusInput