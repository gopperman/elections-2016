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

})
