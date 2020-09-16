import React from 'react';
import Divider from '@material-ui/core/Divider';
import '../styles/Basket.css'
import PlusMinusInput from '../components/PlusMinusInput';



const SingleProduct = ({ currProdObj, removeFromBasket, chanProdQuantInBask }) => {

    const setQuantity = (newQuantity) => chanProdQuantInBask(currProdObj, newQuantity)

    return (
        < div key={currProdObj.title} className='product-in-basket'>
            <ul>
                <li><img src={currProdObj.image} alt='pic' /></li>
                <li>
                    <p>{currProdObj.title}</p>
                    <p>Product code: {currProdObj.id}</p>
                </li>
            </ul>
            <PlusMinusInput value={currProdObj.quantity} getCurrValue={setQuantity} />
            <p>{currProdObj.quantity && `Quantity: ${currProdObj.quantity}`}</p>
            <button onClick={() => removeFromBasket(currProdObj)}>Romove</button>
            <Divider />
        </div>
    )

}
const Basket = ({ basket, setBasket, chanProdQuantInBask }) => {

    const removeFromBasket = (currProdObj) => {
        const updatedBasket = basket.filter((el) => el.id !== currProdObj.id)
        setBasket(updatedBasket)
    }

    return (
        <div id='basket-wrap'>
            <div id="basket-header">
                <p id='basket-back-link' >Continue shopping</p>
                <h2>Your basket</h2>
                <h4>({basket.length} products)</h4>
                <Divider />
                <div id='basket-products-list'>
                    {basket.map((currProdObj) =>
                        <SingleProduct
                            key={currProdObj.id}
                            currProdObj={currProdObj}
                            removeFromBasket={() => removeFromBasket(currProdObj)}
                            chanProdQuantInBask={chanProdQuantInBask}
                        />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Basket