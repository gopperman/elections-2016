import addCommas from 'add-commas'
import { percent, fullName } from './Candidate.js'
import { percentForDisplay } from './standardize.js'

// TODO: create summary
// TODO: format 100.0% precincts reporting as 100 pre...
export default ({ subunit = {}, unitName, sortingDelegate }) => {

	const title = subunit[unitName]
	const { precinctsReportingPct } = subunit
	const summary = ''
	const candidates = sortingDelegate(subunit.candidates || [])

	const rows = candidates.slice(0, 4).map(v => {

		const { candidateID, voteCount } = v

		// Create the candidate's full name, e.g. 'First Name'.
		const name = fullName(v)

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
					<p class='benton-bold'>${name}</p>
				</td>
				<td class='r-table__cell' scope='row'>
					<p class='benton-bold'>${pctForDisplay}</p>
				</td>
				<td class='r-table__cell' scope='row'>
					<p class='benton-bold'>${vote}</p>
				</td>
			</tr>
			`
	})

	return candidates.length ? `
		<div class='r-block tooltip'>
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
		</div>` : ''

}
