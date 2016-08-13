/* global describe, it, afterEach */

import { expect } from 'chai'
import rootReducer from '../../common/reducers/index.js'
import {
	START_TIMER,
} from '../actions/actionTypes.js'

describe('timer', () => {

	describe('START_TIMER', () => {

		it('should start the timer', () => {

			const initialState = {}

			const now = new Date().getTime()

			const action = {
				type: START_TIMER,
				now,
			}

			const finalState = {
				timer: {
					startedAt: now,
				},
			}

			expect(rootReducer(initialState, action))
				.to.deep.equal(finalState)

		})

	})

})
