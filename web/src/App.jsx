import { useState } from 'react'
import './App.css'
import MapView from './components/Map.jsx'
import Theme from './components/Theme.jsx'

function App() {
	const [theme, setTheme] = useState('rastertiles/voyager')
	return (
		<div className="container">
			<div className="mapContainer">
				<MapView theme={theme} />
			</div>
			<div className="themeContainer">
				<Theme setTheme={setTheme} />
			</div>
		</div>
	)
}

export default App
