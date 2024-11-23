import React from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import L, { geoJson } from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import HeatmapLayer from 'react-leaflet-heatmap-layer-v3'
import geoJsonData from '../assets/actes-criminels_short.json'
const MapView = ({ geojsonData }) => {
    const position = [45.514, -73.573]
    const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    return (
        <MapContainer 
        preferCanvas={true} renderer={L.canvas()}
        center={position} zoom={11} style={{ height: "100%", width: '100%' }}>
            <TileLayer
                url={url}
                maxZoom={20}
                minZoom={0}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            <Marker position={position}/>
            <GeoJSON data={geoJsonData}> </GeoJSON>
        </MapContainer>
    );
};

export default MapView;