import { combineReducers } from 'redux'
import network from './network'

export const reducersMap = {
    network,
}

export default combineReducers(reducersMap)
