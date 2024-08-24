"use client";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styles from "./Map.module.css";
type MapType = {
  center: [number, number];
  position: [number, number];
  children: React.ReactNode;
};
const MapLayout: React.FC<MapType> = ({ center, position, children }) => {
  return (

      <div className="!relative w-full xs:flex flex-col  lg:block  justify-between   lg:h-[300px]  ">
        <MapContainer
          className={styles.map}
          center={center}
          zoom={14}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>Set Coffee</Popup>
          </Marker>
        </MapContainer>
        <div className={styles.details}>{children}</div>
      </div>

  );
};

export default MapLayout;
