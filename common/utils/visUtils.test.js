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

		it('should work when total % rows != 0', () => {

			const props = {
				dem: { won: 3, holdovers: 0 },
				ind: { won: 0, holdovers: 0 },
				gop: { won: 0, holdovers: 0 },
				total: 5,
				rows: 2,
			}

			const expected = [
				{ party: 'dem', isHoldover: false },
				{ party: 'dem', isHoldover: false },
				{ party: 'none', isHoldover: false },
				{ party: 'dem', isHoldover: false },
				{ party: 'none', isHoldover: false },
				{ },
			]

			const output = buildSeats(props)
			assert.deepEqual(output, expected)

		})

		it('should work when total % rows = 0', () => {

			const props = {
				dem: { won: 3, holdovers: 2 },
				ind: { won: 3, holdovers: 0 },
				gop: { won: 2, holdovers: 5 },
				total: 18,
				rows: 3,
			}

			const expected = [
				{ party: 'dem', isHoldover: true },
				{ party: 'dem', isHoldover: false },
				{ party: 'ind', isHoldover: false },
				{ party: 'none', isHoldover: false },
				{ party: 'gop', isHoldover: false },
				{ party: 'gop', isHoldover: true },
				{ party: 'dem', isHoldover: true },
				{ party: 'dem', isHoldover: false },
				{ party: 'ind', isHoldover: false },
				{ party: 'none', isHoldover: false },
				{ party: 'gop', isHoldover: true },
				{ party: 'gop', isHoldover: true },
				{ party: 'dem', isHoldover: false },
				{ party: 'ind', isHoldover: false },
				{ party: 'none', isHoldover: false },
				{ party: 'gop', isHoldover: false },
				{ party: 'gop', isHoldover: true },
				{ party: 'gop', isHoldover: true },
			]

			const output = buildSeats(props)
			assert.deepEqual(output, expected)

		})

	})

})
