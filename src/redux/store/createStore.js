import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../reducers'

export default (initialState, options) => createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware))
