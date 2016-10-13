import React from 'react'
import Select from 'react-select'
import * as topojson from 'topojson'
import TOWNS from './../../data/output/TOWNS.json'
import { toSentenceCase } from './../utils/standardize.js'

const TownLookup = React.createClass({
	propTypes: {
		label: React.PropTypes.string,
		searchable: React.PropTypes.bool,
	},

	getDefaultProps() {
		return {
			label: 'Towns:',
			searchable: true,
		}
	},

	getInitialState() {
		return {
			disabled: false,
			searchable: this.props.searchable,
		}
	},

	updateValue(newValue) {
		window.location.href = `/elections/2016/town/${newValue}`
	},

	render() {
		const geoJSON = topojson.feature(TOWNS, TOWNS.objects.UNITS)

		const townList = geoJSON.features.map(v => {
			const town = v.id.toLowerCase()
			return {
				value: town,
				label: toSentenceCase(town),
			}
		})

		return (
			<div className='section'>
				<h3 className='section-heading'>{this.props.label}</h3>
				<Select
					options={townList}
					simpleValue
					clearable={this.state.clearable}
					name='selected-state'
					disabled={this.state.disabled}
					value={this.state.selectValue}
					onChange={this.updateValue}
					searchable={this.state.searchable}
				/>
			</div>
		)
	},
})


module.exports = TownLookup
