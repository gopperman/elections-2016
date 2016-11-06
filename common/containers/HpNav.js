import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import Navigation from './../components/Navigation.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08/rezcentral'

// and this one is the correct url - it returns everything.
const url = '2016-11-08?officeID=P&statePostal=US'

@connectToApi
class HpNav extends Component {

	static getTitle() {
		return ''
	}

	static apiUrl() {
		return url
	}

	render() {

		return (
			<div className='election-graphic'>

				<Navigation />

			</div>
		)

	}

}

export default HpNav
