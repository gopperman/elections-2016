/* eslint-disable no-return-assign, max-len */

import * as topojson from 'topojson'
import deepEqual from 'deep-equal'
import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { geoPath } from 'd3-geo'
import { select, mouse } from 'd3-selection'
import chooseColorClass from './../utils/chooseColorClass.js'
import compareStrings from './../utils/compareStrings.js'
import createTooltip from './../utils/createTooltip.js'
import {
	standardizeParty,
	toSentenceCase,
	toTitleCase,
} from './../utils/standardize.js'
import MapLegend from './MapLegend.js'
import svgs from './../utils/svgs.js'

class Map extends Component {

	static propTypes = {

		shapefile: PropTypes.object.isRequired,
		data: PropTypes.array.isRequired,
		unitName: PropTypes.string.isRequired,
		projection: PropTypes.func.isRequired,

		sortingDelegate: PropTypes.func.isRequired,
		dropdownName: PropTypes.string.isRequired,
		displayName: PropTypes.string.isRequired,
		labelsName: PropTypes.string,
	}

	state = {
		selectionId: null,
	}

	// This lifecycle event gets called once, immediately after the initial
	// rendering occurs.
	componentDidMount() {

		const { shapefile, data, unitName, projection, labelsName } = this.props

		let subsetFeature

		// Create the GeoJSON feature for this shapefile.
		const feature = topojson.feature(shapefile, shapefile.objects.UNITS)
		const { features } = feature

		// Create `this._path` and save it for convenience.
		this._path = geoPath().projection(projection)

		// Create an array of data unit ids.
		const ids = data.map(v => v[unitName].toUpperCase())

		// Get features that match the incoming data units.
		const matchingFeatures = features
			.filter(v => _.includes(ids, v.id.toUpperCase()))

		// If the matching geometries aren't equal to the shapefile geometries,
		if (matchingFeatures.length !== features.length) {

			// we have to draw only the matching shapes,
			// zoom in on them,
			// and draw an inset.
			// So here we'll create an outline for this subset.

			// Create the GeoJSON outline for this subset.
			subsetFeature = topojson.merge(shapefile,
				shapefile.objects.UNITS.geometries
					.filter(v => _.includes(ids, v.id.toUpperCase())))

		}

		// Find bounds and aspect ratio for this projection.
		const b = this._path.bounds(subsetFeature || feature)

		// Compute aspect, but constrain the height so we don't end up
		// with really vertical maps.
		const aspect = Math.max(
			(b[1][0] - b[0][0]) / (b[1][1] - b[0][1]),
			4 / 3
		)

		// Create width and height.
		const width = this._svg.parentNode.offsetWidth
		const height = Math.round(width / aspect)

		// Fit this projection to the newly-calculated aspect ratio.
		projection.fitSize([width, height], subsetFeature || feature)

		// Set viewBox on svg.
		const svg = select(this._svg)
			.attr('viewBox', `0 0 ${width} ${height}`)
			.classed('insetted', !!subsetFeature)

		// Create features group.
		svg.append('g').attr('class', 'features')

		// Calculate feature centroids,
		// and set features for convenience, so we don't keep topojsoning.
		this._geoFeatures = matchingFeatures
			.map(d => ({
				...d,
				centroid: this._path.centroid(d),
			}))

		let centroids = []

		if (labelsName) {

			centroids = this._geoFeatures
				.map(d => ({
					centroid: d.centroid,
					label: d.properties[labelsName],
				}))

		} else if (subsetFeature) {

			centroids = _(this._geoFeatures)
				.sortBy(d => -d.properties.population)
				.slice(0, 1)
				.map(d => ({
					centroid: this._path.centroid(d),
					label: toTitleCase(d.id),
				}))
				.value()

			svg.append('g').attr('class', 'labels').selectAll('circle')
					.data(centroids, d => d.label)
				.enter()
				.append('circle')
					.attr('cx', d => d.centroid[0])
					.attr('cy', d => d.centroid[1])
					.attr('r', 3)

		}

		const calculateLabelDx = (d) => {
			let dx
			if (subsetFeature) {
				if (d.centroid[0] > width / 2) {
					dx = -6
				} else {
					dx = 6
				}
			} else {
				dx = 0
			}
			return dx
		}

		const calculateLabelTextAnchor = (d) =>
			((!!subsetFeature && d.centroid[0] > width / 2) ?
			'end' : 'start')

		// Draw labels background.
		svg.append('g').attr('class', 'labels').selectAll('text.background')
				.data(centroids, d => d.label)
			.enter()
			.append('text')
				.attr('class', d => [
					labelsName ? d.label : 'largest-town',
					'benton-bold', 'background'].join(' '))
				.attr('x', d => d.centroid[0])
				.attr('y', d => d.centroid[1])
				.attr('dx', calculateLabelDx)
				.attr('dy', labelsName ? 4 : -4)
				.text(d => d.label)
				.style('text-anchor', calculateLabelTextAnchor)

		// Draw labels foreground.
		svg.append('g').attr('class', 'labels').selectAll('text.foreground')
				.data(centroids, d => d.label)
			.enter()
			.append('text')
				.attr('class', d => [
					labelsName ? d.label : 'largest-town',
					'benton-bold', 'foreground'].join(' '))
				.attr('x', d => d.centroid[0])
				.attr('y', d => d.centroid[1])
				.attr('dx', calculateLabelDx)
				.attr('dy', labelsName ? 4 : -4)
				.text(d => d.label)
				.style('text-anchor', calculateLabelTextAnchor)

		// Draw features (although at this point we might not have data).
		this.drawFeatures()

		if (subsetFeature) {

			this.drawInset({
				feature:
					topojson.merge(shapefile, shapefile.objects.UNITS.geometries),
				subsetFeature,
				projection,
				svg: this._inset,
			})

		}

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
		const match = paths
			.filter(d => compareStrings(d.id, e.target.value))

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

	drawInset({ feature, subsetFeature, projection, svg }) {

		// Create `this._path` and save it for convenience.
		const path = geoPath().projection(projection)

		// Find bounds and aspect ratio for this projection.
		const b = path.bounds(feature)

		// Compute aspect.
		const aspect = (b[1][0] - b[0][0]) / (b[1][1] - b[0][1])

		// Create width and height.
		const width = svg.parentNode.offsetWidth
		const height = Math.round(width / aspect)

		// Fit this projection to the newly-calculated aspect ratio.
		projection.fitSize([width, height], feature)

		// Set viewBox on svg.
		const inset = select(svg).attr('viewBox', `0 0 ${width} ${height}`)

		inset.append('g').attr('class', 'outline')
			.append('path')
				.datum(feature)
				.attr('d', path)

		inset.append('g').attr('class', 'subset')
			.append('path')
				.datum(subsetFeature)
				.attr('d', path)

	}

	clearTooltip = () => {

		// Hide the tooltip.
		this._tooltip.classList.remove('show')

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

		// Show the tooltip.
		this._tooltip.classList.add('show')

	}

	drawFeatures = () => {

		const { drawTooltip, clearTooltip, getViewBoxDimensions } = this
		const { data, unitName } = this.props
		const { selectionId } = this.state
		const _dropdown = this._dropdown

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
					candidates: v.subunit ? v.subunit.candidates : [],
					precinctsReportingPct: v.subunit ?
						v.subunit.precinctsReportingPct : '',
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

				// Set the dropdown.
				_dropdown.value = d.id.toUpperCase()

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

				// clear out the dropdown,
				_dropdown.value = ''

				// clear out the tooltip,
				clearTooltip()

				// and deselect the feature.
				select(this).classed('selected', false)
			})

	}

	_path = null
	_geoFeatures = null

	render() {

		const { data, unitName, dropdownName } = this.props

		const firstOption = {
			display: `Select a ${dropdownName}`,
			value: '',
		}

		const optionsList = _(data)
			.map(v => ({
				display: toTitleCase(v[unitName]),
				value: v[unitName].toUpperCase(),
			}))
			.sortBy('display')
			.value()

		const options = [firstOption].concat(optionsList)
			.map((v, i) =>
				<option value={v.value} key={i}>{v.display}</option>
			)

		const dropdownLabel = toSentenceCase(`${dropdownName} results`)

		const parties = _(data)
			.map('candidates')
			.flatten()
			.map('party')
			.uniq()
			.map(standardizeParty)
			.uniq()
			.value()

		return (
			<div className='map'>
				<div className='map__select'>
					<label
						htmlFor='map-select'
						className='benton-bold form__label form__label--overline'>{dropdownLabel}</label>
					<select
						id='map-select'
						className='form__select'
						onChange={this.onSelectChange}
						ref={(c) => this._dropdown = c}>{options}</select>
				</div>
				<div className='map-wrappers'>
					<svg
						className='map'
						ref={(c) => this._svg = c}
						dangerouslySetInnerHTML={{ __html: svgs.crossHatchesDefs }} />
					<svg className='inset' ref={(c) => this._inset = c} />
					<div className='tooltip-wrapper' ref={(c) => this._tooltip = c}>
						<div className='r-block tooltip js-tooltip'>
							<button
								className='tooltip__button'
								onClick={this.clearTooltip}
								dangerouslySetInnerHTML={{ __html: svgs.closeSvg }} />
							<div className='js-tooltip-content' />
						</div>
					</div>
				</div>
				<MapLegend parties={parties} />
			</div>
		)

	}

}

export default Map
