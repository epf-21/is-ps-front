"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L, { DivIcon, LatLngExpression, LatLngTuple } from "leaflet"
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "@/styles/priceMarker.css"

import MapPunto from "../mapPunto";
import { AutoMap } from "@/interface/map";
import { estaDentroDelRadio } from "./filtroGPS";
import { Card } from "../ui/card";
import { Button } from "../ui/button";


interface MapProps {
  posix: LatLngExpression | LatLngTuple,
  zoom?: number,
  autos?: AutoMap[],
}

const defaults = {
  zoom: 12,
}
const Map = ({ zoom = defaults.zoom, posix, autos = [] }: MapProps) => {
  const [punto, setpunto] = useState({ altitud: 0, longitud: 0 })
  const actualizarPunto = (longitud: number, altitud: number) => {
    setpunto({
      longitud,
      altitud
    })
  }

  const router = useRouter();

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {autos.map((auto) => {
        const sinFiltro = punto.altitud === 0 && punto.longitud === 0;
        const dentroDelRadio = estaDentroDelRadio(punto.altitud, punto.longitud, auto.latitud, auto.longitud, 3000);
        if (sinFiltro || dentroDelRadio) {
          const customIcon: DivIcon = L.divIcon({
            html: `<div class="price-marker">BOB ${auto.precio}</div>`,
            className: "",
            iconAnchor: [38, 8],
          });

          return (
            <Marker key={auto.id} position={[auto.latitud, auto.longitud]} icon={customIcon}>
              <Popup>
                <Card className="w-[250px] p-0 shadow-lg rounded-xl overflow-hidden">
                  <div className="p-3 space-y-1">
                    <div className="font-semibold text-base">
                      {auto.marca} {auto.modelo} {auto.anio}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-right">
                        <div className="font-bold text-base">BOB {auto.precio} / día</div>
                      </div>
                    </div>
                    <Button
                      className="mt-2 w-full"
                      onClick={() => router.push(`/infoAuto_Recode/${auto.id}`)}
                    >
                      Ver oferta
                    </Button>
                  </div>
                </Card>
              </Popup>

            </Marker>
          );
        }
      })}
      <MapPunto actualizarPunto={actualizarPunto} />
    </MapContainer>
  );
}

export default Map;
