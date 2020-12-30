import { ADDTOBASKET, CHANGEQUANTITY, REMOVEFROMBASKET } from '../actions/appActions'

export const basketReducer = (state = [], action) => {
    switch (action.type) {

        case CHANGEQUANTITY:
            const newState = state.map((el) => {
                if (el.id === action.payload.id)
                    return ({ ...el, quantity: action.payload.newQuantity })
                else return el
            })
            return newState

        case ADDTOBASKET:
            const prodAlrInBask = state.find((el) => el.id === action.payload.id)
            if (prodAlrInBask) {
                let newQuantity = prodAlrInBask.quantity
                    ? parseInt(prodAlrInBask.quantity) + action.payload.quantity
                    : action.payload.quantity;
                return [...state.filter((el) => el.id !== action.payload.id), { ...action.payload, quantity: newQuantity }]
            } else
                return [...state, { ...action.payload }];

        case REMOVEFROMBASKET:
            return [...state.filter((el) => el.id !== action.payload.id)]

        default:
            return state;
    }

}
