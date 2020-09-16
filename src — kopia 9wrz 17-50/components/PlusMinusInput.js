import React from 'react';

const PlusMinusInput = ({ quantity, setQuantity }) => {
    const chandlePlusMinus = (number) => {
        if (quantity < 2 && number === -1) return null
        setQuantity((prevAmount) => prevAmount + number)
    }
    const chandleInput = (event) => {
        if (event.target.value === '') {
            setQuantity(0);
            return null
        }

        if (isNaN(event.target.value || EventTarget.target.value < 0)) return null
        if (event.target.value > 99) {
            setQuantity(parseInt(99));
            return null
        }
        setQuantity(parseInt(event.target.value))
    }

    return (
        <div className='basket-quantity'>
            <div className='minus' onClick={null} onClick={() => chandlePlusMinus(-1)}>-</div>
            <input className='quantity' value={quantity} onChange={chandleInput} onFocus={(e) => e.target.value = ''} />
            <div className='plus' onClick={() => chandlePlusMinus(+1)}>+</div>
        </div>
    )
}

export default PlusMinusInput