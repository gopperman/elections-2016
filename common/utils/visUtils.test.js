import assert from 'assert'
import { buildSeats, buildRow } from './visUtils.js'

describe('visUtils', () => {

	describe('buildRow', () => {

		it('should work', () => {
			const empty = []
			const row = buildRow(0,0,0)
			assert.deepEqual(buildRow(0,0,0), [])
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