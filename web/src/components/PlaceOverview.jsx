import { useEffect, useRef } from 'react'
import './PlaceOverview.css'
import PathLoadingAnimation from './PathLoadingAnimation'

const PlaceOverview = ({ details, onStartRoute, isPathLoading }) => {
	if (!details) {
		return <div>Loading...</div>
	}

	const {
		name,
		formatted_address,
		rating,
		user_ratings_total,
		icon,
		website,
		url,
		photos,
		types,
	} = details

	if (isPathLoading) {
		return (
			<div className="loadingContainer">
				<PathLoadingAnimation />
				<span>Generating the safest route...</span>
			</div>
		)
	}

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				<img src={icon} alt={`${name} icon`} style={styles.icon} />
				<h2 style={styles.title}>{name}</h2>
			</div>
			{rating && (
				<p style={styles.rating}>
					⭐ {rating} ({user_ratings_total} ratings)
				</p>
			)}
			<p style={styles.address}>{formatted_address}</p>
			{photos && photos.length > 0 && (
				<div style={styles.photos}>
					{photos.slice(0, 3).map((photo, index) => (
						<img
							key={index}
							src={photo.getUrl ? photo.getUrl() : photo.url}
							alt={`${name} photo ${index + 1}`}
							style={styles.photo}
						/>
					))}
				</div>
			)}
			<div style={styles.links}>
				{website && (
					<a
						href={website}
						target="_blank"
						rel="noopener noreferrer"
						style={styles.link}
					>
						Official Website
					</a>
				)}
				{url && (
					<a
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						style={styles.link}
					>
						View on Google Maps
					</a>
				)}
			</div>
			<button
				onClick={() => onStartRoute(details.geometry.location)}
				style={styles.startButton}
			>
				Start Route
			</button>
		</div>
	)
}

// Styling
const styles = {
	container: {},
	header: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '8px',
		justifyContent: 'center',
		marginTop: '5px',
	},
	icon: {
		width: '40px',
		height: '40px',
		marginRight: '10px',
	},
	title: {
		margin: 0,
		fontSize: '20px',
		fontWeight: 'bold',
	},
	address: {
		margin: '8px 0',
		color: '#ffffff',
	},
	rating: {
		margin: '8px 0',
		fontWeight: 'bold',
	},
	photos: {
		display: 'flex',
		gap: '8px',
		margin: '8px 0',
	},
	photo: {
		width: '200px',
		height: '200px',
		objectFit: 'cover',
		borderRadius: '16px',
	},
	types: {
		margin: '8px 0',
		fontSize: '12px',
		color: '#888',
	},
	type: {
		marginRight: '8px',
		background: '#f0f0f0',
		padding: '4px 8px',
		borderRadius: '12px',
	},
	links: {
		marginTop: '8px',
		display: 'flex',
		flexDirection: 'row',
		gap: '4px',
		justifyContent: 'space-around',
	},
	link: {
		color: '#ffffff',
		textDecoration: 'underline',
	},
	startButton: {
		backgroundColor: '#4FC368',
		margin: '15px',
	},
}

export default PlaceOverview
