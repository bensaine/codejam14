import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'
import { useEffect } from 'react'

const GoogleAutocomplete = () => {
	const {
		placesService,
		placePredictions,
		getPlacePredictions,
		isPlacePredictionsLoading,
	} = usePlacesService({
		apiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
	})

	useEffect(() => {
		// fetch place details for the first element in placePredictions array
		if (placePredictions.length)
			placesService?.getDetails(
				{
					placeId: placePredictions[0].place_id,
				},
				(placeDetails) => savePlaceDetailsToState(placeDetails)
			)
	}, [placePredictions, placesService])

    const savePlaceDetailsToState = (placeDetails) => {
        console.log(placeDetails)
    }

	return (
		<> 
            {/* TODO: add location bias */}
			<input
				placeholder="Debounce 500 ms"
				onChange={(evt) => {
					getPlacePredictions({ input: evt.target.value })
				}}
				loading={isPlacePredictionsLoading}
			/>
			<ul>
				{placePredictions.map((prediction) => (
					<li key={prediction.id}>{prediction.description}</li>
				))}
			</ul>
		</>
	)
}

export default GoogleAutocomplete
