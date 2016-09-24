/* eslint-disable no-return-assign */

import deepEqual from 'deep-equal'
import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import * as topojson from 'topojson'
import { geoPath } from 'd3-geo'
import { select } from 'd3-selection'
import chooseColorClass from './../utils/chooseColorClass.js'
import compareStrings from './../utils/compareStrings.js'

// TODO: draw tooltips
// TODO: handle updating data and keeping tooltip+selected feature
class Map extends Component {

	static propTypes = {

		// These will never change.
		topoObject: PropTypes.object.isRequired,
		projection: PropTypes.func.isRequired,
		sortingDelegate: PropTypes.func.isRequired,
		unitName: PropTypes.string.isRequired,

		// This will change.
		data: PropTypes.array.isRequired,
	}

	state = {
		selectionId: null,
	}

	// This lifecycle event gets called once, immediately after the initial
	// rendering occurs.
	componentDidMount() {

		const { topoObject, projection } = this.props

		// Convert `topoObject` to a GeoJSON object (via topojson).
		const geoJSON = topojson.feature(topoObject, topoObject.objects.UNITS)

		// Create `this._path` and save it for convenience.
		this._path = geoPath().projection(projection)

		// Find bounds and aspect ratio for this projection.
		const b = this._path.bounds(geoJSON)
		const aspect = (b[1][0] - b[0][0]) / (b[1][1] - b[0][1])

		// Create width and height.
		const width = this._svg.parentNode.offsetWidth
		const height = Math.round(width / aspect)

		// Fit this projection to the newly-calculated aspect ratio.
		projection.fitSize([width, height], geoJSON)

		// Set viewBox on svg.
		select(this._svg).attr('viewBox', `0 0 ${width} ${height}`)

		// Set features for convenience, so we don't keep topojsoning.
		this._geoFeatures = geoJSON.features

		// Draw features (although at this point we might not have data).
		this.drawFeatures()

	}

	shouldComponentUpdate(nextProps) {

		return !deepEqual(this.props.data, nextProps.data)

	}

	componentDidUpdate() {

		this.drawFeatures()

	}

	drawFeatures = () => {

		const { data, sortingDelegate, unitName } = this.props
		const { selectionId } = this.state

		const setState = function setState(state) {
			this.setState(state)
		}.bind(this)

		// Bind AP data to GeoJSON features.
		const features = _(this._geoFeatures)
			.map(v => ({
				...v,
				subunit: _.find(data, f =>
					compareStrings(f[unitName], v.id)),
			}))
			.filter('subunit')
			.value()

		// Select the svg node.
		const svg = select(this._svg)

		// DATA JOIN (d3 pattern)
		const paths = svg.selectAll('path')
			.data(features, d => d.id)

		// ENTER + UPDATE (d3 pattern)
		paths.enter().append('path')
			.attr('d', this._path)
		.merge(paths)
			.attr('class', d => {

				const colorClass = chooseColorClass({
					candidates: d.subunit && d.subunit.candidates,
					sortingDelegate,
				})

				const selectedClass = compareStrings(d.id, selectionId) ?
					'selected' : ''

				return [colorClass, selectedClass].join(' ')

			})
			.on('mousemove', function mousemove(d) {

				setState({ selectionId: d.id })

				select(this)
					.classed('selected', true)
					.raise()

			})
			.on('mouseleave', function mouseleave() {
				setState({ selectionId: null })
				select(this).classed('selected', false)
			})

	}

	_path = null
	_geoFeatures = null

	render() {

		return (
			<div className='map'>
				<svg ref={(c) => this._svg = c} />
			</div>
		)

	}

}

export default Map
