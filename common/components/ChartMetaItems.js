import React, { PropTypes } from 'react'

const ChartMetaItems = ({ items }) => {

	const elements = items.map((v, i) => (

		<li key={i} className='chart-meta__item'>
			<p className='chart-meta__info'>
				<abbr title={v.name} className='benton-regular'>{v.abbr}</abbr>
				<span className={`benton-bold color-${v.color}`}>{v.value}</span>
			</p>
		</li>
	))

	return (
		<ul className='chart-meta'>
			{elements}
		</ul>
	)

}

ChartMetaItems.propTypes = {
	items: PropTypes.array.isRequired,
}

export default ChartMetaItems
