import { combineReducers } from 'redux'
import timer from './timer.js'
import results from './results.js'
import selection from './selection.js'

export default combineReducers({
	timer,
	results,
	selection,
})
