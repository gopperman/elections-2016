import assert from 'assert'
import { buildSeats, buildRow } from './visUtils.js'

describe('visUtils', () => {
	describe('buildSeats', () => {
		it('should return empty when no rows', () => {
			assert.deepEqual(buildSeats(0,0,0,0),[])
		})

		it('should return the correct number of rows', () => {
			const rows = buildSeats(20,20,40,4)
			assert.equal(rows.length, 4)
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
			assert.deepEqual(buildSeats(2,2,8,2), expected)
		})
	})

	describe('buildRow', () => {
		it('should return empty when no results', () => {
			assert.deepEqual(buildRow(0,0,0), [])
		})

		it('should build a row of dems, undecideds, then gop', () => {
			assert.deepEqual(buildRow(2,0,0), [
				{
					seat: 1,
					party: 'dem',
				},
				{
					seat: 2,
					party: 'dem',
				},
			])
			assert.deepEqual(buildRow(0,2,0), [
				{
					seat: 1,
					party: 'gop',
				},
				{
					seat: 2,
					party: 'gop',
				},
			])
			assert.deepEqual(buildRow(1,1,2), [
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
			])

		})

	})

})