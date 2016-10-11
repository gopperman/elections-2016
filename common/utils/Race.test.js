/* global describe, it, afterEach */

import assert from 'assert'
import { getName } from './Race.js'

describe('Race', () => {

	describe('getName', () => {

		it('should work', () => {

			assert.equal(getName({
				statePostal: 'NH',
				officeName: 'Governor',
			}), 'NH Governor')

		})

	})

})
