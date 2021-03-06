/* global describe, it, afterEach */

import assert from 'assert'
import { formatTime } from './timeUtil.js'

describe('timeUtil', () => {

	describe('formatTime', () => {

		it('Should return difference in minutes if post is less than an hour old', () => {
			const now = formatTime(new Date())

			assert.equal(now, '0 minutes ago')
		})

		it('Should return one minute, not one minutes, if post is one minute old', () => {
			const time = new Date()
			time.setMinutes(time.getMinutes() - 1)
			assert.equal(formatTime(time), '1 minute ago')
		})

		it('Should return time in hh:mm format if post is more than an hour old', () => {
			const moonWalk = formatTime(new Date(-14159040000))

			assert.equal(moonWalk, '10:56 p.m.')
		})

	})
})
