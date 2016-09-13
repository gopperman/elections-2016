/* global describe, it, afterEach */

import { expect } from 'chai'
import rootReducer from '../../common/reducers/index.js'
import {
	SELECT_TOWN,
} from '../actions/actionTypes.js'

describe('selection reducer', () => {

	describe('SELECT_TOWN', () => {

		it('should clear town if null', () => {

			const initialState = {
				selection: {},
			}

			const action = {
				type: SELECT_TOWN,
			}

			const finalState = {
				selection: {
					town: {
						name: null,
						position: null,
					},
				},
			}

			expect(rootReducer(initialState, action).selection)
				.to.deep.equal(finalState.selection)

		})

		it('should set town if present', () => {

			const initialState = {
				selection: {},
			}

			const action = {
				type: SELECT_TOWN,
				town: 'hello',
				position: [1, 2],
			}

			const finalState = {
				selection: {
					town: {
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
