/* global describe, it */

import _ from 'lodash'
import assert from 'assert'
import { readFileSync } from 'jsonfile'
import { sortByPolIDs } from './Candidates.js'

describe('Candidates', () => {

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
