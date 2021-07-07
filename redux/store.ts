import { createStore, compose, applyMiddleware, StoreEnhancer } from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducers'
import apiMiddleware from '../middlewares/api'
import { RESTORE_LOCAL_STORAGE_KEY } from '../config/constants'

const isDev = process.env.NODE_ENV !== 'production'
let composeEnhancers
if (process.browser) {
    //@ts-ignore
    declare const window: Window & {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): StoreEnhancer
    }

    composeEnhancers =
        (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
} else {
    composeEnhancers = compose
}
const middlewares = [apiMiddleware]

if (isDev) {
    middlewares.push(require('redux-freeze'))
    middlewares.push(logger)
}
let store = createStore(
    rootReducer,
    // @ts-ignore
    composeEnhancers(applyMiddleware(...middlewares))
)
if (process.browser) {
    const savedState = localStorage.getItem(RESTORE_LOCAL_STORAGE_KEY)
    store = createStore(
        rootReducer,
        savedState && isDev ? JSON.parse(savedState) : undefined,
        // @ts-ignore
        composeEnhancers(applyMiddleware(...middlewares))
    )
}
export default store
