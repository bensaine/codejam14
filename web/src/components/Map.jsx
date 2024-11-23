import React from "react";
import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L, { geoJson } from "leaflet";
import "leaflet-defaulticon-compatibility";
import {HeatmapLayer} from "react-leaflet-heatmap-layer-v3";
import { addressPoints } from '../assets/realworld.10000'
import geoJsonData from "../assets/actes-criminels_short.json";
const MapView = ({ geojsonData }) => {
  const position = [45.514, -73.573];
  const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <MapContainer
      preferCanvas={true}
      renderer={L.canvas()}
      center={position}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
    >
      <GeoJSON data={geoJsonData}> </GeoJSON>
      <Marker position={position} />
<HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={addressPoints}
            longitudeExtractor={m => m[1]}
            latitudeExtractor={m => m[0]}
            intensityExtractor={m => parseFloat(m[2])} />
      
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.carto.com/">CARTO</a> contributors'
      />

    </MapContainer>
  );
};

export default MapView;
