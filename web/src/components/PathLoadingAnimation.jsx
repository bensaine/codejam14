import { useLayoutEffect, useRef } from 'react'
import { Player } from '@lordicon/react'
import WALKING_ICON from '../assets/walk.json'
import { Slab } from 'react-loading-indicators'
import './PathLoadingAnimation.css'

const PathLoadingAnimation = () => {
	const playerRef = useRef(null)

	useLayoutEffect(() => {
		playerRef.current?.playFromBeginning()
	}, [])

	return (
		<div>
			<Player
				style={{ marginLeft: '-1rem' }}
				ref={playerRef}
				size={90}
				icon={WALKING_ICON}
				onComplete={() => playerRef.current?.playFromBeginning()}
			/>
			<Slab color="#4FC368" size="medium" text="" textColor="" />
		</div>
	)
}

export default PathLoadingAnimation
