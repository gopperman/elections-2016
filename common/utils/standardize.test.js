/* global describe, it */

import assert from 'assert'
import { readFileSync } from 'jsonfile'
import {
	percentForDisplay,
	formatStateAsReportingUnit,
	formatElectoralSummary }
from './standardize.js'

describe('standardize', () => {

	describe('formatElectoralSummary', () => {

		const input = readFileSync('./data/president-us.json')
		const output = readFileSync('./data/president-us-formatted.json')

		it('should work', () => {

			assert.deepStrictEqual(
				formatElectoralSummary(input.Sumtable),
				output.Sumtable,
			)

		})

	})

	describe('formatStateAsReportingUnit', () => {

		const input = readFileSync('./data/president-us-states.json')
		const output = readFileSync('./data/president-us-state-as-ru.json')

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
