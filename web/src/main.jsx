import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const script = document.createElement('script')
script.src =
	'https://maps.googleapis.com/maps/api/js?key=' +
	import.meta.env.VITE_GOOGLE_MAPS_API_KEY +
	'&libraries=places'
document.head.appendChild(script)

script.onload = () => {
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	)
}
