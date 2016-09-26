import React, { PropTypes } from 'react'
import ElectoralCollegeBar from './../ElectoralCollegeBar.js'

const Header = ({summaryState}) => {
	return (
		<div className='header' key='header'>
			<h1>Boston Globe</h1>
			<h2>Elections 2016</h2>
			<ElectoralCollegeBar {...summaryState} />
		</div>
	)
}

export default Header