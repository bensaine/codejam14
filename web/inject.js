document.head.appendChild(document.createElement('script')).src =
	'https://maps.googleapis.com/maps/api/js?key=' +
	import.meta.env.VITE_GOOGLE_MAPS_API_KEY +
	'&libraries=places'
