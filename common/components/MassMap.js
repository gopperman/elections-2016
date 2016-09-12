/* eslint-disable no-return-assign */

import React, { Component, PropTypes } from 'react'
import topojson from 'topojson'
import { geoPath, geoConicConformal } from 'd3-geo'
import { mouse, select } from 'd3-selection'
import TOWNS from './../../data/output/TOWNS.json'
import bindSubunitsToFeatures from './../utils/bindSubunitsToFeatures.js'
import chooseColorClass from './../utils/chooseColorClass.js'

class MassMap extends Component {

	static propTypes = {
		selection: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired,
		selectTown: PropTypes.func.isRequired,
	}

	// create the map
	componentDidMount() {

		// convert TOWNS to a GeoJSON object (via topojson)
		const townsObject = topojson.feature(TOWNS, TOWNS.objects.TOWNS)

		// setup a MA-centric projection
		const projection = geoConicConformal()
			.parallels([41 + (43 / 60), 42 + (41 / 60)])
			.rotate([71 + (30 / 60), -41])

		// create the path
		this._path = geoPath().projection(projection)

		// find MA bounds and aspect ratio for this projection
		const b = this._path.bounds(townsObject)
		const aspect = (b[1][0] - b[0][0]) / (b[1][1] - b[0][1])

		// create width and heights, using 100 as width reference
		const width = this._svg.parentNode.offsetWidth
		const height = Math.round(width / aspect)

		// fit this projection to the newly-calculated aspect ratio
		projection.fitSize([width, height], townsObject)

		// set viewBox on svg
		select(this._svg).attr('viewBox', `0 0 ${width} ${height}`)

		// save GeoJSON features for convenience
		this._towns = townsObject.features

		// draw features
		this.drawFeatures()

	}

	// update map with data
	componentDidUpdate() {

		const { races } = this.props.data
		const race = (races && races[0]) || {}
		const subunits = race.reportingUnits || []

		// bind AP data to GeoJSON features
		// TODO: maybe, when baking the topojson, we should give it an id
		// so we don't rely on the property 'REPORTING_UNIT'
		this._towns =
			bindSubunitsToFeatures({ subunits, features: this._towns })

		this.drawFeatures()

	}

	drawFeatures() {

		const { selectTown, selection } = this.props

		const svg = select(this._svg)

		// DATA JOIN
		const paths = svg.selectAll('path')
			.data(this._towns, d => d.properties.REPORTING_UNIT)
			.on('mousemove', function mousemove(d) {

				const [x, y] = mouse(this)
				const [, , width, height] = svg.attr('viewBox').split(' ')

				const position = {
					x: 100 * (x / (+width)),
					y: 100 * (y / (+height)),
				}

				selectTown({ town: d.properties.REPORTING_UNIT, position })

			})
			.on('mouseleave', () => selectTown({}))

		// UPDATE

		// ENTER

		// ENTER + UPDATE
		paths.enter().append('path')
			.attr('d', this._path)
		.merge(paths)
		.attr('class', function createClass(d) {

			const colorClass = chooseColorClass({
				candidates: d.subunit && d.subunit.candidates })

			// TODO: will we always have a d.properties.REPORTING_UNIT?
			const selected =
				d.properties.REPORTING_UNIT === selection.town.name ?
				'selected' : ''

			// TODO: this is a side-effect and should maybe happen elsewhere
			if (selected === 'selected') {
				select(this).raise()
			}

			return [colorClass, selected].join(' ')

		})

		// EXIT
		paths.exit().remove()

	}

	_svg = null
	_path = null
	_towns = null

	render() {

		const { town } = this.props.selection

		const { x, y } = town.position || {}

		const tooltipStyle = {
			top: `${y}%`,
			left: `${x}%`,
		}

		return (
			<div className='MassMap'>
				<svg ref={(c) => this._svg = c} />
				<div className='tooltip' style={tooltipStyle}>
					<pre>
						{ JSON.stringify(town, null, 2) }
					</pre>
				</div>
			</div>
		)

	}

}
export default MassMap
