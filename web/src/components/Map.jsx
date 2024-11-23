import React from "react";
import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L, { geoJson } from "leaflet";
import "leaflet-defaulticon-compatibility";
import {HeatmapLayer} from "react-leaflet-heatmap-layer-v3";
import geoJsonData from "../assets/actes-criminels.json";
const MapView = ({ geojsonData }) => {
  const position = [45.514, -73.573];
  const url = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
  const addressPoints = geoJsonData['features'].map(el => {
    return [el['properties']['LATITUDE'], el['properties']['LONGITUDE'], 0.3]
  }
  )
  return (
    <MapContainer
      preferCanvas={true}
      renderer={L.canvas()}
      center={position}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
    >
      <Marker position={position} />
        <HeatmapLayer
            points={addressPoints}
            longitudeExtractor={m => m[1]}
            latitudeExtractor={m => m[0]}
            intensityExtractor={m => parseFloat(m[2])} />
      <TileLayer
        maxZoom={20}
        url={'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'}
        minZoom={0}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

    </MapContainer>
  );
};

export default MapView;
