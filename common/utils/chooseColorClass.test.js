/* global describe, it */

import assert from 'assert'
import chooseColorClass from './chooseColorClass.js'
import {
	sortByElectoralCount,
	sortByVoteCount,
} from './Candidates.js'

describe('chooseColorClass', () => {

	describe('for presidential results', () => {

		const sortingDelegate = sortByElectoralCount

		it('should work with a winner', () => {

			assert.equal(
				chooseColorClass({
					candidates: [
						{ electWon: 0, voteCount: 0 },
						{ electWon: 0, voteCount: 0, winner: 'X', party: 'ABC' },
					],
					sortingDelegate,
				}),
				'fill-is-winner fill-ind',
			)

		})

		it('should work with no data', () => {

			// no data means no winner AND no electWon AND no voteCount
			assert.equal(
				chooseColorClass({
					candidates: [],
					sortingDelegate,
				}),
				'fill-none',
			)

			assert.equal(
				chooseColorClass({
					candidates: [
						{ electWon: 0, voteCount: 0 },
						{ electWon: 0, voteCount: 0 },
					],
					sortingDelegate,
				}),
				'fill-none',
			)

			assert.notEqual(
				chooseColorClass({
					candidates: [
						{ electWon: 0, voteCount: 1 },
						{ electWon: 0, voteCount: 0 },
					],
					sortingDelegate,
					precinctsReportingPct: '1',
				}),
				'fill-none',
			)

			assert.notEqual(
				chooseColorClass({
					candidates: [
						{ electWon: 1, voteCount: 0 },
						{ electWon: 0, voteCount: 0 },
					],
					sortingDelegate,
					precinctsReportingPct: '1',
				}),
				'fill-none',
			)

			assert.notEqual(
				chooseColorClass({
					candidates: [
						{ electWon: 0, voteCount: 0, winner: 'X' },
						{ electWon: 0, voteCount: 0 },
					],
					sortingDelegate,
					precinctsReportingPct: '1',
				}),
				'fill-none',
			)

		})

		it('should work with some data but less than 1%', () => {

			assert.equal(
				chooseColorClass({
					candidates: [
						{ electWon: 1, voteCount: 1 },
						{ electWon: 1, voteCount: 1 },
					],
					precinctsReportingPct: '0.5',
					sortingDelegate,
				}),
				'fill-none',
			)

		})

		it('should work with at least 1% and a tie', () => {

			// tie (both electWon and voteCount are equal)
			assert.equal(
				chooseColorClass({
					candidates: [
						{ electWon: 1, voteCount: 1 },
						{ electWon: 1, voteCount: 1 },
						{ electWon: 1, voteCount: 1 },
					],
					precinctsReportingPct: '1',
					sortingDelegate,
				}),
				'fill-tie',
			)

			// not tie (not both electWon and voteCount are equal)
			assert.notEqual(
				chooseColorClass({
					candidates: [
						{ electWon: 1, voteCount: 0 },
						{ electWon: 1, voteCount: 1 },
						{ electWon: 1, voteCount: 2 },
					],
					precinctsReportingPct: '1',
					sortingDelegate,
				}),
				'fill-tie',
			)

		})

		it('should work with at least 1% and leading', () => {

			assert.equal(
				chooseColorClass({
					candidates: [
						{ electWon: 1, voteCount: 1, party: 'dem' },
						{ electWon: 2, voteCount: 1, party: 'gop' },
						{ electWon: 3, voteCount: 1, party: 'AC' },
					],
					precinctsReportingPct: '1',
					sortingDelegate,
				}),
				'fill-ind',
			)

			assert.equal(
				chooseColorClass({
					candidates: [
						{ electWon: 1, voteCount: 3, party: 'dem' },
						{ electWon: 1, voteCount: 2, party: 'ind' },
						{ electWon: 1, voteCount: 1, party: 'gop' },
					],
					precinctsReportingPct: '1',
					sortingDelegate,
				}),
				'fill-dem',
			)

		})

	})

	describe('for non-presidential results', () => {

		const sortingDelegate = sortByVoteCount

		it('should work with a winner', () => {

			assert.equal(
				chooseColorClass({
					candidates: [
						{ voteCount: 1, party: 'dem' },
						{ voteCount: 0, winner: 'X', party: 'ABC' },
					],
					sortingDelegate,
					precinctsReportingPct: '1',
				}),
				'fill-dem',
			)

		})

		it('should work with no data', () => {

			// no data means no winner AND no voteCount
			assert.equal(
				chooseColorClass({
					candidates: [],
					sortingDelegate,
				}),
				'fill-none',
			)

			assert.equal(
				chooseColorClass({
					candidates: [
						{ voteCount: 0 },
						{ voteCount: 0 },
					],
					sortingDelegate,
				}),
				'fill-none',
			)

			assert.notEqual(
				chooseColorClass({
					candidates: [
						{ voteCount: 1 },
						{ voteCount: 0 },
					],
					precinctsReportingPct: '1',
					sortingDelegate,
				}),
				'fill-none',
			)

			assert.equal(
				chooseColorClass({
					candidates: [
						{ voteCount: 0, winner: 'X' },
						{ voteCount: 0 },
					],
					precinctsReportingPct: '1',
					sortingDelegate,
				}),
				'fill-none',
			)

		})

		it('should work with some data but less than 1%', () => {

			assert.equal(
				chooseColorClass({
					candidates: [
						{ voteCount: 1 },
						{ voteCount: 1 },
					],
					precinctsReportingPct: '0.5',
					sortingDelegate,
				}),
				'fill-none',
			)

		})

		it('should work with at least 1% and a tie', () => {

			// tie (voteCount are equal)
			assert.equal(
				chooseColorClass({
					candidates: [
						{ voteCount: 1 },
						{ voteCount: 1 },
						{ voteCount: 1 },
					],
					precinctsReportingPct: '1',
					sortingDelegate,
				}),
				'fill-tie',
			)

			// not tie (not voteCount are equal)
			assert.notEqual(
				chooseColorClass({
					candidates: [
						{ voteCount: 0 },
						{ voteCount: 1 },
						{ voteCount: 2 },
					],
					precinctsReportingPct: '1',
					sortingDelegate,
				}),
				'fill-tie',
			)

		})

		it('should work with at least 1% and leading', () => {

			assert.equal(
				chooseColorClass({
					candidates: [
						{ voteCount: 3, party: 'CA' },
						{ voteCount: 2, party: 'dem' },
						{ voteCount: 1, party: 'gop' },
					],
					precinctsReportingPct: '1',
					sortingDelegate,
				}),
				'fill-ind',
			)

		})

	})

})
