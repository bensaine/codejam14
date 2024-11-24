import { useContext, useState, useEffect } from 'react'
import {
	MapContainer,
	TileLayer,
	GeoJSON,
	Marker,
	Polyline,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import L, { geoJson } from 'leaflet'
import 'leaflet-defaulticon-compatibility'
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3'
// import geoJsonData from '../assets/actes-criminels.json'
import LocateControl from './LocateControl.jsx'
import { LocationContext } from '../contexts/LocationContext.jsx'
import geoJsonData from '../assets/actes-criminels.json'
import MapCenter from './MapCenter.jsx'

const MapView = ({ theme, isOpenHeatmap }) => {
	const { sourceLocation, destinationLocation } = useContext(LocationContext)

	useEffect(() => {
		if (!sourceLocation || !destinationLocation) return

		fetchWaypointsList(sourceLocation, destinationLocation)
	}, [destinationLocation])

	const addressPoints = geoJsonData['features'].map((el) => {
		return [el['properties']['LATITUDE'], el['properties']['LONGITUDE'], 1]
	})
	const api = 'http://127.0.0.1:5000/route'

	const [safePoints, setSafePoints] = useState([])
	const [dangerousPoints, setDangerousPoints] = useState([])

	const fetchWaypointsList = (src, dest) => {
		fetch(api, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				source: src,
				destination: dest,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setDangerousPoints(data.dangerous[0])
				setSafePoints(data.safe[0])
			})
			.catch((error) => console.error('Error fetching waypoints:', error))
	}

	// Setup LocateControl options
	const locateOptions = {
		strings: {
			title: 'Enable geolocation',
		},
		showCompass: true,
		locateOptions: {
			setView: false,
			enableHighAccuracy: true,
		},
		onActivate: (a) => {
			console.log('onActivate', a)
		}, // callback before engine starts retrieving locations
	}

	if (!sourceLocation) {
		return (
			<div>
				<h1>Geolocation</h1>
				<p>{'Loading...'}</p>
			</div>
		)
	}

	return (
		<MapContainer
			preferCanvas={true}
			renderer={L.canvas()}
			center={sourceLocation}
			zoom={20}
			style={{ height: '100%', width: '100%' }}
		>
			<LocateControl options={locateOptions} startDirectly={true} />
      {destinationLocation && <MapCenter center={destinationLocation}/>}
			{isOpenHeatmap && (
				<HeatmapLayer
					points={addressPoints}
					longitudeExtractor={(m) => m[1]}
					latitudeExtractor={(m) => m[0]}
					intensityExtractor={(m) => parseFloat(m[2])}
					blur={20}
					maxZoom={100}
					radius={20}
					gradient={{ 0.2: 'yellow', 0.3: 'orange', 0.5: '#ff00004f' }}
				/>
			)}

			{safePoints && (
				<Polyline
					positions={dangerousPoints}
					pathOptions={{
						color: '#800020',
						weight: '7',
						lineCap: 'round',
						lineJoin: 'round',
						opacity: '0.5',
						dashArray: '5, 10',
					}}
				></Polyline>
			)}
			{safePoints && (
				<Polyline
					positions={safePoints}
					pathOptions={{
						color: 'teal',
						weight: '7',
						lineCap: 'round',
						lineJoin: 'round',
						dashArray: '5, 10',
						opacity: '0.7',
					}}
				></Polyline>
			)}
			{destinationLocation && <Marker position={destinationLocation}></Marker>}
			<TileLayer
				url={`https://{s}.basemaps.cartocdn.com/${theme}/{z}/{x}/{y}{r}.png`}
				attribution='&copy; <a href="https://www.carto.com/">CARTO</a> contributors'
			/>
		</MapContainer>
	)
}

export default MapView
