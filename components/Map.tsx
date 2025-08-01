'use client';
import React from 'react';

type Marker = {
  title: string;
  position: {
    lat: number;
    lng: number;
  };
};

type MapProps = {
  markers: Marker[];
};

const Map: React.FC<MapProps> = ({ markers }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl">
      <p>Map will be rendered here.</p>
      <ul className="text-sm mt-2">
        {markers.map((marker, index) => (
          <li key={index}>
            📍 {marker.title} — Lat: {marker.position.lat}, Lng: {marker.position.lng}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Map;
