import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

const MapCenter = ({ center }) => {
	const map = useMap()

	useEffect(() => {
		map.setView(center, map.getZoom(), {
			animate: true,
		})
	}, [center, map])

	return null
}

export default MapCenter
