/* eslint-disable max-len */

import React from 'react'

const Promo = () => (
	<div className='promo'>
		<div className='promo__content'>
			<p className='benton-bold promo__hed'>Breaking news in your inbox</p>
			<p className='benton-regular promo__copy'>Find out about important stories as they break with our <em className='benton-bold'>free</em> newsletter.</p>
			<a
				className='benton-bold btn--feature'
				href='http://pages.email.bostonglobe.com/BreakingNewsSignUp/?p1=BG_election_email'
				rel='noopener noreferrer'
				target='_blank'>Sign up now</a>
		</div>
	</div>
)

export default Promo
