/* global describe, it, afterEach */

import assert from 'assert'
import urlManager from './urlManager.js'

describe('urlManager', () => {

	describe('stringifyParams', () => {

		it('should work with a mix of null and non-null params', () => {

			const params = {
				one: 'uno',
				dos: 'two',
				three: null,
				four: '',
			}

			assert.equal(urlManager.stringifyParams(params), 'one=uno&dos=two')

		})

	})

	describe('encode', () => {

		it('should only encode ampersands', () => {

			const params = {
				officeName: 'one & two, three - four',
			}

			assert.equal(
				urlManager.office(params),
				'/elections/2016/one %26 two, three - four'
			)

		})

	})

})
