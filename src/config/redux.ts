import { createStore, compose, applyMiddleware, StoreEnhancer } from 'redux'

import rootReducer from '../redux/reducers'
import apiMiddleware from '../middlewares/client/global/api'
import { RESTORE_LOCAL_STORAGE_KEY } from './constants'

const isDev = process.env.NODE_ENV !== 'production'

declare const window: Window & {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): StoreEnhancer
}

const composeEnhancers =
    (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const middlewares = [apiMiddleware]

if (isDev) {
    middlewares.push(require('redux-freeze'))
}

const savedState = localStorage.getItem(RESTORE_LOCAL_STORAGE_KEY)

const store = createStore(
    rootReducer,
    savedState && isDev ? JSON.parse(savedState) : undefined,
    // @ts-ignore
    composeEnhancers(applyMiddleware(...middlewares))
)

export default store
