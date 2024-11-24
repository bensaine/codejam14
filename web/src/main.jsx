import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LocationProvider from './components/LocationProvider.jsx'

const script = document.createElement('script')
script.src =
	'https://maps.googleapis.com/maps/api/js?key=' +
	import.meta.env.VITE_GOOGLE_MAPS_API_KEY +
	'&libraries=places'
document.head.appendChild(script)

document.BASE_API = 'http://127.0.0.1:5000'

script.onload = () => {
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<LocationProvider>
				<App />
			</LocationProvider>
		</React.StrictMode>
	)
}
