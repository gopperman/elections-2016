/* global describe, it */

import assert from 'assert'
import { readFileSync } from 'jsonfile'
import { percentForDisplay, formatStateAsReportingUnit }
	from './standardize.js'

const input = readFileSync('./data/president-us-states.json')
const output = readFileSync('./data/president-us-state-as-ru.json')

describe('standardize', () => {

	describe('formatStateAsReportingUnit', () => {

		it('should work', () => {

			const state = input.PresStateByStatetable.State[0]
			const expected = formatStateAsReportingUnit(state)
			assert.deepStrictEqual(output, expected)

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
