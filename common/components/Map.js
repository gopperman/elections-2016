/* eslint-disable no-return-assign */

import deepEqual from 'deep-equal'
import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import * as topojson from 'topojson'
import { geoPath } from 'd3-geo'
import { select, mouse } from 'd3-selection'
import chooseColorClass from './../utils/chooseColorClass.js'
import compareStrings from './../utils/compareStrings.js'
import createTooltip from './../utils/createTooltip.js'

class Map extends Component {

	static propTypes = {

		// These will never change.
		topoObject: PropTypes.object.isRequired,
		projection: PropTypes.func.isRequired,
		sortingDelegate: PropTypes.func.isRequired,
		unitName: PropTypes.string.isRequired,
		displayName: PropTypes.string,

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

	// This is invoked before rendering when new props or state are being
	// received. This method is not called for the initial render or when
	// `forceUpdate` is used.
	shouldComponentUpdate(nextProps) {

		// Update component if the `data` has changed.
		return !deepEqual(this.props.data, nextProps.data)

	}

	// This is invoked immediately after the component's updates are flushed
	// to the DOM. This method is not called for the initial render.
	componentDidUpdate() {

		// After the component updates, draw map features.
		this.drawFeatures()

	}

	getViewBoxDimensions = () => {
		const [,, width, height] = select(this._svg).attr('viewBox').split(' ')
		return { width, height }
	}

	// This draws the tooltip and gets called either by mousing or
	// when new data comes in and we're on a feature.
	drawTooltip = ({ subunit, position }) => {

		const { unitName, displayName, sortingDelegate } = this.props

		this._tooltip.innerHTML = createTooltip({
			subunit,
			displayName: displayName || unitName,
			position,
			sortingDelegate,
		})

	}

	drawFeatures = () => {

		const { drawTooltip, getViewBoxDimensions } = this
		const { data, sortingDelegate, unitName } = this.props
		const { selectionId } = this.state

		// Create a `setState` function and bind `this` so we can call it
		// inside d3 functions with their own `this`.
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

				let selectedClass = ''

				// Get this feature's color class based on who's winning.
				const colorClass = chooseColorClass({
					candidates: d.subunit && d.subunit.candidates,
					sortingDelegate,
				})

				// If this feature is selected (if the `selectionId` is in
				// local state),
				if (compareStrings(d.id, selectionId)) {

					// give it a selected class,
					selectedClass = 'selected'

					// and draw the tooltip.
					drawTooltip(d.subunit)

				}

				return [colorClass, selectedClass].join(' ')

			})
			.on('mousemove', function mousemove(d) {

				// Set this feature's `id` to local state on mousemove.
				setState({ selectionId: d.id })

				select(this)
					// Select the feature,
					.classed('selected', true)
					// and `raise` it - move it above other features so the borders
					// are on top.
					.raise()

				// Get the mouse position.
				const { width, height } = getViewBoxDimensions()
				const [x, y] = mouse(this)
				const position = {
					x: 100 * (x / width),
					y: 100 * (y / height),
				}

				// Update the tooltip.
				drawTooltip({ subunit: d.subunit, position })

			})
			.on('mouseleave', function mouseleave() {

				// Clear out local state,
				setState({ selectionId: null })

				// clear out the tooltip,
				drawTooltip({})

				// and deselect the feature.
				select(this).classed('selected', false)
			})

	}

	_path = null
	_geoFeatures = null

	render() {

		return (
			<div className='map'>
				<svg ref={(c) => this._svg = c} />
				<div ref={(c) => this._tooltip = c} />
			</div>
		)

	}

}

export default Map
