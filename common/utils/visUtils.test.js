/* global describe, it, afterEach */

import assert from 'assert'
import { readFileSync } from 'jsonfile'
import {
	buildSeats,
	senateTrendReport,
} from './visUtils.js'

describe('visUtils', () => {

	describe('senateTrendReport', () => {

		it('should return the correct data', () => {
			const input = readFileSync('./data/us-senate.json')
			const expected = {
				dem: {
					holdovers: 34,
					won: 10,
				},
				gop: {
					holdovers: 30,
					won: 23,
				},
				ind: {
					holdovers: 2,
					won: 0,
				},
			}

			const output = senateTrendReport(input.races)
			assert.deepEqual(output, expected)
		})
	})

	describe('buildSeats', () => {

		it('should return the correct data', () => {

			const props = {
				dem: { won: 3, holdovers: 2 },
				ind: { won: 3, holdovers: 0 },
				gop: { won: 2, holdovers: 5 },
				total: 18,
				rows: 3,
			}

			const expected = [
				{ party: 'dem', seat: 0, column: 0, index: 0, isHoldover: true },
				{ party: 'dem', seat: 1, column: 0, index: 1, isHoldover: true },
				{ party: 'dem', seat: 2, column: 0, index: 2, isHoldover: false },
				{ party: 'dem', seat: 0, column: 1, index: 3, isHoldover: false },
				{ party: 'dem', seat: 1, column: 1, index: 4, isHoldover: false },
				{ party: 'ind', seat: 2, column: 1, index: 5, isHoldover: false },
				{ party: 'ind', seat: 0, column: 2, index: 6, isHoldover: false },
				{ party: 'ind', seat: 1, column: 2, index: 7, isHoldover: false },
				{ party: 'none', seat: 2, column: 2, index: 8, isHoldover: false },
				{ party: 'none', seat: 0, column: 3, index: 9, isHoldover: false },
				{ party: 'none', seat: 1, column: 3, index: 10, isHoldover: false },
				{ party: 'gop', seat: 2, column: 3, index: 11, isHoldover: false },
				{ party: 'gop', seat: 0, column: 4, index: 12, isHoldover: false },
				{ party: 'gop', seat: 1, column: 4, index: 13, isHoldover: true },
				{ party: 'gop', seat: 2, column: 4, index: 14, isHoldover: true },
				{ party: 'gop', seat: 0, column: 5, index: 15, isHoldover: true },
				{ party: 'gop', seat: 1, column: 5, index: 16, isHoldover: true },
				{ party: 'gop', seat: 2, column: 5, index: 17, isHoldover: true },
			]

			const output = buildSeats(props)
			assert.deepEqual(output, expected)

		})

	})

})
