/* global describe, it, afterEach */

import { expect } from 'chai'
import rootReducer from '../../common/reducers/index.js'
import {
	SELECT_TOWN,
} from '../actions/actionTypes.js'

describe('selection reducer', () => {

	describe('SELECT_TOWN', () => {

		it('should set town', () => {

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
