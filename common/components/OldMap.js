/* eslint-disable no-return-assign */

import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import * as topojson from 'topojson'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import STATES from './../../data/output/STATES.json'
import chooseColorClass from './../utils/chooseColorClass.js'
import { sortByElectoralCount } from './../utils/Candidates.js'

const createPathAndFeatures = ({ width }) => {

	// Convert STATES to a GeoJSON object (via topojson).
	const statesObject = topojson.feature(STATES, STATES.objects.STATES)

	// Setup a lower 48 + AK + HI projection.
	const projection = geoAlbersUsa()

	// Create the `path`.
	const path = geoPath().projection(projection)

	// Find US bounds and aspect ratio for this projection.
	const b = path.bounds(statesObject)
	const aspect = (b[1][0] - b[0][0]) / (b[1][1] - b[0][1])

	// Create width and height.
	const height = Math.round(width / aspect)

	// Fit this projection to the newly-calculated aspect ratio.
	projection.fitSize([width, height], statesObject)

	return {
		path,
		features: statesObject.features,
		height,
	}

}

// TODO: handle resizing in IE11
// TODO: setup mouseovers
class Map extends Component {

	static propTypes = {
		selection: PropTypes.object.isRequired,
		states: PropTypes.array.isRequired,
		selectFeature: PropTypes.func.isRequired,
	}

	// TODO: do we have to recompute width and height, or can we
	// set width = 100%?
	componentDidMount() {
		console.log('setup event listener to recompute svg width and height')
	}

	// TODO: investigate better way of doing this
	// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
	onMouseMove = (subunit) => {

		const { selectFeature } = this.props

		const position = {
			x: 0,
			y: 0,
		}

		selectFeature({
			feature: subunit.reportingUnits[0].statePostal,
			position,
			map: 'us',
		})

	}

	render() {

		const { states, selection } = this.props
		const width = 100
		const { path, features, height } = createPathAndFeatures({ width })

		// Bind AP data to GeoJSON features.
		const subunits = _(features)
			.map(v => ({
				...v,
				subunit: _.find(states, s =>
					s.reportingUnits[0].statePostal === v.id),
			}))
			.value()

		// Create map shapes by iterating over every GeoJSON feature:
		const paths = subunits.map((v, i) => {

			// Get this subunit's candidates.
			const unit = v.subunit.reportingUnits[0]
			const { candidates, statePostal } = unit

			// Get the shape color class based on who's winning.
			const colorClass = chooseColorClass({
				candidates, sortingDelegate: sortByElectoralCount })

			const { feature } = selection

			// Add a `selected` class if we hovered over this shape.
			const selected = feature.map === 'us' && statePostal === feature.name ?
				'selected' : ''

			const klass = [colorClass, selected].join(' ')

			// Create the svg path.
			return (
				<path
					onMouseMove={() => this.onMouseMove(v.subunit)}
					key={i}
					d={path(v)}
					className={klass} />
			)

		})

		return (
			<svg
				viewBox={`0 0 ${width} ${height}`}
				ref={(c) => this._svg = c}>
				{ paths }
			</svg>
		)

	}

}

export default Map

