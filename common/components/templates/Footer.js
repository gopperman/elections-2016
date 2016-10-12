import React from 'react'
import FooterNav from './FooterNav.js'

const Footer = () => (
	<div className='footer' key='footer'>
		<FooterNav />
		<h1>Election 2016</h1>
		<ul>
			<li><a href='/elections/2016/president'>President</a></li>
			<li><a href='/elections/2016/office/us-house'>US House</a></li>
			<li><a href='/elections/2016/office/us-senate'>US Senate</a></li>
			<li><a href='#'>Mass. ballot questions</a></li>
			<li><a href='/elections/2016/office/ma-senate'>State Senate</a></li>
			<li><a href='/elections/2016/office/ma-senate'>State House</a></li>
			<li><a href='/elections/2016/president'>President</a></li>
			<li><a href='/elections/2016/office/governors-council'>Governor’s Council</a></li>
			<li><a href='/elections/2016/office/register-of-deeds'>Register of deeds</a></li>
			<li><a href='/elections/2016/office/county-commissioner'>County Commissioner</a></li>
			<li><a href='/elections/2016/office/sheriff'>Sheriff</a></li>
		</ul>
	</div>
)

export default Footer
