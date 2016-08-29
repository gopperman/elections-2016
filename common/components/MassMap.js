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

		const towns =
			topojson.feature(TOWNS, TOWNS.objects.TOWNS)

		const path = geoPath()
		.projection(geoConicConformal()
			.parallels([41 + (43 / 60), 42 + (41 / 60)])
			.rotate([71 + (30 / 60), -41])
			.fitSize([400, 200], towns))

		const d = path(towns)

		return (
			<svg className='MassMap'>
				<path d={d} />
			</svg>
		)

	}

}
export default MassMap
