import React, { Component, PropTypes } from 'react'
import topojson from 'topojson'
import { geoBounds, geoPath, geoConicConformal } from 'd3-geo'
import TOWNS from './../../data/output/TOWNS.json'

// eslint-disable-next-line react/prefer-stateless-function
class MassMap extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	// componentDidMount = () => {

	// 	console.log(this._map)


	// }

	render() {

		const { races } = this.props.data
		const race = (races && races[0]) || {}

		const towns =
			topojson.feature(TOWNS, TOWNS.objects.TOWNS)

		console.log(towns)

		const bounds = geoBounds(towns)

		console.log(bounds)

		const path = geoPath()
		.projection(geoConicConformal()
								.parallels([33, 45])
								.rotate([96, -39])
								.fitSize([400, 200], towns)
							 )

		const d = path(towns)

		return (
			<svg className='MassMap'>
				<path d={d} />
			</svg>
		)

	}

}
export default MassMap
