/* global describe, it, afterEach */

import assert from 'assert'
import { buildSeats, buildRow } from './visUtils.js'

/*

describe('visUtils', () => {

	describe('buildSeats', () => {

		it('should return empty when no rows', () => {
			const props = {
				dem: 0,
				gop: 0,
				total: 0,
				rows: 0,
			}
			assert.deepEqual(buildSeats(props), [])
		})

		it('should return the correct number of rows', () => {
			const props = {
				dem: 20,
				gop: 20,
				total: 40,
				rows: 4,
			}
			const seats = buildSeats(props)
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
						party: 'none',
					},
					{
						seat: 3,
						party: 'none',
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
						party: 'none',
					},
					{
						seat: 3,
						party: 'none',
					},
					{
						seat: 4,
						party: 'gop',
					},
				],
			]
			const seats = buildSeats({ dem: 2, gop: 2, total: 8, rows: 2 })
			assert.deepEqual(seats, expected)
		})

	})

	describe('buildRow', () => {

		it('should return empty when no results', () => {
			assert.deepEqual(buildRow({ dem: 0, gop: 0, none: 0 }), [])
		})

		it('should build a row of dems, undecideds, then gop', () => {
			assert.deepEqual(buildRow({ dem: 2, gop: 0, none: 0 }), [
				{
					seat: 1,
					party: 'dem',
				},
				{
					seat: 2,
					party: 'dem',
				},
			])
			assert.deepEqual(buildRow({ dem: 0, gop: 2, none: 0 }), [
				{
					seat: 1,
					party: 'gop',
				},
				{
					seat: 2,
					party: 'gop',
				},
			])
			assert.deepEqual(buildRow({ dem: 1, gop: 1, none: 2 }), [
				{
					seat: 1,
					party: 'dem',
				},
				{
					seat: 2,
					party: 'none',
				},
				{
					seat: 3,
					party: 'none',
				},
				{
					seat: 4,
					party: 'gop',
				},
			])

		})

	})

})

*/
