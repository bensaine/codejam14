import { useState } from 'react'
import { ChevronDown, ChevronUp, ArrowLeft, LandPlot, Compass } from 'lucide-react' // Importing icons
import './Directions.css'

const Directions = ({ directions }) => {
	const [isExpanded, setIsExpanded] = useState(false)

	if (!directions) return null

	return (
		<div className={`directions-container ${isExpanded ? 'expanded' : ''}`}>
			<div className="header">
				{/* Back Button */}
				<span
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '0.5em',
						fontSize: '1.25em',
						fontWeight: '600',
					}}
				>
					DIRECTIONS <Compass size={20} />
				</span>
				{/* Expand/Collapse Button */}
				<button
					className="expand-button"
					onClick={(e) => {
						e.stopPropagation() // Prevent container click
						setIsExpanded(!isExpanded)
					}}
				>
					{isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
				</button>
			</div>
			<div className="content">
				<p>{directions[0]}</p>
				{isExpanded && (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							textAlign: 'center',
						}}
					>
						{directions.slice(1).map((direction, index) => (
							<p key={index}>{direction}</p>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Directions
