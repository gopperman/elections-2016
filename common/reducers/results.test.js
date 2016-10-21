/* global describe, it, afterEach */

import { expect } from 'chai'
import rootReducer from '../../common/reducers/index.js'
import {
	FETCH_RESULTS_REQUEST,
	// FETCH_RESULTS_SUCCESS,
	// FETCH_RESULTS_FAILURE,
} from '../actions/actionTypes.js'

describe('results reducer', () => {

	describe('FETCH_RESULTS_REQUEST', () => {

		it('should go from initial to request', () => {

			const initialState = {
				isFetching: false,
			}

			const action = {
				type: FETCH_RESULTS_REQUEST,
				url: 'myurl',
			}

			const finalState = {
				results: {
					isFetching: true,
					url: 'myurl',
				},
			}

			expect(rootReducer(initialState, action).results)
				.to.deep.equal(finalState.results)

		})

		it('should go from request to success', () => {
			expect(true).to.deep.equal(false)
		})
		it('should go from request to failure', () => {
			expect(true).to.deep.equal(false)
		})

		it('should go from success to request', () => {
			expect(true).to.deep.equal(false)
		})
		it('should go from success to failure', () => {
			expect(true).to.deep.equal(false)
		})

		it('should go from failure to success', () => {
			expect(true).to.deep.equal(false)
		})
		it('should go from failure to request', () => {
			expect(true).to.deep.equal(false)
		})

	})

})
