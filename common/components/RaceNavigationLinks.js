import React from 'react'
import urlManager from './../utils/urlManager.js'

			// <li className='subnav__item'>
			// 	<a
			// 		className='subnav__link benton-bold'
			// 		href='#'>Mass. ballot questions</a>
			// </li>

const RaceNavigationLinks = () => (
	<nav className='subnav'>
		<ul className='subnav__list'>
			<li className='subnav__item icon-election'>
				<a
					className='subnav__link benton-bold'
					href={`/${urlManager.base()}`}>Election 2016</a>
			</li>
			<li className='subnav__item'>
				<a
					className='subnav__link benton-bold'
					href={`/${urlManager.base()}/president`}>President</a>
			</li>

			{/*
			<li className='subnav__item'>
				<a
					className='subnav__link benton-bold'
					href={`/${urlManager.base()}/office/us-house`}>US House</a>
			</li>
			<li className='subnav__item'>
				<a
					className='subnav__link benton-bold'
					href={`/${urlManager.base()}/office/us-senate`}>US Senate</a>
			</li>
			<li className='subnav__item'>
				<a
					className='subnav__link benton-bold'
					href={`/${urlManager.base()}/office/ma-senate`}>State Senate</a>
			</li>
			<li className='subnav__item'>
				<a
					className='subnav__link benton-bold'
					href={`/${urlManager.base()}/office/ma-senate`}>State House</a>
			</li>
			<li className='subnav__item'>
				<a
					className='subnav__link benton-bold'
					href={`/${urlManager.base()}/president`}>President</a>
			</li>
			<li className='subnav__item'>
				<a
					className='subnav__link benton-bold'
					href={`/${urlManager.base()}/office/governors-council`}>Governor’s Council</a>
			</li>
			<li className='subnav__item'>
				<a
					className='subnav__link benton-bold'
					href={`/${urlManager.base()}/office/register-osubdeeds`}>Register of deeds</a>
			</li>
			<li className='subnav__item'>
				<a
					className='subnav__link benton-bold'
					href={`/${urlManager.base()}/office/county-commissioner`}>County Commissioner</a>
			</li>
			<li className='subnav__item'>
				<a
					className='subnav__link benton-bold'
					href={`/${urlManager.base()}/office/sheriff`}>Sheriff</a>
			</li>*/}

		</ul>
	</nav>
)

export default RaceNavigationLinks
