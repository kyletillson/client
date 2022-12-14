import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1Ijoia3lsZXRpbGxzb24iLCJhIjoiY2w4bWY1aThtMGV1dTNubXlpbTh0cDI4eSJ9.MqRCL4Aiv3OYWHQEZfrU8A';

export default function Map({ latitude, longitude }) {
const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(longitude);
const [lat, setLat] = useState(latitude);

useEffect(() => {
if (map.current) return; // initialize map only once
map.current = new mapboxgl.Map({
container: mapContainer.current,
style: 'mapbox://styles/mapbox/outdoors-v11',
center: [lng, lat],
zoom: 18,
interactive: true,
});
});
 
useEffect(() => {
if (!map.current) return; // wait for map to initialize
map.current.on('move', () => {
setLng(map.current.getCenter().lng.toFixed(4));
setLat(map.current.getCenter().lat.toFixed(4));
});
});

  return (
    <>
      <div ref={mapContainer} className="map-container" />
    </>
  )
}
