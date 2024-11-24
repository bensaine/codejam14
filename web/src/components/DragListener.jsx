import { useMapEvent } from 'react-leaflet/hooks'

const DragListener = ({ onDrag }) => {
	useMapEvent('dragstart', () => {
		onDrag()
	})
	return null
}

export default DragListener
