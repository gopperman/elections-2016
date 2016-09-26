/* global describe, it */

import _ from 'lodash'
import assert from 'assert'
import { readFileSync } from 'jsonfile'
import {
	sortByPolIDs,
	sortByCandidateIDs,
	sortByElectoralCount,
	sortByVoteCount,
} from './Candidates.js'

describe('Candidates', () => {

	describe('sortByVoteCount', () => {

		it('should work', () => {

			const input = [
				{ voteCount: 1 },
				{ voteCount: 0 },
			]

			const output = sortByVoteCount(input)

			const expected = [
				{ voteCount: 1 },
				{ voteCount: 0 },
			]

			assert.deepEqual(output, expected)

		})

	})

	describe('sortByElectoralCount', () => {

		it('should work', () => {

			const input = [
				{ electWon: 1 },
				{ electWon: 0 },
			]

			const output = sortByElectoralCount(input)

			const expected = [
				{ electWon: 1 },
				{ electWon: 0 },
			]

			assert.deepEqual(output, expected)

		})

	})

	describe('sortByCandidateIDs', () => {

		it('should work when summary array is a subset of the other', () => {

			// Read test data
			const input = readFileSync('./data/president-ma-towns.json')
				.races[0].reportingUnits

			// Get the summary candidates
			const summaryCandidates =
				_.find(input, { level: 'national' }).candidates

			// Get the summary candidates candidateIDs
			const candidateIDs = _.map(summaryCandidates, 'candidateID')

			// Get the candidates we want to sort
			const candidates =
				_.find(input, { reportingunitName: 'Abington' }).candidates

			// Sort
			const output = sortByCandidateIDs({ candidates, candidateIDs })

			assert.deepEqual(_.map(output, 'last'), [
				'Clinton', 'Trump', 'Stein', 'Johnson',
			])

		})

	})

	describe('sortByPolIDs', () => {

		it('should work when summary array is a subset of the other', () => {

			// Read test data
			const input = readFileSync('./data/president-us-states.json')

			// Get the summary candidates (note we are not going to sort them)
			const summaryCandidates = _.find(input.races, v =>
					v.reportingUnits[0].statePostal === 'US')
				.reportingUnits[0].candidates

			// Get the summary candidates polIDs
			const polIDs = _.map(summaryCandidates, 'polID')

			// Get the candidates we want to sort
			const candidates = _.find(input.races, v =>
					v.reportingUnits[0].statePostal === 'AR')
				.reportingUnits[0].candidates

			// Sort
			const output = sortByPolIDs({ candidates, polIDs })

			assert.deepEqual(_.map(output, 'last'), [
				'Clinton', 'Trump', 'Johnson', 'Stein', 'Castle', 'McMullin',
				'Kahn', 'Hedges',
			])

		})

		it('should work when arrays do not share all elements', () => {

			// Read test data
			const input = readFileSync('./data/president-us-states.json')

			// Get the summary candidates (note we are not going to sort them)
			const summaryCandidates = _.find(input.races, v =>
					v.reportingUnits[0].statePostal === 'UT')
				.reportingUnits[0].candidates

			// Get the summary candidates polIDs
			const polIDs = _.map(summaryCandidates, 'polID')

			// Get the candidates we want to sort
			const candidates = _.find(input.races, v =>
					v.reportingUnits[0].statePostal === 'IA')
				.reportingUnits[0].candidates

			// Sort
			const output = sortByPolIDs({ candidates, polIDs })

			assert.deepEqual(_.map(output, 'last'), [
				'Clinton', 'Trump', 'McMullin', 'Castle', 'Stein', 'De La Fuente',
				'Johnson', 'Vacek', 'La Riva', 'Kahn',
			])

		})

	})

})
