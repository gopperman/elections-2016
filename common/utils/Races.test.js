import _ from 'lodash'

import assert from 'assert'
import { sortRacesBySeatName } from './Races.js'


describe('RacesUtil', () => {

	describe('sortRaceBySeatName', () => {

		it('should sort by town name', () => {
			const townRaces = [
				{
					seatName: '1st Worcester',
				},
				{
					seatName: '3rd Barnstable',
				},
				{
					seatName: '2nd Framingham',
				},
			]
			const expected = [
				{
					seatName: '3rd Barnstable',
				},
				{
					seatName: '2nd Framingham',
				},
				{
					seatName: '1st Worcester',
				},
			]
			assert.deepEqual(expected, _.sortBy(townRaces, sortRacesBySeatName))

		})

		it('should sort by district', () => {
			const districtRaces = [
				{
					seatName: '33rd Worcester',
				},
				{
					seatName: '2nd Worcester',
				},
				{
					seatName: '1st Worcester',
				},
				{
					seatName: '22nd Worcester',
				},
				{
					seatName: '10th Worcester',
				},
				{
					seatName: '4th Worcester',
				},
				{
					seatName: '21st Worcester',
				},
				{
					seatName: '11th Worcester',
				},
				{
					seatName: '3rd Worcester',
				},
			]
			const expected = [
				{
					seatName: '1st Worcester',
				},
				{
					seatName: '2nd Worcester',
				},
				{
					seatName: '3rd Worcester',
				},
				{
					seatName: '4th Worcester',
				},
				{
					seatName: '10th Worcester',
				},
				{
					seatName: '11th Worcester',
				},
				{
					seatName: '21st Worcester',
				},
				{
					seatName: '22nd Worcester',
				},
				{
					seatName: '33rd Worcester',
				},
			]
			assert.deepEqual(expected, _.sortBy(districtRaces, sortRacesBySeatName))
		})

		it('maintain sort order when no seatname doesnt exist', () => {
			const expected = [
				{
					foo: '1'

				},
				{
					foo: '2'

				},
				{
					foo: '3'

				},
			]
			assert.deepEqual(expected, _.sortBy(expected, sortRacesBySeatName))
		})

	})
})