/* global describe, it, afterEach */

import { expect } from 'chai'
import rootReducer from '../../common/reducers/index.js'
import {
	START_TIMER,
	STOP_TIMER,
	CANCEL_TIMER,
} from '../actions/actionTypes.js'

import Timer from './../components/Timer.js'

const { CANCELED, RUNNING, STOPPED } = Timer.status

describe('timer reducer', () => {

	describe('START_TIMER', () => {

		it('should take the timer from canceled to running', () => {

			const initialState = {
				timer: {
					status: CANCELED,
				},
			}

			const action = {
				type: START_TIMER,
				now: 1,
			}

			const finalState = {
				timer: {
					status: RUNNING,
					startedAt: 1,
				},
			}

			expect(rootReducer(initialState, action).timer)
				.to.deep.equal(finalState.timer)

		})

		it('should take the timer from stopped to running', () => {

			const initialState = {
				timer: {
					status: STOPPED,
				},
			}

			const action = {
				type: START_TIMER,
				now: 3,
			}

			const finalState = {
				timer: {
					status: RUNNING,
					startedAt: 3,
				},
			}

			expect(rootReducer(initialState, action).timer)
				.to.deep.equal(finalState.timer)

		})

	})

	describe('STOP_TIMER', () => {

		it('should take the timer from running to stopped', () => {

			const initialState = {
				timer: {
					status: RUNNING,
				},
			}

			const action = {
				type: STOP_TIMER,
			}

			const finalState = {
				timer: {
					status: STOPPED,
				},
			}

			expect(rootReducer(initialState, action).timer)
				.to.deep.equal(finalState.timer)

		})

	})

	describe('CANCEL_TIMER', () => {

		it('should take the timer from stopped to canceled', () => {

			const initialState = {
				timer: {
					status: STOPPED,
				},
			}

			const action = {
				type: CANCEL_TIMER,
			}

			const finalState = {
				timer: {
					status: CANCELED,
				},
			}

			expect(rootReducer(initialState, action).timer)
				.to.deep.equal(finalState.timer)

		})

	})

})
