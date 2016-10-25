/* global describe, it */

import assert from 'assert'
import { readFileSync } from 'jsonfile'
import { getSenateReport } from './dataUtil'

describe('dataUtil', () => {

	describe('getSenateReport', () => {

		it('should work with valid data', () => {

			const report = readFileSync('./data/report-trend-s.json')

			const input = getSenateReport(report)
			const output = [
				{ party: 'dem', won: 13, leading: 0, holdovers: 34 },
				{ party: 'gop', won: 19, leading: 2, holdovers: 30 },
				{ party: 'ind', won: 0, leading: 0, holdovers: 2 },
			]

			assert.deepEqual(input, output)

		})

	})

})
