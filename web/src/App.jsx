import { useState } from 'react'
import './App.css'
import MapView from './components/Map.jsx'
import Theme from './components/Theme.jsx'
import { Map } from 'lucide-react'

function App() {
	const [theme, setTheme] = useState('rastertiles/voyager')
	const [isOpenHeatmap, setIsOpenHeatmap] = useState(true)
	return (
		<div className="container">
			<div className="mapContainer">
				<MapView theme={theme} isOpenHeatmap={isOpenHeatmap} />
			</div>
			<div className="themeContainer">
				<Map
					className="mapToggle"
					onClick={() => {
						setIsOpenHeatmap(!isOpenHeatmap)
					}}
				></Map>
				<Theme setTheme={setTheme} />
			</div>
		</div>
	)
}

export default App
