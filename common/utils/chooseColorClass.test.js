/* global describe, it */

import assert from 'assert'
import chooseColorClass from './chooseColorClass.js'

describe('chooseColorClass', () => {

	describe('for presidential results', () => {

		const isPresidential = true

		it('should work with a winner', () => {

			assert.equal(
				chooseColorClass({
					candidates: [
						{ electWon: 0, voteCount: 0 },
						{ electWon: 0, voteCount: 0, winner: 'X', party: 'ABC' },
					],
					isPresidential,
				}),
				'winner fill-party party-ABC',
			)

		})

		it('should work with no data', () => {

			// no data means no winner AND no electWon AND no voteCount
			assert.equal(
				chooseColorClass({
					candidates: [],
					isPresidential,
				}),
				'fill-none',
			)

			assert.equal(
				chooseColorClass({
					candidates: [
						{ electWon: 0, voteCount: 0 },
						{ electWon: 0, voteCount: 0 },
					],
					isPresidential,
				}),
				'fill-none',
			)

			assert.notEqual(
				chooseColorClass({
					candidates: [
						{ electWon: 0, voteCount: 1 },
						{ electWon: 0, voteCount: 0 },
					],
					isPresidential,
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
					isPresidential,
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
					isPresidential,
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
					isPresidential,
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
					isPresidential,
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
					isPresidential,
				}),
				'fill-tie',
			)

		})

		it('should work with at least 1% and leading', () => {

			assert.equal(
				chooseColorClass({
					candidates: [
						{ electWon: 1, voteCount: 1, party: 'CA' },
						{ electWon: 2, voteCount: 1, party: 'BB' },
						{ electWon: 3, voteCount: 1, party: 'AC' },
					],
					precinctsReportingPct: '1',
					isPresidential,
				}),
				'fill-party party-AC',
			)

			assert.equal(
				chooseColorClass({
					candidates: [
						{ electWon: 1, voteCount: 3, party: 'CA' },
						{ electWon: 1, voteCount: 2, party: 'BB' },
						{ electWon: 1, voteCount: 1, party: 'AC' },
					],
					precinctsReportingPct: '1',
					isPresidential,
				}),
				'fill-party party-CA',
			)

		})

	})

	describe('for non-presidential results', () => {

		it('should work with a winner', () => {

			assert.equal(
				chooseColorClass({
					candidates: [
						{ voteCount: 0 },
						{ voteCount: 0, winner: 'X', party: 'ABC' },
					],
				}),
				'winner fill-party party-ABC',
			)

		})

		it('should work with no data', () => {

			// no data means no winner AND no voteCount
			assert.equal(
				chooseColorClass({
					candidates: [],
				}),
				'fill-none',
			)

			assert.equal(
				chooseColorClass({
					candidates: [
						{ voteCount: 0 },
						{ voteCount: 0 },
					],
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
				}),
				'fill-none',
			)

			assert.notEqual(
				chooseColorClass({
					candidates: [
						{ voteCount: 0, winner: 'X' },
						{ voteCount: 0 },
					],
					precinctsReportingPct: '1',
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
				}),
				'fill-tie',
			)

		})

		it('should work with at least 1% and leading', () => {

			assert.equal(
				chooseColorClass({
					candidates: [
						{ voteCount: 3, party: 'CA' },
						{ voteCount: 2, party: 'BB' },
						{ voteCount: 1, party: 'AC' },
					],
					precinctsReportingPct: '1',
				}),
				'fill-party party-CA',
			)

		})

	})

})
