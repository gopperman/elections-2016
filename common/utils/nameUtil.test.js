/* global describe, it */

import assert from 'assert'
import nameUtil from './nameUtil.js'

describe('nameUtil', () => {

	describe('office', () => {

		describe('title', () => {

			it('should work with no statePostal', () => {

				assert.equal(nameUtil.office.htmlTitle({
					officeName: 'u.s. house',
				}), 'US House')

				assert.equal(nameUtil.office.htmlTitle({
					officeName: 'us house',
				}), 'US House')

				assert.equal(nameUtil.office.htmlTitle({
					officeName: 'ushouse',
				}), 'Ushouse')

			})

			it('should work with statePostal', () => {

				assert.equal(nameUtil.office.htmlTitle({
					statePostal: 'ma',
					officeName: 'u.s. house',
				}), 'Mass. US House')

				assert.equal(nameUtil.office.htmlTitle({
					statePostal: 'ma',
					officeName: 'us house',
				}), 'Mass. US House')

				assert.equal(nameUtil.office.htmlTitle({
					statePostal: 'ma',
					officeName: 'ushouse',
				}), 'Mass. Ushouse')

				assert.equal(nameUtil.office.htmlTitle({
					statePostal: 'nh',
					officeName: 'ushouse',
				}), 'N.H. Ushouse')

			})

		})

	})

	describe('town', () => {

		describe('title', () => {

			it('should work for West Tisbury, MA', () => {

				assert.equal(nameUtil.town.htmlTitle({
					location: 'west tisbury',
					statePostal: 'ma',
				}), 'West Tisbury, Mass.')

			})

		})

		describe('name', () => {

			it('should work for West Tisbury, MA', () => {

				assert.equal(nameUtil.town.name({
					location: 'west tisbury',
					statePostal: 'ma',
				}), 'West Tisbury, Mass.')

			})

		})

	})

	describe('race', () => {

		describe('title', () => {

			it('should work for ballot questions', () => {

				assert.equal(nameUtil.race.htmlTitle({
					statePostal: 'ma',
					officeName: 'question',
					seatName: '1 - Expand slot machine gaming',
				}), 'Massachusetts Ballot questions, 1 - Expand Slot Machine Gaming')

			})

			it('should work for president', () => {

				assert.equal(nameUtil.race.htmlTitle({
					officeName: 'president',
				}), 'President')

			})

			it('should work for president, MA', () => {

				assert.equal(nameUtil.race.htmlTitle({
					statePostal: 'ma',
					officeName: 'president',
				}), 'Mass. presidential results')

			})

			it('should work for NH Governor', () => {

				assert.equal(nameUtil.race.htmlTitle({
					statePostal: 'nh',
					officeName: 'governor',
				}), 'New Hampshire Governor')

			})

			it('should work for State House, 10th Essex', () => {

				assert.equal(nameUtil.race.htmlTitle({
					statePostal: 'ma',
					officeName: 'State House',
					seatName: '10th Essex',
				}), 'Massachusetts State House, 10th Essex')

			})

			it('should work for AK US House, District 1', () => {

				assert.equal(nameUtil.race.htmlTitle({
					statePostal: 'ak',
					officeName: 'us house',
					seatName: 'district 1',
				}), 'Alaska US House, District 1')

			})

		})

		describe('name', () => {

			it('should work for president', () => {

				assert.equal(nameUtil.race.name({
					officeName: 'president',
				}), 'US presidential results')

			})

			it('should work for president, MA', () => {

				assert.equal(nameUtil.race.name({
					statePostal: 'ma',
					officeName: 'president',
				}), 'Mass. presidential results')

			})

			it('should work for NH Governor', () => {

				assert.equal(nameUtil.race.name({
					statePostal: 'nh',
					officeName: 'governor',
				}), 'New Hampshire Governor')

			})

			it('should work for State House, 10th Essex', () => {

				assert.equal(nameUtil.race.name({
					statePostal: 'ma',
					officeName: 'State House',
					seatName: '10th Essex',
				}), 'Massachusetts State House, 10th Essex')

			})

			it('should work for AK US House, District 1', () => {

				assert.equal(nameUtil.race.name({
					statePostal: 'ak',
					officeName: 'us house',
					seatName: 'district 1',
				}), 'Alaska US House, District 1')

			})

		})

	})

})
