import React, { Component, PropTypes } from 'react'
import topojson from 'topojson'
import { geoPath, geoConicConformal } from 'd3-geo'
import TOWNS from './../../data/output/TOWNS.json'

// eslint-disable-next-line react/prefer-stateless-function
class MassMap extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	render() {

		const { races } = this.props.data
		const race = (races && races[0]) || {}
		console.log(race)

		// convert TOWNS to a GeoJSON object (via topojson)
		const towns = topojson.feature(TOWNS, TOWNS.objects.TOWNS)

		// setup a MA-centric projection
		const projection = geoConicConformal()
			.parallels([41 + (43 / 60), 42 + (41 / 60)])
			.rotate([71 + (30 / 60), -41])

		// create the path
		const path = geoPath().projection(projection)

		// find MA bounds and aspect ratio for this projection
		const b = path.bounds(towns)
		const aspect = (b[1][0] - b[0][0]) / (b[1][1] - b[0][1])

		// create width and heights, using 100 as width reference
		const width = 100
		const height = Math.round(width / aspect)

		// fit this projection to the newly-calculated aspect ratio
		projection.fitSize([width, height], towns)

		return (
			<svg
				className='MassMap' viewBox={`0 0 ${width} ${height}`}
				preserveAspectRatio='xMidYMax meet'>
				<path d={path(towns)} />
			</svg>
		)

	}

}
export default MassMap
