import React, { useContext } from 'react'
import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import L, { geoJson } from 'leaflet'
import 'leaflet-defaulticon-compatibility'
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3'
// import geoJsonData from '../assets/actes-criminels.json'
import LocateControl from './LocateControl.jsx'
import { GeolocationContext } from '../contexts/GeolocationContext.jsx'

const MapView = ({ geojsonData }) => {
	const {location} = useContext(GeolocationContext)
	console.log("location", location)
	const addressPoints = [
		[45.56778, -73.626778, 0.3],
		[45.519122, -73.685928, 0.3],
		[45.602873, -73.635117, 0.3],
	]


	// Setup LocateControl options
	const locateOptions = {
		position: 'topright',
		strings: {
			title: 'Enable geolocation',
		},
    showCompass: true,
    locateOptions: {
      setView: true,
      enableHighAccuracy: true,
    },
		onActivate: (a) => {
			console.log('onActivate', a)
		}, // callback before engine starts retrieving locations
	}

	if (!location) {
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
			center={[location.latitude, location.longitude]}
			zoom={20}
			style={{ height: '100%', width: '100%' }}
		>
			<LocateControl options={locateOptions} startDirectly={true} />
			<HeatmapLayer
				points={addressPoints}
				longitudeExtractor={(m) => m[1]}
				latitudeExtractor={(m) => m[0]}
				intensityExtractor={(m) => parseFloat(m[2])}
			/>

			<TileLayer
				url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
				attribution='&copy; <a href="https://www.carto.com/">CARTO</a> contributors'
			/>
		</MapContainer>
	)
}

export default MapView
