import { useState } from 'react'
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react' // Importing icons
import './Directions.css'

const Directions = ({ directions }) => {
	const [isExpanded, setIsExpanded] = useState(false)

	return (
		<div className={`directions-container ${isExpanded ? 'expanded' : ''}`}>
			<div className="header">
				{/* Back Button */}
				<p>DIRECTIONS</p>
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
