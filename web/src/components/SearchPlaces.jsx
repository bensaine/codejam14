import SearchAutocomplete from './SearchAutocomplete.jsx'
import { useEffect, useState } from 'react'
import PlaceOverview from './PlaceOverview.jsx'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'

const SearchPlaces = () => {
	const { placesService, placePredictions, getPlacePredictions } =
		usePlacesService({
			apiKey: '',
		})

	console.log(import.meta.env.GOOGLE_MAPS_API_KEY)
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
							<PlaceOverview details={selectedPlace} />
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
