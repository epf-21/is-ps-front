export interface AutoCard_Interfaces_Recode {
    idAuto: string;
    modelo: string;
    marca: string;
    anio: number;
    asientos: number;
    puertas: number;
    transmision: string;
    combustibles: string[];
    estadoAlquiler: string;
    nombreHost: string;
    calificacionAuto: number;
    ciudad: string;
    calle: string;
    imagenURL: string;
    precioOficial: number;
    precioDescuento: number;
    precioPorDia: number;
    latitud: number;
    longitud: number;
    reservas: {
        fecha_inicio: string;
        fecha_fin: string;
        estado: string;
    }[];
}