/* eslint-disable no-return-assign, max-len */

import deepEqual from 'deep-equal'
import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import * as topojson from 'topojson'
import { geoPath } from 'd3-geo'
import { select, mouse } from 'd3-selection'
import chooseColorClass from './../utils/chooseColorClass.js'
import compareStrings from './../utils/compareStrings.js'
import createTooltip from './../utils/createTooltip.js'

const closeSvg = `
	<svg version="1.1" id="icon-close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16.641px" height="16.643px" viewBox="243.576 202.087 16.641 16.643" enable-background="new 243.576 202.087 16.641 16.643" xml:space="preserve" aria-labelledby="close-title">
		<title  id="close-title">Close</title>
		<line fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="244.826" y1="203.338" x2="258.967" y2="217.479"/>
		<line fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="244.826" y1="217.479" x2="258.967" y2="203.337"/>
	</svg>`

const crossHatchesDefs = `<defs>
	<pattern id="crosshatch-none" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
		<rect class="fill-none" width="10" height="10" transform="translate(0,0)"></rect>
	</pattern>
	<pattern id="crosshatch-dem" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
		<rect class="fill-winner-dem" width="8" height="10" transform="translate(0,0)"></rect>
	</pattern>
	<pattern id="crosshatch-gop" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
		<rect class="fill-winner-gop" width="8" height="10" transform="translate(0,0)"></rect>
	</pattern>
	<pattern id="crosshatch-ind" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
		<rect class="fill-winner-ind" width="8" height="10" transform="translate(0,0)"></rect>
	</pattern>
</defs>`

class Map extends Component {

	static propTypes = {

		// These will never change.
		topoObject: PropTypes.object.isRequired,
		projection: PropTypes.func.isRequired,
		sortingDelegate: PropTypes.func.isRequired,
		unitName: PropTypes.string.isRequired,
		displayName: PropTypes.string,
		displayUnitLabels: PropTypes.bool,

		// This will change.
		data: PropTypes.array.isRequired,
	}

	state = {
		selectionId: null,
	}

