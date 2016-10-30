import React from 'react'
import Header from './../components/Header.js'
import Hero from './../components/Hero.js'
import Footer from './../components/Footer.js'
import officeNames from './../../data/offices.json'
import urlManager from './../utils/urlManager.js'

const RaceHome = () => {

	const links = officeNames.map((officeName, i) => (
		<li key={i} className='subnav__item'>
			<a
				className='subnav__link benton-bold'
				href={urlManager.office({ officeName })}>{officeName}</a>
		</li>
	))

	return (
		<div>

			<Header />

			<main id='content'>
				<Hero title='Races' />

				<div className='container-lg'>

					<nav className='subnav'>

						<ul className='subnav__list'>
							{links}
						</ul>

					</nav>

				</div>

			</main>

			<Footer />

		</div>
	)

}

export default RaceHome
