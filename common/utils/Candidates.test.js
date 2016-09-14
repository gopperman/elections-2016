/* global describe, it */

import _ from 'lodash'
import assert from 'assert'
import { readFileSync } from 'jsonfile'
import { sort, sortByIDs } from './Candidates.js'
import { getRaceUnits } from './../utils/dataUtil.js'

const input = readFileSync('./data/president-ma-towns-0.json')

describe('Candidates', () => {

	describe('sortByIDs', () => {

		it('should work', () => {

			const units = getRaceUnits(input)
			const state = _.find(units, { level: 'state' })
			const summaryCandidates = sort(state.candidates)
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
