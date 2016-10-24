import React, { Component } from 'react'
import Select from 'react-select'
import getTownList from './../utils/getTownList.js'
import urlManager from './../utils/urlManager.js'

class TownLookup extends Component {

	state = {
		value: null,
	}

	onChange = (value) => {

		const location = typeof window !== 'undefined' && window.location
		if (location) {
			this.setState({ value })

			if (value) {
				location.href = urlManager.town(value.value)
			}

		}

	}

	render = () => (
		<Select
			placeholder='Select a town...'
			value={this.state.value}
			searchable
			className='benton-regular'
			onChange={this.onChange}
			options={getTownList().map(v => ({ value: v, label: v }))} />
	)

}


module.exports = TownLookup
