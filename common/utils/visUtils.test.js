/* global describe, it, afterEach */

import assert from 'assert'
import { buildSeatRows, buildSeatColumns } from './visUtils.js'

describe('visUtils', () => {

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
