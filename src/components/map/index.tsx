"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useMap, MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L, { DivIcon, LatLngExpression, LatLngTuple } from "leaflet"
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "@/styles/priceMarker.css"

import MapPunto from "../mapPunto";
import { estaDentroDelRadio } from "./filtroGPS";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AutoCard_Interfaces_Recode as Auto } from '@/interface/AutoCard_Interface_Recode';
import { useMapStore } from "@/store/mapStore";

interface MapProps {
  posix: LatLngExpression | LatLngTuple,
  zoom?: number,
  autos?: Auto[],
  radio: number,
  punto: { lon: number, alt: number },
  setpunto: (punto: { lon: number, alt: number }) => void;
}

interface GroupedAuto {
  key: string;
  autos: Auto[];
}

const defaults = {
  zoom: 12,
}

interface FlyToOnPopupOpenProps {
  position: LatLngExpression;
  trigger: boolean;
}

const FlyToOnPopupOpen = ({ position, trigger }: FlyToOnPopupOpenProps) => {
  const map = useMap();

  useEffect(() => {
    if (trigger) {
      map.flyTo(position, map.getZoom(), {
        duration: 0.7,
      });
    }
  }, [trigger, position, map]);

  return null;
};

const FlyToSelectedPoint = () => {
  const map = useMap();
  const selectedPoint = useMapStore((state) => state.selectedPoint);

  useEffect(() => {
    if (selectedPoint) {
      map.flyTo([selectedPoint.lat, selectedPoint.lon], map.getZoom(), {
        duration: 1.5,
      });
    }
  }, [selectedPoint, map]);

  return null;
};


const Map = ({ zoom = defaults.zoom, posix, autos = [], radio, punto, setpunto }: MapProps) => {
  const [currentAutoIndex, setCurrentAutoIndex] = useState<Record<string, number>>({});
  const [popupOpenKey, setPopupOpenKey] = useState<string | null>(null);

  const router = useRouter();

  const groupedAutos: GroupedAuto[] = autos.reduce((groups: GroupedAuto[], auto) => {
    const key = `${auto.latitud}-${auto.longitud}`;
    const existingGroup = groups.find(group => group.key === key);

    if (existingGroup) {
      existingGroup.autos.push(auto);
    } else {
      groups.push({ key, autos: [auto] });
    }

    return groups;
  }, []);

  const nextAuto = (groupKey: string) => {
    setCurrentAutoIndex(prev => {
      const currentIndex = prev[groupKey] || 0;
      const groupLength = groupedAutos.find(g => g.key === groupKey)?.autos.length || 1;
      return {
        ...prev,
        [groupKey]: (currentIndex + 1) % groupLength
      };
    });
  };

  const prevAuto = (groupKey: string) => {
    setCurrentAutoIndex(prev => {
      const currentIndex = prev[groupKey] || 0;
      const groupLength = groupedAutos.find(g => g.key === groupKey)?.autos.length || 1;
      return {
        ...prev,
        [groupKey]: (currentIndex - 1 + groupLength) % groupLength
      };
    });
  };

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

      <FlyToSelectedPoint />

      {groupedAutos.map((group) => {
        const sinFiltro = punto.alt === 0 && punto.lon === 0;
        const latitud = group.autos[0].latitud;
        const longitud = group.autos[0].longitud;
        const dentroDelRadio = estaDentroDelRadio(punto.alt, punto.lon, latitud, longitud, radio * 1000);

        if (sinFiltro || dentroDelRadio) {
          const lowestPrice = Math.min(...group.autos.map(auto => auto.precioOficial));
          const hasMultiple = group.autos.length > 1;

          const customIcon: DivIcon = L.divIcon({
            html: `<div class="price-marker ${hasMultiple ? 'multiple' : ''}">
                    BOB ${lowestPrice}${hasMultiple ? `<span class="count-badge">${group.autos.length}</span>` : ''}
                  </div>`,
            className: "",
            iconAnchor: [38, 8],
          });

          const currentIndex = currentAutoIndex[group.key] || 0;
          const currentAuto = group.autos[currentIndex];

          return (
            <Marker
              key={group.key}
              position={[latitud, longitud]}
              icon={customIcon}
            >
              <Popup
                eventHandlers={{
                  add: () => setPopupOpenKey(group.key),
                }}
              >
                <FlyToOnPopupOpen
                  position={[latitud, longitud]}
                  trigger={popupOpenKey === group.key}
                />

                <Card className="w-[250px] p-0 shadow-lg rounded-xl overflow-hidden">
                  <div className="relative w-full h-[120px]">
                    <div className="w-full h-full overflow-hidden bg-white flex items-center justify-center">
                      {currentAuto.imagenURL ? (
                        <Image
                          src={currentAuto.imagenURL}
                          width={250}
                          height={120}
                          alt="imagen del auto"
                          className="object-cover"
                          layout="lazy"
                          unoptimized
                        />
                      ) : (
                        <span className="text-sm bg-gray-100 text-black">Sin imagen</span>
                      )}
                    </div>
                    {hasMultiple && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/40 hover:bg-white rounded-full p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            prevAuto(group.key);
                          }}
                        >
                          <ChevronLeft className="h-4 w-4 text-black" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/40 hover:bg-white rounded-full p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            nextAuto(group.key);
                          }}
                        >
                          <ChevronRight className="h-4 w-4 text-black" />
                        </Button>
                      </>
                    )}
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="font-semibold text-base">
                      {currentAuto.marca} {currentAuto.modelo} {currentAuto.anio}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-right">
                        <div className="font-bold text-base">BOB {currentAuto.precioOficial} / día</div>
                      </div>
                    </div>
                    <Button
                      className="mt-2 w-full cursor-pointer"
                      onClick={() => router.push(`/infoAuto_Recode/${currentAuto.idAuto}`)}
                    >
                      Ver oferta
                    </Button>
                  </div>
                </Card>
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
      <MapPunto radio={radio} punto={punto} setpunto={setpunto} />
    </MapContainer>
  );
}

export default Map;