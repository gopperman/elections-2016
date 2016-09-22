// The `UsMap` class displays US results for nation-wide races.

/* eslint-disable no-return-assign */

import * as topojson from 'topojson'
import React, { Component, PropTypes } from 'react'
import { mouse, select } from 'd3-selection'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { formatStateAsReportingUnit } from './../utils/standardize.js'
import STATES from './../../data/output/STATES.json'
import chooseColorClass from './../utils/chooseColorClass.js'
import bindSubunitsToFeatures, { findMatchingSubunit }
	from './../utils/bindSubunitsToFeatures.js'
import StateTooltip from './StateTooltip.js'

class UsMap extends Component {

	static propTypes = {
		selection: PropTypes.object.isRequired,
		race: PropTypes.object.isRequired,
		selectFeature: PropTypes.func.isRequired,
	}

	// This lifecycle event gets called once, immediately after the initial
	// rendering occurs. We will use it to create the map.
	componentDidMount() {

		// Convert STATES to a GeoJSON object (via topojson).
		const statesObject = topojson.feature(STATES, STATES.objects.STATES)

		// Setup a lower 48 + AK + HI projection
		const projection = geoAlbersUsa()

		// Create the `path`
		this._path = geoPath().projection(projection)

		// Find US bounds and aspect ratio for this projection.
		const b = this._path.bounds(statesObject)
		const aspect = (b[1][0] - b[0][0]) / (b[1][1] - b[0][1])

		// Create width and height.
		const width = this._svg.parentNode.offsetWidth
		const height = Math.round(width / aspect)

		// Fit this projection to the newly-calculated aspect ratio.
		projection.fitSize([width, height], statesObject)

		// Set viewBox on svg.
		select(this._svg).attr('viewBox', `0 0 ${width} ${height}`)

		// Set features for convenience, so we don't keep topojsoning.
		this._geoFeatures = statesObject.features

		// Draw features (although at this point we might not have data).
		this.drawFeatures(this._geoFeatures)

	}

	// This gets called once after the component's updates are flushed
	// to DOM. We will use it to update the map.
	componentDidUpdate() {

		// Draw features.
		this.drawFeatures(this._geoFeatures)

	}

	// This function draws the map shapes and listens to mouseovers.
	drawFeatures(features) {

		const { selectFeature, selection, race } = this.props
		const svg = select(this._svg)

		// TODO: will we always have race. etc?
		const subunits = race.PresStateByStatetable.State
			.map(formatStateAsReportingUnit)

		// Bind AP data to GeoJSON features.
		const states = bindSubunitsToFeatures({
			features, subunits, property: 'statePostal' })

		// DATA JOIN (d3 pattern)
		const paths = svg.selectAll('path')
			.data(states, d => d.id)

		// ENTER + UPDATE (d3 pattern)
		paths.enter().append('path')
			.attr('d', this._path)
		.merge(paths)
			.attr('class', function createClass(d) {

				// Get the shape color class based on who's winning.
				const colorClass = chooseColorClass({
					candidates: d.subunit && d.subunit.candidates })

				const { feature } = selection

				// Add a `selected` class if we hovered over this shape.
				// TODO: Will we always have a d.id?
				const selected = feature.map === 'us' && d.id === feature.name ?
					'selected' : ''

				// If we selected this shape,
				if (selected === 'selected') {

					// bring it to the top, so its borders aren't under other shapes.
					// TODO: This is a side-effect and should maybe happen elsewhere.
					select(this).raise()
				}

				// Finally return both classes.
				return [colorClass, selected].join(' ')

			})
			// On mousemove,
			.on('mousemove', function mousemove(d) {

				// grab the mouse x/y relative to this svg container,
				const [x, y] = mouse(this)

				// grab the svg's aspect ratio from viewBox,
				const [, , width, height] = svg.attr('viewBox').split(' ')

				// calculate a percentage-based position,
				const position = {
					x: 100 * (x / (+width)),
					y: 100 * (y / (+height)),
				}

				// and fire a Redux `selectFeature` action.
				selectFeature({ feature: d.id, position, map: 'us' })

			})
			// On mouseleave fire an empty `selectFeature` action.
			.on('mouseleave', () => selectFeature({}))

		// EXIT (d3 pattern)
		paths.exit().remove()

	}

	_svg = null
	_path = null
	_geoFeatures = null

	render() {

		let tooltip = null

		const { name, position, map } = this.props.selection.feature

		// Do we have a `name` or `position` - did the user select a feature?
		// If so,
		if (map === 'us' && (name || position)) {

			// get the state's race results:
			const subunits = this.props.race.PresStateByStatetable.State
				.map(formatStateAsReportingUnit)

			// Find the matching results so we can pass them to `StateTooltip`.
			const results =
				findMatchingSubunit({ name, subunits, property: 'statePostal' })

			if (results) {

				// Create the `StateTooltip` component.
				tooltip = <StateTooltip {...{ results, position }} />

			}

		}

		return (
			<div className='map'>
				{tooltip}
				<svg ref={(c) => this._svg = c} />
			</div>
		)

	}

}

export default UsMap
