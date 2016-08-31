import React, { Component, PropTypes } from 'react'
import topojson from 'topojson'
import { geoPath, geoConicConformal } from 'd3-geo'
import { select } from 'd3-selection'
import TOWNS from './../../data/output/TOWNS.json'
import bindSubunitsToFeatures from './../utils/bindSubunitsToFeatures.js'
import chooseColorClass from './../utils/chooseColorClass.js'

// eslint-disable-next-line react/prefer-stateless-function
class MassMap extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
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

		// DATA JOIN
		const paths = select(this._svg).selectAll('path')
			.data(this._towns, d => d.properties.REPORTING_UNIT)
			.on('mousemove', function onMouseMove() {
				select(this).classed('selected', true)
				this.parentNode.appendChild(this)
			})
			.on('mouseleave', function onMouseLeave() {
				select(this).classed('selected', false)
			})

		// UPDATE

		// ENTER

		// ENTER + UPDATE
		paths.enter().append('path')
			.attr('d', this._path)
		.merge(paths)
		.attr('class', d =>
			chooseColorClass({
				candidates: d.subunit && d.subunit.candidates }))

		// EXIT
		paths.exit().remove()

	}

	_svg = null
	_path = null
	_towns = null

	render() {

		return (
			// eslint-disable-next-line no-return-assign
			<svg className='MassMap' ref={(c) => this._svg = c} />
		)

	}

}
export default MassMap
