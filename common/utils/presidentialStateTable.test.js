/* global describe, it, afterEach */

import assert from 'assert'
import { getTopCandidate } from './presidentialStateTable.js'

const before = [
	{
		CandID: '893',
		ElectWon: '0',
		PopPct: '55',
		PopVote: '136848',
		name: 'Romney',
		party: 'GOP',
	},
	{
		CandID: '1918',
		ElectWon: '0',
		PopPct: '41',
		PopVote: '102138',
		name: 'Obama',
		party: 'Dem',
	},
	{
		CandID: '31708',
		ElectWon: '0',
		PopPct: '2',
		PopVote: '6131',
		name: 'Johnson',
		party: 'Lib',
	},
]

const after = [
	{
		CandID: '893',
		ElectWon: '3',
		PopPct: '55',
		PopVote: '136848',
		Winner: 'X',
		name: 'Romney',
		party: 'GOP',
	},
	{
		CandID: '1918',
		ElectWon: '0',
		PopPct: '41',
		PopVote: '102138',
		name: 'Obama',
		party: 'Dem',
	},
	{
		CandID: '31708',
		ElectWon: '0',
		PopPct: '2',
		PopVote: '6131',
		name: 'Johnson',
		party: 'Lib',
	},
]

describe('presidentialStateTable', () => {

	describe('getTopCandidate', () => {

		it('should return the leading candidate, if no winners', () => {

			const output = {
				CandID: '893',
				ElectWon: '0',
				PopPct: '55',
				PopVote: '136848',
				name: 'Romney',
				party: 'GOP',
			}

			assert.deepEqual(getTopCandidate({ Cand: before }), output)

		})

		it('should return the winning candidate, if winners', () => {

			const output = {
				CandID: '893',
				ElectWon: '3',
				PopPct: '55',
				PopVote: '136848',
				Winner: 'X',
				name: 'Romney',
				party: 'GOP',
			}

			assert.deepEqual(getTopCandidate({ Cand: after }), output)

		})

	})

})
