import React, { Component } from 'react'
import Select from 'react-select'
import getTownList from './../utils/getTownList.js'
import urlManager from './../utils/urlManager.js'

class TownLookup extends Component {

	state = {
		value: null,
		mounted: false,
	}

	// I have to do this to get around a `react-select` bug that despite
	// a PR (https://github.com/JedWatson/react-select/pull/1105) is
	// not working.
	componentDidMount = () => {
		this.setState({ mounted: true })
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

	render() {

		const select = this.state.mounted ?
			<Select
				placeholder='Select a town...'
				value={this.state.value}
				searchable
				id='town-select'
				className='form__select benton-bold'
				onChange={this.onChange}
				options={getTownList().map(v => ({ value: v, label: v }))} /> :
			null

		return (
			<div className='container-select'>
				<label
					htmlFor='town-select'
					className='benton-bold form__label form__label--overline'>Find your town results</label>
					{select}
			</div>
		)

	}

}

module.exports = TownLookup
