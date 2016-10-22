import React, { Component } from 'react'
import connectToApi from './connectToApi.js'
import Timer from './../components/Timer.js'
import Header from './../components/Header.js'
import Footer from './../components/Footer.js'
import TestStatus from './../components/TestStatus.js'
import Hero from './../components/Hero.js'

// We'll keep these urls here for testing. A description:

// this one returns a 500,
// const url = 'NO'

// this one returns json but the data is incomplete,
// const url = '2016-11-08/rezcentral?reports=Trend-s'

// and this one is the correct url - it returns everything.
const url = '2016-11-08/prezcentral?reports=Trend-s'

@connectToApi
class Election extends Component {

	static apiUrl() {
		return url
	}

	static areAllRacesComplete() {
		return false
	}

	render() {

		const { props } = this
		const { timerProps } = props

		const isTest = true

		return (
			<div>

				<TestStatus isTest={isTest} />

				<Header />

				<main id='content'>
					<Hero title='Election Home' />

					<div className='container-lg'>

						<Timer {...timerProps} />

					</div>

				</main>

				<Footer />

			</div>

		)

	}

}

export default Election
