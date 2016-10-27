/* global describe, it, afterEach */

import assert from 'assert'
import {
	buildSeatRows,
	buildSeatColumns,
	buildSeats,
} from './visUtils.js'

describe('visUtils', () => {

	describe('buildSeats', () => {

		it('should return the correct data', () => {

			const props = {
				dem: 5,
				ind: 3,
				gop: 7,
				total: 18,
				rows: 3,
			}

			const expected = [
				{ party: 'dem', seat: 0, column: 0, index: 0 },
				{ party: 'dem', seat: 1, column: 0, index: 1 },
				{ party: 'dem', seat: 2, column: 0, index: 2 },
				{ party: 'dem', seat: 0, column: 1, index: 3 },
				{ party: 'dem', seat: 1, column: 1, index: 4 },
				{ party: 'ind', seat: 2, column: 1, index: 5 },
				{ party: 'ind', seat: 0, column: 2, index: 6 },
				{ party: 'ind', seat: 1, column: 2, index: 7 },
				{ party: 'none', seat: 2, column: 2, index: 8 },
				{ party: 'none', seat: 0, column: 3, index: 9 },
				{ party: 'none', seat: 1, column: 3, index: 10 },
				{ party: 'gop', seat: 2, column: 3, index: 11 },
				{ party: 'gop', seat: 0, column: 4, index: 12 },
				{ party: 'gop', seat: 1, column: 4, index: 13 },
				{ party: 'gop', seat: 2, column: 4, index: 14 },
				{ party: 'gop', seat: 0, column: 5, index: 15 },
				{ party: 'gop', seat: 1, column: 5, index: 16 },
				{ party: 'gop', seat: 2, column: 5, index: 17 },
			]

			const output = buildSeats(props)
			assert.deepEqual(output, expected)

		})

	})

	describe('buildSeatColumns', () => {

		it('should return the correct number of columns', () => {
			const props = {
				dem: 5,
				ind: 3,
				gop: 7,
				total: 18,
				rows: 3,
			}
			const columns = buildSeatColumns(props)
			assert.equal(columns.length, 6)
		})

	})

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
				dem: 5,
				ind: 3,
				gop: 7,
				total: 18,
				rows: 3,
			}
			const rows = buildSeatRows(props)
			assert.equal(rows.length, 3)
		})

		it('should return the correct number of rows', () => {
			const props = {
				dem: 20,
				gop: 20,
				total: 60,
				rows: 4,
			}
			const seats = buildSeatRows(props)
			assert.equal(seats.length, 4)
		})

		it('should return a well-formed "seating chart"', () => {
			const expected = [
				[
					{
						seat: 0,
						party: 'dem',
					},
					{
						seat: 1,
						party: 'none',
					},
					{
						seat: 2,
						party: 'none',
					},
					{
						seat: 3,
						party: 'gop',
					},
				],
				[
					{
						seat: 0,
						party: 'dem',
					},
					{
						seat: 1,
						party: 'none',
					},
					{
						seat: 2,
						party: 'none',
					},
					{
						seat: 3,
						party: 'gop',
					},
				],
			]
			const seats = buildSeatRows({ dem: 2, gop: 2, total: 8, rows: 2 })
			assert.deepEqual(seats, expected)
		})

	})

})
