import React, { useState } from 'react'
import { Palette } from 'lucide-react'
import './Theme.css'

const Theme = ({ setTheme }) => {
	const [isMenuOpen, setMenuOpen] = useState(false)

	const toggleMenu = () => {
		setMenuOpen((prev) => !prev)
	}

	return (
		<div className="theme-container">
			<Palette
				className={`theme-icon ${isMenuOpen ? 'open' : ''}`}
				onClick={toggleMenu}
			/>

			<div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
				<div className="menu-items">
					<button
						className="menu-item"
						onClick={() => setTheme('rastertiles/voyager')}
					>
						Default
					</button>
					<button className="menu-item" onClick={() => setTheme('light_all')}>
						Light Mono
					</button>
					<button className="menu-item" onClick={() => setTheme('dark_all')}>
						Dark Mono
					</button>
				</div>
			</div>
		</div>
	)
}

export default Theme
