import haversine from 'haversine-distance'
import { AutoCard_Interfaces_Recode as Auto } from '@/interface/AutoCard_Interface_Recode';

export function estaDentroDelRadio(latUsuario: number, lonUsuario: number, latAuto: number, lonAuto: number, radioKm: number) {
    const a = { lat: latUsuario, lng: lonUsuario }
    const b = { lat: latAuto, lon: lonAuto }
    return haversine(b, a) <= radioKm;
}


export function autosCercanosOrdenados(autos: Auto[],punto:{lon:number,alt:number}, radio: number):Auto[] {
  return autos
    .map(auto => {
      const distancia = haversine(
        { lat: auto.latitud, lon: auto.longitud },
        { lat: punto.alt, lng: punto.lon }
      );
      return { ...auto, distancia };
    })
    .filter(auto => auto.distancia <= radio)
    .sort((a, b) => a.distancia - b.distancia);
}