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
			<tr>
				<th scope='row'><span>&nbsp;</span>${name}</th>
				<td>${pctForDisplay}<span>%</span></td>
				<td><span>${vote}</span></td>
			</tr>
			`
	})

	return candidates.length ? `
		<div className='tooltip'>
			<table summary='${summary}'>
				<caption>
					<div><span>${title}</span></div>
					<div><span>${precinctsReportingPct}% reporting</span></div>
				</caption>
				<thead>
					<tr>
						<th scope='col'>Candidate</th>
						<th scope='col'>Percent</th>
						<th scope='col'>Votes</th>
					</tr>
				</thead>
				<tbody>${rows.join('')}</tbody>
			</table>
		</div>` : ''

}
