import { combineReducers } from 'redux'
import timer from './timer.js'
import results from './results.js'

export default combineReducers({
	timer,
	results,
})
