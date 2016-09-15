/* global describe, it */

import _ from 'lodash'
import assert from 'assert'
import { readFileSync } from 'jsonfile'
import {
	sortByVoteCount,
	sortByElectoralCount,
	sortByIDs,
} from './Candidates.js'
import { getRaceUnits } from './../utils/dataUtil.js'

describe('Candidates', () => {

	describe('sortByIDs', () => {

		it('should work when arrays are of different length', () => {

			const candidateIDs = sortByElectoralCount(
				readFileSync('./data/president-us-formatted.json')
				.Sumtable.candidates)
				.map(v => v.candidateID)

			const candidates =
				readFileSync('./data/president-us-state-as-ru.json').candidates

			const result = sortByIDs({ candidates, candidateIDs })

			assert.deepEqual(_.map(result, 'last'),
				['Obama', 'Romney', 'Johnson', 'Stein', 'Goode'])

		})

		it('should work when both arrays are equal length', () => {

			const input = readFileSync('./data/president-ma-towns-0.json')

			const units = getRaceUnits(input)
			const state = _.find(units, { level: 'state' })
			const summaryCandidates = sortByVoteCount(state.candidates)
			const candidateIDs = _.map(summaryCandidates, 'candidateID')

			const acton = sortByIDs({
				candidates:
					_.find(units, { reportingunitName: 'Acton' }).candidates,
				candidateIDs,
			})

			const ashby = sortByIDs({
				candidates:
					_.find(units, { reportingunitName: 'Ashby' }).candidates,
				candidateIDs,
			})

			assert.deepEqual(_.map(acton, 'last'),
				['Obama', 'Romney', 'Johnson', 'Stein'])

			assert.deepEqual(_.map(ashby, 'last'),
				['Obama', 'Romney', 'Johnson', 'Stein'])

		})

	})

})
