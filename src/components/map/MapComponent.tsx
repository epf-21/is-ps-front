    "use client"
    import React, { useState } from 'react';
    import { MapContainer, TileLayer, Marker, Popup, Circle} from 'react-leaflet';
    import markerIconPng from "leaflet/dist/images/marker-icon.png"
    import aiportLocationPng from '../../assets/airport-location.png';
    import {Icon} from 'leaflet'
    import RecenterAutomatically from './RecenterAutomatically';
    import 'leaflet/dist/leaflet.css';
    interface car{
      latitud:number;
      longitud:number;
      marca: string;
      modelo: string;  
      imagenes:string;    
    };    
    interface MapComponentProps {
    latitude: number;
    longitude: number;
    radius: number;
    cars: car[];
    }

    const MapComponent: React.FC<MapComponentProps>  = ({ latitude, longitude, radius, cars}) => {        
      const circleOptions = { color: 'red', fillColor: 'red', fillOpacity: 0.1 };
      const [latitud,setLatitud] = useState(latitude)
      const [longitud,setLongitud] = useState(longitude)      
      return (
        <MapContainer center={[latitude, longitude]} zoom={12} style={{ height: '500px', width: '100%' }}>
          <Circle center={[latitude,longitude]} radius={radius*1000} pathOptions={circleOptions} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[latitud,longitud]} icon={new Icon({iconUrl: aiportLocationPng.src, iconSize: [26, 26], iconAnchor: [13, 26]})} >
            <Popup>
              Aeropuerto
            </Popup>
          </Marker>                    
           {cars.map((item, i:number) => {
            return(
          <Marker key={i} position={[item.latitud,item.longitud]} icon={new Icon({iconUrl: markerIconPng.src, iconSize: [16, 26], iconAnchor: [8, 26]})} >
            <Popup>              
              {item.marca} {item.modelo}
              <img src={item.imagenes} width={300} />
            </Popup>
          </Marker>)
           })}
          <RecenterAutomatically lat={latitude} lng={longitude} />
        </MapContainer>
      );
    }

    export default MapComponent;