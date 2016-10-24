import React from 'react'
import Header from './../components/Header.js'
import Hero from './../components/Hero.js'
import Footer from './../components/Footer.js'
import urlManager from './../utils/urlManager.js'
import getTownList from './../utils/getTownList.js'

const TownHome = () => {

	const links = getTownList().map((town, i) => (
		<li key={i} className='subnav__item'>
			<a
				className='subnav__link benton-bold'
				href={urlManager.town(town)}>{town}</a>
		</li>
	))

	return (
		<div>

			<Header />

			<main id='content'>
				<Hero title='Towns' />

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

export default TownHome

