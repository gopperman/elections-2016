/* global describe, it */

import assert from 'assert'
import {
	percentForDisplay,
	normalizeParty,
	standardizeParty,
	orderParties,
	raceName,
} from './standardize.js'

describe('standardize', () => {

	describe('raceName', () => {

		it('should work with general races', () => {

			assert.equal(raceName({
				statePostal: 'MA',
				officeName: 'Question',
				seatName: '4 - Legalize Marijuana',
			}), 'MA Question 4 - Legalize Marijuana')

		})

		it('should work with ballot questions', () => {

			assert.equal(raceName({
				statePostal: 'MA',
				officeName: 'President',
			}), 'MA President')

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
