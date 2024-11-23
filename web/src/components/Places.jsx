import { Search } from 'lucide-react'
import GoogleAutocomplete from './GoogleAutocomplete.jsx'

const Places = () => {
	return (
		<div>
			<h1>Places</h1>
			<div>
				{/* <GoogleAutocomplete /> */}
				<Search size="24" />
			</div>
		</div>
	)
}

export default Places
