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
    <div>
      Map goes here.
      <pre>{JSON.stringify(markers, null, 2)}</pre>
    </div>
  );
};

export default Map;
