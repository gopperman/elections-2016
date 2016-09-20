/* global describe, it, afterEach */

import { expect } from 'chai'
import rootReducer from '../../common/reducers/index.js'
import {
	SELECT_FEATURE,
} from '../actions/actionTypes.js'

describe('selection reducer', () => {

	describe('SELECT_FEATURE', () => {

		it('should clear feature if null', () => {

			const initialState = {
				selection: {},
			}

			const action = {
				type: SELECT_FEATURE,
			}

			const finalState = {
				selection: {
					feature: {
						name: null,
						position: null,
					},
				},
			}

			expect(rootReducer(initialState, action).selection)
				.to.deep.equal(finalState.selection)

		})

		it('should set feature if present', () => {

			const initialState = {
				selection: {},
			}

			const action = {
				type: SELECT_FEATURE,
				feature: 'hello',
				position: [1, 2],
			}

			const finalState = {
				selection: {
					feature: {
						name: 'hello',
						position: [1, 2],
					},
				},
			}

			expect(rootReducer(initialState, action).selection)
				.to.deep.equal(finalState.selection)

		})

	})

})
