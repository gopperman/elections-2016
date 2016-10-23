import React from 'react'
import urlManager from './../utils/urlManager.js'

const Navigation = () => (
	<nav className='g-nav' key='nav'>
		<ul className='g-nav__list'>
			<li className='g-nav__item'>
				<a
					className='g-nav__link benton-bold icon icon--election'
					href={urlManager.base()}>Elections 2016</a>
			</li>
			<li className='g-nav__item'>
				<a
					className='g-nav__link benton-bold icon icon--town'
					href={`${urlManager.base()}/town/boston`}>Town results</a>
			</li>
			<li className='g-nav__item g-nav__item--subnav'>
				<a
					className='g-nav__link benton-bold icon icon--race'
					href={urlManager.office('Question')}>Find a race</a>
			</li>
			<li className='g-nav__item'>
				<a
					className='g-nav__link benton-bold icon icon--president'
					href={urlManager.office('President')}>Presidential race</a>
			</li>
		</ul>
	</nav>
)

export default Navigation
