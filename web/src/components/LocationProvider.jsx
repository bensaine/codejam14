import { useEffect, useState } from 'react'
import { LocationContext } from '../contexts/LocationContext'

const LocationProvider = ({ children }) => {
	const [sourceLocation, setSourceLocation] = useState(null)
	const [destinationLocation, setDestinationLocation] = useState(null)
	const [safePath, setSafePath] = useState(null)
	const [dangerousPath, setDangerousPath] = useState(null)
	const [safeTime, setSafeTime] = useState(null)
	const [dangerousTime, setDangerousTime] = useState(null)
	const [safeDistance, setSafeDistance] = useState(null)
	const [dangerousDistance, setDangerousDistance] = useState(null)
	const [isPathLoading, setIsPathLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!setIsPathLoading) return

		if (!!destinationLocation && (!safePath || !dangerousPath)) {
			setIsPathLoading(true)
		} else {
			setIsPathLoading(false)
		}
	}, [destinationLocation, safePath, dangerousPath, setIsPathLoading])

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
				safePath,
				setSafePath,
				dangerousPath,
				setDangerousPath,
				safeTime,
				setSafeTime,
				dangerousTime,
				setDangerousTime,
				safeDistance,
				setSafeDistance,
				dangerousDistance,
				setDangerousDistance,
				isPathLoading,
				setIsPathLoading,
				error,
			}}
		>
			{children}
		</LocationContext.Provider>
	)
}

export default LocationProvider
