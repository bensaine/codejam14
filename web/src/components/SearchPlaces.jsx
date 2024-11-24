import SearchAutocomplete from './SearchAutocomplete.jsx'
import { useEffect, useMemo, useState } from 'react'
import PlaceOverview from './PlaceOverview.jsx'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { useContext } from 'react'
import { LocationContext } from '../contexts/LocationContext'
import { MoveLeft } from 'lucide-react'

const SearchPlaces = ({}) => {
	const { setDestinationLocation, isPathLoading } = useContext(LocationContext)
	const { placesService, placePredictions, getPlacePredictions } =
		usePlacesService({
			apiKey: '',
		})

	const [selectedPlace, setSelectedPlace] = useState(null)
	const [showResults, setShowResults] = useState(false)

	useEffect(() => {
		if (selectedPlace) {
			console.log('Selected place:', selectedPlace)
		}
	}, [selectedPlace])

	const handlePlaceSelect = (placeId) => {
		placesService?.getDetails({ placeId }, (placeDetails) => {
			setSelectedPlace(placeDetails)
		})
	}

	return (
		<>
			<div
				style={styles.container}
				className={selectedPlace ? 'selected' : 'search'}
			>
				<SearchAutocomplete
					getPlacePredictions={getPlacePredictions}
					onFocus={() => setShowResults(true)}
					onBlur={() => setTimeout(() => setShowResults(false), 200)}
				/>

				{(showResults || selectedPlace) && (
					<div
						style={{
							...styles.resultsbox,
							...(selectedPlace ? styles.selection : {}),
						}}
					>
						{!selectedPlace &&
							placePredictions.map((prediction) => (
								<div
									className={'singleresult'}
									key={prediction.place_id}
									onClick={() => handlePlaceSelect(prediction.place_id)}
								>
									<span>{prediction.description}</span>
								</div>
							))}
						{selectedPlace && (
							<div style={styles.overviewContainer}>
								<div>
									<button
										style={styles.backButton}
										onClick={() => {
											setSelectedPlace(null)
											setDestinationLocation(null)
											setShowResults(true)
										}}
									>
										<MoveLeft size={24} />
									</button>
								</div>
								<PlaceOverview
									details={selectedPlace}
									onStartRoute={({ lat, lng }) => {
										console.log('Starting route to:', lat(), lng())
										setDestinationLocation([lat(), lng()])
									}}
								/>
								{isPathLoading && <p>Loading path...</p>}
							</div>
						)}
					</div>
				)}
			</div>
		</>
	)
}

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		width: '50vw',
		minWidth: '22em',
		zIndex: 10,
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
		position: 'relative',
		opacity: 0.95,
	},
	backButton: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		position: 'absolute',
		top: '0.5em',
		left: '0.5em',
	},
	selection: {
		height: '100%',
	},
}

export default SearchPlaces
