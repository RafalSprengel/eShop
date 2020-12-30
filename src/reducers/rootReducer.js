import { combineReducers } from 'redux'
import { basketReducer } from './basketReducer.js'

export const rootReducer = combineReducers(
    {
        basket: basketReducer
    }
)