	// This lifecycle event gets called once, immediately after the initial
	// rendering occurs.
	componentDidMount() {

		const { topoObject, projection, displayUnitLabels } = this.props

		// Convert `topoObject` to GeoJSON objects (via topojson).
		const featuresGeoJSON =
			topojson.feature(topoObject, topoObject.objects.UNITS)

		// Create `this._path` and save it for convenience.
		this._path = geoPath().projection(projection)

		// Find bounds and aspect ratio for this projection.
		const b = this._path.bounds(featuresGeoJSON)
		const aspect = (b[1][0] - b[0][0]) / (b[1][1] - b[0][1])

		// Create width and height.
		const width = this._svg.parentNode.offsetWidth
		const height = Math.round(width / aspect)

		// Fit this projection to the newly-calculated aspect ratio.
		projection.fitSize([width, height], featuresGeoJSON)

		// Set viewBox on svg.
		const svg = select(this._svg).attr('viewBox', `0 0 ${width} ${height}`)

		// Create features group.
		svg.append('g').attr('class', 'features')

		// Calculate feature centroids,
		// and set features for convenience, so we don't keep topojsoning.
		this._geoFeatures = featuresGeoJSON.features
			.map(d => ({
				...d,
				centroid: this._path.centroid(d),
			}))

		if (displayUnitLabels) {

			const centroids = this._geoFeatures
				.map(d => ({
					centroid: d.centroid,
					id: d.id,
				}))

			// Draw labels background.
			svg.append('g').attr('class', 'labels').selectAll('text.background')
					.data(centroids, d => d.id)
				.enter()
				.append('text')
					.attr('class', d => [d.id, 'benton-bold', 'background'].join(' '))
					.attr('x', d => d.centroid[0])
					.attr('y', d => d.centroid[1])
					.attr('dy', 4)
					.text(d => d.id)

			// Draw labels foreground.
			svg.append('g').attr('class', 'labels').selectAll('text.foreground')
					.data(centroids, d => d.id)
				.enter()
				.append('text')
					.attr('class', d => [d.id, 'benton-bold', 'foreground'].join(' '))
					.attr('x', d => d.centroid[0])
					.attr('y', d => d.centroid[1])
					.attr('dy', 4)
					.text(d => d.id)

		}

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

	// TODO: try selecting something with no data, or the placeholder.
	onSelectChange = (e) => {

		// Save this selection to state so it doesn't get cleared out
		// with new data.
		this.setState({ selectionId: e.target.value })

		// Select all paths,
		const paths = select(this._svg).select('g.features').selectAll('path')

		// and deselect them.
		paths.classed('selected', false)

		// Find the feature that matches the dropdown option,
		const match = paths.filter(d => d.id === e.target.value)

		// select it, and raise it.
		match.classed('selected', true).raise()

		const datum = match.datum()

		// Get the mouse position.
		const { width, height } = this.getViewBoxDimensions()
		const [x, y] = datum.centroid
		const position = {
			x: 100 * (x / width),
			y: 100 * (y / height),
		}

		// Draw the tooltip for this subunit.
		this.drawTooltip({ subunit: datum.subunit, position })

	}

	// Extract svg's `viewBox` width and height.
	getViewBoxDimensions = () => {
		const [,, width, height] = select(this._svg).attr('viewBox').split(' ')
		return { width, height }
	}

	// This draws the tooltip and gets called either by mousing or
	// when new data comes in and we're on a feature.
	drawTooltip = ({ subunit, position }) => {

		const { unitName, displayName, sortingDelegate } = this.props

		// Position tooltip.
		if (position) {
			this._tooltip.style.top = `${position.y}%`
			this._tooltip.style.left = `${position.x}%`
			this._tooltip.querySelector('.js-tooltip').style.left =
				`-${position.x}%`
		}

		// Set tooltip content.
		this._tooltip.querySelector('.js-tooltip-content').innerHTML =
			createTooltip({
				subunit,
				displayName: displayName || unitName,
				sortingDelegate,
			})

		// If we have a valid subunit, show the tooltip;
		if (subunit) {
			this._tooltip.classList.add('show')
		} else {
			// otherwise hide it.
			this._tooltip.classList.remove('show')
		}

	}

	drawFeatures = () => {

		const { drawTooltip, getViewBoxDimensions } = this
		const { data, unitName } = this.props
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
			.map(v => ({
				...v,

				// Get this feature's color class based on who's winning.
				colorClass: chooseColorClass({
					candidates: v.subunit.candidates,
					precinctsReportingPct: v.subunit.precinctsReportingPct,
				}),
			}))
			.value()

		// Select the svg node.
		const svg = select(this._svg).select('g.features')

		// DATA JOIN (d3 pattern)
		const paths = svg.selectAll('path')
			.data(features, d => d.id)

		// ENTER + UPDATE (d3 pattern)
		paths.enter().append('path')
			.attr('d', this._path)
		.merge(paths)
			.attr('class', d => {

				let selectedClass = ''

				const { colorClass } = d

				// If this feature is selected (if the `selectionId` is in
				// local state),
				if (compareStrings(d.id, selectionId)) {

					// give it a selected class.
					selectedClass = 'selected'

				}

				return [colorClass, selectedClass].join(' ')

			})
			.on('mousemove', function mousemove(d) {

				// Set this feature's `id` to local state on mousemove.
				setState({ selectionId: d.id })

				// Deselect all other features.
				// We need this because of the dropdown.
				svg.selectAll('path').classed('selected', false)

				// Select the feature and raise it.
				select(this).classed('selected', true).raise()

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

		const { data, displayName, unitName } = this.props

		const unitNames = ['(select a state)'].concat(
			data.map(v => ({
				displayName: v[displayName],
				unitName: v[unitName],
			})))

		return (
			<div className='map'>
				<label
					htmlFor='map-select'
					className='benton-regular'>State results:</label>
				<select id='map-select' onChange={this.onSelectChange}>
					{ unitNames.map((v, i) =>
						<option value={v.unitName} key={i}>{v.displayName}</option>) }
				</select>
				<svg
					ref={(c) => this._svg = c}
					dangerouslySetInnerHTML={{ __html: crossHatchesDefs }} />
				<div className='tooltip-wrapper' ref={(c) => this._tooltip = c}>
					<div className='r-block tooltip js-tooltip'>
						<button
							className='tooltip__button'
							onClick={this.drawTooltip}
							dangerouslySetInnerHTML={{ __html: closeSvg }} />
						<div className='js-tooltip-content'>actual content</div>
					</div>
				</div>
				<div className='legend'>
					<ul className='benton-regular'>

						<li>
							<span className='label'>No data</span>
							<span className='square fill-none'>&nbsp;</span>
						</li>

						<li>
							<span className='label'>Lead</span>
							<span className='square stripe-dem'>&nbsp;</span>
							<span className='square stripe-gop'>&nbsp;</span>
							<span className='square stripe-gop'>&nbsp;</span>
						</li>

						<li>
							<span className='label'>Win</span>
							<span className='square fill-dem'>&nbsp;</span>
							<span className='square fill-gop'>&nbsp;</span>
							<span className='square fill-ind'>&nbsp;</span>
						</li>

					</ul>
				</div>
			</div>
		)

	}

}

export default Map
