import L, { LatLng } from 'leaflet'
import React, { useState } from 'react'
import { Marker, useMapEvents, Circle, Popup, Tooltip } from 'react-leaflet'

interface HijoProps {
  radio: number,
  punto: {lon:number,alt:number},
  setpunto: (punto:{lon:number,alt:number}) => void;
}
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Puedes usar cualquier ícono
  iconSize: [38, 38], // Tamaño grande
  iconAnchor: [19, 38],
  popupAnchor: [0, -38]
});


const MapPunto= ({radio,punto,setpunto }:HijoProps) => {
  const [position, setPosition] = useState<LatLng | null>(null)
  const [position2, setPosition2] = useState<LatLng | null>(null)
  function actualizarPunto(lon:number,alt:number) {
    setpunto({lon,alt})
  }
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      actualizarPunto(lng,lat);
      map.locate()
      map.flyTo(e.latlng, map.getZoom())
    },
    locationfound(e) {
      setPosition2(e.latlng)
    },
  })

  const fillBlueOptions = { fillColor: 'blue' }
  return (
    <>
      {
        position && position2 && (
          <div>
            <Circle center={position} pathOptions={fillBlueOptions} radius={radio * 1000} />
            <Marker position={position} draggable={false}></Marker>
            <Marker position={position2} icon={customIcon}>
              <Tooltip permanent direction="top" offset={[0, -40]}>
                👤 Estás aquí
              </Tooltip>
            </Marker>
          </div>
        )
      }
    </>
  )
}

export default MapPunto