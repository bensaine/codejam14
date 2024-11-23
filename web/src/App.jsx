import { useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'
import Places from './components/Places.jsx'
import './App.css'
import MapView from './components/Map.jsx'
import { APIProvider } from '@vis.gl/react-google-maps'
import GeolocationProvider from './components/GeolocationProvider.jsx'

function App() {
	return (
		<GeolocationProvider>
			<APIProvider apiKey={import.meta.env.GOOGLE_MAPS_API_KEY}>
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
							padding: '1rem',
							zIndex: 1000,
							backdropFilter: 'blur(10px)',
						}}
					>
						<Places></Places>
					</div>
					<MapView></MapView>
					<PWABadge />
				</div>
			</APIProvider>
		</GeolocationProvider>
	)
}

export default App
