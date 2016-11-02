/* global describe, it */

import assert from 'assert'
import { readFileSync } from 'jsonfile'
import { getSenateReport } from './dataUtil'

describe('dataUtil', () => {

	describe('getSenateReport', () => {

		it('should work with null data', () => {

			assert.deepEqual(getSenateReport(null), [])

		})

		it('should work with empty data', () => {

			assert.deepEqual(getSenateReport([]), [])

		})

		it('should work with valid data', () => {

			const reports = readFileSync('./data/report-trend-s.json')

			const input = getSenateReport(reports)

			const output = {
				dem: { won: 13, leading: 0, holdovers: 34 },
				gop: { won: 19, leading: 2, holdovers: 30 },
				ind: { won: 0, leading: 0, holdovers: 2 },
			}

			assert.deepEqual(input, output)

		})

	})

})
