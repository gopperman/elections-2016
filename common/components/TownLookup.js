import React, { Component } from 'react'
import Select from 'react-select'
import * as topojson from 'topojson'
import TOWNS from './../../data/output/TOWNS.json'
import { toSentenceCase } from './../utils/standardize.js'

// TODO: verify this component uses the latest utils/architecture
class TownLookup extends Component {

	componentDidMount() {

		const geoJSON = topojson.feature(TOWNS, TOWNS.objects.UNITS)
		this._townList = geoJSON.features.map(v => {
			const town = v.id.toLowerCase()
			return {
				value: town,
				label: toSentenceCase(town),
			}
		})

	}

	updateValue(newValue) {
		// TODO: only use window if on client
		window.location.href = `/elections/2016/town/${newValue}`
	}

	render() {

		return (
			<div className='section'>
				<h3 className='section-heading'>Select a town:</h3>
				<Select
					options={this._townList}
					simpleValue
					clearable
					name='selected-state'
					onChange={this.updateValue}
					searchable
				/>
			</div>
		)
	}

}


module.exports = TownLookup
