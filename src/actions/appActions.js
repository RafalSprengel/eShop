export const ADDTOBASKET = 'ADDTOBASKET'
export const CHANGEQUANTITY = 'CHANGEQUANTITY'
export const REMOVEFROMBASKET = 'REMOVEFROMBASKET'
export const ADDNEWUSER = 'ADDNEWUSER'

export const changeQuantity = (id, newQuantity) => ({
    type: CHANGEQUANTITY,
    payload: {
        id,
        newQuantity
    }
})

export const addToBasketAction = (obj) => ({
    type: ADDTOBASKET,
    payload: { ...obj },
})

export const removeFromBasket = (id) => ({
    type: REMOVEFROMBASKET,
    payload: {
        id
    }
})

export const addNewUser = (obj) => ({
    type: ADDNEWUSER,
    payload: {
        ...obj
    }
})

