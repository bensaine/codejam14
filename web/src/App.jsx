import { useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'
import './App.css'
import MapView from './components/Map.jsx'

function App() {

  return (
    <div style={{width: '90vw', height: '100vh'}}>
        <MapView></MapView>
        Showing Map View
        <PWABadge />
    </div>
  )
}

export default App
