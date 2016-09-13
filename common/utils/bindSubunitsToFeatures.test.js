/* global describe, it, afterEach */

import assert from 'assert'
import { readFileSync } from 'jsonfile'
import topojson from 'topojson'
import bindSubunitsToFeatures, { findMatchingSubunit }
	from './bindSubunitsToFeatures.js'
import compare from './compareStrings.js'

const featuresInput = readFileSync('./data/output/TOWNS.json')
const subunitsInput = readFileSync('./data/president-ma-towns-0.json')

describe('bindSubunitsToFeatures', () => {

	describe('default export', () => {

		it('should bind only matching features', () => {

			const features =
				topojson.feature(featuresInput, featuresInput.objects.TOWNS).features

			const subunits = subunitsInput.races[0].reportingUnits

			const output = bindSubunitsToFeatures({ features, subunits })

			assert.equal(features.length, output.length)

		})

	})

	describe('findMatchingSubunit', () => {

		it('should find a subunit with a non-null name', () => {

			const subunits = subunitsInput.races[0].reportingUnits
			const name = 'ATHOL'

			const output = findMatchingSubunit({ subunits, name })

			assert.equal(true, compare(output.reportingunitName, name))

		})

		it('should not return a subunit with a null name', () => {

			const subunits = subunitsInput.races[0].reportingUnits
			const name = null

			const output = findMatchingSubunit({ subunits, name })

			assert.equal(output, null)

		})

	})

})
