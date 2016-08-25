/* global describe, it, afterEach */

import { expect } from 'chai'
import rootReducer from '../../common/reducers/index.js'
import {
	START_TIMER,
	STOP_TIMER,
} from '../actions/actionTypes.js'

describe('timer', () => {

	describe('STOP_TIMER', () => {

		it('should stop the timer', () => {

			const initialState = {
				timer: {
					startedAt: 123,
				},
			}

			const action = {
				type: STOP_TIMER,
			}

			const finalState = {
				results: {},
				timer: {
					startedAt: null,
				},
			}

			expect(rootReducer(initialState, action))
				.to.deep.equal(finalState)

		})
	})

	describe('START_TIMER', () => {

		it('should start the timer', () => {

			const initialState = {}

			const now = new Date().getTime()

			const action = {
				type: START_TIMER,
				now,
			}

			const finalState = {
				results: {},
				timer: {
					startedAt: now,
				},
			}

			expect(rootReducer(initialState, action))
				.to.deep.equal(finalState)

		})

	})

})
