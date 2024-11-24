import { useEffect, useState, useRef } from 'react'
import './PlaceOverview.css'
import PathLoadingAnimation from './PathLoadingAnimation'
import {
	ArrowUpRight,
	CircleArrowRight,
	LandPlot,
	SquareArrowUpRight,
} from 'lucide-react'

const PlaceOverview = ({ details, onStartRoute, isPathLoading, isRouting }) => {
	const [placeCrimeScore, setPlaceCrimeScore] = useState(null)

	const {
		name,
		formatted_address,
		rating,
		user_ratings_total,
		icon,
		website,
		url,
		geometry,
		photos,
		types,
	} = details

	useEffect(() => {
		const fetchCrimeScore = async () => {
			const response = await fetch(document.BASE_API + '/crime', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					source: [geometry.location.lat(), geometry.location.lng()],
				}),
			}).then((response) => response.json())

			if (Number.isInteger(response)) {
				setPlaceCrimeScore(response / 200)
			}
		}

		if (geometry) {
			fetchCrimeScore()
		}
	}, [geometry])

	if (!details) {
		return <div>Loading...</div>
	}

	if (isPathLoading) {
		return (
			<div className="loadingContainer">
				<PathLoadingAnimation />
				<span>Generating the safest route...</span>
			</div>
		)
	}

	const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				{/* <img src={icon} alt={`${name} icon`} style={styles.icon} /> */}
				<h2 style={styles.title}>{name}</h2>
			</div>
			<span style={styles.address}>{formatted_address}</span>
			{!isRouting && (
				<>
					<div style={styles.types}>
						{rating && (
							<span style={styles.type}>
								⭐ {rating} ({user_ratings_total} ratings)
							</span>
						)}
						{!!placeCrimeScore && (
							<span style={styles.type}>
								🔒 {placeCrimeScore.toFixed(2) > 0.6 ? 'High' : 'Low'} crime
							</span>
						)}
						{types?.slice(0, 3).map((type) => (
							<span key={type} style={styles.type}>
								{capitalize(type.replace(/_/g, ' '))}
							</span>
						))}
					</div>
					{/* // {photos && photos.length > 0 && (
			// 	<div style={styles.photos}>
			// 		{photos.slice(0, 3).map((photo, index) => (
			// 			<img
			// 				key={index}
			// 				src={photo.getUrl ? photo.getUrl() : photo.url}
			// 				alt={`${name} photo ${index + 1}`}
			// 				style={styles.photo}
			// 			/>
			// 		))}
			// 	</div>
			// )}  */}
					<div style={styles.links}>
						{website && (
							<a
								href={website}
								target="_blank"
								rel="noopener noreferrer"
								style={styles.websiteButton}
							>
								Website <SquareArrowUpRight size={20} />
							</a>
						)}
						{!website && url && (
							<a
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								style={styles.gMapsButton}
							>
								Google <SquareArrowUpRight size={20} />
							</a>
						)}
						<button
							style={styles.goButton}
							onClick={() => onStartRoute(details.geometry.location)}
						>
							Go Now <CircleArrowRight size={20} />
						</button>
					</div>
				</>
			)}
		</div>
	)
}

// Styling
const styles = {
	container: {
		padding: '1em',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
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
	address: {},
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
		margin: '8px 0px',
		fontSize: '12px',
		color: 'rgb(136, 136, 136)',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignContent: 'center',
		gap: '1em',
	},
	type: {
		background: 'var(--ui-button)',
		color: 'white',
		padding: '4px 8px',
		borderRadius: '12px',
	},
	links: {
		marginTop: '1em',
		display: 'flex',
		flexDirection: 'row',
		gap: '1em',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	link: {
		color: '#ffffff',
		textDecoration: 'underline',
	},
	startButton: {
		backgroundColor: '#4FC368',
		margin: '15px',
	},
	websiteButton: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '0.5em',
		background: '#575764',
		fontSize: '1em',
		padding: '0.65em 1.25em',
		color: '#ffffffdb',
		cursor: 'pointer',
		borderRadius: '15em',
	},
	gMapsButton: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '0.5em',
		background: '#575764',
		fontSize: '1em',
		padding: '0.65em 1.25em',
		color: '#ffffffdb',
		cursor: 'pointer',
		borderRadius: '15em',
	},
	goButton: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '0.5em',
		background: '#4FC368',
		fontSize: '1.05em',
		color: '#ffffff',
		fontWeight: 600,
		padding: '0.65em 1.25em',
		borderRadius: '15em',
	},
	funStats: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: '1em',
	},
}

export default PlaceOverview
