import { useContext, useEffect, useMemo } from 'react'
import { LocationContext } from '../contexts/LocationContext'
import { Search } from 'lucide-react'
import './SearchAutocomplete.css'

const SearchAutocomplete = (props) => {
	const { getPlacePredictions, onBlur, onFocus } = props

	const { sourceLocation } = useContext(LocationContext)

	const bounds = useMemo(() => {
		if (!sourceLocation) return {}
		const radius = 30000 // 30 km
		const lat = sourceLocation[0]
		const lng = sourceLocation[1]

		return {
			south: lat - radius / 111111,
			west: lng - radius / 111111,
			north: lat + radius / 111111,
			east: lng + radius / 111111,
		}
	}, [sourceLocation])

	return (
		<div style={styles.searchbox}>
			<input
				style={styles.searchbox__input}
				placeholder="Search"
				onBlur={() => onBlur()}
				onFocus={() => onFocus()}
				onChange={(evt) => {
					getPlacePredictions({
						input: evt.target.value,
						locationBias: { lat: sourceLocation[0], lng: sourceLocation[1] },
						locationRestriction: bounds,
					})
				}}
			/>
			<Search size="24" style={styles.searchbox__icon} />
		</div>
	)
}

const styles = {
	searchbox: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: 'var(--ui-bg-color)',
		padding: '1em 1.5em',
		borderRadius: '2em',
		gap: '1em',
		boxSizing: 'border-box',
		boxShadow: '#0000003b 0px 5px 15px 2px',
	},
	searchbox__input: {
		outline: 'none',
		border: 'none',
		background: 'none',
		fontSize: '1.25em',
		fontWeight: 400,
		fontFamily: 'inherit',
		flexGrow: 1,
	},
	searchbox__icon: {
		color: '#fff',
		cursor: 'pointer',
		flexShrink: 0,
	},
	resultsbox: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		background: 'var(--ui-bg-color)',
		borderRadius: '2em',
		overflow: 'hidden',
	},
}
export default SearchAutocomplete
