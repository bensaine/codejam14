import React, { useContext, useState, useEffect } from 'react'
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
import { GeolocationContext } from '../contexts/GeolocationContext.jsx'
import geoJsonData from '../assets/actes-criminels.json'

const MapView = ({ theme, isOpenHeatmap }) => {
	const { location } = useContext(GeolocationContext)
	console.log('location', location)

	if (!location) {
		return (
			<div>
				<h1>Geolocation</h1>
				<p>{'Loading...'}</p>
			</div>
		)
	}

	const addressPoints = geoJsonData['features'].map((el) => {
		return [el['properties']['LATITUDE'], el['properties']['LONGITUDE'], 0.3]
	})
	const api = 'http://127.0.0.1:5000/route'

	const [safePoints, setSafePoints] = useState([])
	const [dangerousPoints, setDangerousPoints] = useState([])

	const [source, setSource] = useState([location.latitude, location.longitude])
	const [destination, setDestination] = useState([45.5088, -73.554])

	const fetchWaypointsList = () => {
		fetch(api, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				source: source,
				destination: destination,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setDangerousPoints(data.dangerous)
				setSafePoints(data.safe)
			})
			.catch((error) => console.error('Error fetching waypoints:', error))
	}

	useEffect(() => {
		fetchWaypointsList()
	}, [])

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

	return (
		<MapContainer
			preferCanvas={true}
			renderer={L.canvas()}
			center={source}
			zoom={20}
			style={{ height: '100%', width: '100%' }}
		>
			<LocateControl options={locateOptions} startDirectly={true} />
			{isOpenHeatmap && (
				<HeatmapLayer
					points={addressPoints}
					longitudeExtractor={(m) => m[1]}
					latitudeExtractor={(m) => m[0]}
					intensityExtractor={(m) => parseFloat(m[2])}
				/>
			)}

			<Polyline
				positions={dangerousPoints}
				pathOptions={{
					color: 'purple',
					weight: '7',
					lineCap: 'round',
					lineJoin: 'round',
				}}
			></Polyline>
			<Polyline
				positions={safePoints}
				pathOptions={{
					color: 'teal',
					weight: '7',
					lineCap: 'round',
					lineJoin: 'round',
				}}
			></Polyline>
			<Marker position={destination}></Marker>
			<TileLayer
				url={`https://{s}.basemaps.cartocdn.com/${theme}/{z}/{x}/{y}{r}.png`}
				attribution='&copy; <a href="https://www.carto.com/">CARTO</a> contributors'
			/>
		</MapContainer>
	)
}

export default MapView
