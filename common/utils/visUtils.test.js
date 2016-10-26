/* global describe, it, afterEach */

import assert from 'assert'
import { buildSeatRows } from './visUtils.js'

describe('visUtils', () => {

	describe('buildSeatRows', () => {

		it('should return empty when no rows', () => {
			const props = {
				dem: 0,
				gop: 0,
				ind: 0,
				total: 0,
				rows: 0,
			}
			assert.deepEqual(buildSeatRows(props), [])
		})

		it('should return the correct number of rows', () => {
			const props = {
				dem: 20,
				gop: 20,
				total: 40,
				rows: 4,
			}
			const seats = buildSeatRows(props)
			assert.equal(seats.length, 4)
		})

		it('should return a well-formed "seating chart"', () => {
			const expected = [
				[
					{
						seat: 1,
						party: 'dem',
					},
					{
						seat: 2,
						party: 'undecided',
					},
					{
						seat: 3,
						party: 'undecided',
					},
					{
						seat: 4,
						party: 'gop',
					},
				],
				[
					{
						seat: 1,
						party: 'dem',
					},
					{
						seat: 2,
						party: 'undecided',
					},
					{
						seat: 3,
						party: 'undecided',
					},
					{
						seat: 4,
						party: 'gop',
					},
				],
			]
			const seats = buildSeatRows({ dem: 2, gop: 2, total: 8, rows: 2 })
			assert.deepEqual(seats, expected)
		})

	})

})
