import React from 'react'

const PlaceOverview = ({ details }) => {
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

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				<img src={icon} alt={`${name} icon`} style={styles.icon} />
				<h2 style={styles.title}>{name}</h2>
			</div>
			<p style={styles.address}>{formatted_address}</p>
			{rating && (
				<p style={styles.rating}>
					⭐ {rating} ({user_ratings_total} ratings)
				</p>
			)}
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
			<p style={styles.types}>
				{types?.map((type) => (
					<span key={type} style={styles.type}>
						{type.replace(/_/g, ' ')}
					</span>
				))}
			</p>
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
		color: '#555',
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
		width: '100px',
		height: '100px',
		objectFit: 'cover',
		borderRadius: '4px',
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
		flexDirection: 'column',
		gap: '4px',
	},
	link: {
		color: '#007BFF',
		textDecoration: 'none',
	},
}

export default PlaceOverview
