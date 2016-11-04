/* global describe, it, afterEach */

import { expect } from 'chai'
import rootReducer from '../../common/reducers/index.js'
import {
	FETCH_RESULTS_REQUEST,
	FETCH_RESULTS_SUCCESS,
	FETCH_RESULTS_FAILURE,
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

			const initialState = {
				results: {
					isFetching: true,
					url: 'myurl',
				},
			}

			const action = {
				type: FETCH_RESULTS_SUCCESS,
				data: {
					key: 'myvalue',
				},
				breakingNews: ['hey'],
			}

			const finalState = {
				results: {
					isFetching: false,
					url: 'myurl',
					data: {
						key: 'myvalue',
					},
					breakingNews: ['hey'],
				},
			}

			expect(rootReducer(initialState, action).results)
				.to.deep.equal(finalState.results)

		})

		it('should go from request to failure', () => {

			const initialState = {
				results: {
					isFetching: true,
					url: 'myurl',
				},
			}

			const action = {
				type: FETCH_RESULTS_FAILURE,
				error: {
					key: 'myerror',
				},
			}

			const finalState = {
				results: {
					isFetching: false,
					url: 'myurl',
					error: {
						key: 'myerror',
					},
				},
			}

			expect(rootReducer(initialState, action).results)
				.to.deep.equal(finalState.results)

		})

		it('should go from success to request', () => {

			const initialState = {
				results: {
					isFetching: false,
					url: 'myurl',
					data: {
						key: 'myvalue',
					},
					breakingNews: ['hey'],
				},
			}

			const action = {
				type: FETCH_RESULTS_REQUEST,
				url: 'anotherurl',
			}

			const finalState = {
				results: {
					isFetching: true,
					url: 'anotherurl',
					data: {
						key: 'myvalue',
					},
					breakingNews: ['hey'],
				},
			}

			expect(rootReducer(initialState, action).results)
				.to.deep.equal(finalState.results)

		})

		it('should go from success to failure', () => {

			const initialState = {
				results: {
					isFetching: false,
					url: 'myurl',
					data: {
						key: 'myvalue',
					},
					breakingNews: ['hey'],
				},
			}

			const action = {
				type: FETCH_RESULTS_FAILURE,
				error: 'myerror',
			}

			const finalState = {
				results: {
					isFetching: false,
					url: 'myurl',
					data: {
						key: 'myvalue',
					},
					breakingNews: ['hey'],
					error: 'myerror',
				},
			}

			expect(rootReducer(initialState, action).results)
				.to.deep.equal(finalState.results)

		})

		it('should go from failure to success', () => {

			const initialState = {
				results: {
					isFetching: false,
					url: 'myurl',
					data: {
						key: 'myvalue',
					},
					breakingNews: ['hey'],
					error: 'myerror',
				},
			}

			const action = {
				type: FETCH_RESULTS_SUCCESS,
				data: {
					my: 'data',
				},
				breakingNews: ['ho'],
			}

			const finalState = {
				results: {
					isFetching: false,
					url: 'myurl',
					data: {
						my: 'data',
					},
					breakingNews: ['ho'],
				},
			}

			expect(rootReducer(initialState, action).results)
				.to.deep.equal(finalState.results)

		})
		it('should go from failure to request', () => {

			const initialState = {
				results: {
					isFetching: false,
					url: 'myurl',
					data: {
						key: 'myvalue',
					},
					error: 'myerror',
					breakingNews: ['hey'],
				},
			}

			const action = {
				type: FETCH_RESULTS_REQUEST,
				url: 'anotherurl',
			}

			const finalState = {
				results: {
					isFetching: true,
					url: 'anotherurl',
					data: {
						key: 'myvalue',
					},
					breakingNews: ['hey'],
				},
			}

			expect(rootReducer(initialState, action).results)
				.to.deep.equal(finalState.results)

		})

	})

})
