import _ from 'lodash'
import addCommas from 'add-commas'
import classnames from 'classnames'
import { percent } from './Candidate.js'
import { percentForDisplay, normalizeParty } from './standardize.js'

export default ({ subunit = {}, displayName, tooltipSortingDelegate }) => {

	const title = subunit[displayName]
	const { precinctsReportingPct } = subunit
	const candidates = tooltipSortingDelegate(subunit.candidates || [])

	const isPresidential = _.has(candidates[0], 'electWon')

	const electorsTh = isPresidential ?
		`<th class='r-table__cell' scope='col'>
			<p class='benton-regular'>Electors</p>
		</th>` : ''

	const rows = candidates.map((candidate, i) => {

		const { candidateID, voteCount, last, winner, party,
			electWon } = candidate

		// Add appropriate commas to the candidate's vote count.
		const vote = addCommas(voteCount)

		// Get the candidate's vote percent.
		const pct = percent({ candidates, candidateID })

		// Get the display-ready version of the percent.
		const pctForDisplay = percentForDisplay(pct, false)

		const winnerClass = classnames('r-table__cell',
			{ 'is-winner': !!winner && isPresidential })

		const squareClass = `fill-complete-${normalizeParty(party)}`

		const pctSpan = `<span class='${i > 0 && 'hide-invisible'}'>%</span>`

		const electorsTd = isPresidential ?
			`<td class='r-table__cell' scope='row' style='width: 1.5em;'>
				<p class='benton-bold'>${electWon}</p>
			</td>` : ''

		// Create this candidate's table row.
		return `
			<tr class='r-table__row'>
				<td class='${winnerClass}' scope='row' style='width: 9em;'>
					<div aria-hidden='true' class='r-table__square ${squareClass}'></div>
					<p class='benton-bold'>${last}</p>
				</td>
				${electorsTd}
				<td class='r-table__cell' scope='row' style='width: 1.5em;'>
					<p class='benton-bold'>${pctForDisplay}${pctSpan}</p>
				</td>
				<td class='r-table__cell' scope='row' style='width: 6em;'>
					<p class='benton-bold'>${vote}</p>
				</td>
			</tr>
			`
	})

	return candidates.length ? `
		<p class='r-block__name benton-bold'>${title}</p>
		<table class='r-table'>
			<thead class='r-table__head'>
				<tr class='r-table__row'>
					<th class='r-table__cell' scope='col'>
						<p class='benton-regular'>Candidate</p>
					</th>
					${electorsTh}
					<th class='r-table__cell' scope='col'>
						<p class='benton-regular'>Percent</p>
					</th>
					<th class='r-table__cell' scope='col'>
						<p class='benton-regular'>Votes</p>
					</th>
				</tr>
			</thead>
			<tbody>${rows.join('')}</tbody>
		</table>
		<p class='note benton-regular'>
			<span>${+precinctsReportingPct}% reporting</span>
		</p>
		` : '<p class="r-block__name benton-bold">No data available</p>'

}
