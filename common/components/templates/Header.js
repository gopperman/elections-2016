import React, { PropTypes } from 'react'
import ElectoralCollegeBar from './../ElectoralCollegeBar.js'
import Navigation from './Navigation.js'

const Header = ({ summaryState }) => (
	<header className='header' key='header'>
		<h1>Boston Globe</h1>
		<h2>Elections 2016</h2>
		<Navigation />
		<ElectoralCollegeBar {...summaryState} />
	</header>
)

Header.propTypes = {
	summaryState: PropTypes.object,
}

export default Header
