import addCommas from 'add-commas'
import { percent } from './Candidate.js'
import { percentForDisplay } from './standardize.js'

// TODO: create summary
export default ({ subunit = {}, displayName, sortingDelegate }) => {

	const title = subunit[displayName]
	const { precinctsReportingPct } = subunit
	const summary = ''
	const candidates = sortingDelegate(subunit.candidates || [])

	const rows = candidates.slice(0, 4).map(candidate => {

		const { candidateID, voteCount } = candidate

		// Create the candidate's full name, e.g. 'First Name'.
		const { last } = candidate
		// Add appropriate commas to the candidate's vote count.
		const vote = addCommas(voteCount)

		// Get the candidate's vote percent.
		const pct = percent({ candidates, candidateID })

		// Get the display-ready version of the percent.
		const pctForDisplay = percentForDisplay(pct)

		// Create this candidate's table row.
		return `
			<tr class='r-table__row'>
				<td class='r-table__cell' scope='row'>
					<p class='benton-bold'>${last}</p>
				</td>
				<td class='r-table__cell' scope='row'>
					<p class='benton-bold'>${+pctForDisplay}%</p>
				</td>
				<td class='r-table__cell' scope='row'>
					<p class='benton-bold'>${vote}</p>
				</td>
			</tr>
			`
	})

	return candidates.length ? `
		<p class='r-block__name benton-bold'>${title}</p>
		<table class='r-table' summary='${summary}'>
			<thead class='r-table__head'>
				<tr class='r-table__row'>
					<th class='r-table__cell' scope='col'>
						<p class='benton-regular'>Candidate</p>
					</th>
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
	` : ''

}
