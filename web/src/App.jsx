import { useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'
import './App.css'
import MapView from './components/Map.jsx'

function App() {

  return (
    <>
    <MapView></MapView>
    Showing Map View
      <PWABadge />
    </>
  )
}

export default App
