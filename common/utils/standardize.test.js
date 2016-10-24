/* global describe, it */

import assert from 'assert'
import { percentForDisplay, standardizeParty } from './standardize.js'

describe('standardize', () => {

	describe('party', () => {

		it('should work', () => {

			assert.equal(standardizeParty('Dem'), 'dem')
			assert.equal(standardizeParty('Gop'), 'gop')
			assert.equal(standardizeParty('Yes'), 'yes')
			assert.equal(standardizeParty('No'), 'no')
			assert.equal(standardizeParty('asdf'), 'ind')

		})

	})

	describe('percentForDisplay', () => {

		it('should work', () => {

			assert.equal(percentForDisplay(0), '0')
			assert.equal(percentForDisplay(1), '100')
			assert.equal(percentForDisplay(0.123), '12.3')
			assert.equal(percentForDisplay(0.123, true), '12')

		})

	})

})
