// The `MassMap` class displays MA results for state-wide races.

/* eslint-disable no-return-assign */

import React, { Component, PropTypes } from 'react'
import * as topojson from 'topojson'
import { geoPath, geoConicConformal } from 'd3-geo'
import { mouse, select } from 'd3-selection'
import TOWNS from './../../data/output/TOWNS.json'
import bindSubunitsToFeatures, { findMatchingSubunit }
	from './../utils/bindSubunitsToFeatures.js'
import chooseColorClass from './../utils/chooseColorClass.js'
import Tooltip from './Tooltip.js'
import { getRaceUnits } from './../utils/dataUtil.js'

class MassMap extends Component {

	static propTypes = {
		selection: PropTypes.object.isRequired,
		race: PropTypes.object.isRequired,
		selectTown: PropTypes.func.isRequired,
	}

	// This lifecycle event gets called once, immediately after the initial
	// rendering occurs. We will use it to create the map.
	componentDidMount() {

		// Convert TOWNS to a GeoJSON object (via topojson).
		const townsObject = topojson.feature(TOWNS, TOWNS.objects.TOWNS)

		// Setup a MA-centric projection.
		const projection = geoConicConformal()
			.parallels([41 + (43 / 60), 42 + (41 / 60)])
			.rotate([71 + (30 / 60), -41])

		// Create the `path`.
		this._path = geoPath().projection(projection)

		// Find MA bounds and aspect ratio for this projection.
		const b = this._path.bounds(townsObject)
		const aspect = (b[1][0] - b[0][0]) / (b[1][1] - b[0][1])

		// Create width and height.
		const width = this._svg.parentNode.offsetWidth
		const height = Math.round(width / aspect)

		// Fit this projection to the newly-calculated aspect ratio.
		projection.fitSize([width, height], townsObject)

		// Set viewBox on svg.
		select(this._svg).attr('viewBox', `0 0 ${width} ${height}`)

		// Save GeoJSON features for convenience.
		this._towns = townsObject.features

		// Draw features.
		this.drawFeatures()

	}

	// This gets called once after the component's updates are flushed to DOM.
	// We will use it to update the map.
	componentDidUpdate() {

		const subunits = getRaceUnits(this.props.race)

		// Bind AP data to GeoJSON features.
		// Save `_towns` for convenience.
		this._towns =
			bindSubunitsToFeatures({ features: this._towns, subunits })

		// Draw features.
		this.drawFeatures()

	}

	// This function draws the map shapes and listens to mouseovers.
	drawFeatures() {

		const { selectTown, selection } = this.props

		const svg = select(this._svg)

		// DATA JOIN (d3 pattern)
		const paths = svg.selectAll('path')
			.data(this._towns, d => d.id)
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

				// and fire a Redux `selectTown` action.
				selectTown({ town: d.id, position })

			})
			// On mouseleave fire an empty `selectTown` action.
			.on('mouseleave', () => selectTown({}))

		// ENTER + UPDATE (d3 pattern)
		paths.enter().append('path')
			.attr('d', this._path)
		.merge(paths)
		.attr('class', function createClass(d) {

			// Get the shape color class based on who's winning.
			const colorClass = chooseColorClass({
				candidates: d.subunit && d.subunit.candidates })

			// Add a `selected` class if we hovered over this shape.
			// TODO: Will we always have a d.id?
			const selected = d.id === selection.town.name ?
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

		// EXIT (d3 pattern)
		paths.exit().remove()

	}

	_svg = null
	_path = null
	_towns = null

	render() {

		let tooltip = null

		const { name, position } = this.props.selection.town

		// Do we have a `name` or `position` - did the user select a town?
		// If so,
		if (name || position) {

			// get the town's race results:

			const subunits = getRaceUnits(this.props.race)

			// Find the matching results so we can pass them to `Tooltip`.
			const results = findMatchingSubunit({ name, subunits })

			// Create the `Tooltip` component.
			tooltip = <Tooltip {...{ results, position }} />

		}

		return (
			<div className='MassMap'>
				{tooltip}
				<svg ref={(c) => this._svg = c} />
			</div>
		)

	}

}

export default MassMap
