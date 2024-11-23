import { useEffect, useState } from 'react'
import { GeolocationContext } from '../contexts/GeolocationContext'

const GeolocationProvider = ({ children }) => {
	const [location, setLocation] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!navigator.geolocation) {
			setError('Geolocation is not supported by your browser.')
			return
		}

		console.log('Geolocation is supported by your browser.')

		const watchId = navigator.geolocation.watchPosition(
			(position) => {
				setLocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					accuracy: position.coords.accuracy,
				})
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
		<GeolocationContext.Provider value={{ location, error }}>
			{children}
		</GeolocationContext.Provider>
	)
}

export default GeolocationProvider