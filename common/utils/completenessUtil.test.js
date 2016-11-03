/* global describe, it */

import assert from 'assert'
import { readFileSync } from 'jsonfile'
import {
	reportsAreComplete,
} from './completenessUtil.js'

describe('completenessUtil', () => {

	describe.only('reportsAreComplete', () => {

		it('should work with all reports', () => {

			const reports = readFileSync('./data/reports.json')

			assert.equal(reportsAreComplete(reports), false)

		})

		it('should work with one complete report', () => {

			const reports = readFileSync('./data/reports.json')

			// Get the governors report
			assert.equal(reportsAreComplete([reports[2]]), true)

		})

		it('should work with one incomplete report', () => {

			const reports = readFileSync('./data/reports.json')

			// Get the senate report
			assert.equal(reportsAreComplete([reports[0]]), false)

		})

	})

})
