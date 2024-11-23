import L from 'leaflet'
import { useMap } from 'react-leaflet'
import 'leaflet-routing-machine'
import { useEffect } from 'react'

const RoutingMachine = () => {
	const map = useMap()
	const formatWaypoints = (waypointsList) => {
		return waypointsList.map(([lat, lng]) => L.latLng(lat, lng))
	}

	useEffect(() => {
		if (!map) return

		const waypointsList = [
			[45.5048, -73.5878],
			[45.5075, -73.5765],
			[45.5093, -73.565],
			[45.5088, -73.554],
		]

		const waypoints = formatWaypoints(waypointsList)

		L.Routing.osrmv1().route(
			waypoints.map((point) => ({ latLng: point })),
			(err, routes) => {
				if (!err) {
					const directions = routes[0].instructions.map((instruction) => ({
						text: instruction.text, // Step description
						distance: instruction.distance, // Distance for the step
					}))

					// Log directions for debugging or use them in the UI
					console.log('Directions:', directions)

					const routeLine = L.Routing.line(routes[0], {
						styles: [{ color: '#757de8', weight: 4 }],
					})
					routeLine.addTo(map)
				}
			}
		)
		L.marker(waypoints[0]).addTo(map)
		L.marker(waypoints[waypoints.length - 1]).addTo(map)
	}, [map])

	return null
}

export default RoutingMachine
