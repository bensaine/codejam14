import SearchAutocomplete from './SearchAutocomplete.jsx'
import { useEffect, useState } from 'react'
import PlaceOverview from './PlaceOverview.jsx'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { useContext } from 'react'
import { LocationContext } from '../contexts/LocationContext'

const SearchPlaces = () => {
	const { setDestinationLocation } = useContext(LocationContext)
	const { placesService, placePredictions, getPlacePredictions } =
		usePlacesService({
			apiKey: '',
		})

	const [selectedPlace, setSelectedPlace] = useState(null)

	useEffect(() => {
		if (selectedPlace) {
			console.log('Selected place:', selectedPlace)
		}
	}, [selectedPlace])

	const handlePlaceSelect = (placeId) => {
		placesService?.getDetails({ placeId }, (placeDetails) => {
			console.log(placeDetails)
			setSelectedPlace(placeDetails)
		})
	}

	return (
		<div style={styles.container}>
			<SearchAutocomplete getPlacePredictions={getPlacePredictions} />

			{(selectedPlace != null || placePredictions.length != 0) && (
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
						<div>
							<div>
								<button onClick={() => setSelectedPlace(null)}>Back</button>
							</div>
							<PlaceOverview
								details={selectedPlace}
								onStartRoute={({ lat, lng }) => {
									console.log('Starting route to:', lat(), lng())
									setDestinationLocation([lat(), lng()])
								}}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		gap: '1em',
		width: '50vw',
		minWidth: '22em',
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
	selection: {
		height: '100%',
		background: 'blue',
	},
}

export default SearchPlaces
