import Link from "next/link";
import { memo } from "react";
import CarCardDisponibilidad from "./CarCardDisponibilidad7-bits";

interface Props {
  precioOficial: number;
  precioDescuento: number;
  precioPorDia: number;
  id: string;
}

function CarCardPrice({ precioOficial, precioDescuento, precioPorDia, id }: Props) {
  return (
    <div className="flex flex-col justify-between items-end text-right min-w-[130px]">
      <div>
        <p className="text-xl font-bold">BOB. {precioOficial.toFixed(2)}</p>
        <p className="text-gray-400 line-through">BOB. {precioDescuento.toFixed(2)}</p>
        <p className="text-sm text-gray-600">Por día: BOB. {precioPorDia.toFixed(2)}</p>
      </div>

      {/* Componente de disponibilidad auto reservable */}
      <CarCardDisponibilidad
      />

      <Link href={`/infoAuto_Recode/${id}`} target="_blank">
        <button className="bg-black text-white px-4 py-2 rounded mt-4 hover:bg-gray-800">
          Ver oferta
        </button>
      </Link>
    </div>
  );
}
export default memo(CarCardPrice);