import React from 'react'
import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import L, { geoJson } from 'leaflet'
import 'leaflet-defaulticon-compatibility'
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3'
import geoJsonData from '../assets/actes-criminels.json'

import RoutingMachine from './RoutingControl'

const MapView = ({ theme }) => {
	const position = [45.514, -73.573]
	const addressPoints = geoJsonData['features'].map((el) => {
		return [el['properties']['LATITUDE'], el['properties']['LONGITUDE'], 0.3]
	})

	return (
		<MapContainer
			preferCanvas={true}
			renderer={L.canvas()}
			center={position}
			zoom={20}
			style={{ height: '100%', width: '100%' }}
		>
			<HeatmapLayer
				points={addressPoints}
				longitudeExtractor={(m) => m[1]}
				latitudeExtractor={(m) => m[0]}
				intensityExtractor={(m) => parseFloat(m[2])}
			/>
			<RoutingMachine></RoutingMachine>
			<TileLayer
				url={`https://{s}.basemaps.cartocdn.com/${theme}/{z}/{x}/{y}{r}.png`}
				attribution='&copy; <a href="https://www.carto.com/">CARTO</a> contributors'
			/>
		</MapContainer>
	)
}

export default MapView
