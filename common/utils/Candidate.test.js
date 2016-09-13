/* global describe, it, afterEach */

import assert from 'assert'
import { fullName, percent } from './Candidate.js'

describe('Candidate', () => {

	describe('percent', () => {

		it('should work with valid candidates and candidate', () => {

			const candidates = [
				{ voteCount: 0, candidateID: 'a' },
				{ voteCount: 1, candidateID: 'b' },
				{ voteCount: 2, candidateID: 'c' },
			]

			assert.equal(percent({ candidates, candidateID: 'a' }), 0 / 3)
			assert.equal(percent({ candidates, candidateID: 'b' }), 1 / 3)

		})

	})

	describe('fullName', () => {

		it('should work with valid first and last names', () => {

			const candidate = {
				first: 'First',
				last: 'Last',
			}

			const expected = 'First Last'

			assert.equal(fullName(candidate), expected)

		})

		it('should work with only first name or last name', () => {

			assert.equal(fullName({ first: 'First' }), 'First')
			assert.equal(fullName({ last: 'Last' }), 'Last')

		})

	})

})
