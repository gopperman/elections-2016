/* global describe, it, afterEach */

import { expect } from 'chai'
import rootReducer from '../../common/reducers/index.js'
import {
	START_TIMER,
	STOP_TIMER,
	CANCEL_TIMER,
} from '../actions/actionTypes.js'

describe('timer', () => {

	describe('START_TIMER', () => {

		it('should take the timer from canceled to running', () => {

			const initialState = {
				timer: {
					status: 'canceled',
				},
			}

			const action = {
				type: START_TIMER,
			}

			const finalState = {
				results: {},
				timer: {
					status: 'running',
				},
			}

			expect(rootReducer(initialState, action))
				.to.deep.equal(finalState)

		})

		it('should take the timer from stopped to running', () => {

			const initialState = {
				timer: {
					status: 'stopped',
				},
			}

			const action = {
				type: START_TIMER,
			}

			const finalState = {
				results: {},
				timer: {
					status: 'running',
				},
			}

			expect(rootReducer(initialState, action))
				.to.deep.equal(finalState)

		})

	})

	describe('STOP_TIMER', () => {

		it('should take the timer from running to stopped', () => {

			const initialState = {
				timer: {
					status: 'running',
				},
			}

			const action = {
				type: STOP_TIMER,
			}

			const finalState = {
				results: {},
				timer: {
					status: 'stopped',
				},
			}

			expect(rootReducer(initialState, action))
				.to.deep.equal(finalState)

		})

	})

	describe('CANCEL_TIMER', () => {

		it('should take the timer from stopped to canceled', () => {

			const initialState = {
				timer: {
					status: 'stopped',
				},
			}

			const action = {
				type: CANCEL_TIMER,
			}

			const finalState = {
				results: {},
				timer: {
					status: 'canceled',
				},
			}

			expect(rootReducer(initialState, action))
				.to.deep.equal(finalState)

		})

	})

})
