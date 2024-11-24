import { Footprints } from 'lucide-react'
import './TimeDistance.css'

const TimeDistance = ({
	safeTime,
	safeDistance,
	dangerousTime,
	dangerousDistance,
}) => {
	return (
		<div className="container">
			<div className="display">
				<div className="time-distance">
					<Footprints color="teal"></Footprints>
					<p>{`${Math.round(safeTime)} min (${
						Math.round(safeDistance / 100) / 10
					} km)`}</p>
				</div>
				<div className="time-distance">
					<Footprints color="#800020"></Footprints>
					<p>{`${Math.round(dangerousTime)} min (${
						Math.round(dangerousDistance / 100) / 10
					} km)`}</p>
				</div>
			</div>
		</div>
	)
}

export default TimeDistance
