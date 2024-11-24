import { useCallback, useEffect, useMemo, useState } from 'react'
import { BlurContext } from '../contexts/BlurContext'

const BlurProvider = ({ children }) => {
	const [blur, setBlur] = useState(true)

	const onDrag = () => {
		if (!blur) {
			setBlur(true)
		}
	}

	return (
		<BlurContext.Provider
			value={{
				onDrag,
                setBlur,
				blur,
			}}
		>
			{children}
		</BlurContext.Provider>
	)
}

export default BlurProvider
