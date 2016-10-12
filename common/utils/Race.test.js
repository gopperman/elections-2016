/* global describe, it, afterEach */

import assert from 'assert'
import { getName } from './Race.js'

describe('Race', () => {

	describe('getName', () => {

		it('should work with general races', () => {

			assert.equal(getName({
				statePostal: 'MA',
				officeName: 'Question',
				seatName: '4 - Legalize Marijuana',
			}), 'MA Question 4 - Legalize Marijuana')

		})

		it('should work with ballot questions', () => {

			assert.equal(getName({
				statePostal: 'MA',
				officeName: 'President',
			}), 'MA President')

		})

	})

})
