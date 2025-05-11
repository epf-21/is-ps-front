export interface RawAuto_Interface_Recode {
  id: number;
  modelo: string;
  marca: string;
  asientos: number;
  puertas: number;
  transmision: string;
  precio_por_dia: number;
  combustiblesporCarro: {
    combustible?: {
      tipoDeCombustible: string;
    };
  }[];
  estado: string;
  usuario?: {
    nombre?: string;
  };
  direccion?: {
    calle?: string;
    provincia?: {
      ciudad?: {
        nombre?: string;
      };
    };
  };
  imagen?: {
    data?: string;
  }[];
  disponible_desde?: string;
  disponible_hasta?: string;
}