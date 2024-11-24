import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'
import SearchPlaces from './components/SearchPlaces.jsx'
import './App.css'
import MapView from './components/Map.jsx'
import { APIProvider } from '@vis.gl/react-google-maps'
import LocationProvider from './components/LocationProvider.jsx'
import Theme from './components/Theme.jsx'
import { LocationContext } from './contexts/LocationContext.jsx'
import Directions from './components/Directions.jsx'

function App() {
	const [theme, setTheme] = useState('rastertiles/voyager')
	const [isOpenHeatmap, setIsOpenHeatmap] = useState(true)

	return (
		<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
			<div style={{ width: '100vw', height: '100vh' }}>
				<div className="mapContainer">
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
					<MapView theme={theme} isOpenHeatmap={isOpenHeatmap} />
				</div>
				<div className="themeContainer">
					<div>
						<Theme setTheme={setTheme} />
					</div>
				</div>
				<div className="map-background">
					<div className="map-background__wrap">
						Heatmap
						<input
							type="checkbox"
							id="toggle"
							checked={isOpenHeatmap}
							onChange={(e) => {
								setIsOpenHeatmap(e.target.checked)
							}}
						/>
					</div>
				</div>
				<PWABadge />
			</div>
		</APIProvider>
	)
}

export default App
