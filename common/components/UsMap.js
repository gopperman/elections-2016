// The `UsMap` class displays US results for nation-wide races.

/* eslint-disable no-return-assign */

import { select } from 'd3-selection'
import * as topojson from 'topojson'
import React, { Component } from 'react'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import STATES from './../../data/output/STATES.json'

class UsMap extends Component {

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

		// Save GeoJSON features for convenience.
		this._states = statesObject.features

		// Draw features.
		this.drawFeatures()

	}

	drawFeatures() {

		// const { selectTown, selection } = this.props

		const svg = select(this._svg)

		// DATA JOIN (d3 pattern)
		const paths = svg.selectAll('path')
			.data(this._states, d => d.id)

			// // On mousemove,
			// .on('mousemove', function mousemove(d) {

			// 	// grab the mouse x/y relative to this svg container,
			// 	const [x, y] = mouse(this)

			// 	// grab the svg's aspect ratio from viewBox,
			// 	const [, , width, height] = svg.attr('viewBox').split(' ')

			// 	// calculate a percentage-based position,
			// 	const position = {
			// 		x: 100 * (x / (+width)),
			// 		y: 100 * (y / (+height)),
			// 	}

			// 	// and fire a Redux `selectTown` action.
			// 	selectTown({ town: d.id, position })

			// })
			// // On mouseleave fire an empty `selectTown` action.
			// .on('mouseleave', () => selectTown({}))

		// ENTER + UPDATE (d3 pattern)
		paths.enter().append('path')
			.attr('d', this._path)
		// .merge(paths)

		// .attr('class', function createClass(d) {

		// 	// Get the shape color class based on who's winning.
		// 	const colorClass = chooseColorClass({
		// 		candidates: d.subunit && d.subunit.candidates })

		// 	// Add a `selected` class if we hovered over this shape.
		// 	// TODO: Will we always have a d.id?
		// 	const selected = d.id === selection.town.name ?
		// 		'selected' : ''

		// 	// If we selected this shape,
		// 	if (selected === 'selected') {

		// 		// bring it to the top, so its borders aren't under other shapes.
		// 		// TODO: This is a side-effect and should maybe happen elsewhere.
		// 		select(this).raise()
		// 	}

		// 	// Finally return both classes.
		// 	return [colorClass, selected].join(' ')

		// })

		// // EXIT (d3 pattern)
		// paths.exit().remove()

	}

	_svg = null
	_path = null
	_states = null

	render() {

		return (
			<div className='UsMap'>
				UsMap
				<svg ref={(c) => this._svg = c} />
			</div>
		)

	}

}

export default UsMap
