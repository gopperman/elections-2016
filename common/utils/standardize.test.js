/* global describe, it */

import assert from 'assert'
import {
	percentForDisplay,
	normalizeParty,
	standardizeParty,
	orderParties,
	toTitleCase,
} from './standardize.js'

describe('standardize', () => {

	describe('toTitleCase', () => {

		it('should work', () => {

			assert.equal(toTitleCase('one two'), 'One Two')

		})

	})

	describe('orderParties', () => {

		it('should work', () => {

			assert.deepEqual(
				orderParties(['gop', 'OTH', 'DEM']),
				['DEM', 'gop', 'OTH']
			)

		})

	})

	describe('normalizeParty', () => {

		it('should work', () => {

			assert.deepEqual(
				['Dem', 'Gop', 'Yes', 'No', 'asdf'].map(normalizeParty),
				['dem', 'gop', 'yes', 'no', 'ind']
			)

		})

	})

	describe('standardizeParty', () => {

		it('should work', () => {

			assert.deepEqual(
				['dem', 'gop', 'yes', 'no', 'ind'].map(standardizeParty),
				['Dem', 'GOP', 'Yes', 'No', 'Ind']
			)

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
