import { useContext, useState, useEffect, useMemo } from 'react'
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
import LocateControl from './LocateControl.jsx'
import { LocationContext } from '../contexts/LocationContext.jsx'
import geoJsonData from '../assets/points.json'
import MapCenter from './MapCenter.jsx'
import TimeDistance from './TimeDistance.jsx'

const MapView = ({ theme, isOpenHeatmap }) => {
	const {
		sourceLocation,
		destinationLocation,
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
	} = useContext(LocationContext)

	const [showTimeDistance, setShowTimeDistance] = useState(false)

	useEffect(() => {
		if (!sourceLocation || !destinationLocation) return

		fetchWaypointsList(sourceLocation, destinationLocation)
	}, [destinationLocation])

	const addressPoints = geoJsonData
	const api = 'http://127.0.0.1:5000/route'

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
				setSafePath(data.safe[0])
				setDangerousPath(data.dangerous[0])
				setSafeDistance(data.safe[1])
				setDangerousDistance(data.dangerous[1])
				setSafeTime(data.safe[2])
				setDangerousTime(data.dangerous[2])
				console.log(safeTime)
				console.log(data.safe[2])
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

	useEffect(() => {
		if (!isPathLoading && destinationLocation) {
			const timer = setTimeout(() => {
				setShowTimeDistance(true)
			}, 300)

			return () => clearTimeout(timer)
		} else {
			setShowTimeDistance(false)
		}
	}, [isPathLoading, destinationLocation])

	if (!sourceLocation) {
		return (
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<span style={{ fontSize: '2em' }}>Loading map...</span>
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
			{destinationLocation && <MapCenter center={destinationLocation} />}
			<HeatmapLayer
				points={isOpenHeatmap ? addressPoints : []}
				longitudeExtractor={(m) => m[1]}
				latitudeExtractor={(m) => m[0]}
				intensityExtractor={(m) => parseFloat(m[2])}
				blur={20}
				maxZoom={100}
				radius={20}
				gradient={{ 0.2: 'yellow', 0.3: 'orange', 0.5: '#ff00004f' }}
			/>

			{dangerousPath && (
				<Polyline
					positions={dangerousPath}
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
			{safePath && (
				<Polyline
					positions={safePath}
					pathOptions={{
						color: '#4FC368',
						weight: '7',
						lineCap: 'round',
						lineJoin: 'round',
						dashArray: '5, 10',
						opacity: '0.7',
					}}
				></Polyline>
			)}
			{destinationLocation && <Marker position={destinationLocation}></Marker>}
			{showTimeDistance && (
				<TimeDistance
					safeTime={safeTime}
					safeDistance={safeDistance}
					dangerousTime={dangerousTime}
					dangerousDistance={dangerousDistance}
				></TimeDistance>
			)}
			<TileLayer
				url={`https://{s}.basemaps.cartocdn.com/${theme}/{z}/{x}/{y}{r}.png`}
				attribution='&copy; <a href="https://www.carto.com/">CARTO</a> contributors'
			/>
		</MapContainer>
	)
}

export default MapView
