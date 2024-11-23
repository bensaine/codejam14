import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import geoJsonData from '../assets/actes-criminels_short.json'
const MapView = ({ geojsonData }) => {
    return (
        <MapContainer center={[45.514, -73.573]} zoom={11} style={{ height: "90", width: '90vw' }}>
            <TileLayer
            url={'https://{s}.basemaps.cartocdn.com/{z}/{x}/{y}' + (L.Browser.retina ? '@2x.png' : '.png')}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    );
};

export default MapView;