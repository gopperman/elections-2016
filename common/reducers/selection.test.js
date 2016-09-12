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
				town: null,
			}

			const finalState = {
				selection: {
					town: null,
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
			}

			const finalState = {
				selection: {
					town: 'hello',
				},
			}

			expect(rootReducer(initialState, action).selection)
				.to.deep.equal(finalState.selection)

		})

	})

})
