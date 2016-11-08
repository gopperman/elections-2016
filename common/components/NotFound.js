import React from 'react'
import svgs from './../utils/svgs.js'
import Navigation from './Navigation.js'
import Footer from './../components/Footer.js'
import Promo from './../components/Promo.js'

const NotFound = () => (

	<div>
		<header className='header' key='header'>
			<a href='#content' className='skip-to-main'>Skip to main content</a>
			<div className='header__logo'>
				<a
					href='http://www.bostonglobe.com/'
					className='header__logo-link'
					dangerouslySetInnerHTML={{ __html: svgs.globeLogo }} />
			</div>
		</header>
		<main id='content'>
			<div className='not-found'>
				<h1 className='hide-accessible'>Page is not found</h1>
				<h2 className='subhed not-found__hed benton-bold'>Bummer! Looks like we can't find that page. Perhaps these handy links will help you find your <span className='icon--arrow'>way.</span></h2>
				<Navigation />
			</div>
			<Promo />
		</main>
		<Footer />
	</div>

)
export default NotFound
