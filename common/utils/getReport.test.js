/* global describe, it */

import assert from 'assert'
import { readFileSync } from 'jsonfile'
import getReports from './getReport.js'

describe('getReport', () => {

	it('should work with empty data', () => {

		assert.deepEqual(getReports(), {})

	})

	it('should work with valid data', () => {

		const reports = readFileSync('./data/reports.json')

		const input = getReports(reports)

		const output = {
			S: {
				dem: { won: 10, leading: 0, holdovers: 34 },
				gop: { won: 23, leading: 1, holdovers: 30 },
				ind: { won: 0, leading: 0, holdovers: 2 },
			},
			H: {
				dem: { won: 192, leading: 1, holdovers: 0 },
				gop: { won: 238, leading: 1, holdovers: 0 },
				ind: { won: 3, leading: 0, holdovers: 0 },
			},
			G: {
				dem: { won: 7, leading: 0, holdovers: 10 },
				gop: { won: 5, leading: 0, holdovers: 27 },
				ind: { won: 0, leading: 0, holdovers: 1 },
			},
		}

		assert.deepEqual(input, output)

	})

})
