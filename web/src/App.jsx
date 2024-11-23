import { useState } from 'react'
import './App.css'
import MapView from './components/Map.jsx'
import Theme from './components/Theme.jsx'
import { Map } from 'lucide-react'

function App() {
	const [theme, setTheme] = useState('rastertiles/voyager')
	const [toggleHeatmap, setToggleHeatmap] = useState(false)
	return (
		<div className="container">
			<div className="mapContainer">
				<MapView theme={theme} />
			</div>
			<div className="themeContainer">
				<Map onClick={() => setToggleHeatmap(!toggleHeatmap)}></Map>
				<Theme setTheme={setTheme} />
			</div>
		</div>
	)
}

export default App
