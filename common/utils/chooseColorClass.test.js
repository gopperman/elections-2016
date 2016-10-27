/* global describe, it */

import assert from 'assert'
import chooseColorClass from './chooseColorClass.js'

describe('chooseColorClass', () => {

	describe('for presidential results', () => {

		it('should work with a winner', () => {

			assert.equal(
				chooseColorClass({
					candidates: [
						{ electWon: 0, voteCount: 0 },
						{ electWon: 0, voteCount: 0, winner: 'X', party: 'ABC' },
					],
				}),
				'fill-winner-ind',
			)

		})

		it('should work with no data', () => {

			// no data means no winner AND no electWon AND no voteCount
			assert.equal(
				chooseColorClass({
					candidates: [],
				}),
				'fill-none',
			)

			assert.equal(
				chooseColorClass({
					candidates: [
						{ electWon: 0, voteCount: 0 },
						{ electWon: 0, voteCount: 0 },
					],
				}),
				'fill-none',
			)

			assert.notEqual(
				chooseColorClass({
					candidates: [
						{ electWon: 0, voteCount: 1 },
						{ electWon: 0, voteCount: 0 },
					],
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
				}),
				'fill-leading-ind',
			)

			assert.equal(
				chooseColorClass({
					candidates: [
						{ electWon: 1, voteCount: 3, party: 'dem' },
						{ electWon: 1, voteCount: 2, party: 'ind' },
						{ electWon: 1, voteCount: 1, party: 'gop' },
					],
					precinctsReportingPct: '1',
				}),
				'fill-leading-dem',
			)

		})

	})

	describe('for non-presidential results', () => {


		it('should ignore winner and call complete if = 100%', () => {

			// regular race
			assert.equal(
				chooseColorClass({
					candidates: [
						{ voteCount: 1, party: 'dem' },
						{ voteCount: 0, winner: 'X', party: 'ABC' },
					],
					precinctsReportingPct: '100.0',
				}),
				'fill-complete-dem',
			)

			// question
			assert.equal(
				chooseColorClass({
					candidates: [
						{ voteCount: 1, party: 'Yes' },
						{ voteCount: 0, winner: 'X', party: 'ABC' },
					],
					precinctsReportingPct: '100.0',
				}),
				'fill-complete-yes',
			)

		})

		it('should ignore winner and not call complete if < 100%', () => {

			// regular race
			assert.equal(
				chooseColorClass({
					candidates: [
						{ voteCount: 1, party: 'dem' },
						{ voteCount: 0, winner: 'X', party: 'ABC' },
					],
					precinctsReportingPct: '1',
				}),
				'fill-leading-dem',
			)

			// question
			assert.equal(
				chooseColorClass({
					candidates: [
						{ voteCount: 1, party: 'Yes' },
						{ voteCount: 0, winner: 'X', party: 'ABC' },
					],
					precinctsReportingPct: '1',
				}),
				'fill-leading-yes',
			)

		})

		it('should denote leading yes and no for ballot questions', () => {
			// Yes
			assert.equal(
				chooseColorClass({
					candidates: [
						{ voteCount: 7, party: 'Yes' },
						{ voteCount: 2, party: 'No' },
					],
					precinctsReportingPct: '20',
				}),
				'fill-leading-yes',
			)
			// No
			assert.equal(
				chooseColorClass({
					candidates: [
						{ voteCount: 999, party: 'Yes' },
						{ voteCount: 1234, party: 'No' },
					],
					precinctsReportingPct: '20',
				}),
				'fill-leading-no',
			)
		})

		it('should work with no data', () => {

			// no data means no voteCount
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

			assert.equal(
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
						{ voteCount: 2, party: 'dem' },
						{ voteCount: 1, party: 'gop' },
					],
					precinctsReportingPct: '1',
				}),
				'fill-leading-ind',
			)

		})

	})

})
