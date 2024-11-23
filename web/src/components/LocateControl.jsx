import { LocateControl as _LocateControl } from 'leaflet.locatecontrol'
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css' // Import styles
import { createControlComponent } from '@react-leaflet/core'

export const LocateControl = createControlComponent((props) => {
	const { options } = props

	const control = new _LocateControl(options)

    setTimeout(() => {
        control.start()
    }, 100)
 
	return control
})

export default LocateControl
