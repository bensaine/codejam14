import { useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'
import SearchPlaces from './components/SearchPlaces.jsx'
import './App.css'
import MapView from './components/Map.jsx'
import { APIProvider } from '@vis.gl/react-google-maps'
import GeolocationProvider from './components/GeolocationProvider.jsx'

function App() {
	return (
		<APIProvider apiKey="">
			<GeolocationProvider>
				<div style={{ width: '100vw', height: '100vh' }}>
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							padding: '2rem',
							zIndex: 1000,
						}}
					>
						<SearchPlaces></SearchPlaces>
					</div>
					<MapView></MapView>
					<PWABadge />
				</div>
			</GeolocationProvider>
		</APIProvider>
	)
}

export default App
