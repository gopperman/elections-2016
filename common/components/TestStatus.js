import React, { PropTypes } from 'react'

const TestStatus = ({ isTest }) => {

	const test = isTest ? (
		<h1 className='TestStatus benton-bold'>AP TEST DATA</h1>
	) : null

	return test

}

TestStatus.propTypes = {
	isTest: PropTypes.bool.isRequired,
}

export default TestStatus
