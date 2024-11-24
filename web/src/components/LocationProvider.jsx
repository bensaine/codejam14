import { useEffect, useState } from 'react'
import { LocationContext } from '../contexts/LocationContext'

const LocationProvider = ({ children }) => {
	const [sourceLocation, setSourceLocation] = useState(null)
	const [destinationLocation, setDestinationLocation] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!navigator.geolocation) {
			setError('Geolocation is not supported by your browser.')
			return
		}

		console.log('Geolocation is supported by your browser.')

		const watchId = navigator.geolocation.watchPosition(
			(position) => {
				setSourceLocation([position.coords.latitude, position.coords.longitude])
				setError(null)
			},
			(err) => {
				setError(err.message)
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0,
			}
		)

		return () => navigator.geolocation.clearWatch(watchId)
	}, [])

	return (
		<LocationContext.Provider
			value={{
				sourceLocation,
				setSourceLocation,
				destinationLocation,
				setDestinationLocation,
				error,
			}}
		>
			{children}
		</LocationContext.Provider>
	)
}

export default LocationProvider
