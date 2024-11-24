import SearchAutocomplete from './SearchAutocomplete.jsx'
import { useEffect, useMemo, useState } from 'react'
import PlaceOverview from './PlaceOverview.jsx'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { useContext } from 'react'
import { LocationContext } from '../contexts/LocationContext'
import { CircleX, MoveLeft } from 'lucide-react'
import './SearchPlaces.css'

const SearchPlaces = ({}) => {
	const {
		setDestinationLocation,
		isPathLoading,
		setSafePath,
		safePath,
		setDangerousPath,
	} = useContext(LocationContext)

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
						className="resultsbox"
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
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										position: 'absolute',
										top: '0.75em',
										left: '0.75em',
									}}
								>
									<button
										style={styles.backButton}
										className={safePath ? 'quit' : 'back'}
										onClick={() => {
											setSelectedPlace(null)
											setDestinationLocation(null)
											setSafePath(null)
											setDangerousPath(null)
											setShowResults(true)
										}}
									>
										{safePath ? <CircleX size={24} /> : <MoveLeft size={24} />}
									</button>
								</div>
								<PlaceOverview
									details={selectedPlace}
									onStartRoute={({ lat, lng }) => {
										console.log('Starting route to:', lat(), lng())
										setDestinationLocation([lat(), lng()])
									}}
									isRouting={!!safePath}
									isPathLoading={isPathLoading}
								/>
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
		cursor: 'pointer',
	},
	selection: {
		height: '100%',
	},
}

export default SearchPlaces
